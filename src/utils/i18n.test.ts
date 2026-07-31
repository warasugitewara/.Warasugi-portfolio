import { describe, expect, it, vi } from "vitest";
import { loadI18nWithFallback, resolveStoredLanguage } from "./i18n";

const minimalI18n = {
  nav: {},
  hero: {},
  about: {},
  skills: {},
  projects: {},
  philosophy: {},
  contact: {},
  footer: {},
};

describe("resolveStoredLanguage", () => {
  it("rejects unsupported localStorage values", () => {
    expect(resolveStoredLanguage("fr", "ja")).toBe("ja");
    expect(resolveStoredLanguage(null, "en")).toBe("en");
  });
});

describe("loadI18nWithFallback", () => {
  it("falls back to the default language when the requested locale fails", async () => {
    const fetchFn = vi
      .fn<(input: string, init?: RequestInit) => Promise<Response>>()
      .mockResolvedValueOnce(new Response("", { status: 404 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify(minimalI18n), {
          headers: { "Content-Type": "application/json" },
        }),
      );

    const result = await loadI18nWithFallback({
      requestedLang: "en",
      defaultLang: "ja",
      basePath: "/",
      fetchFn,
    });

    expect(result.lang).toBe("ja");
    expect(result.i18n).toEqual(minimalI18n);
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it("throws after the default language also fails", async () => {
    const fetchFn = vi.fn(async () => new Response("", { status: 503 }));

    await expect(
      loadI18nWithFallback({
        requestedLang: "ja",
        defaultLang: "ja",
        basePath: "/",
        fetchFn,
      }),
    ).rejects.toThrow("Failed to load i18n");
  });

  it("rejects JSON that does not satisfy the i18n contract", async () => {
    const fetchFn = vi.fn(
      async () =>
        new Response(JSON.stringify({ hero: {} }), {
          headers: { "Content-Type": "application/json" },
        }),
    );

    await expect(
      loadI18nWithFallback({
        requestedLang: "ja",
        defaultLang: "ja",
        basePath: "/",
        fetchFn,
      }),
    ).rejects.toThrow("Invalid i18n payload");
  });
});
