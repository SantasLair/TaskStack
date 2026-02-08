<script lang="ts">
  import { tasks } from '../stores/tasks';
  $: active = $tasks.stack[0];
</script>

<section class="panel notes">
  <header>
    <h2>Notes</h2>
    {#if active}
      <span class="meta">Active: {active.title}</span>
    {/if}
  </header>

  <textarea
    placeholder={active ? 'Write notes for the active task...' : 'Add a task to start notes'}
    value={active?.notes ?? ''}
    on:input={(e) => tasks.updateActiveNotes((e.currentTarget as HTMLTextAreaElement).value)}
    disabled={!active}
    rows="10"
  ></textarea>
</section>

<style>
  .notes {
    display: grid;
    gap: 0.75rem;
  }
  header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .meta {
    color: var(--muted);
    font-size: 0.85rem;
  }
  textarea {
    resize: vertical;
    min-height: 220px;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 0.75rem;
    font-family: inherit;
    background: var(--input-bg);
    color: var(--input-text);
  }
  textarea:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--ring);
  }
  textarea:disabled {
    opacity: 0.6;
  }
</style>
