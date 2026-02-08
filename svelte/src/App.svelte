<script lang="ts">
  import { onMount } from 'svelte';
  import { tasks } from './stores/tasks';
  import TaskInput from './lib/TaskInput.svelte';
  import StackView from './lib/StackView.svelte';
  import NotesPanel from './lib/NotesPanel.svelte';
  import ArchiveDrawer from './lib/ArchiveDrawer.svelte';

  type Theme = 'warm' | 'neon' | 'studio';
  const themes: { id: Theme; label: string }[] = [
    { id: 'warm', label: 'Warm Paper' },
    { id: 'neon', label: 'Neon Console' },
    { id: 'studio', label: 'Calm Studio' },
  ];

  const THEME_KEY = 'taskstack:theme';
  let theme: Theme = 'warm';
  let drawerOpen = false;

  function applyTheme(id: Theme) {
    theme = id;
    document.documentElement.dataset.theme = id;
    localStorage.setItem(THEME_KEY, id);
  }

  onMount(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    if (saved && themes.some((t) => t.id === saved)) {
      applyTheme(saved);
    } else {
      applyTheme('warm');
    }
  });
</script>

<main class="app">
  <header class="top">
    <div>
      <h1>TaskStack</h1>
      <p class="subtitle">Lightweight task stack with archive and resume</p>
    </div>
    <div class="theme-switch" role="group" aria-label="Theme selection">
      <button
        class:active={theme === 'warm'}
        on:click={() => applyTheme('warm')}
        aria-pressed={theme === 'warm'}
        title="Warm Paper"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9l-2.1 2.1M7 17l-2.1 2.1" />
        </svg>
      </button>
      <button
        class:active={theme === 'neon'}
        on:click={() => applyTheme('neon')}
        aria-pressed={theme === 'neon'}
        title="Neon Console"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
        </svg>
      </button>
      <button
        class:active={theme === 'studio'}
        on:click={() => applyTheme('studio')}
        aria-pressed={theme === 'studio'}
        title="Calm Studio"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="6" height="6" rx="1" />
          <rect x="14" y="4" width="6" height="6" rx="1" />
          <rect x="4" y="14" width="6" height="6" rx="1" />
          <rect x="14" y="14" width="6" height="6" rx="1" />
        </svg>
      </button>
    </div>
  </header>

  <TaskInput />
  <div class="grid">
    <StackView />
    <NotesPanel />
  </div>
</main>

<ArchiveDrawer
  open={drawerOpen}
  count={$tasks.archive.length}
  on:toggle={(e) => (drawerOpen = e.detail)}
/>

<style>
  .app {
    display: grid;
    gap: 1rem;
  }
  .top {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.25rem;
  }
  .subtitle { color: var(--muted); }
  .theme-switch {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.25rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--panel);
    box-shadow: var(--shadow);
  }
  .theme-switch button {
    width: 38px;
    height: 38px;
    border-radius: 999px;
    padding: 0;
    display: grid;
    place-items: center;
    background: transparent;
    color: var(--muted);
  }
  .theme-switch button svg {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .theme-switch button.active {
    background: var(--accent);
    color: var(--accent-contrast);
    box-shadow: 0 0 0 3px var(--ring);
  }
  .theme-switch button.active svg {
    stroke: currentColor;
    fill: currentColor;
  }
  .grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 1rem;
  }

  @media (max-width: 820px) {
    .top {
      flex-direction: column;
      align-items: flex-start;
    }
    .theme-switch { justify-items: start; }
    .grid { grid-template-columns: 1fr; }
  }
</style>
