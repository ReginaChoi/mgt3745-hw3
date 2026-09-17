# Standards

Status: ACTIVE in Module 3.
 
These are the rules this project's code follows.
 
1. **Naming.** Variables and functions use descriptive camelCase that names the thing or the action: `savedEvidence`, `renderSkills`. Conventional short names are fine where the role is obvious, such as `event` in a handler or `index` in a loop.
2. **File structure.** Structure lives in index.html, presentation in styles.css, behavior in app.js. No `style=` attributes, no script in the HTML beyond the tag that loads app.js. All application code sits inside one immediately-invoked function so nothing leaks to the global scope.
3. **Comments.** Comments explain why a line exists when the reason is not obvious from reading it. They do not restate what the code does. Debug output is removed before committing.
4. **Commit messages.** A commit message names the behavior that changed and why, not the files touched: "Preserve input text when a save fails" rather than "update app.js."
5. **Forbidden pattern.** Student-entered text reaches the page through `textContent` only. `innerHTML` is never used with any value a user typed. This is a hard rule with no exception.
6. **Accessible feedback.** Every form control has a `<label>`. Success and error messages are announced through a live region rather than appearing silently, and a failed write leaves the student's unsaved text in the input.
If this file and context/CLAUDE.md ever disagree, **STANDARDS.md is the source of truth.** The conflicting instruction gets repaired rather than quietly followed.
