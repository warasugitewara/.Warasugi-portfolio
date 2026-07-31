import { useEffect, useMemo, useState } from "react";
import type { I18n, GitHubRepo, Language } from "../types";
import { fetchGitHubRepos, type GitHubRepoRaw } from "../utils/githubRepos";

interface ProjectsProps {
  i18n: I18n | null;
  lang: Language;
}

export const Projects = ({ i18n, lang }: ProjectsProps) => {
  const [rawRepos, setRawRepos] = useState<GitHubRepoRaw[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "empty" | "error">("loading");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    const timeoutId = window.setTimeout(() => controller.abort(), 10_000);

    const loadRepos = async () => {
      try {
        if (rawRepos.length === 0) setStatus("loading");
        const data = await fetchGitHubRepos({ signal: controller.signal });
        if (disposed) return;
        const visibleRepos = data.filter((repo) => !repo.fork && repo.description).slice(0, 10);
        setRawRepos(visibleRepos);
        setStatus(visibleRepos.length === 0 ? "empty" : "success");
      } catch (error) {
        if (disposed) return;
        console.error("Failed to fetch GitHub repos:", error);
        setStatus("error");
      }
    };

    void loadRepos();
    return () => {
      disposed = true;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [retryKey]);

  const repos = useMemo<GitHubRepo[]>(() => {
    const locale = lang === "ja" ? "ja-JP" : "en-US";
    return rawRepos.map((repo) => ({
      name: repo.name,
      description: repo.description ?? "",
      url: repo.html_url,
      language: repo.language ?? "",
      stars: repo.stargazers_count,
      updated: new Date(repo.updated_at).toLocaleDateString(locale),
      pinned: false,
    }));
  }, [rawRepos, lang]);

  if (!i18n) return null;

  const retry = () => setRetryKey((key) => key + 1);

  return (
    <section id="projects" className="section projects">
      <div className="section-container">
        <h2 className="section-title">{i18n.projects.title}</h2>
        {status === "loading" && repos.length === 0 ? (
          <div className="projects-loading">{i18n.projects.loading}</div>
        ) : status === "error" && repos.length === 0 ? (
          <div className="projects-empty">
            <p>{i18n.projects.error}</p>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--color-text-secondary)",
                marginTop: "0.5rem",
              }}
            >
              <a
                href="https://github.com/warasugitewara"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-accent)" }}
              >
                {i18n.projects.viewGitHub} &#8594;
              </a>
            </p>
            <button type="button" className="project-retry" onClick={retry}>
              {i18n.projects.retry}
            </button>
          </div>
        ) : status === "empty" ? (
          <div className="projects-empty">{i18n.projects.empty}</div>
        ) : (
          <>
            {status === "error" && (
              <div className="projects-warning" role="status">
                {i18n.projects.stale}{" "}
                <button type="button" className="project-retry" onClick={retry}>
                  {i18n.projects.retry}
                </button>
              </div>
            )}
            <div className="projects-list">
              {repos.map((project) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-item"
                >
                  <div className="project-info">
                    <h3 className="project-name">{project.name}</h3>
                    {project.description && (
                      <p className="project-description">{project.description}</p>
                    )}
                  </div>
                  <div className="project-meta">
                    {project.language && (
                      <span className="project-language">{project.language}</span>
                    )}
                    <span className="project-updated">
                      {i18n.projects.updated}: {project.updated}
                    </span>
                    {project.stars > 0 && (
                      <span className="project-stars">&#11088; {project.stars}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
