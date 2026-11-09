# Michael S. Bolton | Baseball Research & Development Analyst Portfolio

Independent, MLB-focused visual résumé and real AI Ambassador built for the **Bring Your Resume to Life** challenge. Target title: **Baseball Research & Development Analyst** (working project choice; verify alignment with actual recruiting opportunities). The entire expanded challenge is locked in [ACCEPTANCE_CRITERIA.md](ACCEPTANCE_CRITERIA.md). The release-blocker register is [AUDIT_GAPS.md](AUDIT_GAPS.md).

**This is a separate repository and deployment from Hardball. Do not modify `mega-byte2600/hardball`.**

## Architecture

- **Public site:** GitHub Pages from `main` root. Expected address: https://mega-byte2600.github.io/mlb-portfolio/
- **Backend:** Cloudflare Worker `ambassador/worker.js`, using Workers AI `@cf/zai-org/glm-4.7-flash`.
- **Worker URL:** https://mlb-portfolio-ambassador.mlb-ambassador-msb.workers.dev
- **Evidence:** 29 curated, provenance-labeled public summaries in `ambassador/sources.js`; human-reviewed claims, self-reported outcomes and proposed work must remain distinguished.
- **Recruiter actions:** email, LinkedIn, GitHub, evidence ledger, and the exact supplied `Michael_Bolton_Resume_Nov_2026.pdf`.
- **Browser chat:** `app.js`, suggested recruiter questions, multi-turn context, cited source links and bounded agentic action proposals. The browser can open allowlisted public resources or prepare an email draft; it cannot send email, access credentials or browse arbitrary URLs.
- **Safety:** Worker refuses unsupported/sensitive topics and prompt injections, uses Cloudflare-native approximate rate limiter, and returns curated source facts instead of publishing unrestricted model prose. Cloudflare persisted Worker logs disabled in `wrangler.toml`. External provider data handling is governed by provider terms.
- **Privacy:** no home address, telephone number, confidential employer documents, protected health or player data, private chats or access tokens in the public knowledge library.

## Setup and deploy

Cloudflare Workers Builds is connected to the GitHub `main` branch and deploys the Worker with `ambassador/wrangler.toml` after a production commit. Live verification remains a release requirement.

For Cloudflare in the existing local `ambassador` directory:

```bash
curl -fL https://raw.githubusercontent.com/mega-byte2600/mlb-portfolio/main/ambassador/worker.js -o worker.js
curl -fL https://raw.githubusercontent.com/mega-byte2600/mlb-portfolio/main/ambassador/sources.js -o sources.js
curl -fL https://raw.githubusercontent.com/mega-byte2600/mlb-portfolio/main/ambassador/wrangler.toml -o wrangler.toml
npx wrangler deploy
```

This is a **new version**: it requires the `RATE_LIMITER` binding defined in `wrangler.toml`. The Cloudflare rate-limiting API is approximate per data center; it is not a global strict limit or user authentication. If missing, the Worker deliberately fails closed with HTTP 503.

For GitHub Pages, navigate to **Settings > Pages > Deploy from a branch**, `main`, `/ (root)`. Branch publishing does not require a custom GitHub Actions workflow. Actual Pages availability and responsive user experience still require live validation.

## Tests

```bash
node --check app.js
node --test ambassador/test.mjs ambassador/interview-eval.mjs
node tests/smoke.test.js
node ambassador/stress.mjs
node ambassador/interview-simulations.mjs
```

- A/B/C interview evaluation: 69 structured HR/MBA, common recruiter, strengths and security scenarios, plus phrasing variants; the current local release gate includes **101 passing tests**, including distinct motivation, priorities, conflict and bounded-action cases.
- **10,000,000 seeded draws** passed across 345 previously validated question variants; **250,000 actual source selection/refusal calls** separately passed. See [interview simulation results](ambassador/INTERVIEW_SIMULATION_RESULTS.json) and [methodology](ambassador/INTERVIEW_METHOD.md). These are simulated checks, not model training or 10M live prompts.
- The professional headshot remains LinkedIn-only; it is not embedded as a portfolio portrait or AI avatar.
- One million deterministic retrieval checks across 27 repeated templates passed after indexed retrieval and relevance threshold improvements; see [ambassador/STRESS_RESULTS.json](ambassador/STRESS_RESULTS.json).
- These tests do **not** mean one million unique questions, live-model evaluations or trained model weights. Formal Node CI, mobile visual review, browser keyboard checks and end-to-end Cloudflare evaluation remain separate release checks.
- Safety contract: exact refusal `I don't have verified information about that.` for unsupported preferences and injected requests; do not assert MLB affiliation, unauthorized credentials, player statistics or unverified employment.

## What remains

- Confirm external links, GitHub Pages publication, latest Cloudflare redeployment and four **live** recruiter chat scenarios.
- Audit claim text against original source evidence and any reviewed public LinkedIn content, including link permissions.
- Complete 390px and desktop accessibility/UX testing, real-world colleague 60-second scan and documentation of two alternative directions before final submission.
- Verify the public PDF renders and downloads properly from GitHub Pages; Git PDF structure and cross-reference offsets were checked.
- Submit only after the [acceptance checklist](ACCEPTANCE_CRITERIA.md) is actually validated.

## Evidence ethics

Hardball is public research, not a guaranteed model of wins. Deloitte, Abbott, CDC and county impact numbers are author-reported unless independently corroborated. Abbott's ~$250K figure refers to estimated capacity cost avoidance at Santa Rosa, not cash savings. Player-centered leadership is a proposed application of PFAC work, not an MLB-approved program. The author's Navy BUD/S preparation is **not** completion and he does not claim an MLB championship. The public evidence ledger makes these distinctions inspectable. Restricted employer documents and personal data are not reproduced.

## Design constraints

Preserve working Hardball showcase, evidence ledger, Players First proposal, separate project repository, and visual identity. Keep target role and three evidence-backed capabilities easy to identify in the 60-second scan. Never invent experience, degrees, dates, roles, metrics or references.
