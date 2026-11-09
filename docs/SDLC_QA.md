# SDLC quality gates

This portfolio uses a test, verify, publish and observe release cycle. Cloudflare Workers Builds remains the Worker deployment system and GitHub Pages remains the static-site publication system. The Worker uses a native Cloudflare Cron Trigger for recurring production verification; no scheduled GitHub Action is required.

## Before merge

The available quality gate runs syntax checks, regression tests, static smoke checks, deterministic stress checks, credential-pattern scanning and dependency review when invoked.

## After deployment

The Worker native Cron Trigger runs every six hours and checks the live Worker endpoint, including evidence grounding, exact assets, bounded actions and refusal boundaries.

A failure is a release signal recorded by Cloudflare scheduled invocation history. It is not silently converted into a pass.

## Human release checks

Automated checks do not replace desktop and approximately 390px mobile review, keyboard focus order, reduced-motion behavior, touch target size, contrast, external links, actual PDF download and the four recruiter scenarios.

## Evidence standard

A passing check proves only the contract that check exercises. Live model answers remain bounded by the approved evidence ledger, and claims remain distinguished as firsthand, externally documented or proposed.
