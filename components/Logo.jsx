import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="EgiyeAshi home"
    >
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
        <circle cx="20" cy="20" r="20" className="fill-primary" />
        <path
          d="M13 20h13m0 0-5-5m5 5-5 5"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-primary-content"
        />
      </svg>
      <span className="text-xl font-extrabold tracking-tight text-base-content">
        Egiye<span className="text-primary">Ashi</span>
      </span>
    </Link>
  );
}