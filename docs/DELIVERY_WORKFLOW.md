# Delivery Workflow

This repository uses the shared Raghvendra Skill Stack.

## Standard path

Task -> feature branch -> Cursor implementation -> self-audit -> pull request -> CI -> human approval -> merge -> deployment -> production verification.

## Branch rule

For meaningful changes, do not work directly on `main`. Use a short-lived branch such as:

- `feat/<name>`
- `fix/<name>`
- `content/<name>`
- `ops/<name>`

## Completion rule

Apply the shared `definition-of-done` and `pre-ship-check` skills before declaring work complete.

A commit is evidence that code changed, not evidence that the feature works.

If CI, testing, accessibility, production verification, or another required check is skipped, record the reason in the pull request.
