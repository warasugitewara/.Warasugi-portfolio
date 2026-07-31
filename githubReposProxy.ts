import { isGitHubRepoArray } from "./src/utils/githubRepos";

const DEFAULT_URL =
  "https://api.github.com/users/warasugitewara/repos?sort=updated&per_page=12&type=owner";
const DEFAULT_TTL_MS = 5 * 60 * 1000;
const DEFAULT_STALE_TTL_MS = 60 * 60 * 1000;

type FetchFn = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

interface GitHubReposProxyOptions {
  fetchFn?: FetchFn;
  now?: () => number;
  ttlMs?: number;
  staleTtlMs?: number;
  url?: string;
}

type RefreshResult =
  | { ok: true; body: string }
  | { ok: false; error: "github_invalid_response" | "github_unavailable"; status: number };

const jsonHeaders = (cacheControl: string, cacheState?: string): Record<string, string> => ({
  "Content-Type": "application/json",
  "Cache-Control": cacheControl,
  ...(cacheState ? { "X-Cache": cacheState } : {}),
});

const errorResponse = (error: RefreshResult & { ok: false }) =>
  new Response(JSON.stringify({ error: error.error }), {
    status: error.status,
    headers: jsonHeaders("no-store"),
  });

export const createGitHubReposProxy = ({
  fetchFn = fetch,
  now = Date.now,
  ttlMs = DEFAULT_TTL_MS,
  staleTtlMs = DEFAULT_STALE_TTL_MS,
  url = DEFAULT_URL,
}: GitHubReposProxyOptions = {}) => {
  let cache: { at: number; body: string } | null = null;
  let inFlight: Promise<RefreshResult> | null = null;

  const refresh = async (): Promise<RefreshResult> => {
    try {
      const upstream = await fetchFn(url, {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "warasugi-portfolio",
        },
      });
      if (!upstream.ok) {
        return { ok: false, error: "github_unavailable", status: upstream.status };
      }

      const contentType = upstream.headers.get("content-type")?.toLowerCase() ?? "";
      if (!contentType.includes("application/json")) {
        return { ok: false, error: "github_invalid_response", status: 502 };
      }

      const payload: unknown = await upstream.json();
      if (!isGitHubRepoArray(payload)) {
        return { ok: false, error: "github_invalid_response", status: 502 };
      }

      return { ok: true, body: JSON.stringify(payload) };
    } catch {
      return { ok: false, error: "github_unavailable", status: 502 };
    }
  };

  const get = async (): Promise<Response> => {
    const requestedAt = now();
    const cacheAge = cache ? requestedAt - cache.at : Number.POSITIVE_INFINITY;

    if (cache && cacheAge < ttlMs) {
      const remainingSeconds = Math.max(0, Math.ceil((ttlMs - cacheAge) / 1000));
      return new Response(cache.body, {
        status: 200,
        headers: jsonHeaders(`public, max-age=${remainingSeconds}`, "HIT"),
      });
    }

    if (!inFlight) {
      inFlight = refresh().finally(() => {
        inFlight = null;
      });
    }
    const result = await inFlight;

    if (result.ok) {
      cache = { at: now(), body: result.body };
      return new Response(result.body, {
        status: 200,
        headers: jsonHeaders(`public, max-age=${Math.ceil(ttlMs / 1000)}`, "MISS"),
      });
    }

    if (cache && requestedAt - cache.at <= staleTtlMs) {
      return new Response(cache.body, {
        status: 200,
        headers: jsonHeaders("no-cache", "STALE"),
      });
    }

    return errorResponse(result);
  };

  return { get };
};
