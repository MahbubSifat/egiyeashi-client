"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import EventForm from "./EventForm";

export default function CreateEvent() {
  const router = useRouter();

  async function handleCreate(values) {
    await apiFetch("/events", { method: "POST", body: values, auth: true });
    toast.success("Event created successfully!");
    router.push("/events");
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Organise
      </p>
      <h1 className="mt-1 text-3xl font-extrabold">Create a new event</h1>
      <p className="mt-2 text-base-content/70">
        Share a community service event and invite others to join.
      </p>

      <div className="mt-8 rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        <EventForm submitLabel="Create Event" onSubmit={handleCreate} />
      </div>
    </section>
  );
}