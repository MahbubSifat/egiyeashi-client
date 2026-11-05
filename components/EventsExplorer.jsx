"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { apiFetch } from "@/lib/api";
import { EVENT_TYPES } from "@/lib/event-utils";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";

export default function EventsExplorer() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [type, setType] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ key: null, events: [], failed: false });

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const key = `${debouncedSearch}|${type}|${attempt}`;

  useEffect(() => {
    let cancelled = false;

    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (type) params.set("type", type);
    const query = params.toString();

    apiFetch(`/events${query ? `?${query}` : ""}`)
      .then((events) => {
        if (!cancelled) setResult({ key, events, failed: false });
      })
      .catch(() => {
        if (!cancelled) setResult({ key, events: [], failed: true });
      });

    return () => {
      cancelled = true;
    };
  }, [key, debouncedSearch, type]);

  const loading = result.key !== key;
  const hasFilters = Boolean(debouncedSearch || type);

  function clearFilters() {
    setSearch("");
    setDebouncedSearch("");
    setType("");
  }

  return (
    <>
      <section className="bg-base-200">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Make a difference
          </p>
          <h1 className="mt-2 text-4xl font-extrabold">Upcoming Events</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base-content/70">
            Find a community service event near you and step forward to serve
            together.
          </p>

          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
            <label className="input w-full">
              <FaMagnifyingGlass className="text-base-content/50" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by title or location"
                aria-label="Search events"
              />
            </label>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="select w-full sm:w-56"
              aria-label="Filter by event type"
            >
              <option value="">All types</option>
              {EVENT_TYPES.map((eventType) => (
                <option key={eventType} value={eventType}>
                  {eventType}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        ) : result.failed ? (
          <div className="mx-auto max-w-md rounded-box border border-base-300 bg-base-100 p-8 text-center">
            <h2 className="text-xl font-bold">Could not load events</h2>
            <p className="mt-2 text-base-content/70">
              Something went wrong while contacting the server.
            </p>
            <button
              type="button"
              onClick={() => setAttempt((count) => count + 1)}
              className="btn btn-primary mt-5"
            >
              Try again
            </button>
          </div>
        ) : result.events.length === 0 ? (
          <div className="mx-auto max-w-md rounded-box border border-base-300 bg-base-100 p-8 text-center">
            <h2 className="text-xl font-bold">No upcoming events found</h2>
            <p className="mt-2 text-base-content/70">
              {hasFilters
                ? "Try a different search or event type."
                : "Be the first to organise a service event in your area."}
            </p>
            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="btn btn-primary mt-5"
              >
                Clear filters
              </button>
            ) : (
              <Link href="/create-event" className="btn btn-primary mt-5">
                Create an event
              </Link>
            )}
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-base-content/70">
              Showing {result.events.length} upcoming{" "}
              {result.events.length === 1 ? "event" : "events"}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {result.events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}