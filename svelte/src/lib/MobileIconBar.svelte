<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let archiveOpen = false;

  const dispatch = createEventDispatcher<{
    jump: { target: 'home' | 'stack' | 'notes' | 'about' };
    toggleArchive: void;
  }>();

  function jump(target: 'home' | 'stack' | 'notes' | 'about') {
    dispatch('jump', { target });
  }
</script>

<nav class="mobile-bar" aria-label="Primary navigation">
  <button class="icon-btn" type="button" on:click={() => jump('home')} aria-label="Home" title="Home">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 11l8-7 8 7" />
      <path d="M6.5 10.5V20h11V10.5" />
    </svg>
  </button>

  <button class="icon-btn" type="button" on:click={() => jump('stack')} aria-label="Stack" title="Stack">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 7h12v8H7z" />
      <path d="M5 9h12v8H5z" />
    </svg>
  </button>

  <button class="icon-btn" type="button" on:click={() => jump('notes')} aria-label="Notes" title="Notes">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 4h10a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path d="M9 8h8M9 11h8M9 14h6" />
      <path d="M6 6h-1M6 9h-1M6 12h-1M6 15h-1M6 18h-1" />
    </svg>
  </button>

  <button
    class="icon-btn"
    class:pressed={archiveOpen}
    type="button"
    on:click={() => dispatch('toggleArchive')}
    aria-label="Archive"
    aria-pressed={archiveOpen}
    title="Archive"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16" />
      <path d="M6 7v13h12V7" />
      <path d="M9 11h6" />
    </svg>
  </button>

  <button class="icon-btn" type="button" on:click={() => jump('about')} aria-label="About" title="About">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.7 9.2a2.5 2.5 0 0 1 4.3 1.7c0 1.8-2 2.1-2 3.6" />
      <path d="M12 17h.01" />
    </svg>
  </button>
</nav>

<style>
  .mobile-bar {
    display: none;
  }

  @media (max-width: 820px) {
    .mobile-bar {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: calc(var(--mobile-bar-height) + env(safe-area-inset-bottom, 0px));
      padding: 0.5rem 1rem calc(0.5rem + env(safe-area-inset-bottom, 0px));
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      align-items: center;
      gap: 0.5rem;
      background: var(--panel);
      border-top: 1px solid var(--border);
      box-shadow: var(--shadow);
      z-index: 30;
    }
  }

  .icon-btn {
    height: 44px;
    width: 100%;
    border-radius: 12px;
    padding: 0;
    display: grid;
    place-items: center;
    background: transparent;
    color: var(--muted);
    border: 1px solid transparent;
    box-shadow: none;
    transform: none;
  }

  .icon-btn:hover {
    background: var(--input-bg);
    opacity: 1;
    transform: none;
  }

  .icon-btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--ring);
  }

  .icon-btn svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .icon-btn.pressed {
    color: var(--accent);
    border-color: var(--border);
    background: var(--input-bg);
  }
</style>
