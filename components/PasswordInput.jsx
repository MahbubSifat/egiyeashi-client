"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function PasswordInput({
  name = "password",
  placeholder = "Enter your password",
  autoComplete = "current-password",
  hasError = false,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`input w-full pr-12 ${hasError ? "input-error" : ""}`}
      />
      <button
        type="button"
        onClick={() => setVisible((value) => !value)}
        className="absolute inset-y-0 right-3 flex items-center text-base-content/60 transition hover:text-primary"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}