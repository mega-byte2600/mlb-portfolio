# MLB portfolio: code audit and acceptance gap register

Audit date: November 8, 2026. Scope: `mega-byte2600/mlb-portfolio` main branch; `index.html`, `app.js`, `styles.css`, `resume.html`, `evidence.html`, `athletic-background.html`, Cloudflare Worker, 20-entry evidence library, tests and deployment configuration. Compare with the complete locked `ACCEPTANCE_CRITERIA.md`. This is NOT the deferred 18:00 Work/Codex handoff.

## SEVERITY 0 — Must fix before external recruiter traffic

**SEC-001: Source-identifier presence is not factual grounding.** In `ambassador/worker.js` the model can generate any text followed by a valid `[S#]`; the Worker checks only membership in the retrieval set, then sets `grounded:true`. Four controlled mock-output scenarios returned grounded=true for fabricated experience, Yankees employment, relocation, and wins despite approved source identifiers. This is NOT proof that the live model said them. Add claim-sensitive refusals and structured evidence-constrained output validation; do not represent citation presence as verified truth. Test text that contains a real project plus a malicious instruction. P0.

**SEC-002: No server-side rate limits or abuse controls.** Origin/CORS checks are present, but browser Origin is not authentication and can be spoofed. Public endpoint can be scripted to consume free Workers AI quota. Add appropriate Cloudflare-native rate limiting, abuse handling and safe failures; verify behavior. P0 before broad public sharing.

**SEC-003: Unsupported preference and prompt-injection refusals are not reliably enforced.** Code has a narrow regex for personal salary and a general model prompt, but no comprehensive negative controls for relocation, availability, salary expectations, unverified achievements or system-prompt disclosure. Controlled adversarial tests found false answers can pass if a legitimate citation is injected. Correct fallback string must match challenge: "I don't have verified information about that." Add tests for exact user-supplied injection and refusal of both halves. P0.

**SEC-004: Chat privacy policy requires verification.** Local client holds recent history in memory and Worker does not explicitly persist chats, but no verified Cloudflare logging/retention configuration or production privacy notice confirms the challenge's no-store/no-log requirement. No sensitive user-provided records should be added. P0.

## SEVERITY 1 — Mandatory challenge acceptance criteria

**FIT-001: Role not identified as a specific job title in first viewport.** Home header says "BASEBALL / DECISION INTELLIGENCE", hero "Baseball is a decision problem", with multiple disciplines; no named searchable target. `Baseball Research & Development Analyst` is a proposed working title, **not yet explicitly confirmed by the user**. Align hero, metadata, résumé and prompts to ONE approved target. P1.

**FIT-002: Three top capabilities and direct proof links absent from 60-second scan.** Hardball featured, but not the challenge's three clear capability → evidence pairings or concise role match. Add evidence-backed cards/structure without burying key signal. P1.

**FIT-003: Project format/order incomplete.** Home proof list currently starts with 2018 demo, then Abbott, Deloitte, MBA, while PFAC/leadership and Hardball are elsewhere. Each selected project must explicitly show problem, contribution, evidenced tools, result and limits; optimize relevance to single baseball role. P1.

**DOC-001: No downloadable PDF résumé.** `resume.html` provides "Print / Save as PDF", but recursive git tree contains no `.pdf` and home links HTML only. Add purpose-built recruiter-ready public PDF with approved contact/sensitive-data omissions and working download link. P1.

**CHAT-001: Only three starter questions.** Home currently has Hardball, AI experience and Players First. Required four: role fit, project, measurable outcome, and leadership. P1.

**EVD-001: Not every source link supports its cited facts.** `S9` links to public `resume.html` but +6.9/+7.1/+2.5 WAR claims appear in the user-provided November résumé, **not** in that public HTML; `S10` cites Eleos specifics absent from public HTML. A URL plus author-supplied facts is not independent verification. Build a public, reviewed claim ledger with exact supporting excerpt, basis/status and traceable relevant link, or omit publicly unsupported detail. Check other entries likewise. P1.

**CHAT-002: Retrieval can misrank or overfocus generic queries.** Token overlap only, up to four sources. Some broad recruiter questions retrieve unrelated sources, while unknowns depend on matching policy. Add deterministic evaluation cases, source prioritization for role and project, more robust follow-up and not-enough-evidence handling; do not pretend source matching proves answer truth. P1.

**CHAT-003: Client referral/fallback UX needs a negative-answer quality gate.** Frontend only displays referral when `grounded:false`; citation-bearing unsupported answers can bypass it. Ensure evidence-grounded fallback on unsupported salary, relocation, achievements, and references, with reviewed LinkedIn/GitHub/project/resumé/contact links. P1.

## SEVERITY 2 — Release quality and proof

**QA-001:** No evidence of 390px mobile screenshot review, desktop screenshot review, keyboard-only walkthrough or contrast/accessibility audit. CSS contains media queries and focus styles, but no device-level verification. P2.
**QA-002:** No documented two meaningfully different visual design directions and chosen rationale. Preserve working visual features. P2.
**QA-003:** No independent recruiter/friend 60-second scan and recorded results. P2.
**QA-004:** No evidence of 1,000,000-run stress harness or completed live evaluation suite. The repository has approximately 18 test cases at audit time; 20/20 static topic probes pass in in-session analysis, not a million model completions. Design deterministic, seeded, reproducible simulation separately from low-volume real AI evaluations. P2.
**OPS-001:** Live GitHub Pages and latest Cloudflare Worker content have NOT been independently verified during this audit; web fetch did not reach URLs. Earlier user screenshots verified an earlier successful Worker response. GitHub commits are not automatically deployed to Workers. P1.
**OPS-002:** `README.md` still describes an earlier prototype and says the AI is undeployed or disabled in some sections; update after verified publication so the repo is internally consistent. P2.
**OPS-003:** External links need live verification, especially public Google Drive sharing, LinkedIn, résumé download, Hardball dashboard and PFAC Toolkit; tests currently check local files rather than HTTP availability. P2.

## Evidence already preserved
- Separate repository; no changes to Hardball or PFAC.
- 20 approved-source summaries with provenance status fields.
- Real Cloudflare Workers AI architecture; secrets server-side; origin and input checks; citation-linked UI.
- Earlier live screenshot showed a genuine model answer with `grounded:true` and approved source.
- 20 of 20 deterministic retrieval topic probes found their intended source (evaluated in-session, not formal CI).
- Exact recruiter acceptance contract committed separately at `ACCEPTANCE_CRITERIA.md`.

## Priority plan
1. **Security and factual grounding**: fix unsupported-claim failure modes, challenge injection, refusal phrase, rate limiting, logging/privacy, and require evidence linkage beyond ID presence.
2. **Challenge essentials**: user-approved single role; three proof points above fold; public PDF download; four starter questions; project matrix.
3. **Reconcile provenance**: inspect all 20 records against publicly accessible excerpts, normalize self-reported/source-backed claims, privacy scrub.
4. **Build deterministic reliability tests**, seeded adversarial and fuzz/stress harness, then budgeted real-model scenario suite.
5. **Design/device/peer QA**, live Pages + Workers deployment verification, submission checklist.
6. **Prepare final Work/Codex handoff at 18:00 Pacific**, not before.

Audit status: findings confirmed by GitHub code inspection and controlled simulations, except externally hosted availability and model behavior, which remain unverified in this audit.
