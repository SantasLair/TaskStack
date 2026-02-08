<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ArchiveView from './ArchiveView.svelte';

  export let open = false;
  export let count = 0;

  const dispatch = createEventDispatcher<{ toggle: boolean }>();

  function toggle() {
    dispatch('toggle', !open);
  }
</script>

<aside class:open class="drawer" aria-label="Archive drawer">
  <button
    class="tab"
    on:click={toggle}
    aria-expanded={open}
    title="Archive"
  >
    <span class="label">Archive</span>
    <span class="count">{count}</span>
  </button>
  <div class="panel">
    <ArchiveView />
  </div>
</aside>

<style>
  .drawer {
    position: fixed;
    top: 110px;
    right: 0;
    width: min(360px, 90vw);
    transform: translateX(calc(100% - 36px));
    transition: transform 0.25s ease;
    z-index: 20;
  }
  .drawer.open {
    transform: translateX(0);
  }
  .panel {
    background: var(--panel);
    border: 1px solid var(--border);
    border-right: none;
    border-radius: 16px 0 0 16px;
    box-shadow: var(--shadow);
    padding: 1rem;
    min-height: 260px;
  }
  .tab {
    position: absolute;
    left: -36px;
    top: 16px;
    width: 36px;
    height: 84px;
    border-radius: 12px 0 0 12px;
    background: var(--panel);
    border: 1px solid var(--border);
    border-right: none;
    display: grid;
    align-items: center;
    justify-items: center;
    gap: 0.2rem;
    color: var(--muted);
    padding: 0.25rem 0;
  }
  .label {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .count {
    font-size: 0.8rem;
    color: var(--text);
  }

  @media (max-width: 820px) {
    .drawer {
      top: auto;
      bottom: 0;
      width: 100%;
      transform: translateY(calc(100% - 44px));
      right: 0;
    }
    .drawer.open {
      transform: translateY(0);
    }
    .panel {
      border-radius: 16px 16px 0 0;
      border-right: 1px solid var(--border);
    }
    .tab {
      left: 16px;
      top: -36px;
      width: 120px;
      height: 36px;
      border-radius: 12px 12px 0 0;
      border-right: 1px solid var(--border);
      grid-auto-flow: column;
    }
    .label {
      writing-mode: horizontal-tb;
      transform: none;
    }
  }
</style>
