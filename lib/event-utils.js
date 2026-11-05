import { isValidUrl } from "./validators";

export const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Distribution",
  "Blood Donation",
  "Health Camp",
  "Education",
  "Awareness",
];

export function todayInDhaka() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });
}

export function tomorrowInDhaka() {
  return new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(
    "en-CA",
    { timeZone: "Asia/Dhaka" }
  );
}

// "2030-03-10" -> "10 Mar 2030"
export function formatEventDate(value) {
  const [year, month, day] = String(value).split("-").map(Number);
  if (!year || !month || !day) return String(value);

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function validateEventForm(values, { keepDate } = {}) {
  const errors = {};

  if (values.title.length < 5 || values.title.length > 100) {
    errors.title = "Title must be between 5 and 100 characters";
  }
  if (values.description.length < 20 || values.description.length > 1000) {
    errors.description = "Description must be between 20 and 1000 characters";
  }
  if (!EVENT_TYPES.includes(values.eventType)) {
    errors.eventType = "Please choose an event type";
  }
  if (!isValidUrl(values.thumbnail)) {
    errors.thumbnail = "Please enter a valid image URL (starting with https://)";
  }
  if (values.location.length < 3 || values.location.length > 150) {
    errors.location = "Location must be between 3 and 150 characters";
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.eventDate)) {
    errors.eventDate = "Please choose the event date";
  } else if (
    values.eventDate <= todayInDhaka() &&
    values.eventDate !== keepDate
  ) {
    errors.eventDate = "Event date must be in the future";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}