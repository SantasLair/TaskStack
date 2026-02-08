import { writable } from 'svelte/store';

export type Task = {
  id: string;
  title: string;
  createdAt: number;
};

export type TaskState = {
  stack: Task[]; // last item is the active/top of stack
  archive: Task[];
};

const STORAGE_KEY = 'taskstack:v1';

function loadFromStorage(): TaskState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { stack: [], archive: [] };
    const parsed = JSON.parse(raw);
    // Basic shape validation
    if (
      typeof parsed === 'object' &&
      parsed && Array.isArray(parsed.stack) && Array.isArray(parsed.archive)
    ) {
      return parsed as TaskState;
    }
  } catch (_) {
    // ignore
  }
  return { stack: [], archive: [] };
}

function saveToStorage(state: TaskState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {
    // ignore
  }
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function createTaskStore() {
  const initial = loadFromStorage();
  const { subscribe, update, set } = writable<TaskState>(initial);

  // persist on every change
  subscribe((state) => saveToStorage(state));

  return {
    subscribe,
    addTask(title: string) {
      const trimmed = title.trim();
      if (!trimmed) return;
      update((s) => ({
        ...s,
        stack: [...s.stack, { id: uid(), title: trimmed, createdAt: Date.now() }],
      }));
    },
    popActiveToArchive() {
      update((s) => {
        if (s.stack.length === 0) return s;
        const nextStack = s.stack.slice(0, -1);
        const active = s.stack[s.stack.length - 1];
        return { ...s, stack: nextStack, archive: [active, ...s.archive] };
      });
    },
    resumeTask(id: string) {
      update((s) => {
        const idx = s.archive.findIndex((t) => t.id === id);
        if (idx === -1) return s;
        const [restored] = s.archive.splice(idx, 1);
        return { ...s, stack: [...s.stack, restored], archive: [...s.archive] };
      });
    },
    clearAll() {
      set({ stack: [], archive: [] });
    },
  };
}

export const tasks = createTaskStore();
