"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { airports, getAirportLabel } from "./airports";
import styles from "./flights/flight.module.css";

function normalize(value) {
  return value.trim().toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function AirportAutocomplete({
  name,
  label,
  value,
  onChange,
  query,
  onQueryChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const blurTimer = useRef(null);
  const listId = `${name}-airport-options`;
  const suggestions = useMemo(() => {
    const term = normalize(query);
    if (!term) return airports.slice(0, 8);

    return airports
      .filter((airport) => normalize(`${airport.city} ${airport.name} ${airport.country} ${airport.code}`).includes(term))
      .sort((left, right) => {
        const leftMatch = normalize(`${left.city} ${left.code}`).startsWith(term);
        const rightMatch = normalize(`${right.city} ${right.code}`).startsWith(term);
        return Number(rightMatch) - Number(leftMatch);
      })
      .slice(0, 8);
  }, [query]);
  const options = suggestions.length
    ? suggestions
    : /^[A-Za-z]{3}$/.test(query.trim())
      ? [{ code: query.trim().toUpperCase(), city: `Use airport code ${query.trim().toUpperCase()}`, name: "Search directly by airport code", country: "" }]
      : [];

  useEffect(() => () => clearTimeout(blurTimer.current), []);

  function chooseAirport(airport) {
    clearTimeout(blurTimer.current);
    onQueryChange(airport.country ? getAirportLabel(airport) : airport.code);
    onChange(airport.code);
    setIsOpen(false);
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => isOpen ? (index + 1) % Math.max(suggestions.length, 1) : 0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => isOpen ? (index - 1 + Math.max(suggestions.length, 1)) % Math.max(suggestions.length, 1) : Math.max(suggestions.length - 1, 0));
    } else if (event.key === "Enter" && isOpen && options.length) {
      event.preventDefault();
      chooseAirport(options[activeIndex]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div className={`${styles.airportAutocomplete} ${name === "destination" ? styles.destinationAutocomplete : ""}`}>
      <input type="hidden" name={name} value={value} />
      <label className={styles.airportAccessibleLabel} htmlFor={`${name}-airport-input`}>{label}</label>
      <input
        id={`${name}-airport-input`}
        className={styles.airportInput}
        type="text"
        role="combobox"
        aria-label={label}
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-activedescendant={isOpen && options.length ? `${name}-airport-option-${activeIndex}` : undefined}
        autoComplete="off"
        placeholder="City, airport or code"
        value={query}
        onFocus={() => {
          clearTimeout(blurTimer.current);
          setIsOpen(true);
        }}
        onBlur={() => {
          blurTimer.current = setTimeout(() => setIsOpen(false), 150);
        }}
        onKeyDown={handleKeyDown}
        onChange={(event) => {
          onQueryChange(event.target.value);
          if (value) onChange("");
          setActiveIndex(0);
          setIsOpen(true);
        }}
      />
      {isOpen && (
        <div className={styles.airportSuggestions} id={listId} role="listbox" aria-label={`${label} suggestions`}>
          {options.length ? options.map((airport, index) => (
            <button
              className={`${styles.airportSuggestion} ${index === activeIndex ? styles.airportSuggestionActive : ""}`}
              id={`${name}-airport-option-${index}`}
              key={airport.code}
              type="button"
              role="option"
              aria-selected={value === airport.code}
              onClick={() => chooseAirport(airport)}
            >
              <span className={styles.airportSuggestionCopy}>
                <strong>{airport.city}{airport.country ? `, ${airport.country}` : ""}</strong>
                <small>{airport.name}</small>
              </span>
              <span className={styles.airportCode}>{airport.code}</span>
            </button>
          )) : (
            <p className={styles.airportNoResults}>No airports found. Try a city or 3-letter code.</p>
          )}
        </div>
      )}
    </div>
  );
}
