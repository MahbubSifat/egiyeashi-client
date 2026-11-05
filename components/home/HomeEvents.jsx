"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { apiFetch } from "@/lib/api";
import EventCard from "../EventCard";
import EventCardSkeleton from "../EventCardSkeleton";
import SectionHeading from "./SectionHeading";

export default function HomeEvents() {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ attempt: null, events: [], failed: false });

  useEffect(() => {
    let cancelled = false;

    apiFetch("/events?limit=6")
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

  return (
    <section className="bg-base-200">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          eyebrow="Happening soon"
          title="Recent upcoming events"
          text="Pick an event near you and step forward. Every hand makes a difference."
        />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        ) : result.failed ? (
          <div className="mx-auto max-w-md rounded-box border border-base-300 bg-base-100 p-8 text-center">
            <h3 className="text-xl font-bold">Could not load events</h3>
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
            <h3 className="text-xl font-bold">No upcoming events yet</h3>
            <p className="mt-2 text-base-content/70">
              Be the first to organise a service event in your area.
            </p>
            <Link href="/create-event" className="btn btn-primary mt-5">
              Create an event
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {result.events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/events" className="btn btn-outline btn-primary">
                View all events
                <FaArrowRight />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}