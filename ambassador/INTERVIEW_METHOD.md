# A/B/C Recruiter Interview Evaluation Method

Prepared 2026-11-08. This is a **test framework**, not a psychological profile, an employment assessment, or a claim that proprietary Harvard/Wharton/Tuck textbooks have been read. It is based on publicly verifiable school curricula and OPM interview guidance. The 69 authored questions are **not** represented as a statistically verified national ranking of the most common interview questions.

## A — Structured HRM / MBA organizational behavior

Sources:
1. U.S. Office of Personnel Management, [Structured Interviews](https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/) and [developing questions](https://www.opm.gov/frequently-asked-questions/assessment-policy-faq/structured-interviews/how-do-i-create-structured-interview-questions/). OPM recommends job-analysis-linked competencies, open-ended questions, consistent rating anchors and situation/task/action/result (STAR) evidence.
2. Harvard Business School, [Leadership and Organizational Behavior (LEAD)](https://www.hbs.edu/faculty/units/ob/Pages/curriculum.aspx): individuals, teams, performance, influence without formal authority, organizational change, leadership.
3. Wharton MBA, [MGMT 6100 Foundations of Teamwork and Leadership](https://mgmt.wharton.upenn.edu/programs/mba/course-descriptions/): team leadership, organizational awareness, teamwork simulation.
4. Dartmouth Tuck, [Managing People (MP)](https://tuck.dartmouth.edu/courses/mgmt-mp): motivation, team decision-making, interpersonal relations, team structure and social networks.

Use these sources to define **competencies** and behavioral prompts; never imply the school endorses the portfolio or personally evaluated the candidate. The candidate's evidence must remain separate from interview-method scholarship.

Recommended evaluation anchors for a **later independent recruiter review**: 1 = no relevant job example, 2 = general actions with weak specificity, 3 = specific relevant actions, 4 = evidence-linked context/action/outcome with honest limits, 5 = clear, verifiable, role-relevant context/action/result with trade-off awareness. **These are authored rubric anchors, not official OPM rating benchmarks.**

## B — Cross-industry common interviews

Test introductions, résumé walkthrough, motivation and role fit, career story, technical projects, results, leadership, strengths and appropriate source links. Unsupported questions about compensation, relocations, availability, reasons for leaving jobs, conflict, and failures must say **"I don't have verified information about that."**

Use a recruiter-readable response order: (1) answer the question, (2) name specific project/action, (3) distinguish measured impact vs author-reported estimate or projection, (4) link the actual source, (5) suggest a relevant follow-up or direct contact when evidence is incomplete.

## C — Strengths, work style, judgment

Gallup CliftonStrengths Top 5 assessment provided by the candidate: Restorative, Belief, Responsibility, Learner and Individualization (dated July 22, 2025). Use this only as assessment-based self-description. It is **not** a clinical diagnosis, job performance validation or stand-in for work examples.

Firsthand statements include a dependability standard: Michael reports never arriving late **without notifying the appropriate person**, which is NOT "never late" or a verified perfect-attendance percentage.

Be open to evidence-based ethical-dilemma, disagreement, uncertainty, adaptive learning and accountability questions; refuse invented details about emotions, psychology, and workplace conflicts.

## Privacy and answer integrity

The Ambassador's source records are in `sources.js`, each marked public/author-reported/dated private source/proposal. It may never publish restricted employer materials, personal chats, patient information or private contact details. The **professional headshot remains on LinkedIn only**. A valid citation token alone is insufficient to validate a model's invented text; current Worker deliberately publishes curated evidence text rather than unrestricted model-generated claims.

## Reproducible evaluation

- `node --test ambassador/test.mjs ambassador/interview-eval.mjs`
- `node --test ambassador/adversarial-eval.mjs` for the 20-case adversarial Worker contract suite.
- `node ambassador/interview-simulations.mjs`
- `node ambassador/interview-stress.mjs 10000000` for the **much slower** direct-selector 10M benchmark.
- Evidence routing: 69 substantive scenarios (18 HR/MBA, 26 common, 20 work style, 5 adversarial), 5 phrasing prefixes, 345 verified combinations.
- Latest in-session benchmark: 10M seeded draws over the prevalidated 345 combinations passed; 250k separate direct retrieval/refusal calls passed. The seeded draws are **not** 10M direct function evaluations, unique questions, model inferences or training examples.
- Must still independently validate live Workers AI, 390px/mobile accessibility, recruiter usability, source-link availability, and provider controls after deployment.

## Future evidence enrichment

With explicit candidate permission, expand the evidence register with answered behavioral questions about failure, conflict, biggest weakness, feedback, reasons for leaving specific roles, and ethical judgment. Preserve the exact candidate words first; do not invent results or fill missing specifics. Approve public version before deploying.
