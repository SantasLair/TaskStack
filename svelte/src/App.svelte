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

  function updateFavicon() {
    const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    if (!link) return;
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#c45b36';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect x="8" y="8" width="28" height="18" rx="3" fill="${accent}" /><rect x="12" y="14" width="28" height="18" rx="3" fill="${accent}" /><rect x="16" y="20" width="28" height="18" rx="3" fill="${accent}" /></svg>`;
    link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  function applyTheme(id: Theme) {
    theme = id;
    document.documentElement.dataset.theme = id;
    localStorage.setItem(THEME_KEY, id);
    updateFavicon();
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
  <header class="top-bar">
    <div class="brand">
      <svg class="brand-icon" viewBox="0 0 48 48" aria-hidden="true">
        <rect x="8" y="8" width="28" height="18" rx="3" />
        <rect x="12" y="14" width="28" height="18" rx="3" />
        <rect x="16" y="20" width="28" height="18" rx="3" />
      </svg>
      <span class="brand-name">TaskStack</span>
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

  <section id="about" class="panel about">
    <h2>About</h2>
    <p>
      TaskStack is a local-first task stack (LIFO) that helps you capture what you are
      doing now, switch to interruptions, and resume with the right context.
    </p>
    <p>
      Contact: <a href="mailto:damon.ellerbee@gmail.com">damon.ellerbee@gmail.com</a>
    </p>
    <p>
      LinkedIn: <a href="https://www.linkedin.com/in/damon-ellerbee/" rel="noopener noreferrer" target="_blank">damon-ellerbee</a>
    </p>
    <p>
      Creator Page: <a href="https://damonellerbee.com" rel="noopener noreferrer" target="_blank">damonellerbee.com</a>
    </p>
  </section>
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
  .top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin: calc(-1 * var(--page-y)) calc(-1 * var(--page-x)) 1rem;
    padding: 0.75rem var(--page-x);
    border-bottom: 1px solid var(--border);
    background: var(--bg);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
  }
  .brand-name {
    font-weight: 700;
    letter-spacing: 0.01em;
  }
  .brand-icon {
    width: 28px;
    height: 28px;
    fill: var(--accent);
    filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.12));
  }
  .hero {
    margin-top: 0.5rem;
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
  .about {
    margin-top: 1rem;
  }

  @media (max-width: 820px) {
    .top-bar {
      flex-direction: column;
      align-items: flex-start;
    }
    .theme-switch { justify-items: start; }
    .grid { grid-template-columns: 1fr; }
  }
</style>
