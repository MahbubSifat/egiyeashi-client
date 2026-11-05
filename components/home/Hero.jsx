import Link from "next/link";
import {
  FaArrowRight,
  FaCalendarPlus,
  FaClipboardCheck,
  FaHandHoldingHeart,
} from "react-icons/fa6";

const steps = [
  { title: "Create", text: "Organise an event", Icon: FaCalendarPlus, height: "h-40" },
  { title: "Join", text: "Step forward", Icon: FaHandHoldingHeart, height: "h-52" },
  { title: "Track", text: "See your impact", Icon: FaClipboardCheck, height: "h-64" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-base-200">
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="badge badge-primary badge-soft px-4 py-3 font-semibold">
            Community service, together
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Step forward.
            <br />
            <span className="text-primary">Serve together.</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-base-content/70">
            EgiyeAshi helps neighbours organise and join community service
            events, from winter clothes distribution to tree plantation, right
            in their own area.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className="btn btn-primary btn-lg">
              Browse Upcoming Events
              <FaArrowRight />
            </Link>
            <Link href="/create-event" className="btn btn-outline btn-primary btn-lg">
              Create an Event
            </Link>
          </div>
        </div>

        <div
          className="flex items-end justify-center gap-3 sm:gap-5"
          aria-hidden="true"
        >
          {steps.map(({ title, text, Icon, height }, index) => {
            const isLast = index === steps.length - 1;

            return (
              <div
                key={title}
                className={`animate-float-soft flex w-28 flex-col justify-between rounded-box border p-4 shadow-xl sm:w-36 ${height} ${
                  isLast
                    ? "border-primary bg-primary text-primary-content"
                    : "border-base-300 bg-base-100"
                }`}
                style={{ animationDelay: `${index * 0.8}s` }}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    isLast ? "bg-primary-content/20" : "bg-primary/10 text-primary"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold opacity-60">
                    Step {index + 1}
                  </p>
                  <p className="text-xl font-extrabold">{title}</p>
                  <p className="text-xs opacity-80">{text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}