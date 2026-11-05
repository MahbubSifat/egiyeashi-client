"use client";

import { useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa6";

export default function EventImage({ src, alt, className = "" }) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-linear-to-br from-primary to-accent text-primary-content ${className}`}
      >
        <FaHandHoldingHeart className="h-12 w-12 opacity-80" />
      </div>
    );
  }

  return (
    <>
      {/* thumbnails can come from any host, so a plain img is used */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setBroken(true)}
        className={className}
      />
    </>
  );
}