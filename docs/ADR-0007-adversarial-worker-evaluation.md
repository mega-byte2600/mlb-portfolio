# ADR 0007: Adversarial evaluation is a release gate for the AI Ambassador

Status: Accepted

Date: 2026-11-10

## Decision

The AI Ambassador Worker must pass the adversarial regression suite before a production release is considered ready. The suite is a deterministic contract test for the portfolio's evidence, refusal and bounded-agent behavior. It is not a claim that every possible model response has been evaluated.

The gate includes category-based probes for prompt injection, citation laundering, privacy requests, unsupported MLB affiliation, entity confusion, conflict versus priorities, CliftonStrengths blind spots, follow-up contamination, allowlisted actions, email confirmation, arbitrary navigation, malformed input and malicious model output.

The evaluation approach is informed by established open-source projects including NVIDIA garak, DeepEval and promptfoo. Their general evaluation patterns are adapted to this Worker because the portfolio requires provenance controls and a fixed allowlist of public actions.

## Release rule

Run `npm --prefix ambassador run test:all` and `node scripts/release-gate.mjs` from the repository root. A release is blocked by any failure in the baseline regression suite, the interview suite, the adversarial suite, static smoke checks, exact asset checks or live smoke checks.

The current adversarial fixture set contains 20 probes and must remain versioned in `ambassador/adversarial-cases-v2.json`. New Worker capabilities require new positive and negative cases before deployment.

## Consequences

This protects the distinction between conversational evidence retrieval and bounded agentic proposals. It also makes security and accuracy regressions visible in code review. The suite does not replace human mobile, accessibility or visual review, and it does not replace live deployment verification.

## Automation boundary

The repository now contains the canonical gate and its tests. Cloudflare Workers Builds must be configured to invoke the canonical gate before `wrangler deploy`; that dashboard setting is external to the repository and must not be represented as complete until a successful build log proves it.
