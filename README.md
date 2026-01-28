# TaskStack

TaskStack is a local-first “task stack” (LIFO) that helps you resume context quickly when you get interrupted.

It is intentionally **not** a backlog manager and **not** a prioritized task list. The goal is to make it fast to:

- Start what you’re focusing on right now
- Switch to a new interruption without losing the previous context
- Return to a prior task with the right notes/history

## Repo Structure

- `web/TaskStack/` — Angular application source
- `docs/stories/` — user stories + acceptance criteria
- `local-docs/` — local-only notes (may include private/non-source-controlled docs)

## License

This repository is published for viewing and personal learning/evaluation only. Redistribution is not permitted. See [LICENSE](LICENSE).

## Run the App (Angular)

From `web/TaskStack/`:

- Dev server: `ng serve`
- Build: `ng build`
- Unit tests: `ng test`

Then open `http://localhost:4200/`.

## Product Notes

TaskStack maintains a single **Active** task at the top of a stack:

- Start a task → it becomes active (top of stack)
- Resume a task from within the stack → it becomes active
- Complete (pop) the active task → it moves to Archive, preserving history
