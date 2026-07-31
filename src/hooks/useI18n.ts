import { useEffect, useState } from "react";
import type { Language, I18n } from "../types";
import { loadI18nWithFallback, resolveStoredLanguage } from "../utils/i18n";

export const useI18n = (defaultLang: Language = "ja") => {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return resolveStoredLanguage(localStorage.getItem("language"), defaultLang);
    }
    return defaultLang;
  });
  const [i18n, setI18n] = useState<I18n | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [retryKey, setRetryKey] = useState(0);

  const basePath = import.meta.env.BASE_URL || "/";

  useEffect(() => {
    const controller = new AbortController();

    const loadI18n = async () => {
      setStatus("loading");
      try {
        const result = await loadI18nWithFallback({
          requestedLang: lang,
          defaultLang,
          basePath,
          signal: controller.signal,
        });
        if (controller.signal.aborted) return;
        setI18n(result.i18n);
        setStatus("ready");
        if (result.lang !== lang) {
          setLang(result.lang);
          localStorage.setItem("language", result.lang);
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Failed to load i18n:", error);
        setI18n(null);
        setStatus("error");
      }
    };
    void loadI18n();
    return () => controller.abort();
  }, [lang, defaultLang, basePath, retryKey]);

  const switchLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("language", newLang);
  };

  const retry = () => setRetryKey((key) => key + 1);

  return { lang, i18n, status, switchLanguage, retry };
};
