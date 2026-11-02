"use client";

import { FaMoon, FaSun } from "react-icons/fa6";

const LIGHT = "egiyeashi-light";
const DARK = "egiyeashi-dark";

export default function ThemeToggle() {
  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === DARK ? LIGHT : DARK;

    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("egiyeashi-theme", next);
    } catch {
      // storage unavailable, theme still changes for this visit
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Switch between light and dark theme"
    >
      <FaMoon className="h-5 w-5 [[data-theme=egiyeashi-dark]_&]:hidden" />
      <FaSun className="hidden h-5 w-5 [[data-theme=egiyeashi-dark]_&]:block" />
    </button>
  );
}