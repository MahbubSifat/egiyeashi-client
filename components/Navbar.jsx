"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaBars } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";

const profileLinks = [
  { href: "/create-event", label: "Create Event" },
  { href: "/manage-events", label: "Manage Events" },
  { href: "/joined-events", label: "Joined Events" },
];

function closeDropdown() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const eventsActive = pathname.startsWith("/events");

  useEffect(() => {
    if (!user) return;
    try {
      if (sessionStorage.getItem("egiyeashi-welcome")) {
        sessionStorage.removeItem("egiyeashi-welcome");
        toast.success(`Welcome back, ${user.name}!`);
      }
    } catch {
      // welcome toast is optional
    }
  }, [user]);

  async function handleLogout() {
    router.push("/");
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("Logout failed. Please try again.");
      return;
    }
    toast.success("You have been logged out");
  }

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
                  onClick={closeDropdown}
                  className={eventsActive ? "menu-active" : ""}
                >
                  Upcoming Events
                </Link>
              </li>
              {user && (
                <li className="sm:hidden">
                  <button
                    type="button"
                    onClick={() => {
                      closeDropdown();
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
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

        <div className="navbar-end gap-1 sm:gap-2">
          <ThemeToggle />

          {isPending ? (
            <div className="skeleton h-10 w-10 rounded-full" />
          ) : user ? (
            <>
              <div className="tooltip tooltip-bottom" data-tip={user.name}>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="cursor-pointer rounded-full"
                    aria-label="Open profile menu"
                  >
                    <UserAvatar user={user} />
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
                  >
                    <li className="menu-title truncate">{user.name}</li>
                    {profileLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={closeDropdown}
                          className={pathname === link.href ? "menu-active" : ""}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline btn-primary hidden sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}