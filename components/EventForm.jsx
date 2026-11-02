"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  EVENT_TYPES,
  todayInDhaka,
  tomorrowInDhaka,
  validateEventForm,
} from "@/lib/event-utils";
import FormField from "./FormField";

const FIELDS = [
  "title",
  "description",
  "eventType",
  "thumbnail",
  "location",
  "eventDate",
];

export default function EventForm({
  initialValues = {},
  submitLabel,
  onSubmit,
  keepDate,
}) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const minDate =
    keepDate && keepDate <= todayInDhaka() ? keepDate : tomorrowInDhaka();

  const inputClass = (name) => `input w-full ${errors[name] ? "input-error" : ""}`;

  async function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(
      FIELDS.map((name) => [name, String(form.get(name) ?? "").trim()])
    );

    const result = validateEventForm(values, { keepDate });
    setErrors(result.errors);

    if (!result.isValid) {
      toast.error(Object.values(result.errors)[0]);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(values);
    } catch (error) {
      if (error.errors && Object.keys(error.errors).length > 0) {
        setErrors(error.errors);
      }
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormField label="Event title" name="title" error={errors.title}>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={initialValues.title ?? ""}
          placeholder="e.g. Winter Clothes Distribution"
          className={inputClass("title")}
        />
      </FormField>

      <FormField label="Description" name="description" error={errors.description}>
        <textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={initialValues.description ?? ""}
          placeholder="Tell volunteers what this event is about and what to bring"
          className={`textarea w-full ${errors.description ? "textarea-error" : ""}`}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Event type" name="eventType" error={errors.eventType}>
          <select
            id="eventType"
            name="eventType"
            defaultValue={initialValues.eventType ?? ""}
            className={`select w-full ${errors.eventType ? "select-error" : ""}`}
          >
            <option value="" disabled>
              Choose an event type
            </option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Event date" name="eventDate" error={errors.eventDate}>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            min={minDate}
            defaultValue={initialValues.eventDate ?? ""}
            className={inputClass("eventDate")}
          />
        </FormField>
      </div>

      <FormField label="Thumbnail image URL" name="thumbnail" error={errors.thumbnail}>
        <input
          id="thumbnail"
          name="thumbnail"
          type="url"
          defaultValue={initialValues.thumbnail ?? ""}
          placeholder="https://example.com/event-photo.jpg"
          className={inputClass("thumbnail")}
        />
      </FormField>

      <FormField label="Location" name="location" error={errors.location}>
        <input
          id="location"
          name="location"
          type="text"
          defaultValue={initialValues.location ?? ""}
          placeholder="e.g. Mirpur 10, Dhaka"
          className={inputClass("location")}
        />
      </FormField>

      <button type="submit" disabled={loading} className="btn btn-primary w-full sm:w-auto">
        {loading && <span className="loading loading-spinner loading-sm" />}
        {submitLabel}
      </button>
    </form>
  );
}