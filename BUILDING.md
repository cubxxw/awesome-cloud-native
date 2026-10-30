# Documentation build baseline (GET-325)

This draft replaces the incomplete dependency updates in #18, #19, #20 and #21. All four remain open until a working replacement is independently reviewed and accepted.

Use Node 22 >=22.18 (the host/CI pin is 22.23.2) and the actual npm 12.0.2 executable. The lock uses the complete VuePress rc30/bundler rc30, theme rc132, search/toc rc131 and docsearch rc132 family. The matching package graph passed in awesome-go; this repository still requires its own frozen installation, real peer graph, audit, 395-source rendering and browser acceptance. No `--force`, legacy peers, overrides or remote-origin policy exceptions are part of this baseline.

```sh
npm ci --include=dev --ignore-scripts --strict-peer-deps --engine-strict
npm run docs:check-deps
npm test
npm audit --audit-level=low
npm run docs:build:verified
```

The verified runner checks committed build inputs before and after building, real Node/npm versions, the actual installed graph, compiler exit status, complete SSR logs, every native source/HTML route, exact source hashes and current content/generator. It writes `build-info.json` only after all gates pass. Failed builds retain diagnostics and remove their publishable output. Source commit identity is the GitHub PR synthetic merge on Actions and the deployment source commit on Vercel; these identities are different.

The only verified output is `.build-artifacts/verified-docs/dist`. Ordinary manual dev/build uses a separate `.build-artifacts/manual-docs` dest/temp/cache. Historical tracked `dist` and `.vuepress/.cache` / `.temp` entries are retained, never cleaned or used as a fallback. The source migration preserves all 395 Markdown files: nine groups across eight files preserve their content: seven single-fence groups use code-tabs, while the two groups with additional fences or prose use ordinary tabs; fenced commands are unchanged. The real renderer must validate all source pages and the original Docker/Kubernetes routes, not the Go site's 455-page count or chapter markers.

Local search is the default. The existing DocSearch settings are retained behind `CLOUD_NATIVE_DOCSEARCH=1`, disabled on recognized previews; no new search index/provider/account is provisioned. Legacy analytics and unconsumed v1 plugins are not activated. Browser hydration/search/keyboard/narrow-layout and no-analytics request acceptance are still required.

The old OAuth secret literals were removed without using, printing, verifying or claiming to revoke them. Non-sensitive comment identity/templates and an immutable recovery reference are preserved in `docs/.vuepress/legacy-comments.json`. The configured historical repository returned404 under current access. No alternate repository, OAuth login or history migration is guessed; the article footer explicitly says comments are unavailable. Complete comments remain an acceptance gap. The original configuration is recoverable from commit `2d004d60b1c7cbdadd29e09c55153606bd13a842`, path `docs/.vuepress/config.ts` (blob754d4719d697cfc83fdebb628f11fb3f8477086a).

## Existing hosting gates

The existing Vercel project `awesome-docker` (`prj_9DURRMNnxBuFVEcRg07sUPrFAu73`) is configured with Root Directory `dist`; existing same-team private API403 remains unresolved. An authorized existing-project operator must set the Root Directory to the repository root so root `vercel.json` can select the verified command/output. No self-fetching dist bootstrap, new project/team/account, permission change or old-dist fallback is supplied. Both Cloudflare Pages and Netlify also require their actual current build command/output settings and same-head content to be validated. A provider SUCCESS serving old tracked output is not acceptance. Read back the actual new `build-info.json` and Docker/Kubernetes pages. No production deployment is requested by this source change.

## Existing synchronization boundary

The sync workflow and its target/guard are unchanged and must not be run manually for validation. It references the existing `BOT_GITHUB_TOKEN`; this baseline does not obtain credentials or broaden permissions. The mapping remains `docs/` → `cubxxw/awesome-cs-cloudnative-blockchain@master:awesome-docker-kubernetes/` (excluding .vuepress, dotfiles and README), plus `docs/README.md` → `awesome-docker-kubernetes/README.md`. It does not write the target repository's root README. Root must review the existing automatic cross-repository effect before any eventual master merge.

This remains a draft until the repository's own frozen/peer/audit/SSG, independent review, new-head CI and all applicable real deployment/browser gates pass. The prior red evidence, inherited malformed content/container typos and unavailable historical comments remain documented; no source deletion is used to hide them.
