export function safeJSONParse<T>(value: string | null): T | null {
  if (!value || value === "undefined") return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}
