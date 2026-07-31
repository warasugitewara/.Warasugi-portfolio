import { describe, expect, it, vi } from "vitest";
import { createGitHubReposProxy } from "./githubReposProxy";

const repoPayload = [
  {
    fork: false,
    description: "Portfolio",
    name: "Portfolio",
    html_url: "https://github.com/warasugitewara/Portfolio",
    language: "TypeScript",
    stargazers_count: 1,
    updated_at: "2026-07-30T00:00:00Z",
  },
];

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

describe("GitHub repositories proxy", () => {
  it("rejects a 200 HTML upstream response without caching it", async () => {
    const fetchFn = vi.fn(async () =>
      new Response("<!doctype html>", {
        status: 200,
        headers: { "Content-Type": "text/html" },
      }),
    );
    const proxy = createGitHubReposProxy({ fetchFn });

    const response = await proxy.get();

    expect(response.status).toBe(502);
    expect(response.headers.get("cache-control")).toBe("no-store");
    await expect(response.json()).resolves.toEqual({ error: "github_invalid_response" });
  });

  it("coalesces concurrent cache misses into one upstream request", async () => {
    let resolveFetch: ((response: Response) => void) | undefined;
    const fetchFn = vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          resolveFetch = resolve;
        }),
    );
    const proxy = createGitHubReposProxy({ fetchFn });

    const first = proxy.get();
    const second = proxy.get();
    resolveFetch?.(jsonResponse(repoPayload));

    const [firstResponse, secondResponse] = await Promise.all([first, second]);

    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(firstResponse.status).toBe(200);
    expect(secondResponse.status).toBe(200);
  });

  it("serves a bounded stale cache with no-cache when GitHub is unavailable", async () => {
    const clock = { value: 0 };
    const fetchFn = vi
      .fn<() => Promise<Response>>()
      .mockResolvedValueOnce(jsonResponse(repoPayload))
      .mockRejectedValueOnce(new Error("offline"));
    const proxy = createGitHubReposProxy({
      fetchFn,
      now: () => clock.value,
      ttlMs: 1_000,
      staleTtlMs: 5_000,
    });

    await proxy.get();
    clock.value = 2_000;
    const stale = await proxy.get();

    expect(stale.status).toBe(200);
    expect(stale.headers.get("x-cache")).toBe("STALE");
    expect(stale.headers.get("cache-control")).toBe("no-cache");
  });

  it("stops serving stale data after the stale TTL", async () => {
    const clock = { value: 0 };
    const fetchFn = vi
      .fn<() => Promise<Response>>()
      .mockResolvedValueOnce(jsonResponse(repoPayload))
      .mockRejectedValueOnce(new Error("offline"));
    const proxy = createGitHubReposProxy({
      fetchFn,
      now: () => clock.value,
      ttlMs: 1_000,
      staleTtlMs: 5_000,
    });

    await proxy.get();
    clock.value = 6_001;
    const response = await proxy.get();

    expect(response.status).toBe(502);
    expect(response.headers.get("cache-control")).toBe("no-store");
  });
});
