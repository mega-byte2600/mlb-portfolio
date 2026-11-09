# MLB Portfolio — AI coding agent instructions

**Read [CODEX_HANDOFF.md](CODEX_HANDOFF.md) first.** It contains the latest user-approved avatar placement (upper-right of AI Ambassador), exact supplied full résumé PDF, no-custom-Actions release requirements, and verified blockers. Where older notes conflict, prefer the handoff plus current repository state.

## Purpose
Deliver the "Bring Your Resume to Life" challenge as an independent MLB-focused visual resume with a live, truthful, source-grounded conversational AI Ambassador. Hardball is a separate flagship project linked here; never modify its repository or deployment.

## Architecture
- Frontend: GitHub Pages, repo `mega-byte2600/mlb-portfolio`, from `main` root.
- AI backend: Cloudflare Worker in `ambassador/`, using the Workers AI binding and approved records in `ambassador/sources.js`.
- No Replit, Render, hosted vector database, API tokens in client-side code, unnecessary managed service, or private/confidential document ingestion.
- The frontend `ambassador-config.js` needs a verified public workers.dev URL after deployment.

## Cloudflare agent setup (official)
- Official Cloudflare agent setup: https://developers.cloudflare.com/agent-setup/codex/
- Official Cloudflare API MCP endpoint: https://mcp.cloudflare.com/mcp
- In Codex, install Cloudflare from `/plugins` or register `codex mcp add cloudflare --url https://mcp.cloudflare.com/mcp`. Authenticate via Cloudflare OAuth in the user's own browser.
- Cloudflare Skills: https://github.com/cloudflare/skills. Prefer bundled `wrangler`, `workers-best-practices`, `cloudflare-app-bootstrap` skills.
- Deploy the existing Worker from `ambassador/` with `npx wrangler deploy`, after authenticating. Do not claim success without the actual workers.dev URL and a live inference test.
- Do not expose passwords, OAuth tokens, API keys, private medical/patient data, or employer-confidential evidence.

## Acceptance and verification
1. Verify the homepage works on GitHub Pages.
2. Verify a public downloadable résumé and a working recruiter contact channel. The current `resume.html` printable page is not equivalent to a downloadable original résumé PDF; do not mislabel it.
3. Verify the *real* AI Ambassador uses an actual model endpoint and handles follow-up questions (not scripted keywords), with citations grounded in the approved evidence.
4. Fail closed for unsupported claims, prompt injection, sensitive requests, and missing sources; distinguish first-hand accounts from externally documented facts and proposals from deployments.
5. Run `node tests/smoke.test.js` and `node --test ambassador/test.mjs`, then live HTTP/model tests and mobile/accessibility checks. Local mocks are not live inference verification.
6. Do not modify `mega-byte2600/hardball`, PFAC Toolkit, or any other existing repo.
