import Link from "next/link";
import { FaArrowRight, FaCalendarDays, FaLocationDot } from "react-icons/fa6";
import { formatEventDate } from "@/lib/event-utils";
import EventImage from "./EventImage";

export default function EventCard({ event, ended = false }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <EventImage
          src={event.thumbnail}
          alt={event.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="badge badge-secondary absolute left-3 top-3 font-semibold">
          {event.eventType}
        </span>
        {ended && (
          <span className="badge badge-neutral absolute right-3 top-3 font-semibold">
            Ended
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 min-h-[3.2rem] text-lg font-bold leading-snug">
          {event.title}
        </h3>

        <ul className="space-y-2 text-sm text-base-content/70">
          <li className="flex items-start gap-2">
            <FaCalendarDays className="mt-0.5 shrink-0 text-primary" />
            {formatEventDate(event.eventDate)}
          </li>
          <li className="flex items-start gap-2">
            <FaLocationDot className="mt-0.5 shrink-0 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </li>
        </ul>

        <Link
          href={`/events/${event._id}`}
          className="btn btn-primary mt-auto w-full"
        >
          View Event
          <FaArrowRight />
        </Link>
      </div>
    </article>
  );
}