# Michael S. Bolton — MLB Portfolio

A responsive, independent static portfolio showcasing Hardball, selected engineering outcomes, and the proposed Players First philosophy. **This is a different repository and website from Hardball.** No existing project is modified.

## Local preview

From this folder:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/`.

## Publish with GitHub Pages only (no Render, no GitHub Actions workflow)

1. Create a **new public repository** named `mlb-portfolio` under your `mega-byte2600` account. Do not create it inside or rename `hardball`.
2. Upload **the contents of this folder** to the **root of the new repository**, not the enclosing directory. At minimum, `index.html`, `styles.css`, `app.js`, `.nojekyll`, `README.md`, and `tests/` should be at root.
3. In the new repository, open **Settings → Pages → Build and deployment** and choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then save. This uses GitHub Pages' branch publishing. Do **not** add a custom GitHub Actions workflow.
4. After Pages reports publishing, visit `https://mega-byte2600.github.io/mlb-portfolio/` (expected URL after publishing, **not currently verified live**).
5. Check the site on desktop and mobile. Check that Hardball opens independently and that the evidence guide says it is a curated prototype, not a production AI agent.

> GitHub Pages may use internal build infrastructure for branch publishing; these instructions do not configure a billable custom Actions workflow. The website needs no server-side code, API credentials, or Render service.

## Static structure

- `index.html`: portfolio page
- `styles.css`: responsive design and accessibility styling
- `app.js`: browser-only, deterministic evidence guide
- `evidence.html`: publicly navigable claim-by-claim evidence and limitations ledger
- `.nojekyll`: use files as authored (no Jekyll processing)
- `tests/smoke.test.js`: static/evidence assertions

Links are absolute URLs for external destinations and relative paths for site assets, so the site works under the `/mlb-portfolio/` GitHub Pages project subpath.

## Provenance and factual safeguards

- **Hardball:** use its [live dashboard](https://mega-byte2600.github.io/hardball/dashboard/) and [repository](https://github.com/mega-byte2600/hardball) as the canonical source. Portfolio doesn't duplicate Hardball's models or figures.
- **2018 AI demonstration:** link to Google Drive recording; this shows object-detection API integration, not training a proprietary foundation model. Link access depends on Drive permissions.
- **Abbott:** approximately $250,000 estimated **annual labor-capacity cost avoidance at the Santa Rosa site**; do not describe as cash savings or executed rollout across all sites.
- **MBA strategy simulation:** first-place team result among ~14 competitors per firsthand account; course and simulation are documented, but the final ranking report was not retained.
- **Players First:** proposed baseball application grounded in completed public health work; no active MLB pilot or team affiliation.
- **SCOPE and languages:** dates, role and four-language fluency are user-provided. Do not imply Stanford degree enrollment.
- **Confidentiality:** never commit Abbott's confidential presentation, Deloitte client assets, patient information, player medical information, API tokens, or full personal documents without review.

## Evidence guide is not a generative AI ambassador

The question box works entirely in the visitor's browser with six curated response groups. It does not call an external API, transmit user questions, or make free-form generative claims. Do not market it as a production AI chatbot. A future AI ambassador requires its own grounded source architecture and security review.

## Test

```bash
node --check app.js
node tests/smoke.test.js
```

This is **prototype v0.3**: static automated checks are not a substitute for visual, device, or accessibility testing before publication.

## v0.3 changes

- Kept section navigation visible on mobile.
- Added linked evidence ledger separating public demonstrations, restricted records, firsthand accounts and unimplemented proposals.
- Strengthened local link and mobile navigation smoke checks.
- No production deployment and no changes to other repositories.

## Real AI Ambassador: Cloudflare Workers AI (open-weight model)

The static portfolio is served on GitHub Pages. **AI chat requires a separate Cloudflare Worker**. No Nous subscription, vector database, Replit, Node server, or client-side API secret is required. The Worker uses the Cloudflare AI binding and `@cf/zai-org/glm-4.7-flash`, a currently supported open-weight multilingual model.

**To deploy the Worker when Cloudflare access is available:**

1. Sign into a Cloudflare account with Workers AI enabled. The documented free AI usage allocation is 10,000 neurons per day, subject to Cloudflare plan limits. No promise of unlimited free usage.
2. From the `ambassador` directory, run `npx wrangler login` and `npx wrangler deploy`. The `wrangler.toml` already includes the model AI binding; no API key goes in the browser or repository.
3. Copy the resulting public `https://mlb-portfolio-ambassador.<subdomain>.workers.dev` endpoint into the single line in `ambassador-config.js` and commit that change. This is **not a secret**.
4. Enable GitHub Pages in the `mlb-portfolio` repository's Settings → Pages by publishing the `main` branch from the repository root. Confirm both the page and Worker endpoint are reachable.
5. Run `node --test ambassador/test.mjs` and `node tests/smoke.test.js`. Perform real-model adversarial evaluations and mobile-browser QA after deployment; mocks do not prove a model's actual reliability.

The public evidence library is maintained in `ambassador/sources.js`. It is a hand-curated allowlist; restricted files and private resume data are excluded. Only selected excerpts enter the prompt. Each answer must include a matching citation marker and the server provides the link and status. **This reduces risk but does not mathematically guarantee truthfulness; a language model may still misstate the curated context.** Test representative recruiter questions and prompt-injection cases before inviting real recruiters. Unknown topics are declined; personal or confidential information should not be sent. Visitors' messages are transmitted to Cloudflare Workers AI when the backend is enabled, not retained by this app intentionally.

**Deployment status:** the frontend remains in an explicit disabled state until `ambassador-config.js` contains a verified Worker URL. Never describe the chat as live before that point.
