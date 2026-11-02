export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function getPasswordError(password) {
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must include at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must include at least one lowercase letter";
  }
  return "";
}

export function validateRegister({ name, email, photoURL, password }) {
  const errors = {};

  if (name.length < 2) errors.name = "Please enter your full name";
  if (!isValidEmail(email)) errors.email = "Please enter a valid email address";
  if (!isValidUrl(photoURL)) {
    errors.photoURL = "Please enter a valid photo URL (starting with https://)";
  }

  const passwordError = getPasswordError(password);
  if (passwordError) errors.password = passwordError;

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateLogin({ email, password }) {
  const errors = {};

  if (!isValidEmail(email)) errors.email = "Please enter a valid email address";
  if (!password) errors.password = "Please enter your password";

  return { isValid: Object.keys(errors).length === 0, errors };
}