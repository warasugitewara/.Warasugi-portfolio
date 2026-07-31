import { describe, expect, it, vi } from "vitest";
import { fetchGitHubRepos, parseGitHubReposResponse } from "./githubRepos";

describe("parseGitHubReposResponse", () => {
  it("accepts a successful JSON array response", async () => {
    const response = new Response(
      JSON.stringify([
        {
          fork: false,
          description: "Portfolio",
          name: "Portfolio",
          html_url: "https://github.com/warasugitewara/Portfolio",
          language: "TypeScript",
          stargazers_count: 1,
          updated_at: "2026-07-30T00:00:00Z",
        },
      ]),
      { headers: { "Content-Type": "application/json" } },
    );

    const repos = await parseGitHubReposResponse(response);

    expect(repos).toHaveLength(1);
    expect(repos[0]?.name).toBe("Portfolio");
  });

  it("rejects an HTML SPA fallback even when the response status is 200", async () => {
    const response = new Response("<!doctype html><html></html>", {
      status: 200,
      headers: { "Content-Type": "text/html; charset=UTF-8" },
    });

    await expect(parseGitHubReposResponse(response)).rejects.toThrow("Expected GitHub API JSON");
  });

  it("rejects a non-array JSON payload", async () => {
    const response = new Response(JSON.stringify({ error: "rate_limited" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    await expect(parseGitHubReposResponse(response)).rejects.toThrow(
      "Expected a GitHub repository array",
    );
  });

  it("rejects array entries that do not match the GitHub repository shape", async () => {
    const response = new Response(JSON.stringify([{ name: "Portfolio" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    await expect(parseGitHubReposResponse(response)).rejects.toThrow(
      "Invalid GitHub repository payload",
    );
  });
});

describe("fetchGitHubRepos", () => {
  const validRepo = {
    fork: false,
    description: "Portfolio",
    name: "Portfolio",
    html_url: "https://github.com/warasugitewara/Portfolio",
    language: "TypeScript",
    stargazers_count: 1,
    updated_at: "2026-07-30T00:00:00Z",
  };
  const jsonResponse = (body: unknown) =>
    new Response(JSON.stringify(body), {
      headers: { "Content-Type": "application/json" },
    });

  it("forwards an AbortSignal to the same-origin API request", async () => {
    const controller = new AbortController();
    const fetchFn = vi.fn(async () => jsonResponse([]));

    await fetchGitHubRepos({ signal: controller.signal, fetchFn });

    expect(fetchFn).toHaveBeenCalledWith("/api/github/repos", {
      signal: controller.signal,
    });
  });

  it("falls back to the public GitHub API when the proxy returns HTML", async () => {
    const fetchFn = vi.fn(async (input: string) => {
      if (input === "/api/github/repos") {
        return new Response("<!doctype html><html></html>", {
          status: 200,
          headers: { "Content-Type": "text/html; charset=UTF-8" },
        });
      }
      return jsonResponse([validRepo]);
    });

    const repos = await fetchGitHubRepos({ fetchFn });

    expect(repos).toHaveLength(1);
    expect(fetchFn).toHaveBeenCalledTimes(2);
    expect(fetchFn.mock.calls[1]?.[0]).toContain("api.github.com");
  });

  it("falls back to the public GitHub API when the proxy request throws", async () => {
    const fetchFn = vi.fn(async (input: string) => {
      if (input === "/api/github/repos") throw new Error("network down");
      return jsonResponse([validRepo]);
    });

    const repos = await fetchGitHubRepos({ fetchFn });

    expect(repos).toHaveLength(1);
    expect(fetchFn.mock.calls[1]?.[0]).toContain("api.github.com");
  });

  it("does not retry the fallback when the request was aborted", async () => {
    const controller = new AbortController();
    controller.abort();
    const fetchFn = vi.fn(async () => {
      throw new DOMException("Aborted", "AbortError");
    });

    await expect(fetchGitHubRepos({ signal: controller.signal, fetchFn })).rejects.toThrow();
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });
});
