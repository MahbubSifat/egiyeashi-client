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
import { getRedirectTarget } from "@/lib/utils";
import { validateLogin } from "@/lib/validators";

export default function LoginPage() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const values = {
      email: String(form.get("email") ?? "").trim(),
      password: String(form.get("password") ?? ""),
    };

    const result = validateLogin(values);
    setErrors(result.errors);

    if (!result.isValid) {
      toast.error(Object.values(result.errors)[0]);
      return;
    }

    setLoading(true);
    const { data, error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Login failed. Please check your details.");
      return;
    }

    toast.success(`Welcome back, ${data?.user?.name ?? "friend"}!`);
    router.push(getRedirectTarget());
    router.refresh();
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Login to create, join and manage service events."
      footer={
        <>
          New to EgiyeAshi?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
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

        <FormField label="Password" name="password" error={errors.password}>
          <PasswordInput hasError={Boolean(errors.password)} />
        </FormField>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-sm" />}
          Login
        </button>
      </form>

      <div className="divider my-6">or</div>
      <GoogleButton label="Continue with Google" />
    </AuthShell>
  );
}