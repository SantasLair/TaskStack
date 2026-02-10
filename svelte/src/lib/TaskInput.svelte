<script lang="ts">
  import { tasks } from '../stores/tasks';
  let title = '';
  let inputEl: HTMLInputElement | null = null;

  function submit(e: Event) {
    e.preventDefault();
    tasks.addTask(title);
    title = '';
  }

  export function focus(options?: FocusOptions) {
    inputEl?.focus(options);
  }
</script>

<form on:submit|preventDefault={submit} class="task-input panel">
  <div class="input-row">
    <input
      type="text"
      placeholder="What are you doing now?"
      bind:value={title}
      bind:this={inputEl}
      aria-label="Current task"
    />
  </div>
  <div class="actions">
    <button type="submit">Add</button>
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
