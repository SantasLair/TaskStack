# 003 — Resume a Task from Within the Stack

## Story
- As a user, I want to make a task that is currently somewhere down in the stack become the active (top) task so I can resume it quickly.

## Definition (Behavior)
- **Resume from stack** means: select a paused task within the stack and promote it to the top (Active).
- Any tasks that were above it remain in the stack but are pushed down (their relative order stays the same).

### Example
- Before: `[A (active), B, C, D]`
- Resume `C` → After: `[C (active), A, B, D]`

## Acceptance Criteria
- Given the stack contains an active task and one or more paused tasks, when I choose a paused task to resume, then that task becomes the new active (top) task.
- When resuming a task from within the stack, then:
  - tasks that were above the resumed task remain in the stack and move below the new active task
  - tasks below the resumed task remain below it
  - the relative order of all other tasks is preserved
- When a task is resumed, then an event is added to that task’s history indicating it was resumed (timestamped).
- After resuming, the UI workbench displays the resumed active task.

## UI/UX Notes
- Recommended interaction: a **Resume** action on each paused task card (button/menu).
- Optional later: drag a paused task to the top position to resume.

## Data Notes
- Add event like `{ type: 'resumed', time: <now> }`.
- This action does not create or delete tasks; it only changes ordering and active selection.
