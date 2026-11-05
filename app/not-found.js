import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-7xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-base-content/70">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Go home
        </Link>
        <Link href="/events" className="btn btn-outline btn-primary">
          Browse events
        </Link>
      </div>
    </section>
  );
}