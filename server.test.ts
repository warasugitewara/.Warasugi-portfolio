import { describe, expect, it } from "vitest";

Reflect.set(globalThis, "Bun", {
  write: async () => 0,
  file: () => ({
    exists: async () => false,
  }),
});

const { app } = await import("./server");

describe("API fallback", () => {
  it("returns a JSON 404 instead of the SPA HTML for unknown API routes", async () => {
    const response = await app.request("/api/unknown");

    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toContain("application/json");
    await expect(response.json()).resolves.toEqual({ error: "not_found" });
  });
});

describe("SPA fallback", () => {
  it("returns the SPA shell for a known client route", async () => {
    const response = await app.request("/infrastructure");

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");
  });

  it("returns a real 404 for an unknown route", async () => {
    const response = await app.request("/does-not-exist");

    expect(response.status).toBe(404);
  });
});
