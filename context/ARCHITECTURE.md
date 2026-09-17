# Architecture

Status: ACTIVE in Module 3.

## Gate

**Feature under decision:** F-03, the evidence log. A student selects a skill, attaches a short piece of evidence from coursework or an internship, and the skill's status changes to evidenced. This traces to the acceptance statement "WHEN a student attaches evidence to a skill, THE SYSTEM SHALL update its status to 'evidenced.'"
 
**Hard constraints:** budget is zero; one week to working; the data is a student's own coursework history and stays in their browser; I am a first-time coder, so I have to be able to read whatever ships.
 
**Three concrete options:** hand-build three files (HTML, CSS, JavaScript) with browser storage; use an existing service (an Airtable base or Google Form feeding a sheet); or have Copilot generate the feature from my specification and review the output.
 
**Anchors.** A score of 5 is always most favorable.
 
| Criterion | 1 means | 3 means | 5 means |
|---|---|---|---|
| Cost to start | Paid plan required now | Free tier plus account setup | No cost, no account |
| Cost to maintain | Ongoing fee or constant upkeep | Occasional upkeep by me | Essentially none at this size |
| Time to working | More than a week | Two to three days | Working the same day |
| Inspectability | I cannot see or follow the code | I can follow some of it | I can read and explain every line |
| Switching cost | Data trapped, rebuild from scratch | Export possible but messy | Throw it away and lose nothing |
| Fit to spec | Cannot express the spec's states | Most of the spec, awkwardly | Exactly what the spec describes |
 
| Criterion | Weight | Hand-built option | Existing-service option | AI-assisted build |
|---|---:|---:|---:|---:|
| Cost to start | 4 | 5 (20) | 3 (12) | 4 (16) |
| Cost to maintain | 3 | 3 (9) | 4 (12) | 3 (9) |
| Time to working | 4 | 3 (12) | 5 (20) | 4 (16) |
| Inspectability | 5 | 5 (25) | 2 (10) | 2 (10) |
| Switching cost | 2 | 5 (10) | 2 (4) | 4 (8) |
| Fit to spec | 5 | 5 (25) | 2 (10) | 3 (15) |
| **Total** | | **101** | **68** | **74** |
 
Weights were fixed before any option was scored. Inspectability carries the highest weight alongside fit to spec because this course grades attestation, and I cannot attest to code I cannot read. That same fact is why the AI-assisted column scores 2 rather than 4 on inspectability: a confident reader would score it higher, and for them the arithmetic would look different. Scoring it high for myself would be flattering rather than accurate.
 
**Estimates behind the scores.** Hand-built time to working is scored 3 on an estimate of six to eight hours, which is slow for roughly 120 lines but realistic for a first build. The existing-service option scores 2 on fit because neither Airtable's free tier nor a Google Form expresses a per-skill evidenced / not-yet-evidenced state without manual formula work; it stores rows, and the spec needs states.
 
**Sensitivity check.** The result depends most on the inspectability weight, so I re-ran the totals with that weight dropped from 5 to 2, the value it would take if I were a fluent code reader. Hand-built 86, AI-assisted 68, existing service 62. The ranking does not change, so the decision is not an artifact of my inexperience; hand-building wins on fit to spec and switching cost regardless.

## ADR-001

**Title and date:** ADR-001: Hand-build the evidence log as three static files with browser localStorage. 9/17/2026
 
**Status:** Accepted
 
**Door / concrete acquisition and execution choice:** Build. Three files at the repository root (index.html, styles.css, app.js), no framework, no dependencies, no server, with state persisted to localStorage under a single namespaced key.
 
**Context:** The budget is zero and the deadline is one week. The spec needs a per-skill state that changes when evidence is attached, which a generic form-and-spreadsheet service stores only awkwardly. The data is one student's own record and never needs to leave their browser, so there is no requirement that justifies a server or an account. Against that, I am a first-time coder, which makes hand-building the slowest option and makes reviewing generated code unreliable, since I would be approving work I cannot actually check. The course also requires that I be able to inspect a delegated build later, and I have not built one yet.
 
**Decision:** I will hand-build the evidence log as three static files with localStorage persistence, implementing Behavior steps 1 through 5, and defer the in-progress state, the export, and the inactive-path rule.
 
**Consequences and revisit trigger:** 
Easier: I can read and explain every line, so my verification section reports what I actually observed rather than what I hoped. Switching is nearly free, since three files with no dependencies can be discarded. Fit to the selected F-03 feature is strong because I wrote the implementation directly against the feature's required behavior. The deferred states and export are outside this HW3 build slice.
 
Harder, and what this fails to do: localStorage is per-browser and per-profile, so a student who uses a lab machine and then a laptop sees two unrelated records, and clearing browser data destroys everything with no recovery. That is a real failure of the tool's actual purpose, since evidence a student cannot retrieve at interview time is not evidence. The build also does not address what INT-03 identified as her real gap. She did not lack a way to record experience; she lacked the internship. A tool that logs evidence cannot create any, and no architecture choice fixes that.
 
Revisit trigger: when Module 4 introduces a database, or sooner if a second interview confirms that students use more than one machine. At that point this ADR is marked Superseded by ADR-002; the reasoning above was still true under a zero budget and a one-week deadline.
