# Codex handoff | MLB Portfolio production release
Date: November 8, 2026
Repository: https://github.com/mega-byte2600/mlb-portfolio
Production site: https://mega-byte2600.github.io/mlb-portfolio/
Separate AI Worker: https://mlb-portfolio-ambassador.mlb-ambassador-msb.workers.dev

## User-approved objective and priority
Deliver an authentic, scientifically grounded, MBA-caliber professional portfolio, without marketing-prompt spillover. Preserve its working design and accessibility. The immediate P0 tasks are **publish the exact user-supplied PNG and full PDF**, position the portrait in the correct place, and make asset download and production release testable. Do not modify Hardball's separate repository, the PFAC Toolkit, or a professional LinkedIn photograph.

The user explicitly approved **this specific illustration**:
`HI-RES-CARTOON_transparent_bg(2).png`
It is a 516,383-byte PNG, and an identical export named `ambassador-avatar.png` has been staged in the conversation. The user supplied a screenshot showing a **yellow star at the upper-right of the AI Ambassador header**: **REPLACE THE STAR WITH THIS ILLUSTRATED PORTRAIT AT THE UPPER RIGHT.** Do not put the avatar in front of or to the left of the title. No generic icon, no AI-generated replacement, no LinkedIn headshot. Use transparent background, `object-fit:contain`, a restrained 72–96 px desktop width with appropriately smaller mobile sizing, clear padding, responsive alignment, and preserve heading/subtitle legibility. Do not crop off facial features or add a solid white disc behind a transparent head unless visual testing demonstrates a need.

The exact supplied three-page résumé, unchanged and unabridged:
`Michael_Bolton_Resume_Nov_2026.pdf` (337,704 bytes; uploaded November 8, 2026).
Publish at the repository root with the same filename. The site's visible download label is **Download Michael’s Résumé (PDF)**. Remove the obsolete synthesized 5,960-byte `Michael_S_Bolton_Baseball_RD_Resume.pdf` from use (do not represent it as the user's supplied résumé). User wants full résumé accessible via download; the separately authored `resume.html` is a secondary summary only. Never substitute HTML-to-PDF output or alter the supplied PDF.

The files have been packaged for the user in `MLB_Portfolio_Original_Resume_and_Avatar_Upload.zip`, containing the exact two release filenames. This ZIP exists in the *conversation's attached artifacts*, **not necessarily on the Codex machine or in the Git repository**. Codex must obtain the actual bytes from the user-provided attachments/working directory, not infer that a missing asset is uploaded or create stand-ins. If Codex cannot access the bytes, ask for the ZIP; do not report success.

## Ground truth checked in repository
1. `index.html` references `ambassador-avatar.png` in `.chat-head`, but currently the image precedes the AI Ambassador title; the placement must be changed to the **upper-right**. The inline `onerror` hides the image when absent, masking publication failure. Prefer test-visible failure, not silently hiding a required asset.
2. `styles.css` has `.ambassador-avatar` at only 46 × 46 px with white background and border radius; this does not meet the approved placement/sizing.
3. Both required assets were **404 on GitHub** at last check: `ambassador-avatar.png` and `Michael_Bolton_Resume_Nov_2026.pdf`. Do not claim a working image/download until deployed and HTTP 200 confirmed.
4. `index.html`, `resume.html`, footer links reference the correct full-PDF path. User approved this exact footer disclosure: **Independent portfolio prototype. Not affiliated with or endorsed by Major League Baseball. All quantitative claims are contextual and subject to the linked methodology; no team-specific endorsement or deployed player-advisory program is implied.** Keep it verbatim. Footer attribution is simply **Michael S. Bolton**; NEVER put “Amygdal.ai research identity” back.
5. `scripts/release-check.mjs` now runs lint/syntax, Worker/interview tests, smoke tests and checks both binary assets; `tests/smoke.test.js` now requires the exact full-PDF and avatar and blocks the short substituted résumé. These checks were added in code but have NOT been confirmed green with the missing published assets.
6. Repo `main` was **unprotected** at last check: `protected:false` and required status checks off. No `.github/workflows` or top-level `package.json`. GitHub Pages configured by user for branch publishing `main` / root; production publication and latest live Worker inference have not been independently validated.
7. The AI backend is a separate Cloudflare Worker; a GitHub Pages publish does NOT automatically redeploy it. `ambassador/wrangler.toml` requires `RATE_LIMITER`. Do not claim live model testing without an actual authenticated `wrangler deploy` and separate endpoint verification.
8. `README.md`, `AGENTS.md`, `AUDIT_GAPS.md`, `ACCEPTANCE_CRITERIA.md` contain historical/stale assertions, including outdated PDF path, old evidence counts, and obsolete descriptions of the avatar. Reconcile carefully against current files; don't replace factual scope with unverified achievements.

## Required release approach (no paid custom GitHub Actions dependence)
The user explicitly prohibits relying on quota-constrained custom GitHub Actions for every push to main. Respect Toby's prior no-custom-Actions workaround. Desired architecture:
1. Develop on topic branch; perform deterministic local or external independent CI checks before promotion.
2. `node scripts/release-check.mjs` must pass, including required full résumé and avatar integrity. Expand to visual/keyboard/accessibility and relative-link tests without introducing quota-dependent workflows.
3. Codex should investigate and document an **actually enforceable** main branch protection / ruleset with required externally reported status checks (if supported by plan), required review, and blocking unverified pushes. If unavailable, make this limitation explicit; a script run manually is NOT enforced CI. Do not assume status checks exist or forge status.
4. Promote only the tested artifact/commit to `main`. GitHub Pages branch publishing may trigger provider-managed deploy internally, but do not add a custom `.github/workflows` file or claim zero internal Pages Actions. Verify production SHA/assets after publication. For stronger deployment guarantees, propose or implement an independently hosted deploy runner (subject to actual permission and credentials) that tests, promotes and verifies; document the tradeoffs.
5. Keep the separate Cloudflare Worker deployment explicit, tested, and appropriately guarded; configure Cloudflare access using authenticated official integrations. Do not expose credentials.
6. Validate: live homepage 200, latest known content reflected, avatar PNG 200 and positioned to the **right** on desktop and ~390 px mobile, supplied PDF 200/actual download and three pages, no broken asset references, all local hyperlinks, accessible focus and contrast, AI Worker rate limit and safe response, four actual multi-turn interviews, absence of confidential material. Log actual results and timestamps.
7. Produce clear release report with commit SHA, tests run/number passed, failures, live URLs, and remaining blockers. No “deployed” claim if only commits or simulated tests exist.

## Scientific and editorial requirements
Position as an applied researcher and experienced MBA/healthcare/engineering professional, balancing evidence, organizational psychology, strategy, and accessible design. Prioritize clarity and measurable scope over slogans. Anchor Players First in Dartmouth Geisel MPH Applied Practice Experience / PFAC Toolkit and Hardball's testable IF/THEN/SO THAT rationale; label *proposed* player-centered extension, not measured MLB outcomes. Preserve verified dates/metrics. In the HTML résumé, list employment in reverse chronology (Amygdal.ai Feb 2024–Present, County SLO, CDC, Abbott, Deloitte); the downloadable full résumé is the exact user-supplied PDF even if its section organization differs. Do not introduce “recruiter language”, generic avatars, “research identity”, “original” in visitor-facing portfolio prose, or new marketing spin.

Branding: User likes Tampa Bay Rays navy/Columbia blue/yellow/white **only if legibility is verified**. The palette has been deferred relative to functional fixes; no unreviewed broad recolor. Benchmark accessible typography and hierarchy, and confirm WCAG AA text contrast (4.5:1 normal, 3:1 large), keyboard and mobile before changing visuals.

## Test commands
```bash
node scripts/release-check.mjs
node --check app.js
node --check ambassador/worker.js
node --test ambassador/test.mjs ambassador/interview-eval.mjs
node tests/smoke.test.js
```
A/B/C interview test work had **98/98 passes in an in-session JavaScript harness** after remediation, not certified live-model/production CI. Large seeded simulations were repeated draws over 345 validated variants, not millions of unique prompts or model calls. Re-run actual Node tests from cloned repo and report exact outcome.

## Deliverables / acceptance
- Illustrated avatar published at correct filename, visually verified in **upper-right**, no star or fallback pretending asset exists.
- User's actual supplied 3-page PDF published and downloaded by every **Download Michael’s Résumé (PDF)** action; no shortened PDF substituted.
- No custom GitHub Actions build dependency; documented enforceable (not merely aspirational) test → approve → promote → publish workflow, or explicit blockers.
- Passing local/external test evidence, live production checks, and honest final status.
- Changes scoped and reversible. Keep existing design, text accepted by user, live Hardball links, source integrity and confidentiality.
