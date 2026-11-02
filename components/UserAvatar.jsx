"use client";

import { useState } from "react";

export default function UserAvatar({ user }) {
  const [broken, setBroken] = useState(false);

  if (user.image && !broken) {
    return (
      <div className="avatar">
        <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
          {/* user-provided URLs can be any host, so a plain img is used */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.image}
            alt={user.name}
            referrerPolicy="no-referrer"
            onError={() => setBroken(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="avatar avatar-placeholder">
      <div className="w-10 rounded-full bg-primary text-primary-content ring-2 ring-primary ring-offset-2 ring-offset-base-100">
        <span className="text-lg font-bold">
          {user.name?.charAt(0).toUpperCase()}
        </span>
      </div>
    </div>
  );
}