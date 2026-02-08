# TaskStack

TaskStack is a local-first “task stack” (LIFO) that helps you resume context quickly when you get interrupted.

## License

This repository is published for viewing and personal learning/evaluation only. Redistribution is not permitted. See the `LICENSE` file at the repo root.

It is intentionally **not** a backlog manager and **not** a prioritized task list. The goal is to make it fast to:

- Start what you’re focusing on right now
- Switch to a new interruption without losing the previous context
- Return to a prior task with the right notes/history

## Core Concept

At any moment there is a single **Active** task at the top of the stack.

- Starting a new task pushes the current active task down the stack (paused) and makes the new task active.
- Resuming a task from within the stack promotes it to the top.
- Completing the active task removes it from the stack and moves it to **Archive**, preserving its history.

This makes the active stack a short-lived “working memory” buffer — ideally it trends toward empty at the end of the day.

## Workflow (Typical)

1. **Start task**: type a title and hit Enter → becomes the active task.
2. **Interrupted**: start a new task → the previous task remains just below it.
3. **Resume**: pick a task lower in the stack → it becomes active again.
4. **Complete**: pop the active task → it moves to Archive so you can look back later.

## Data & History

Each task keeps a lightweight event history (e.g., started/resumed/completed timestamps). This is meant to preserve context without requiring heavy process.

## Local-first

TaskStack is designed to run without a server.

- Early versions may use in-memory state.
- Persistence is planned via “simple file storage” (a user-selected `*.taskstack.json` file).

## Project Notes

- Stories and acceptance criteria live in `docs/stories/`.
- The app is built with Angular.

## Development

This project was generated using Angular CLI.

### Dev server

```bash
ng serve
```

Open `http://localhost:4200/`. The app reloads on source changes.

### Build

```bash
ng build
```

Outputs to `dist/`.

### Unit tests

```bash
ng test
```

### Angular CLI help

```bash
ng generate --help
```
