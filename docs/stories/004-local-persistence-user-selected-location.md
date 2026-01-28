# 004 — Simple File Storage

## Story
- As a user, I want TaskStack data to persist between sessions using a simple local file so I can control where my data is saved and back it up easily.

## Scope
- Persist the TaskStack state locally (stack + archive + events) and reload it on app start.
- File location is selected by the user.
- No server required.

## Decision
- Storage target is a **single JSON file** selected by the user.
- Recommended filename pattern: `*.taskstack.json`.
- Default suggested filename: `default.taskstack.json`.
- Folder-based persistence is explicitly out of scope for this story.

## Platform/Implementation Notes
- If running as a browser-only Angular app, “user-selected file/folder” typically requires the **File System Access API** (supported in Chromium-based browsers) and user permission.
- If Electron is adopted later, a user-selected folder/file becomes straightforward via native dialogs.
- v1 can still be built in the browser with:
  - “Open file” + “Save file” flows, or
  - persistent file handle permissions (where supported).

## Acceptance Criteria
- Given I have never configured persistence, when I open the app, then it runs in memory and prompts (or provides a Settings action) to choose a save location.
- Given I choose a save location, when data changes (start task, resume, complete), then the latest state is written to the chosen location.
- Given the app starts and a save location was previously granted/remembered, when the app loads, then it restores the last saved state automatically.
- Given I revoke permission or the location is unavailable, when the app tries to load/save, then it shows a clear error and falls back to in-memory mode without data loss in the current session.
- The persisted data format is JSON and includes:
  - tasks (including title, notes/status note if present)
  - stack ordering
  - archived tasks
  - event history
  - a `schemaVersion` field for forward compatibility

## UX Notes
- Provide a Settings screen with:
  - “Choose save location”
  - “Change save location”
  - “Export now” / “Save now” (optional for v1)
  - a visible status indicator: “Saved” / “Saving…” / “Save failed”

- File pickers should default to `default.taskstack.json` and prefer the filter `*.taskstack.json`.

## Notes
- This is intentionally “simple file storage”. Future enhancements (attachments, multi-file workspaces, folder-based storage) should be separate stories.
