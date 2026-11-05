"use client";

import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";

export default function Modal({ open, onClose, title, children, wide = false }) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal modal-open"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`modal-box max-h-[90vh] overflow-y-auto ${
          wide ? "max-w-2xl" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-circle btn-ghost btn-sm"
            aria-label="Close"
          >
            <FaXmark />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
}