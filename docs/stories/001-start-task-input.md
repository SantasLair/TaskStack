# 001 — Start Task via Quick Input

## Story
- As a user, I want a quick “Start task” text box on the Stack page so I can begin a new focus item with minimal friction.

## Acceptance Criteria
- Given I am on the Stack page, when I type a task title and press Enter, then a new task is created and pushed to the top of the stack as the active item.
- Given I am on the Stack page, when I type a task title and click a Start button, then the same behavior occurs as pressing Enter.
- Given there is an existing active task, when I start a new task, then the existing active task is pushed down the stack and becomes paused.
- When a task is started successfully, then the input clears and focus remains in the text box.
- Given the input is empty or whitespace-only, when I press Enter or click Start, then no task is created and the stack is unchanged (optionally show lightweight validation).

## Notes
- Keep the flow keyboard-first; mouse/touch support via Start button is secondary.
- The new task should become the selected item in the Active stack so the workbench can display it.
