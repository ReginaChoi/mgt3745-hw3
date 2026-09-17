# [Project Name]

<!-- Badges are optional but cheap. shields.io generates them from a URL. -->
![Status](https://img.shields.io/badge/status-in%20progress-yellow)
![Module](https://img.shields.io/badge/MGT%203745-HW3-051E39)

## What

An accounting student picks the career they are aiming at, sees the skills that path requires, and attaches evidence from a class, project, or internship to each one. A skill with attached evidence reads as evidenced; everything else reads as not yet evidenced. The problem this comes from is in [PROJECT.md](context/PROJECT.md); the specification and verification results are in [FEATURES.md](context/FEATURES.md).
 
The feature built here is F-03, the evidence log, traceable to the acceptance statement *WHEN a student attaches evidence to a skill, THE SYSTEM SHALL update its status to "evidenced."* It was chosen because an interview with a 2025 accounting graduate (INT-03) found she had no way to connect coursework to anything she could show an employer.

## See It Work

<!-- REQUIRED: at least one image or GIF of the feature meeting an EARS statement.
     Put media in the docs/ folder. Keep GIFs under 5 MB.
     Record: macOS Cmd+Shift+5, Windows Win+Alt+R or Snipping Tool video. Convert at ezgif.com.
     Markdown image syntax: -->
Put a screenshot or GIF under docs/ and link it here with descriptive alt text. Explain which acceptance criterion it demonstrates.
![Saving an entry and seeing it appear in the list](docs/demo.gif)

<!-- HTML gives you sizing control markdown does not: -->
<!-- <img src="docs/screenshot.png" width="480" alt="The entry list after three saves"> -->

## How to Run

Create your repository from the this HW3 template and name it `mgt3745-hw3`. The supplied app is a starter; adapt it to one feature from your own specification.
This project runs inside a GitHub Codespace. No local install.

1. On your repository page, click **Code → Codespaces → Create codespace on main**. Wait for setup to finish; first-boot time varies.
2. Keep the supplied `.devcontainer/devcontainer.json`. It configures Live Server installation and port 5500 forwarding. Once the extension is ready, right-click `index.html` and choose **Open with Live Server**, or use **Go Live**.
3. If a browser tab does not open, use the **Ports** tab to open port 5500. Keep its visibility **Private**.
4. With Live Server running, save your edits to reload the page.

If Live Server is unavailable, run `node scripts/serve.mjs` in the terminal, then open port 5500 from the Ports tab. Refresh the browser after edits when using this fallback; stop it with **Ctrl+C**. Run only one server on port 5500 at a time. The fallback also works locally with Node 22 or later. Serve over HTTP rather than opening `index.html` through `file://`.

<!-- The .devcontainer folder installs Live Server automatically. If the right-click option
     is missing, wait for the extension to finish installing (bottom-left status bar), or run
     `python3 -m http.server 5500` in the terminal and open port 5500 from the Ports tab.
     Edit these steps if your feature needs anything more. -->

## How It Works

<!-- GitHub renders Mermaid natively inside a ```mermaid fence. -->

```mermaid
flowchart TD
 A[Page opens] --> B[loadNotes: read and validate localStorage]
  B --> C[renderNotes: draw current state]
  D[User submits entry] --> E{Trimmed input is 1 to 200 characters?}
  E -->|No| F[Show validation error and keep input]
  E -->|Yes| G[Create proposed notes array]
  G --> H{saveNotes: storage write succeeds?}
  H -->|No| I[Show save error; keep input and current list]
  H -->|Yes| J[Update in-memory notes]
  J --> K[renderNotes: redraw list]
  K --> L[Clear input and announce saved]
```

This diagram describes the starter's load-and-add flow. Update it to match your implementation. In `app.js`, `loadNotes` reads stored data, `saveNotes` attempts to persist a proposed state, and `renderNotes` draws the current state using `textContent` for user text. The submit handler validates input and updates the visible state only after a successful save. Delete also saves the proposed state before redrawing. A read failure shows a warning and starts with an empty in-memory list; it leaves the original storage unchanged until a successful new save replaces it.

## Status

| Area | State | Why |
|------|-------|-----|
| Save and display | [Works / Partial / Broken / Not tested] | [Link your verification evidence] |
| Invalid input | [Works / Partial / Broken / Not tested] | [Link your verification evidence] |
| Data survives reload / storage failure | [Works / Partial / Broken / Not tested] | [Link your verification evidence] |
| Multi-user sync (starter limitation) | Deferred | Browser-local storage does not provide sync. Explain your own scope and decision in [ADR-001](context/ARCHITECTURE.md). |


<details>
<summary>Verification results (click to expand)</summary>

Keep the full verification record in [FEATURES.md](context/FEATURES.md). Summarize it here or link directly to its Verification section; keep both consistent.

| Criterion / EARS statement | Steps and input | Expected result | Observed result | Status | Evidence / commit |
|---|---|---|---|---|---|
| [Your selected criterion ID] | [Reproducible procedure] | [State before testing] | [What actually happened] | [PASS / FAIL / CANNOT TEST / DEFERRED] | [Link] |

Cover a normal action, relevant invalid input, and persistence or failure. PASS requires observed results that match expectations; all-PASS is acceptable with evidence. For CANNOT TEST, state the limitation and next step. Identify unselected requirements separately; DEFERRED does not waive the required HW3 feature. A screenshot alone cannot establish reload or storage-failure behavior.

</details>

## Links

Read in this order:

0. [`SCAFFOLD_MANIFEST.md`](SCAFFOLD_MANIFEST.md): explains what carries over from HW2 into HW3, along with a submission checklist
1. [`context/PROJECT.md`](context/PROJECT.md): the problem and its framing
2. [`context/USERS.md`](context/USERS.md): who this is for
3. [`context/FEATURES.md`](context/FEATURES.md): what it must do, and verification results
4. [`context/ARCHITECTURE.md`](context/ARCHITECTURE.md): the gate and ADR-001
5. [`context/STANDARDS.md`](context/STANDARDS.md): the rules this code follows
6. [`context/CLAUDE.md`](context/CLAUDE.md): the same rules, for agents

The scaffold has **eleven canonical files in `/context`: six active files above and five previews**: [STYLE.md](context/STYLE.md), [TOOLS.md](context/TOOLS.md), [SKILLS.md](context/SKILLS.md), [EVALS.md](context/EVALS.md), and [AGENTS.md](context/AGENTS.md). Keep the previews; verification stays in FEATURES.md until EVALS.md activates in Module 5.

Root README.md and the two instruction adapters—[CLAUDE.md](CLAUDE.md) and [.github/copilot-instructions.md](.github/copilot-instructions.md)—are additional files. Copy your HW2 USERS.md and FEATURES.md into `/context` and revise them using instructor feedback if available; otherwise record a peer criterion check and mark instructor feedback pending. Run `node scripts/check-scaffold.mjs` to check required file presence; this does not assess content quality.

## AI Use

<!-- A Delegation Decision Record without the name. From HW5 this becomes a formal DDR. -->

**Tool and task delegated:** [Which parts a tool drafted: e.g. "Copilot drafted render() and the CSS."]

**Why:** [The reason it made sense to delegate that part rather than write it.]

**How it was checked:** [What you inspected, what you changed, what you caught. "Replaced innerHTML with textContent" is the kind of sentence that belongs here.]

**Observed result / evidence:** [What the checks actually showed; link the relevant verification row, code change, or other evidence. Do not invent a run.]

If no AI assistance was used, say so and describe your independent check. Full Delegation Decision Records begin at HW5; this lightweight record is sufficient here.

**Instruction discovery and compliance:** [Record the tool and mode, which instruction adapter it discovered, and the reference or diagnostic evidence. Separately report whether one generated change followed the applicable standards. If no live AI tool is available, write “not run” and record a manual standards review.]

**Actual hours on this assignment (optional):** [A number, if you choose to report it. The amount or omission does not affect points; the AI-use record does.]

## Explain, Change, Verify

[Identify one function and explain its input, state changes, and output in your own words. Link a meaningful before/after code change, state its expected effect, and record the observed behavior and evidence. Explain why the change matters to your selected requirement. This paragraph is part of the existing README submission.]

<!-- Things this README could also do, if they earn their place:
     - GitHub alerts:  > [!NOTE]  > [!WARNING]  > [!TIP]
     - Task lists:     - [x] done   - [ ] not yet
     - Emoji:          :rocket: :white_check_mark:
     - Footnotes:      text[^1]  ...  [^1]: the note
     - Embedded HTML tables, <kbd>Ctrl</kbd>+<kbd>S</kbd>, <sup>, <sub>
     None are required. A README that reads well with none of them beats one that uses all of them. -->
