const FLIGHT_API_URL = "https://agency.wikiproject.in/";
const CABIN_CODES = {
  ECONOMY: "Y",
  PREMIUM_ECONOMY: "W",
  BUSINESS: "C",
  FIRST: "F",
};

function jsonResponse(body, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function toProviderDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  const monthName = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
  return `${monthName}-${String(day).padStart(2, "0")}-${year}`;
}

function parsePassengerCount(value, fallback) {
  if (value === null || value === "") return fallback;
  if (!/^\d+$/.test(value)) return null;
  const count = Number(value);
  return Number.isSafeInteger(count) ? count : null;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const origin = (searchParams.get("origin") || "").trim().toUpperCase();
  const destination = (searchParams.get("destination") || "").trim().toUpperCase();
  const departure = searchParams.get("departure_date") || "";
  const returnDate = searchParams.get("return_date") || "";
  const tripType = searchParams.get("tripType") || "oneway";
  const travelClass = (searchParams.get("travel_class") || "ECONOMY").toUpperCase();
  const adults = parsePassengerCount(searchParams.get("adults"), 1);
  const children = parsePassengerCount(searchParams.get("children"), 0);
  const infants = parsePassengerCount(searchParams.get("infants"), 0);

  if (!/^[A-Z]{3}$/.test(origin) || !/^[A-Z]{3}$/.test(destination) || origin === destination) {
    return jsonResponse({ error: "Enter different 3-letter origin and destination airport codes." }, 400);
  }
  if (tripType !== "oneway" && tripType !== "roundtrip") {
    return jsonResponse({ error: "Choose one-way or round-trip travel." }, 400);
  }
  if (!isValidDate(departure) || (tripType === "roundtrip" && !isValidDate(returnDate))) {
    return jsonResponse({ error: "Enter a valid departure date and, for round trips, a valid return date." }, 400);
  }
  const today = new Date().toISOString().slice(0, 10);
  if (departure < today || (tripType === "roundtrip" && returnDate <= departure)) {
    return jsonResponse({ error: "Departure must be today or later, and the return date must be after departure." }, 400);
  }
  if (![adults, children, infants].every(Number.isInteger) ||
      adults < 1 || children < 0 || infants < 0 ||
      adults > 9 || children > 8 || infants > adults ||
      adults + children + infants > 9) {
    return jsonResponse({ error: "Passenger counts are invalid. Search for up to 9 travelers, with no more infants than adults." }, 400);
  }
  if (!Object.hasOwn(CABIN_CODES, travelClass)) {
    return jsonResponse({ error: "Choose a supported cabin class." }, 400);
  }

  const {
    FLIGHT_API_USER,
    FLIGHT_API_PASSWORD,
    FLIGHT_API_PASSWORD_PARAM = "password",
    FLIGHT_META_ID,
    FLIGHT_WEBSITE_NAME,
  } = process.env;
  if (!FLIGHT_API_USER || !FLIGHT_API_PASSWORD || !FLIGHT_META_ID || !FLIGHT_WEBSITE_NAME) {
    return jsonResponse({
      error: "Flight search is not configured. Set FLIGHT_API_USER, FLIGHT_API_PASSWORD, FLIGHT_META_ID, and FLIGHT_WEBSITE_NAME on the server.",
    }, 503);
  }
  if (!/^[A-Za-z][A-Za-z0-9_]{0,39}$/.test(FLIGHT_API_PASSWORD_PARAM)) {
    return jsonResponse({ error: "Flight API password parameter configuration is invalid." }, 500);
  }

  const params = new URLSearchParams({
    JType: tripType,
    org: origin,
    dest: destination,
    depDt: toProviderDate(departure),
    adt: String(adults),
    chd: String(children),
    inf: String(infants),
    ct: CABIN_CODES[travelClass],
    userid: FLIGHT_API_USER,
    metaId: FLIGHT_META_ID,
    website: FLIGHT_WEBSITE_NAME,
    currency: "USD",
  });
  params.set(FLIGHT_API_PASSWORD_PARAM, FLIGHT_API_PASSWORD);
  if (tripType === "roundtrip") params.set("retDt", toProviderDate(returnDate));

  try {
    const response = await fetch(`${FLIGHT_API_URL}?${params.toString()}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(55_000),
    });
    if (!response.ok) {
      return jsonResponse({ error: "The flight provider could not complete this search. Please try again later." }, 502);
    }

    let data;
    try {
      data = await response.json();
    } catch {
      return jsonResponse({ error: "The flight provider returned an unreadable response." }, 502);
    }
    if (!data || !Array.isArray(data.data)) {
      return jsonResponse({ error: "The flight provider returned an unexpected response." }, 502);
    }

    return jsonResponse({
      data: data.data,
      dictionaries: data.dictionaries || {},
      meta: data.meta || {},
    });
  } catch (error) {
    if (error?.name === "TimeoutError" || error?.name === "AbortError") {
      return jsonResponse({ error: "Flight search timed out. Please try again." }, 504);
    }
    console.error("Flight provider request failed:", error);
    return jsonResponse({ error: "Unable to reach the flight provider. Please try again later." }, 502);
  }
}
