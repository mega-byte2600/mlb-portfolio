# SDLC quality gates

This portfolio uses a test, verify, publish and observe release cycle. Cloudflare Workers Builds remains the Worker deployment system and GitHub Pages remains the static-site publication system. GitHub Actions provides repeatable quality checks and post-deployment verification; it is not the production host.

## Before merge

The Quality Gate workflow runs on pull requests and pushes to main.

1. Syntax and release checks run through scripts/release-check.mjs.
2. Node regression tests cover evidence provenance, refusal boundaries, multi-turn behavior, actions, malformed input, rate limiting and source integrity.
3. Static smoke checks cover links, required assets, accessibility-sensitive markup and production paths.
4. Deterministic interview stress checks exercise the approved question bank and paraphrase expectations.
5. Retrieval stress checks exercise repeated source selection and refusal behavior.
6. Tracked text is scanned for common credential patterns.
7. Pull requests receive dependency-change review.

The release gate is deterministic. It does not claim to certify every possible model output or browser configuration.

## After deployment

The Production Verification workflow is manually runnable and scheduled daily. It checks the live Pages and Worker endpoints, including:

1. Homepage availability and current Ambassador copy
2. Exact résumé PDF hash and approved avatar hash
3. Strengths and blind-spot evidence grounding
4. Distinct interpersonal-conflict and competing-priorities answers
5. Allowlisted LinkedIn and résumé-email action proposals
6. Confirmation requirements for email preparation
7. Salary and prompt-injection refusal boundaries

A failure is a release signal. It is not silently converted into a pass.

## Reversibility

The repository keeps production changes as individual commits. If a release fails live verification, stop further promotion, identify the first failing commit, and restore the last verified commit through a reviewed Git operation. Do not delete evidence or overwrite the supplied résumé and avatar with substitutes.

## Human release checks

Automated checks do not replace visual and accessibility review. Before a competition submission, review the first screen at desktop and approximately 390px, keyboard focus order, reduced-motion behavior, touch target size, contrast, external links, actual PDF download and the four recruiter scenarios. Record any failure before calling the release ready.

## Evidence standard

A passing check proves only the contract that check exercises. Live model answers remain bounded by the approved evidence ledger, and claims remain distinguished as firsthand, externally documented or proposed.
