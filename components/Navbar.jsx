"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa6";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const eventsActive = pathname.startsWith("/events");

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start gap-1">
          <div className="dropdown md:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              aria-label="Open menu"
            >
              <FaBars className="h-5 w-5" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
            >
              <li>
                <Link
                  href="/events"
                  className={eventsActive ? "menu-active" : ""}
                >
                  Upcoming Events
                </Link>
              </li>
            </ul>
          </div>
          <Logo />
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                href="/events"
                className={eventsActive ? "menu-active" : ""}
              >
                Upcoming Events
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-1">
          <ThemeToggle />
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}