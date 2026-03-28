// Use Vite's local proxy (/api) in development to bypass CORS, otherwise fallback to the production IP.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? "/api" : "http://13.220.64.204/api");

export function getAuthToken(): string | null {
  return localStorage.getItem("mindtrail:token");
}

export function setAuthToken(token: string): void {
  localStorage.setItem("mindtrail:token", token);
}

export function clearAuthToken(): void {
  localStorage.removeItem("mindtrail:token");
}

type ApiFetchOptions = RequestInit & {
  /**
   * Request timeout in ms.
   * - Omit to use `VITE_API_TIMEOUT_MS` (default 12000)
   * - Set to `0` (or any <= 0) to disable the timeout
   */
  timeoutMs?: number;
};

export async function apiFetch(endpoint: string, options: ApiFetchOptions = {}) {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutMs = Number(options.timeoutMs ?? import.meta.env.VITE_API_TIMEOUT_MS ?? "12000");
  const shouldTimeout = Number.isFinite(timeoutMs) && timeoutMs > 0;
  const timeoutId = shouldTimeout
    ? window.setTimeout(() => controller.abort(), timeoutMs)
    : null;

  let response: Response;
  try {
    // Avoid passing non-standard keys into fetch()
    const { timeoutMs: _timeoutMs, ...fetchOptions } = options;
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });
  } catch (err: any) {
    if (err?.name === "AbortError") {
      throw new Error(
        shouldTimeout ? `Request timed out after ${timeoutMs}ms` : "Request was aborted"
      );
    }
    throw err;
  } finally {
    if (timeoutId != null) window.clearTimeout(timeoutId);
  }

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `HTTP ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  if (!data || data.success === false) {
    throw new Error((data && data.message) || "An API error occurred");
  }

  return data;
}
