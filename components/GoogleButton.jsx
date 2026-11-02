"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { getRedirectTarget } from "@/lib/utils";

export default function GoogleButton({ label = "Continue with Google" }) {
  const [loading, setLoading] = useState(false);

  async function handleGoogleLogin() {
    setLoading(true);

    try {
      sessionStorage.setItem("egiyeashi-welcome", "1");
    } catch {
      // welcome toast is optional
    }

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: getRedirectTarget(),
    });

    if (error) {
      toast.error(error.message || "Google sign-in failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={loading}
      className="btn btn-outline w-full"
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        <FcGoogle className="h-5 w-5" />
      )}
      {label}
    </button>
  );
}