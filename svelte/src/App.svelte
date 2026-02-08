<script lang="ts">
  import TaskInput from './lib/TaskInput.svelte';
  import StackView from './lib/StackView.svelte';
  import ArchiveView from './lib/ArchiveView.svelte';
</script>

<main class="app">
  <header class="top">
    <h1>TaskStack</h1>
    <p class="subtitle">Lightweight task stack with archive & resume</p>
  </header>

  <TaskInput />
  <StackView />
  <ArchiveView />
</main>

<style>
  .app {
    max-width: 720px;
    margin: 0 auto;
    padding: 1rem;
  }
  .top { margin-bottom: 1rem; }
  .subtitle { color: #666; }
</style>
