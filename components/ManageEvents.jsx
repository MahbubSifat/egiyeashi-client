"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaEye, FaPenToSquare, FaPlus, FaTrashCan } from "react-icons/fa6";
import { apiFetch } from "@/lib/api";
import { formatEventDate, todayInDhaka } from "@/lib/event-utils";
import EventForm from "./EventForm";
import EventImage from "./EventImage";
import Modal from "./Modal";

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="skeleton h-20 w-full" />
      ))}
    </div>
  );
}

export default function ManageEvents() {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ attempt: null, events: [], failed: false });
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    apiFetch("/my-events", { auth: true })
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

  async function handleUpdate(values) {
    await apiFetch(`/events/${editing._id}`, {
      method: "PUT",
      body: values,
      auth: true,
    });

    setResult((previous) => ({
      ...previous,
      events: previous.events
        .map((item) => (item._id === editing._id ? { ...item, ...values } : item))
        .sort((a, b) => a.eventDate.localeCompare(b.eventDate)),
    }));
    setEditing(null);
    toast.success("Event updated successfully!");
  }

  async function handleDelete() {
    setDeleteLoading(true);
    try {
      await apiFetch(`/events/${deleting._id}`, { method: "DELETE", auth: true });
      setResult((previous) => ({
        ...previous,
        events: previous.events.filter((item) => item._id !== deleting._id),
      }));
      setDeleting(null);
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error(error.message || "Could not delete this event");
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Your events
          </p>
          <h1 className="mt-1 text-3xl font-extrabold">Manage Events</h1>
          <p className="mt-2 text-base-content/70">
            Update or delete the events you have created.
          </p>
        </div>
        <Link href="/create-event" className="btn btn-primary">
          <FaPlus />
          Create event
        </Link>
      </div>

      <div className="mt-8">
        {loading ? (
          <TableSkeleton />
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
            <h2 className="text-xl font-bold">You have not created any event yet</h2>
            <p className="mt-2 text-base-content/70">
              Organise your first service event and invite volunteers.
            </p>
            <Link href="/create-event" className="btn btn-primary mt-5">
              Create an event
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
            <table className="table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {result.events.map((event) => (
                  <tr key={event._id}>
                    <td>
                      <div className="flex min-w-60 items-center gap-3">
                        <EventImage
                          src={event.thumbnail}
                          alt={event.title}
                          className="h-12 w-16 shrink-0 rounded-md object-cover"
                        />
                        <span className="line-clamp-2 font-semibold">
                          {event.title}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-primary badge-soft whitespace-nowrap">
                        {event.eventType}
                      </span>
                    </td>
                    <td className="whitespace-nowrap">
                      {formatEventDate(event.eventDate)}
                      {event.eventDate < today && (
                        <span className="badge badge-neutral badge-sm ml-2">
                          Ended
                        </span>
                      )}
                    </td>
                    <td>
                      <span className="line-clamp-2 min-w-32">{event.location}</span>
                    </td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/events/${event._id}`}
                          className="btn btn-ghost btn-sm"
                          aria-label={`View ${event.title}`}
                        >
                          <FaEye />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setEditing(event)}
                          className="btn btn-outline btn-primary btn-sm"
                        >
                          <FaPenToSquare />
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleting(event)}
                          className="btn btn-outline btn-error btn-sm"
                        >
                          <FaTrashCan />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title="Update event"
        wide
      >
        {editing && (
          <EventForm
            key={editing._id}
            initialValues={editing}
            keepDate={editing.eventDate}
            submitLabel="Save changes"
            onSubmit={handleUpdate}
          />
        )}
      </Modal>

      <Modal
        open={Boolean(deleting)}
        onClose={() => (deleteLoading ? null : setDeleting(null))}
        title="Delete this event?"
      >
        {deleting && (
          <>
            <p className="text-base-content/80">
              You are about to delete{" "}
              <span className="font-semibold">{deleting.title}</span>. Everyone
              who joined it will lose their registration. This cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleting(null)}
                disabled={deleteLoading}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteLoading}
                className="btn btn-error"
              >
                {deleteLoading && (
                  <span className="loading loading-spinner loading-sm" />
                )}
                Yes, delete
              </button>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}