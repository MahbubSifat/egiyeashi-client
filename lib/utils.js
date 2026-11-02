// Reads ?redirect=/some/page from the URL, only allows paths inside this site
export function getRedirectTarget() {
  const target = new URLSearchParams(window.location.search).get("redirect");
  if (target && target.startsWith("/") && !target.startsWith("//")) {
    return target;
  }
  return "/";
}