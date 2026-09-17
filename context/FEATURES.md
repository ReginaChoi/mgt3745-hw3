# Features and specification

Status: ACTIVE. 

## Context
The situation, job, and desired progress: An accounting student wants a long-term career in a field like audit, forensic accounting, or a government role such as the IRS, but has no reliable way to tell which skills that path actually requires or to show evidence of having built them. INT-03, a 2025 accounting graduate, confirmed the first half directly: she never figured out which skills to develop, graduated with no internship, and is currently unemployed. She also contradicted the AI premise this project started from in HW1: asked whether AI changed how she prepared or how she viewed accounting jobs, she said no. The AI-anxiety framing is therefore carried as an open hypothesis, not a finding.

## Users
Profiles and evidence in USERS.md. PROFILE-01 (accounting student or recent graduate) is the target user and is now evidenced directly by INT-03, an accounting graduate, rather than assumed. PROFILE-02 (Inventory Specialist, INT-02) remains as indirect evidence for tracking behavior, though INT-03 challenges how far that behavior transfers to students.

## Scope and non-goals
Included behavior: an accounting student picks a career path, sees the skills that path requires, attaches evidence from coursework or internships to a skill, and sees that skill's status change from not yet evidenced to evidenced.
 
Non-goals: does not predict which jobs AI will eliminate, guarantee employment, find or create internships, claim any skill stays valuable long-term, choose a career path for the student, replace a degree or advisor, or compare students against each other.
 
**Full product scope vs. HW3 implementation.** FEATURES.md describes six candidate features (F-01 through F-06). HW3 implements only F-03, the evidence log, as three static files with browser storage; see ADR-001 in ARCHITECTURE.md for why this one feature and this architecture. F-01, F-02, F-04, F-05, and F-06 remain specified below but unbuilt. Within F-03 itself, Behavior steps 1 through 5 are implemented and steps 6 and 7 are deferred.

### Kano hypotheses
| Feature ID | Feature | Kano hypothesis | Segment / date | Evidence and reasoning |
|---|---|---|---|---|
| F-01 | Skill list tied to a chosen career path | Must-be (revised, was Performance) | Accounting students / 9/17/2026 | Upgraded on direct evidence: INT-03 never identified the skills her target career needed, and named seeing relevant skills as the part of this tool she would find most useful. |
| F-02 | Progress tracker across skills | Performance (revised, was Must-be) | Accounting students / 9/17/2026 | Downgraded on direct evidence: INT-03 never tracked skills and said she never thought to. The Must-be label came from INT-02, who is not in this segment. Useful, not load-bearing. |
| F-03 | Evidence log linking coursework or internships to a skill | Attractive | Accounting students / 9/17/2026 | INT-03 had no way to connect coursework to anything she could show an employer, and did not ask for one. Unrequested but addresses a gap she named in hindsight. **Selected for HW3.** |
| F-04 | Automated reminders to revisit stale skills | Indifferent | Accounting students / 9/10/2026 | Not requested by any participant. Labeling honestly rather than as Attractive. |
| F-05 | Peer comparison of skill progress | Reverse | Accounting students / 9/10/2026 | Unchanged, but the reasoning has weakened: it rested on students being anxious about AI, and INT-03 reported no such anxiety. Held as Reverse on the separate ground that comparison against peers who have internships would discourage a student who has none. |
| F-06 | Exportable skill summary (resume or portfolio format) | Attractive | Accounting students / 9/17/2026 | INT-03's stated reason for wanting the tool at all was "hopefully I'd get a job," which points at output an employer can see rather than at tracking for its own sake. |

## Behavior
Sequence, conditions, actions, and visible outcomes for F-03. Steps 1 through 5 are implemented in HW3; steps 6 and 7 are deferred (see ADR-001).
 
1. The page loads and reads any previously saved evidence from browser storage.
2. The student selects a career path from the available paths.
3. The system displays the skills associated with that path, each marked not yet evidenced or evidenced.
4. The student selects a skill and enters a short description of evidence from coursework, a project, or an internship.
5. The system saves the evidence, marks that skill evidenced, and redraws the list. If the save fails, the entered text is preserved and an error is shown.
6. The student marks a skill in progress as an intermediate state between not yet evidenced and evidenced. (Deferred.)
7. The student exports a summary of evidenced skills. (Deferred.)

## Constraints
Platform, data, privacy, scope, and relevant limits: this is a tracking system, not a forecaster of which jobs AI will automate. It must distinguish a skill with attached evidence from one the student merely claims. Skill data stays private to the student's own browser by default; no peer comparison without opt-in. The path and skill lists must be editable, since what counts as relevant will change. The system must not present itself as a substitute for coursework, internships, or an advisor. Student-entered text must be rendered as text, never as markup.

## Acceptance
- AC-1, event-driven: WHEN a student selects a career path, THE SYSTEM SHALL display its skills within 2 seconds.
- AC-2, event-driven: WHEN a student attaches evidence to a skill, THE SYSTEM SHALL update its status to "evidenced."
- AC-3, unwanted: IF a student submits evidence with no skill selected or with empty text, THEN THE SYSTEM SHALL show an error and preserve the entered text.
- AC-4, unwanted: IF the save fails, THEN THE SYSTEM SHALL keep the entered text on screen and name the reason.
- AC-5, state-driven: WHILE a skill has no attached evidence, THE SYSTEM SHALL display it as "not yet evidenced."
- AC-6, state-driven: WHILE peer comparison is disabled, THE SYSTEM SHALL NOT display any other student's data.
- AC-7, optional: WHERE a career path is inactive, THE SYSTEM SHALL still preserve evidence logged under it. **Not implemented in HW3** (see Scope); no UI exists to mark a path inactive. Classified separately below.

## Verification

| Criterion | Steps and input | Expected result | Observed result | Status | Evidence / commit |
|---|---|---|---|---|---|
| Your selected ID | Reproducible procedure | Before running | Actual observation | PASS / FAIL / CANNOT TEST / DEFERRED | Link |

Cover a normal action, relevant invalid input, and persistence or failure. Classify unselected requirements separately. Record actual outcomes; all-PASS is acceptable with evidence.
