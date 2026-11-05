"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelopeOpenText, FaPaperPlane } from "react-icons/fa6";
import { isValidEmail } from "@/lib/validators";

export default function Newsletter() {
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    setError("");
    form.reset();
    toast.success("Thanks for your interest! Our newsletter is coming soon.");
  }

  return (
    <section className="bg-base-200">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="relative overflow-hidden rounded-box bg-neutral p-8 text-neutral-content sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/30" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-secondary/20" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-content">
                <FaEnvelopeOpenText className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
                Stay in the loop
              </h2>
              <p className="mt-3 max-w-md opacity-80">
                Get a note when new service events are announced near you. No
                spam, just ways to help.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="join w-full">
                <input
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="input join-item w-full text-base-content"
                />
                <button type="submit" className="btn btn-secondary join-item">
                  <FaPaperPlane />
                  Subscribe
                </button>
              </div>
              {error && (
                <p className="mt-2 text-sm text-warning" role="alert">
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}