"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteHeader from "../SiteHeader";
import flightStyles from "./flight.module.css";
import styles from "../page.module.css";

function Icon({ name, size = 18 }) {
  const shared = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  const icons = {
    flight: <path d="m2 16 8-2 4-9 2 1-1 6 7 3-1 2-7-1-4 5-2-1 2-5-8 1z" />,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  };
  return <svg {...shared}>{icons[name] || icons.flight}</svg>;
}

function formatTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(date);
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }).format(date);
}

function formatDuration(segments, fallback) {
  const duration = segments?.length
    ? (new Date(segments[segments.length - 1]?.arrival?.at) - new Date(segments[0]?.departure?.at)) / 60000
    : NaN;
  if (Number.isFinite(duration) && duration > 0) {
    const hours = Math.floor(duration / 60);
    const minutes = Math.round(duration % 60);
    return `${hours}h ${minutes}m`;
  }
  if (typeof fallback === "string") {
    const match = fallback.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/);
    if (match) return `${match[1] || 0}h ${match[2] || 0}m`;
  }
  return "Duration unavailable";
}

function formatPrice(value, currency) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "Price unavailable";
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "USD" }).format(amount);
  } catch {
    return `${currency || "USD"} ${amount.toFixed(2)}`;
  }
}

function getAirport(segment, type) {
  return segment?.[type]?.iataCode || "—";
}

function Itinerary({ itinerary, index, carriers }) {
  const segments = Array.isArray(itinerary?.segments) ? itinerary.segments : [];
  const first = segments[0];
  const last = segments[segments.length - 1];
  const flightCount = segments.length;
  const stops = Math.max(0, flightCount - 1);
  const carrierCode = first?.carrierCode;
  const carrierName = carriers?.[carrierCode] || carrierCode || "Airline";
  const title = index === 0 ? "Outbound" : "Return";

  if (!first || !last) {
    return <p className={flightStyles.itineraryError}>Itinerary details are unavailable for this offer.</p>;
  }

  return (
    <section className={flightStyles.itinerary}>
      <div className={flightStyles.itineraryHeading}>
        <strong>{title}</strong>
        <span>{carrierName}{first.number ? ` · ${carrierCode} ${first.number}` : ""}</span>
      </div>
      <div className={flightStyles.itineraryRoute}>
        <div className={flightStyles.airport}>
          <strong>{formatTime(first.departure?.at)}</strong>
          <span>{getAirport(first, "departure")}</span>
        </div>
        <div className={flightStyles.routeDuration}>
          <span>{formatDuration(segments, itinerary.duration)}</span>
          <span className={flightStyles.routeLine}><i /></span>
          <span>{stops === 0 ? "Nonstop" : `${stops} stop${stops > 1 ? "s" : ""}`}</span>
        </div>
        <div className={`${flightStyles.airport} ${flightStyles.airportEnd}`}>
          <strong>{formatTime(last.arrival?.at)}</strong>
          <span>{getAirport(last, "arrival")}</span>
        </div>
      </div>
      {stops > 0 && (
        <div className={flightStyles.connections}>
          {segments.slice(0, -1).map((segment, segmentIndex) => (
            <span key={`${segment?.id || segment?.number || "leg"}-${segmentIndex}`}>
              Change planes at {getAirport(segment, "arrival")}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

export default function FlightResultsPage() {
  const [results, setResults] = useState([]);
  const [carriers, setCarriers] = useState({});
  const [search, setSearch] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const searchParams = new URLSearchParams(window.location.search);
    const requestUrl = `/api/flights${window.location.search}`;

    setSearch({
      origin: searchParams.get("origin") || "",
      destination: searchParams.get("destination") || "",
      departure: searchParams.get("departure_date") || "",
      returnDate: searchParams.get("return_date") || "",
      tripType: searchParams.get("tripType") || "oneway",
      adults: searchParams.get("adults") || "1",
      children: searchParams.get("children") || "0",
      infants: searchParams.get("infants") || "0",
      travelClass: searchParams.get("travel_class") || "ECONOMY",
    });

    fetch(requestUrl, { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error || "Flight search failed.");
        return body;
      })
      .then((body) => {
        setResults(Array.isArray(body.data) ? body.data : []);
        setCarriers(body.dictionaries?.carriers || {});
        setStatus("done");
      })
      .catch((fetchError) => {
        if (fetchError.name === "AbortError") return;
        setError(fetchError.message || "Unable to load flight results. Please try again.");
        setStatus("error");
      });

    return () => controller.abort();
  }, []);

  const cabinName = search?.travelClass?.toLowerCase().replaceAll("_", " ");
  const passengerCount = search
    ? Number(search.adults) + Number(search.children) + Number(search.infants)
    : 0;
  const editSearchHref = search
    ? `/?mode=flights&${new URLSearchParams({
        origin: search.origin,
        destination: search.destination,
        departure_date: search.departure,
        return_date: search.returnDate,
        tripType: search.tripType,
        adults: search.adults,
        children: search.children,
        infants: search.infants,
        travel_class: search.travelClass,
      }).toString()}#flight-search`
    : "/?mode=flights#flight-search";

  return (
    <div className={styles.page}>
      <SiteHeader variant="flight" />

      <main className={flightStyles.resultsMain}>
        <div className={flightStyles.resultsShell}>
          <div className={flightStyles.resultsTop}>
            <div>
              <span className={flightStyles.resultsEyebrow}>FLIGHT SEARCH</span>
              <h1>{search ? `${search.origin} to ${search.destination}` : "Flight results"}</h1>
              {search && <p>{formatDate(search.departure)}{search.tripType === "roundtrip" && search.returnDate ? ` · Return ${formatDate(search.returnDate)}` : ""} · {passengerCount} traveler{passengerCount === 1 ? "" : "s"} · {cabinName}</p>}
            </div>
            <Link className={flightStyles.editSearch} href={editSearchHref}><Icon name="search" size={15} /> Change search</Link>
          </div>

          {status === "loading" && (
            <div className={flightStyles.stateCard} role="status"><span className={flightStyles.loader} /><strong>Searching available flights</strong><p>This may take a few moments.</p></div>
          )}

          {status === "error" && (
            <div className={`${flightStyles.stateCard} ${flightStyles.errorState}`} role="alert">
              <strong>We couldn’t load flight results.</strong>
              <p>{error}</p>
              <Link className={flightStyles.primaryButton} href={editSearchHref}>Update search</Link>
            </div>
          )}

          {status === "done" && results.length === 0 && (
            <div className={flightStyles.stateCard}>
              <strong>No flights found for this search.</strong>
              <p>Try different dates or nearby airports.</p>
              <Link className={flightStyles.primaryButton} href={editSearchHref}>Change search</Link>
            </div>
          )}

          {status === "done" && results.length > 0 && (
            <div className={flightStyles.resultsList}>
              <div className={flightStyles.resultsCount}>{results.length} flight option{results.length === 1 ? "" : "s"}</div>
              {results.map((offer, offerIndex) => {
                const itineraries = Array.isArray(offer?.itineraries) ? offer.itineraries : [];
                const currency = offer?.price?.currency || "USD";
                const total = offer?.price?.grandTotal || offer?.price?.total;
                return (
                  <article className={flightStyles.resultCard} key={`${offer?.id || "offer"}-${offerIndex}`}>
                    <div className={flightStyles.resultDetails}>
                      {itineraries.map((itinerary, itineraryIndex) => (
                        <Itinerary key={`${offer?.id || offerIndex}-${itineraryIndex}`} itinerary={itinerary} index={itineraryIndex} carriers={carriers} />
                      ))}
                    </div>
                    <aside className={flightStyles.pricePanel}>
                      <span className={flightStyles.priceLabel}>TOTAL PRICE</span>
                      <strong>{formatPrice(total, currency)}</strong>
                      <span className={flightStyles.priceNote}>for {passengerCount} traveler{passengerCount === 1 ? "" : "s"} · {currency}</span>
                      {offer?.numberOfBookableSeats && <span className={flightStyles.seatNote}>{offer.numberOfBookableSeats} seats available</span>}
                    </aside>
                  </article>
                );
              })}
            </div>
          )}

          <p className={flightStyles.disclaimer}>Flight times, fares, availability, baggage, and fare conditions may change. Review the current details with the provider before booking.</p>
        </div>
      </main>
    </div>
  );
}
