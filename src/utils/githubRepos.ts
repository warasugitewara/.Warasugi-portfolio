export interface GitHubRepoRaw {
  fork: boolean;
  description: string | null;
  name: string;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

type FetchFn = (input: string, init?: RequestInit) => Promise<Response>;

/** Same-origin proxy (server.ts). Cached + rate-limit protected. Preferred. */
const PROXY_URL = "/api/github/repos";
/** Public GitHub API fallback used when the proxy is unavailable or returns non-JSON. */
const GITHUB_API_FALLBACK =
  "https://api.github.com/users/warasugitewara/repos?sort=updated&per_page=12&type=owner";

export const isGitHubRepoRaw = (value: unknown): value is GitHubRepoRaw => {
  if (typeof value !== "object" || value === null) return false;

  const repo = value as Record<string, unknown>;
  return (
    typeof repo.fork === "boolean" &&
    (typeof repo.description === "string" || repo.description === null) &&
    typeof repo.name === "string" &&
    typeof repo.html_url === "string" &&
    (typeof repo.language === "string" || repo.language === null) &&
    typeof repo.stargazers_count === "number" &&
    typeof repo.updated_at === "string"
  );
};

export const isGitHubRepoArray = (value: unknown): value is GitHubRepoRaw[] =>
  Array.isArray(value) && value.every(isGitHubRepoRaw);

export const parseGitHubReposResponse = async (response: Response): Promise<GitHubRepoRaw[]> => {
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub repos: ${response.status}`);
  }

  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(`Expected GitHub API JSON, received ${contentType || "unknown content type"}`);
  }

  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error("Expected a GitHub repository array");
  }
  if (!isGitHubRepoArray(payload)) {
    throw new Error("Invalid GitHub repository payload");
  }

  return payload;
};

export const fetchGitHubRepos = async ({
  signal,
  fetchFn = fetch,
}: {
  signal?: AbortSignal;
  fetchFn?: FetchFn;
} = {}): Promise<GitHubRepoRaw[]> => {
  try {
    const response = await fetchFn(PROXY_URL, { signal });
    return await parseGitHubReposResponse(response);
  } catch (proxyError) {
    // The self-hosted proxy may be unreachable or return the SPA HTML
    // fallback (e.g. before a server restart). Fall back to the public
    // GitHub API directly so the section still renders. Skip the retry if
    // the request was aborted — it would only fail again.
    if (signal?.aborted) throw proxyError;
    const response = await fetchFn(GITHUB_API_FALLBACK, { signal });
    return parseGitHubReposResponse(response);
  }
};
