<script lang="ts">
  import { tasks } from '../stores/tasks';
  $: active = $tasks.stack[0];
</script>

<section class="panel stack">
  <header>
    <h2>Stack</h2>
    <button on:click={() => tasks.popActiveToArchive()} disabled={!active}>Pop Active -> Archive</button>
  </header>

  {#if $tasks.stack.length > 0}
    <ol class="list">
      {#each $tasks.stack as t, i}
        <li class:active={i === 0}>
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
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--input-bg);
  }
  .list li.active {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px var(--ring);
  }
  .title { font-weight: 600; }
  .empty { color: var(--muted); }
</style>
