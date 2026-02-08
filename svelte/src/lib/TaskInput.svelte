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
  <input
    type="text"
    placeholder="Add a task..."
    bind:value={title}
    aria-label="Task title"
  />
  <button type="submit">Add</button>
  <button type="button" class="btn-ghost" on:click={() => tasks.popActiveToArchive()} disabled>
    Pop Active -> Archive
  </button>
</form>

<style>
  .task-input {
    display: flex;
    gap: 0.5rem;
  }
  input {
    flex: 1;
    min-width: 0;
  }
  @media (max-width: 720px) {
    .task-input { flex-wrap: wrap; }
    .task-input button { flex: 1 1 140px; }
  }
</style>
