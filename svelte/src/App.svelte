<script lang="ts">
  import { onMount } from 'svelte';
  import { tick } from 'svelte';
  import { tasks } from './stores/tasks';
  import TaskInput from './lib/TaskInput.svelte';
  import StackView from './lib/StackView.svelte';
  import NotesPanel from './lib/NotesPanel.svelte';
  import ArchiveDrawer from './lib/ArchiveDrawer.svelte';
  import MobileIconBar from './lib/MobileIconBar.svelte';
  import AboutPage from './lib/AboutPage.svelte';

  type Theme = 'warm' | 'neon' | 'studio';
  const themes: { id: Theme; label: string }[] = [
    { id: 'warm', label: 'Warm Paper' },
    { id: 'neon', label: 'Neon Console' },
    { id: 'studio', label: 'Calm Studio' },
  ];

  const THEME_KEY = 'taskstack:theme';
  let theme: Theme = 'warm';
  let drawerOpen = false;
  let taskInputRef: TaskInput;
  let page: 'main' | 'about' = 'main';

  function setPage(next: 'main' | 'about') {
    page = next;
    const nextHash = next === 'about' ? '#about' : '';
    if (location.hash !== nextHash) {
      history.replaceState(null, '', `${location.pathname}${location.search}${nextHash}`);
    }
  }

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const header = document.querySelector('.top-bar') as HTMLElement | null;
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = Math.max(0, top - headerHeight - 12);
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  async function jump(target: 'home' | 'stack' | 'notes' | 'about') {
    drawerOpen = false;
    if (target === 'home') {
      setPage('main');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      taskInputRef?.focus({ preventScroll: true });
      return;
    }
    if (target === 'stack') {
      setPage('main');
      await tick();
      scrollToId('stack-panel');
      return;
    }
    if (target === 'notes') {
      setPage('main');
      await tick();
      scrollToId('notes-panel');
      return;
    }
    setPage('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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

    const syncFromHash = () => {
      setPage(location.hash === '#about' ? 'about' : 'main');
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
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

  {#if page === 'about'}
    <AboutPage />
  {:else}
    <div id="task-input">
      <TaskInput bind:this={taskInputRef} />
    </div>
    <div class="grid">
      <div id="stack-panel">
        <StackView />
      </div>
      <div id="notes-panel">
        <NotesPanel />
      </div>
    </div>
    <div class="scroll-spacer" aria-hidden="true"></div>
  {/if}
</main>

<ArchiveDrawer
  open={drawerOpen}
  count={$tasks.archive.length}
  on:toggle={(e) => (drawerOpen = e.detail)}
/>

<MobileIconBar
  archiveOpen={drawerOpen}
  on:toggleArchive={() => (drawerOpen = !drawerOpen)}
  on:jump={(e) => jump(e.detail.target)}
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
    min-width: 0;
  }
  .brand-name {
    font-weight: 700;
    letter-spacing: 0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

  .scroll-spacer {
    height: 0;
  }

  @media (max-width: 820px) {
    .grid { grid-template-columns: 1fr; }
    .scroll-spacer {
      height: min(40vh, 320px);
    }
  }
</style>
