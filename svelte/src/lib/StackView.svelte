<script lang="ts">
  import { tasks, type TaskState } from '../stores/tasks';
  let state: TaskState;
  $: active = state?.stack[state.stack.length - 1];
</script>

<section class="stack">
  <header>
    <h2>Active Stack</h2>
    <button on:click={() => tasks.popActiveToArchive()} disabled={!active}>Pop Active → Archive</button>
  </header>

  {#if state?.stack.length > 0}
    <ol class="list">
      {#each state.stack as t, i}
        <li class:active={i === state.stack.length - 1}>
          <span class="title">{t.title}</span>
          <time datetime={new Date(t.createdAt).toISOString()}>{new Date(t.createdAt).toLocaleString()}</time>
        </li>
      {/each}
    </ol>
  {:else}
    <p class="empty">No tasks yet. Add one above.</p>
  {/if}
</section>

<style>
  .stack header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .list {
    display: grid;
    gap: 0.5rem;
    padding: 0;
    list-style: none;
  }
  .list li {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border: 1px solid #eee;
    border-radius: 8px;
  }
  .list li.active {
    border-color: #ff3e00;
    box-shadow: 0 0 0 2px #ff3e0033;
  }
  .title { font-weight: 600; }
  .empty { color: #777; }
</style>

<!-- store subscription -->
<svelte:window on:load={() => tasks.subscribe((s) => (state = s))} />
