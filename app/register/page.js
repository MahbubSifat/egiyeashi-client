"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";
import FormField from "@/components/FormField";
import GoogleButton from "@/components/GoogleButton";
import PasswordInput from "@/components/PasswordInput";
import { authClient } from "@/lib/auth-client";
import { validateRegister } from "@/lib/validators";

export default function RegisterPage() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const values = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      photoURL: String(form.get("photoURL") ?? "").trim(),
      password: String(form.get("password") ?? ""),
    };

    const result = validateRegister(values);
    setErrors(result.errors);

    if (!result.isValid) {
      toast.error(Object.values(result.errors)[0]);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.photoURL,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      return;
    }

    toast.success(`Welcome to EgiyeAshi, ${values.name}! Your account is ready.`);
    router.push("/");
    router.refresh();
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join EgiyeAshi and start serving your community."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField label="Full name" name="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            className={`input w-full ${errors.name ? "input-error" : ""}`}
          />
        </FormField>

        <FormField label="Email" name="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={`input w-full ${errors.email ? "input-error" : ""}`}
          />
        </FormField>

        <FormField label="Photo URL" name="photoURL" error={errors.photoURL}>
          <input
            id="photoURL"
            name="photoURL"
            type="url"
            placeholder="https://example.com/your-photo.jpg"
            autoComplete="off"
            className={`input w-full ${errors.photoURL ? "input-error" : ""}`}
          />
        </FormField>

        <FormField label="Password" name="password" error={errors.password}>
          <PasswordInput
            autoComplete="new-password"
            placeholder="Create a password"
            hasError={Boolean(errors.password)}
          />
          <p className="text-xs text-base-content/60">
            At least 6 characters, with one uppercase and one lowercase letter.
          </p>
        </FormField>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-sm" />}
          Create account
        </button>
      </form>

      <div className="divider my-6">or</div>
      <GoogleButton label="Sign up with Google" />
    </AuthShell>
  );
}