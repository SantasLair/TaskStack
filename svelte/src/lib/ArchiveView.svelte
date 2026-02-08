<script lang="ts">
  import { tasks } from '../stores/tasks';
</script>

<section class="panel archive">
  <header>
    <h2>Archive</h2>
  </header>

  {#if $tasks.archive.length > 0}
    <ul class="list">
      {#each $tasks.archive as t}
        <li>
          <span class="title">{t.title}</span>
          <button on:click={() => tasks.resumeTask(t.id)}>Resume</button>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="empty">Archive is empty.</p>
  {/if}
</section>

<style>
  .archive header {
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
  .title { font-weight: 500; }
  .empty { color: var(--muted); }
</style>
