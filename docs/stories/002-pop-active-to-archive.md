# 002 — Pop Active Task to Archive

## Story
- As a user, I want to pop (complete) the active task when I’m done so it moves to an Archive list where I can view its history later.

## Definition (Behavior)
- **Pop** means: take the current top-most Active task, mark it completed, move it to Archive, and reveal the next task in the stack as the new Active task (if any).

## Acceptance Criteria
- Given there is an active task, when I click a **Complete/Pop** action, then that task is removed from the Active stack and appears in the Archive.
- Given there are paused tasks beneath the active task, when I pop the active task, then the next task becomes the new active task.
- Given the active stack becomes empty after popping, then the UI shows an empty-state for Active (e.g., “Active stack clear”).
- The archived task retains:
  - title
  - notes
  - status note (if present)
  - event history (timestamps/events)
  - completed timestamp/event
- The Archive view allows me to:
  - see a list of archived tasks
  - open a task to view its details/history (read-only is acceptable for v1)

## UI/UX Notes
- Primary button label recommendation: **Complete** (with smaller text/tooltip: “Pop to Archive”).
- Optional keyboard shortcut later: `C` (complete) when focus is in the Stack view.
- After pop, selection should move to the new active task (if any).

## Data Notes
- Pop should append an event like `{ type: 'completed', time: <now> }`.
- Archived tasks should be excluded from the active stack ordering.
