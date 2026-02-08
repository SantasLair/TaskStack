<script lang="ts">
  import { tasks } from '../stores/tasks';
  let title = '';

  function submit(e: Event) {
    e.preventDefault();
    tasks.addTask(title);
    title = '';
  }
</script>

<form on:submit|preventDefault={submit} class="task-input">
  <input
    type="text"
    placeholder="Add a task…"
    bind:value={title}
    aria-label="Task title"
  />
  <button type="submit">Add</button>
  <button type="button" class="secondary" on:click={() => tasks.popActiveToArchive()} disabled>
    Pop Active → Archive
  </button>
</form>

<style>
  .task-input {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
  button {
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    background: #f6f6f6;
  }
  .secondary {
    background: #fff;
  }
</style>
