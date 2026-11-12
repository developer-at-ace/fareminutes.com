"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AirportAutocomplete from "./AirportAutocomplete";
import { findAirport, getAirportLabel } from "./airports";
import { faqItems } from "./faqItems";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import styles from "./page.module.css";
import flightStyles from "./flights/flight.module.css";

const guides = [
  {
    city: "Tokyo",
    country: "Japan",
    category: "City guide",
    title: "First time in Tokyo: getting your bearings",
    description:
      "Neighborhoods, transit basics, local etiquette, and ideas for your first days.",
    label: "FIRST-TIMER GUIDE",
    theme: "tokyo",
    icon: "location",
    readTime: "8 min read",
    image: "/tokyo.jpg",
  },
  {
    city: "Paris",
    country: "France",
    category: "Culture & food",
    title: "A thoughtful guide to exploring Paris",
    description:
      "Plan around the sights, find your way around, and leave room for the unexpected.",
    label: "CITY BREAK",
    theme: "paris",
    icon: "compass",
    readTime: "7 min read",
    image: "/paris.jpg",
  },
  {
    city: "London",
    country: "United Kingdom",
    category: "Getting around",
    title: "Make the most of your London visit",
    description:
      "Understand the city's neighborhoods, public transport, and arrival options.",
    label: "GETTING AROUND",
    theme: "london",
    icon: "route",
    readTime: "6 min read",
    image: "/london.jpg",
  },
  {
    city: "Rome",
    country: "Italy",
    category: "History & culture",
    title: "Rome beyond the checklist",
    description:
      "A practical starting point for historic sights, local customs, and city travel.",
    label: "CULTURE GUIDE",
    theme: "rome",
    icon: "compass",
    readTime: "9 min read",
    image: "/rome.jpg",
  },
];

const planningGuides = [
  {
    title: "Understand your flight route",
    subtitle: "Airports, connections & journey time",
    copy: [
      "Compare nearby airports and transfer options",
      "Check layover time and connection details",
      "Confirm schedules directly with your provider",
    ],
    icon: "flight",
  },
  {
    title: "Get ready for departure day",
    subtitle: "A practical pre-flight checklist",
    copy: [
      "Review passport and entry requirements",
      "Check baggage rules for your fare",
      "Plan how you will reach the airport",
    ],
    icon: "checklist",
  },
  {
    title: "Arrive feeling prepared",
    subtitle: "Make a plan for your first hours",
    copy: [
      "Research airport-to-city transport",
      "Save your accommodation and arrival details",
      "Check local payment and connectivity basics",
    ],
    icon: "location",
  },
];

const serviceHighlights = [
  {
    title: "Route Research",
    copy: "Explore flight route details, airports, and typical schedules to understand travel options.",
    icon: "flight",
  },
  {
    title: "Destination Guides",
    copy: "Discover destination information, travel requirements, and planning tips for your trip.",
    icon: "location",
  },
  {
    title: "Travel Planning",
    copy: "Compare routes, understand booking requirements, and prepare for your journey.",
    icon: "checklist",
  },
  {
    title: "Free Support",
    copy: "Get help finding airline contact information and navigating booking questions—no fees.",
    icon: "help",
  },
];

const categories = [
  "All travel guides",
  "City guide",
  "Culture & food",
  "Getting around",
  "History & culture",
];

function Icon({ name, size = 18, className }) {
  const shared = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };
  const icons = {
    flight: <path d="m2 16 8-2 4-9 2 1-1 6 7 3-1 2-7-1-4 5-2-1 2-5-8 1z" />,
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    checklist: (
      <>
        <path d="M9 5h10M9 12h10M9 19h10" />
        <path d="m4 5 1 1 2-2m-3 8 1 1 2-2m-3 8 1 1 2-2" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="6" r="2" />
        <path d="M8 18h3a3 3 0 0 0 3-3v-3a3 3 0 0 1 3-3h1" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    phone: (
      <path d="M7 3H5a2 2 0 0 0-2 2 16 16 0 0 0 16 16 2 2 0 0 0 2-2v-2l-4-2-2 2a12 12 0 0 1-5-5l2-2-2-4Z" />
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-1.1.8-1.7 1.3-1.7 2.7M12 17h.01" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    ),
  };
  return <svg {...shared}>{icons[name] || icons.compass}</svg>;
}

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All travel guides");
  const [selectedGuideType, setSelectedGuideType] =
    useState("All travel guides");
  const [searchMode, setSearchMode] = useState("flights");
  const [tripType, setTripType] = useState("oneway");
  const [flightSearchError, setFlightSearchError] = useState("");
  const [airportQueries, setAirportQueries] = useState({
    origin: "",
    destination: "",
  });
  const [flightValues, setFlightValues] = useState({
    origin: "",
    destination: "",
    departure_date: "",
    return_date: "",
    travel_class: "ECONOMY",
    adults: "1",
    children: "0",
    infants: "0",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") !== "flights") return;
    setSearchMode("flights");
    setTripType(
      params.get("tripType") === "roundtrip" ? "roundtrip" : "oneway",
    );
    const origin = params.get("origin") || "";
    const destination = params.get("destination") || "";
    setAirportQueries({
      origin: findAirport(origin)
        ? getAirportLabel(findAirport(origin))
        : origin,
      destination: findAirport(destination)
        ? getAirportLabel(findAirport(destination))
        : destination,
    });
    setFlightValues((current) => ({
      ...current,
      origin: origin || current.origin,
      destination: destination || current.destination,
      departure_date: params.get("departure_date") || current.departure_date,
      return_date: params.get("return_date") || current.return_date,
      travel_class: params.get("travel_class") || current.travel_class,
      adults: params.get("adults") || current.adults,
      children: params.get("children") || current.children,
      infants: params.get("infants") || current.infants,
    }));
  }, []);

  useEffect(() => {
    if (
      searchMode !== "flights" ||
      !window.location.search.includes("mode=flights")
    )
      return;
    document
      .getElementById("flight-search")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [searchMode]);

  function updateFlightValue(event) {
    const { name, value } = event.target;
    setFlightValues((current) => ({ ...current, [name]: value }));
  }

  function updateAirportQuery(name, value) {
    setAirportQueries((current) => ({ ...current, [name]: value }));
    setFlightValues((current) =>
      current[name] ? { ...current, [name]: "" } : current,
    );
    setFlightSearchError("");
  }

  const visibleGuides = useMemo(() => {
    const search = submittedQuery.trim().toLowerCase();
    return guides.filter((guide) => {
      const matchesText =
        !search ||
        `${guide.city} ${guide.country} ${guide.category} ${guide.title} ${guide.description}`
          .toLowerCase()
          .includes(search);
      const matchesCategory =
        activeCategory === "All travel guides" ||
        guide.category === activeCategory;
      return matchesText && matchesCategory;
    });
  }, [activeCategory, submittedQuery]);

  function handleSearch(event) {
    event.preventDefault();
    setSubmittedQuery(query);
    setActiveCategory(selectedGuideType);
    document
      .getElementById("featured-guides")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleFlightSearch(event) {
    event.preventDefault();
    setFlightSearchError("");
    if (!flightValues.origin || !flightValues.destination) {
      setFlightSearchError(
        "Choose an origin and destination from the airport suggestions.",
      );
      return;
    }

    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      if (typeof value === "string" && value.trim()) {
        params.set(key, value.trim());
      }
    }

    const origin = params.get("origin")?.toUpperCase() ?? "";
    const destination = params.get("destination")?.toUpperCase() ?? "";
    if (origin === destination) {
      setFlightSearchError(
        "Origin and destination must be different airports.",
      );
      return;
    }

    params.set("origin", origin);
    params.set("destination", destination);
    params.set("tripType", tripType);
    if (tripType === "oneway") params.delete("return_date");
    router.push(`/flights?${params.toString()}`);
  }

  return (
    <div className={styles.page} id="top">
      <SiteHeader />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroArtLayer} aria-hidden="true">
            <Image
              className={styles.heroArt}
              src="/hero-section.png"
              alt=""
              width={612}
              height={407}
              priority
            />
          </div>
          <div className={styles.heroInner}>
            <div className={styles.heroHeading}>
              <h1>
                Travel research for routes, destinations, and trip planning.
              </h1>
              <p>
                FareMinutes helps travelers research routes and destinations
                with accurate, free information. We are independent and never
                charge service fees.
              </p>
            </div>
            <div
              className={flightStyles.searchModeTabs}
              role="tablist"
              aria-label="Choose a search type"
            >
              <button
                type="button"
                role="tab"
                aria-selected={searchMode === "flights"}
                className={`${flightStyles.searchModeTab} ${searchMode === "flights" ? flightStyles.searchModeTabActive : ""}`}
                onClick={() => setSearchMode("flights")}
              >
                <Icon name="flight" size={15} /> Flights
              </button>
            </div>

            {searchMode === "flights" && (
              <form
                className={`${styles.guideFinder} ${styles.flightForm}`}
                id="flight-search"
                onSubmit={handleFlightSearch}
              >
                <div
                  className={`${styles.finderField} ${flightStyles.flightField} ${flightStyles.airportField}`}
                >
                  <Icon name="flight" size={20} />
                  <span className={styles.finderCopy}>
                    <span className={styles.finderLabel}>FROM · AIRPORT</span>
                    <AirportAutocomplete
                      name="origin"
                      label="Origin airport"
                      value={flightValues.origin}
                      query={airportQueries.origin}
                      onQueryChange={(value) =>
                        updateAirportQuery("origin", value)
                      }
                      onChange={(value) =>
                        setFlightValues((current) => ({
                          ...current,
                          origin: value,
                        }))
                      }
                    />
                  </span>
                </div>
                <div
                  className={`${styles.finderField} ${flightStyles.flightField} ${flightStyles.airportField}`}
                >
                  <Icon name="location" size={20} />
                  <span className={styles.finderCopy}>
                    <span className={styles.finderLabel}>TO · AIRPORT</span>
                    <AirportAutocomplete
                      name="destination"
                      label="Destination airport"
                      value={flightValues.destination}
                      query={airportQueries.destination}
                      onQueryChange={(value) =>
                        updateAirportQuery("destination", value)
                      }
                      onChange={(value) =>
                        setFlightValues((current) => ({
                          ...current,
                          destination: value,
                        }))
                      }
                    />
                  </span>
                </div>
                <label
                  className={`${styles.finderField} ${flightStyles.flightField}`}
                >
                  <span className={flightStyles.flightFieldText}>
                    <span className={styles.finderLabel}>DEPARTURE</span>
                    <input
                      aria-label="Departure date"
                      name="departure_date"
                      type="date"
                      min={new Date().toISOString().slice(0, 10)}
                      value={flightValues.departure_date}
                      onChange={updateFlightValue}
                      required
                    />
                  </span>
                </label>
                {tripType === "roundtrip" && (
                  <label
                    className={`${styles.finderField} ${flightStyles.flightField}`}
                  >
                    <span className={flightStyles.flightFieldText}>
                      <span className={styles.finderLabel}>RETURN</span>
                      <input
                        aria-label="Return date"
                        name="return_date"
                        type="date"
                        min={
                          flightValues.departure_date ||
                          new Date().toISOString().slice(0, 10)
                        }
                        value={flightValues.return_date}
                        onChange={updateFlightValue}
                        required
                      />
                    </span>
                  </label>
                )}
                <div className={flightStyles.flightOptions}>
                  <label className={flightStyles.flightSelectField}>
                    <span className={styles.finderLabel}>TRIP</span>
                    <select
                      aria-label="Trip type"
                      value={tripType}
                      onChange={(event) => setTripType(event.target.value)}
                    >
                      <option value="oneway">One way</option>
                      <option value="roundtrip">Round trip</option>
                    </select>
                  </label>
                  <label className={flightStyles.flightSelectField}>
                    <span className={styles.finderLabel}>CABIN</span>
                    <select
                      aria-label="Travel class"
                      name="travel_class"
                      value={flightValues.travel_class}
                      onChange={updateFlightValue}
                    >
                      <option value="ECONOMY">Economy</option>
                      <option value="PREMIUM_ECONOMY">Premium economy</option>
                      <option value="BUSINESS">Business</option>
                      <option value="FIRST">First class</option>
                    </select>
                  </label>
                  <label className={flightStyles.flightSelectField}>
                    <span className={styles.finderLabel}>ADULTS</span>
                    <select
                      aria-label="Adults"
                      name="adults"
                      value={flightValues.adults}
                      onChange={updateFlightValue}
                    >
                      {Array.from({ length: 9 }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={flightStyles.flightSelectField}>
                    <span className={styles.finderLabel}>CHILDREN</span>
                    <select
                      aria-label="Children"
                      name="children"
                      value={flightValues.children}
                      onChange={updateFlightValue}
                    >
                      {Array.from({ length: 9 }, (_, index) => (
                        <option key={index} value={index}>
                          {index}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={flightStyles.flightSelectField}>
                    <span className={styles.finderLabel}>INFANTS</span>
                    <select
                      aria-label="Infants"
                      name="infants"
                      value={flightValues.infants}
                      onChange={updateFlightValue}
                    >
                      {Array.from({ length: 9 }, (_, index) => (
                        <option key={index} value={index}>
                          {index}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className={flightStyles.flightSubmitWrap}>
                  <button className={styles.searchButton} type="submit">
                    <Icon name="flight" size={17} /> Search flights
                  </button>
                </div>
                {flightSearchError && (
                  <p className={flightStyles.flightFormError} role="alert">
                    {flightSearchError}
                  </p>
                )}
              </form>
            )}
            {searchMode === "guides" && (
              <div className={styles.quickLinks}>
                <span>Start with:</span>
                <a href="#destinations">Destination guides</a>
                <a href="#route-research">Flight route research</a>
                <a href="#planning">Planning tips</a>
              </div>
            )}
          </div>
        </section>

        <section className={styles.offersSection} id="services">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionTitleWrap}>
                <h2>What We Offer</h2>
              </div>
              <p>
                Helpful travel information for researching routes, destinations,
                and trip details before booking.
              </p>
            </div>
          </div>
          <div className={styles.offerGrid}>
            {serviceHighlights.map((item) => (
              <article key={item.title} className={styles.offerCard}>
                <span className={styles.offerIcon}>
                  <Icon name={item.icon} size={20} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <nav className={styles.categoryRow} aria-label="Filter travel guides">
          {categories.map((category, index) => (
            <button
              type="button"
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setSelectedGuideType(category);
              }}
              className={`${styles.categoryChip} ${activeCategory === category ? styles.categoryChipActive : ""}`}
            >
              <Icon
                name={
                  index === 0
                    ? "compass"
                    : index === 1
                      ? "location"
                      : index === 2
                        ? "flight"
                        : index === 3
                          ? "checklist"
                          : "route"
                }
                size={14}
              />
              {category}
            </button>
          ))}
        </nav>

        <section className={styles.section} id="featured-guides">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionTitleWrap}>
                <h2>Featured travel guides</h2>
              </div>
              <p>
                Practical destination notes and ideas to help you plan a trip of
                your own.
              </p>
            </div>
            <span className={styles.guideCount}>
              {visibleGuides.length} guides
            </span>
          </div>
          <div className={styles.guideGrid}>
            {visibleGuides.length ? (
              visibleGuides.map((guide) => (
                <article className={styles.guideCard} key={guide.city}>
                  <div
                    className={`${styles.guideArt} ${styles[guide.theme]}`}
                    aria-hidden="true"
                  >
                    <img
                      className={styles.guideImage}
                      src={guide.image}
                      alt=""
                      loading="lazy"
                    />
                    <span className={styles.artCountry}>{guide.country}</span>
                    <div className={styles.artCity}>{guide.city}</div>
                    <span className={styles.artCaption}>
                      <Icon name={guide.icon} size={12} /> {guide.label}
                    </span>
                  </div>
                  <div className={styles.guideCardBody}>
                    <div className={styles.guideMeta}>
                      <span>{guide.category}</span>
                      <span>{guide.readTime}</span>
                    </div>
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                    <a className={styles.readLink} href="#planning">
                      Explore guide <Icon name="arrow" size={14} />
                    </a>
                  </div>
                </article>
              ))
            ) : (
              <div className={styles.emptyState}>
                <Icon name="compass" size={22} />
                <strong>No guides found</strong>
                <span>Try a destination or another travel topic.</span>
              </div>
            )}
          </div>
        </section>

        <section className={styles.section} id="route-research">
          <div className={styles.sectionHeader}>
            <div>
              <h2>Flight route research</h2>
              <p>Know what to compare before choosing how to get there.</p>
            </div>
            <span className={styles.sectionHint}>
              Schedules and fares can change
            </span>
          </div>
          <div className={styles.planningGrid}>
            {planningGuides.map((guide) => (
              <article
                className={styles.planningCard}
                id={
                  guide.title === "Get ready for departure day"
                    ? "planning"
                    : undefined
                }
                key={guide.title}
              >
                <div className={styles.planningTop}>
                  <span className={styles.planningIcon}>
                    <Icon name={guide.icon} size={19} />
                  </span>
                  <span className={styles.planningTag}>TRAVEL NOTES</span>
                </div>
                <h3>{guide.title}</h3>
                <p className={styles.planningSubtitle}>{guide.subtitle}</p>
                <ul>
                  {guide.copy.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#about" className={styles.planningLink}>
                  Read planning tips <Icon name="arrow" size={14} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.trustSection}>
          <article>
            <span className={styles.trustIcon}>
              <Icon name="location" size={19} />
            </span>
            <div>
              <h3>Destination guides</h3>
              <p>
                Discover local basics, travel seasons, and ideas for your
                itinerary.
              </p>
            </div>
          </article>
          <article>
            <span className={styles.trustIcon}>
              <Icon name="route" size={19} />
            </span>
            <div>
              <h3>Route research</h3>
              <p>Review airports, connections, and typical journey details.</p>
            </div>
          </article>
          <article>
            <span className={styles.trustIcon}>
              <Icon name="checklist" size={19} />
            </span>
            <div>
              <h3>Trip preparation</h3>
              <p>Find reminders for travel documents, baggage, and arrival.</p>
            </div>
          </article>
          <article>
            <span className={styles.trustIcon}>
              <Icon name="help" size={19} />
            </span>
            <div>
              <h3>Clear and independent</h3>
              <p>General guidance to help you research before booking.</p>
            </div>
          </article>
        </section>

        <section className={styles.aboutSection} id="about">
          <div className={styles.aboutHeading}>
            <span>ABOUT FAREMINUTES</span>
            <h2>Independent travel information.</h2>
            <p>
              FareMinutes is a free platform built to help travelers research
              routes and destinations. We work independently, without
              affiliation to any airline or travel provider.
            </p>
            <Link className={styles.aboutDisclaimerLink} href="/disclaimer">
              Read our full disclaimer
            </Link>
          </div>
          <div className={styles.aboutNotes}>
            <div>
              <span>01</span>
              <p>
                <strong>We share general travel information.</strong> Use our
                guides to research destinations and routes at your own pace.
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                <strong>We are not an airline or booking provider.</strong>{" "}
                Tickets, reservations, and provider services are managed by the
                relevant company.
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                <strong>Check current details before you go.</strong> Flight
                schedules, fares, entry rules, and requirements can change.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.faqSection} id="faqs">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionTitleWrap}>
                <h2>Frequently asked questions</h2>
              </div>
              <p>
                Helpful answers for common questions about FareMinutes and trip
                planning.
              </p>
            </div>
          </div>
          <div className={styles.faqList}>
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                className={styles.faqItem}
                open={index === 0}
              >
                <summary>{item.question}</summary>
                <div className={styles.faqAnswer}>
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
          <p className={styles.operatorNote}>
            FareMinutes is operated by E-TECH LLC.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
