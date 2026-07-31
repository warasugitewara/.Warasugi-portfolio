import type { I18n, Language } from "../types";

type FetchFn = (input: string, init?: RequestInit) => Promise<Response>;

interface LoadI18nOptions {
  requestedLang: Language;
  defaultLang: Language;
  basePath: string;
  signal?: AbortSignal;
  fetchFn?: FetchFn;
}

const REQUIRED_SECTIONS = [
  "nav",
  "hero",
  "about",
  "skills",
  "projects",
  "philosophy",
  "contact",
  "footer",
] as const;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isI18n = (value: unknown): value is I18n =>
  isRecord(value) && REQUIRED_SECTIONS.every((section) => isRecord(value[section]));

export const resolveStoredLanguage = (value: string | null, fallback: Language): Language =>
  value === "ja" || value === "en" ? value : fallback;

const fetchI18n = async (
  lang: Language,
  basePath: string,
  fetchFn: FetchFn,
  signal?: AbortSignal,
): Promise<I18n> => {
  const response = await fetchFn(`${basePath}data/i18n-${lang}.json`, { signal });
  if (!response.ok) {
    throw new Error(`Failed to load i18n (${lang}): ${response.status}`);
  }

  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(`Failed to load i18n (${lang}): expected JSON`);
  }

  const payload: unknown = await response.json();
  if (!isI18n(payload)) {
    throw new Error(`Invalid i18n payload (${lang})`);
  }
  return payload;
};

export const loadI18nWithFallback = async ({
  requestedLang,
  defaultLang,
  basePath,
  signal,
  fetchFn = fetch,
}: LoadI18nOptions): Promise<{ i18n: I18n; lang: Language }> => {
  try {
    return {
      i18n: await fetchI18n(requestedLang, basePath, fetchFn, signal),
      lang: requestedLang,
    };
  } catch (error) {
    if (signal?.aborted || requestedLang === defaultLang) throw error;
    return {
      i18n: await fetchI18n(defaultLang, basePath, fetchFn, signal),
      lang: defaultLang,
    };
  }
};
