"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaRegCalendarCheck } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { isValidUrl } from "@/lib/validators";
import FormField from "./FormField";
import UserAvatar from "./UserAvatar";

function formatMemberSince(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function ProfileView({ user }) {
  const [name, setName] = useState(user.name ?? "");
  const [photo, setPhoto] = useState(user.image ?? "");
  const [previewPhoto, setPreviewPhoto] = useState(user.image ?? "");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const memberSince = formatMemberSince(user.createdAt);

  async function handleSubmit(event) {
    event.preventDefault();

    const values = { name: name.trim(), photoURL: photo.trim() };
    const nextErrors = {};

    if (values.name.length < 2) {
      nextErrors.name = "Please enter your full name";
    }
    if (!isValidUrl(values.photoURL)) {
      nextErrors.photoURL = "Please enter a valid photo URL (starting with https://)";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error(Object.values(nextErrors)[0]);
      return;
    }

    if (values.name === user.name && values.photoURL === user.image) {
      toast("Nothing to update yet. Change your name or photo first.");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({
      name: values.name,
      image: values.photoURL,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Could not update your profile");
      return;
    }

    setPreviewPhoto(values.photoURL);
    toast.success("Profile updated successfully!");
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Account
      </p>
      <h1 className="mt-1 text-3xl font-extrabold">My Profile</h1>
      <p className="mt-2 text-base-content/70">
        See your details and update your name or profile photo.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="h-fit rounded-box border border-base-300 bg-base-100 p-6 text-center shadow-sm">
          <div className="flex justify-center">
            <UserAvatar
              key={previewPhoto}
              user={{ name: user.name, image: previewPhoto }}
              size="w-28"
              textSize="text-5xl"
            />
          </div>
          <h2 className="mt-5 text-xl font-bold">{user.name}</h2>

          <ul className="mt-5 space-y-3 text-left text-sm text-base-content/70">
            <li className="flex items-center gap-3">
              <FaEnvelope className="shrink-0 text-primary" />
              <span className="break-all">{user.email}</span>
            </li>
            {memberSince && (
              <li className="flex items-center gap-3">
                <FaRegCalendarCheck className="shrink-0 text-primary" />
                Member since {memberSince}
              </li>
            )}
          </ul>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8 lg:col-span-2">
          <h2 className="text-xl font-bold">Update profile</h2>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            <FormField label="Full name" name="name" error={errors.name}>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                className={`input w-full ${errors.name ? "input-error" : ""}`}
              />
            </FormField>

            <FormField label="Photo URL" name="photoURL" error={errors.photoURL}>
              <input
                id="photoURL"
                name="photoURL"
                type="url"
                value={photo}
                onChange={(event) => setPhoto(event.target.value)}
                onBlur={() => {
                  if (isValidUrl(photo.trim())) setPreviewPhoto(photo.trim());
                }}
                placeholder="https://example.com/your-photo.jpg"
                className={`input w-full ${errors.photoURL ? "input-error" : ""}`}
              />
            </FormField>

            <FormField label="Email" name="email">
              <input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="input w-full"
              />
              <p className="text-xs text-base-content/60">
                Your email is used to sign in and cannot be changed here.
              </p>
            </FormField>

            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading && <span className="loading loading-spinner loading-sm" />}
              Save changes
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function Profile() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  if (!user) return null;

  return <ProfileView user={user} />;
}