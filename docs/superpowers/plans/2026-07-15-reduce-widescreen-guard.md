# Reduce Widescreen Guard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Shorten the player-mode guard to three seconds and allow at most one reapplication so users can leave widescreen sooner.

**Architecture:** Keep the existing `MutationObserver` and 800 ms polling design. Change only the guard duration and retry ceiling, then document the new behavior in the README.

**Tech Stack:** JavaScript userscript, Markdown, Node.js syntax checker, PowerShell (`pwsh`)

---

### Task 1: Tighten the player-mode guard

**Files:**
- Modify: `bilistudy.user.js:655-674`
- Modify: `README.md:58-64`

- [ ] **Step 1: Verify the current values**

Run:

```powershell
pwsh -NoProfile -Command "rg -n 'guardUntil|reapplyCount >=|初始化保护' bilistudy.user.js README.md"
```

Expected: the script contains a 12000 ms guard and a retry ceiling of 3.

- [ ] **Step 2: Apply the minimal implementation**

Change the guard configuration to:

```js
const guardUntil = Date.now() + 3000
let reapplyCount = 0
```

and change the stop condition to:

```js
if (Date.now() > guardUntil || reapplyCount >= 1) {
```

Update the nearby comment and README to state that initialization protection lasts three seconds and reapplies at most once.

- [ ] **Step 3: Run syntax and static checks**

Run:

```powershell
pwsh -NoProfile -Command "node --check bilistudy.user.js; rg -n 'Date\.now\(\) \+ 3000|reapplyCount >= 1|3 秒|一次' bilistudy.user.js README.md; git diff --check"
```

Expected: Node exits successfully; the new values and documentation are found; `git diff --check` reports no errors.

- [ ] **Step 4: Review the scoped diff**

Run:

```powershell
pwsh -NoProfile -Command "git diff -- bilistudy.user.js README.md"
```

Expected: only the guard values, directly related comments, and README explanation change.

- [ ] **Step 5: Commit the implementation**

Run:

```powershell
pwsh -NoProfile -Command "git add -- bilistudy.user.js README.md docs/superpowers/plans/2026-07-15-reduce-widescreen-guard.md; git commit -m 'fix: shorten widescreen mode guard'"
```

Expected: one implementation commit is created.

- [ ] **Step 6: Push both local commits**

Run:

```powershell
pwsh -NoProfile -Command "git push origin main"
```

Expected: `origin/main` advances to the implementation commit.
