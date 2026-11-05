"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FaCalendarDays,
  FaCircleCheck,
  FaLocationDot,
  FaUser,
  FaUsers,
} from "react-icons/fa6";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { formatEventDate, todayInDhaka } from "@/lib/event-utils";
import EventImage from "./EventImage";

function DetailsSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div className="skeleton aspect-[16/9] w-full" />
        <div className="skeleton h-8 w-2/3" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
      </div>
      <div className="skeleton h-72 w-full" />
    </div>
  );
}

export default function EventDetails({ id }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const userEmail = user?.email;

  const [eventState, setEventState] = useState({ id: null, event: null, error: null });
  const [joinedState, setJoinedState] = useState({ id: null, email: null, value: false });
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    let cancelled = false;

    apiFetch(`/events/${id}`)
      .then((event) => {
        if (!cancelled) setEventState({ id, event, error: null });
      })
      .catch((error) => {
        if (cancelled) return;
        const notFound = error.status === 404 || error.status === 400;
        setEventState({ id, event: null, error: notFound ? "notfound" : "failed" });
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!userEmail) return;
    let cancelled = false;

    apiFetch(`/events/${id}/joined`, { auth: true })
      .then((data) => {
        if (!cancelled) {
          setJoinedState({ id, email: userEmail, value: data.joined });
        }
      })
      .catch(() => {
        // join status is optional, the join button still works
      });

    return () => {
      cancelled = true;
    };
  }, [id, userEmail]);

  const hasJoined =
    Boolean(userEmail) &&
    joinedState.id === id &&
    joinedState.email === userEmail &&
    joinedState.value;

  async function handleJoin() {
    if (!user) {
      toast.error("Please login to join this event", { id: "login-required" });
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    setJoining(true);
    try {
      await apiFetch(`/events/${id}/join`, { method: "POST", auth: true });
      toast.success("You have joined this event. Thank you for stepping forward!");
      setJoinedState({ id, email: user.email, value: true });
      setEventState((previous) => ({
        ...previous,
        event: {
          ...previous.event,
          joinedCount: (previous.event.joinedCount ?? 0) + 1,
        },
      }));
    } catch (error) {
      if (error.status === 409) {
        setJoinedState({ id, email: user.email, value: true });
      }
      toast.error(error.message || "Could not join this event");
    } finally {
      setJoining(false);
    }
  }

  if (eventState.id !== id) {
    return <DetailsSkeleton />;
  }

  if (eventState.error) {
    return (
      <section className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold">
          {eventState.error === "notfound" ? "Event not found" : "Could not load event"}
        </h1>
        <p className="mt-3 text-base-content/70">
          {eventState.error === "notfound"
            ? "This event may have been removed or the link is incorrect."
            : "Something went wrong while contacting the server."}
        </p>
        <Link href="/events" className="btn btn-primary mt-6">
          Browse upcoming events
        </Link>
      </section>
    );
  }

  const { event } = eventState;
  const ended = event.eventDate < todayInDhaka();

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="overflow-hidden rounded-box border border-base-300">
          <EventImage
            src={event.thumbnail}
            alt={event.title}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="badge badge-primary badge-soft font-semibold">
            {event.eventType}
          </span>
          {ended && <span className="badge badge-neutral">Event ended</span>}
        </div>

        <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
          {event.title}
        </h1>

        <h2 className="mt-8 text-xl font-bold">About this event</h2>
        <p className="mt-3 whitespace-pre-line leading-relaxed text-base-content/80">
          {event.description}
        </p>
      </div>

      <aside className="h-fit rounded-box border border-base-300 bg-base-100 p-6 shadow-sm lg:sticky lg:top-24">
        <h2 className="text-lg font-bold">Event details</h2>

        <ul className="mt-5 space-y-4 text-sm">
          <li className="flex items-start gap-3">
            <FaCalendarDays className="mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold">Date</p>
              <p className="text-base-content/70">{formatEventDate(event.eventDate)}</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <FaLocationDot className="mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-base-content/70">{event.location}</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <FaUser className="mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold">Organised by</p>
              <p className="text-base-content/70">{event.creatorName}</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <FaUsers className="mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold">Volunteers joined</p>
              <p className="text-base-content/70">{event.joinedCount ?? 0}</p>
            </div>
          </li>
        </ul>

        {ended ? (
          <button type="button" disabled className="btn mt-6 w-full">
            This event has ended
          </button>
        ) : hasJoined ? (
          <button type="button" disabled className="btn btn-success mt-6 w-full">
            <FaCircleCheck />
            You have joined
          </button>
        ) : (
          <button
            type="button"
            onClick={handleJoin}
            disabled={joining || isPending}
            className="btn btn-primary mt-6 w-full"
          >
            {joining && <span className="loading loading-spinner loading-sm" />}
            Join Event
          </button>
        )}

        {!user && !isPending && !ended && (
          <p className="mt-3 text-center text-xs text-base-content/60">
            You need to login to join this event.
          </p>
        )}
      </aside>
    </section>
  );
}