// Fill in GitHub star counts for publication "stars" buttons.
// Reads the count from the GitHub API (falls back to shields.io) and caches it for an hour.
(function () {
  const CACHE_MS = 60 * 60 * 1000;

  const format = (n) => (n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k" : String(n));

  const readCache = (repo) => {
    try {
      const hit = JSON.parse(localStorage.getItem("stars:" + repo));
      if (hit && Date.now() - hit.t < CACHE_MS) return hit.v;
    } catch (e) {}
    return null;
  };

  const writeCache = (repo, value) => {
    try {
      localStorage.setItem("stars:" + repo, JSON.stringify({ t: Date.now(), v: value }));
    } catch (e) {}
  };

  const fetchStars = (repo) =>
    fetch("https://api.github.com/repos/" + repo)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => format(d.stargazers_count))
      .catch(() =>
        fetch("https://img.shields.io/github/stars/" + repo + ".json")
          .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
          .then((d) => d.value)
      );

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".github-stars-btn[data-repo]").forEach((btn) => {
      const repo = btn.dataset.repo;
      const count = btn.querySelector(".star-count");
      const show = (value) => {
        count.textContent = value;
        count.hidden = false;
      };
      const cached = readCache(repo);
      if (cached) {
        show(cached);
        return;
      }
      fetchStars(repo)
        .then((value) => {
          if (!value) return;
          show(value);
          writeCache(repo, value);
        })
        .catch(() => {});
    });
  });
})();
