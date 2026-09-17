# Canonical agent instructions

Status: ACTIVE in Module 3. Read context/STANDARDS.md and the Scope section of context/FEATURES.md before editing anything. STANDARDS.md is normative; if an instruction here conflicts with it, report the conflict and repair this file rather than choosing between them.
 
Name variables and functions in descriptive camelCase that says what the thing is or what the action does. Keep conventional short names for loop indices and event parameters.
 
Put structure in index.html, presentation in styles.css, and behavior in app.js. Do not write `style=` attributes. Do not put JavaScript in the HTML beyond the tag that loads app.js. Wrap application code in an immediately-invoked function so nothing is added to the global scope.
 
When writing a comment, explain why the code exists. Do not restate what it does. Remove debug output before finishing.
 
Write commit messages that name the behavior that changed and the reason for it. Do not write messages that only name the files touched.
 
Insert any text a user typed using `textContent`. Never pass user-entered text to `innerHTML`. There is no exception to this, including when the text appears already validated.
 
Verify that behavior actually works before reporting it as done. Do not invent interview evidence, verification outcomes, or test runs. Leave the preview files in /context as previews.
 
Note: the accessibility and failed-write rule from STANDARDS.md is deliberately not in this file. The split test in STANDARDS.md found it task-specific, so it is supplied in the prompt when a task touches a form or a write path.

Root CLAUDE.md imports this file for Claude Code. VS Code Copilot uses the separate .github/copilot-instructions.md adapter. A location under /context alone is not a guarantee of automatic discovery.
