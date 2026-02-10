<script lang="ts">
  import { tasks } from '../stores/tasks';
  let title = '';

  function submit(e: Event) {
    e.preventDefault();
    tasks.addTask(title);
    title = '';
  }
</script>

<form on:submit|preventDefault={submit} class="task-input panel">
  <header class="task-input-header">
    <h2>Current Task</h2>
    <p class="hint">What are you doing now?</p>
  </header>
  <div class="input-row">
    <input
      type="text"
      placeholder="What are you doing now?"
      bind:value={title}
      aria-label="Current task"
    />
  </div>
  <div class="actions">
    <button type="submit">Add</button>
    <button type="button" class="btn-ghost" on:click={() => tasks.popActiveToArchive()} disabled>
      Pop Active -> Archive
    </button>
  </div>
</form>

<style>
  .task-input {
    display: grid;
    gap: 0.75rem;
  }
  .task-input-header h2 {
    margin-bottom: 0.1rem;
  }
  .hint {
    margin: 0;
    color: var(--muted);
  }
  .input-row input {
    width: 100%;
    font-size: 1.1rem;
    padding: 0.9rem 1rem;
    border-radius: 14px;
  }
  .actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
  }
  @media (max-width: 720px) {
    .actions {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>
