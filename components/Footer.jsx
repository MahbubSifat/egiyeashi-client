import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaLocationDot,
  FaXTwitter,
} from "react-icons/fa6";
import Logo from "./Logo";

// TODO: replace these with your own real contact details and profile links
const CONTACT_EMAIL = "your-email@gmail.com";

const socialLinks = [
  { label: "X", href: "https://x.com", Icon: FaXTwitter },
  { label: "Facebook", href: "https://www.facebook.com", Icon: FaFacebookF },
  { label: "GitHub", href: "https://github.com/mahbubsifat", Icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mahbubsifat/",
    Icon: FaLinkedinIn,
  },
];

const quickLinks = [
  { label: "Upcoming Events", href: "/events" },
  { label: "Create Event", href: "/create-event" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Distribution",
  "Blood Donation",
  "Health Camp",
];

export default function Footer() {
  return (
    <footer>
      <div className="bg-primary text-primary-content">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold">Ready to step forward?</h2>
            <p className="mt-1 opacity-90">
              Find a service event near you and make a difference this week.
            </p>
          </div>
          <Link href="/events" className="btn btn-secondary">
            Browse Upcoming Events
          </Link>
        </div>
      </div>

      <div className="h-1 bg-linear-to-r from-primary via-secondary to-accent" />

      <div className="bg-base-200">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm leading-relaxed text-base-content/70">
              EgiyeAshi connects volunteers with community service events, from
              winter clothes distribution to tree plantation. Step forward and
              serve together.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-base-content/70">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Event Types</h3>
            <ul className="space-y-2 text-sm text-base-content/70">
              {eventTypes.map((type) => (
                <li key={type}>{type}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-base-content/70">
              <li className="flex items-center gap-2">
                <FaLocationDot className="text-primary" />
                Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-primary" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-primary"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="btn btn-circle btn-sm btn-outline btn-primary"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-base-300 py-4 text-center text-sm text-base-content/60">
          © {new Date().getFullYear()} EgiyeAshi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}