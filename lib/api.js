import { authClient } from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.status = status;
    this.errors = errors || {};
  }
}

async function getToken() {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new ApiError("Please login to continue", 401);
  }

  return data.token;
}

export async function apiFetch(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};

  if (body) headers["Content-Type"] = "application/json";
  if (auth) headers.Authorization = `Bearer ${await getToken()}`;

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ApiError(
      "Cannot reach the server. Please check your connection.",
      0
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      data?.message || "Something went wrong",
      response.status,
      data?.errors
    );
  }

  return data;
}