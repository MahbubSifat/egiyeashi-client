import PrivateRoute from "@/components/PrivateRoute";

export const metadata = { title: "Create Event" };

export default function CreateEventPage() {
  return (
    <PrivateRoute>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-extrabold">Create Event</h1>
        <p className="mt-2 text-base-content/70">
          You are logged in. The event form is added in the next phase.
        </p>
      </section>
    </PrivateRoute>
  );
}