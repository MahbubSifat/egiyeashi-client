"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { todayInDhaka } from "@/lib/event-utils";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";

export default function JoinedEvents() {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ attempt: null, events: [], failed: false });

  useEffect(() => {
    let cancelled = false;

    apiFetch("/joined-events", { auth: true })
      .then((events) => {
        if (!cancelled) setResult({ attempt, events, failed: false });
      })
      .catch(() => {
        if (!cancelled) setResult({ attempt, events: [], failed: true });
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const loading = result.attempt !== attempt;
  const today = todayInDhaka();

  return (
    <>
      <section className="bg-base-200">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Your journey
          </p>
          <h1 className="mt-2 text-4xl font-extrabold">Joined Events</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base-content/70">
            Every event you have stepped forward for, sorted by event date.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        ) : result.failed ? (
          <div className="mx-auto max-w-md rounded-box border border-base-300 bg-base-100 p-8 text-center">
            <h2 className="text-xl font-bold">Could not load your events</h2>
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
            <h2 className="text-xl font-bold">You have not joined any event yet</h2>
            <p className="mt-2 text-base-content/70">
              Browse upcoming events and join one that matters to you.
            </p>
            <Link href="/events" className="btn btn-primary mt-5">
              Browse upcoming events
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-base-content/70">
              You have joined {result.events.length}{" "}
              {result.events.length === 1 ? "event" : "events"}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {result.events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  ended={event.eventDate < today}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}