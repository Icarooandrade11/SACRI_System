export const AUTH_COOKIE_NAME = "sacri_token";

export function parseCookies(header = "") {
  return Object.fromEntries(
    header
      .split(";")
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => {
        const [k, ...rest] = c.split("=");
        return [decodeURIComponent(k), decodeURIComponent(rest.join("="))];
      })
  );
}

export function getAuthTokenFromRequest(req) {
  const cookies = parseCookies(req?.headers?.cookie || "");
  return cookies[AUTH_COOKIE_NAME];
}

function buildCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";
  const sameSite = process.env.COOKIE_SAMESITE || (isProduction ? "none" : "lax");
  return {
    httpOnly: true,
    secure: isProduction || process.env.COOKIE_SECURE === "true",
    sameSite,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
  };
}

export function attachAuthCookie(res, token) {
  res.cookie(AUTH_COOKIE_NAME, token, buildCookieOptions());
}

export function clearAuthCookie(res) {
  const baseOptions = buildCookieOptions();
  res.clearCookie(AUTH_COOKIE_NAME, { ...baseOptions, maxAge: 0 });
}
