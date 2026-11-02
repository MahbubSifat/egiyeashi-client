export default function HomePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 text-center">
      <h1 className="text-4xl font-extrabold md:text-5xl">
        Step Forward. Serve Together.
      </h1>
      <p className="mt-4 text-base-content/70">
        Create, join and track social service events in your area.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" className="btn btn-primary">
          Primary
        </button>
        <button type="button" className="btn btn-secondary">
          Secondary
        </button>
        <button type="button" className="btn btn-outline btn-primary">
          Outline
        </button>
      </div>
    </section>
  );
}