import {
  FaCalendarPlus,
  FaClipboardList,
  FaHandPointer,
  FaMagnifyingGlass,
  FaMoon,
  FaShieldHalved,
} from "react-icons/fa6";
import SectionHeading from "./SectionHeading";

const features = [
  {
    Icon: FaCalendarPlus,
    title: "Create events in minutes",
    text: "Share a clean-up, plantation or distribution drive with a title, date, location and photo.",
  },
  {
    Icon: FaHandPointer,
    title: "Join with one click",
    text: "Found an event that matters to you? Join it instantly after logging in.",
  },
  {
    Icon: FaClipboardList,
    title: "Track your journey",
    text: "See every event you joined in one place, sorted by event date.",
  },
  {
    Icon: FaMagnifyingGlass,
    title: "Search and filter",
    text: "Find events by title, location or type, such as Cleanup, Plantation or Donation.",
  },
  {
    Icon: FaShieldHalved,
    title: "Secure sign-in",
    text: "Register with email and password or continue with Google. Only you can edit or delete your own events.",
  },
  {
    Icon: FaMoon,
    title: "Light and dark themes",
    text: "Switch the whole site between light and dark mode with a single tap.",
  },
];

export default function Features() {
  return (
    <section className="bg-base-100">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          eyebrow="Why EgiyeAshi"
          title="Everything you need to serve your community"
          text="A simple place to organise, discover and keep track of social service events."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ Icon, title, text }) => (
            <div
              key={title}
              className="h-full rounded-box border border-base-300 bg-base-100 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-box bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-base-content/70">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}