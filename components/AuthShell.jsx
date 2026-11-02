import { FaCircleCheck } from "react-icons/fa6";

const highlights = [
  "Create events for your own neighbourhood",
  "Join service events with one click",
  "Keep track of every event you joined",
];

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <div className="grid overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-xl lg:grid-cols-2">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-content lg:flex">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-secondary/30" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-primary-content/10" />

          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
              EgiyeAshi
            </p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight">
              Step forward.
              <br />
              Serve together.
            </h2>
          </div>

          <ul className="relative space-y-4">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <FaCircleCheck className="mt-1 shrink-0 text-secondary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 sm:p-10">
          <h1 className="text-3xl font-extrabold">{title}</h1>
          <p className="mt-2 text-base-content/70">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-base-content/70">
            {footer}
          </div>
        </div>
      </div>
    </section>
  );
}