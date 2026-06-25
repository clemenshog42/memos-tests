import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { TextEncoder, TextDecoder } from "util";

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder as any;

// With `globals: false`, @testing-library/react does not auto-register a
// cleanup hook, so unmount rendered trees between tests explicitly.
afterEach(() => {
  cleanup();
});

// ProseMirror probes layout APIs jsdom doesn't implement.
if (typeof document !== "undefined") {
  if (!document.elementFromPoint) {
    document.elementFromPoint = () => null;
  }
  if (typeof Range !== "undefined" && !Range.prototype.getClientRects) {
    Range.prototype.getClientRects = () => [] as unknown as DOMRectList;
    Range.prototype.getBoundingClientRect = () =>
      ({ x: 0, y: 0, top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  }
}

// jsdom runs with an opaque origin (no URL set), so its built-in localStorage
// implementation throws SecurityError on every access. Install a Map-backed shim
if (typeof globalThis.localStorage === "undefined" || typeof globalThis.localStorage.clear !== "function") {
  let _store = new Map<string, string>();
  const localStorageShim: Storage = {
    get length() {
      return _store.size;
    },
    getItem: (key: string) => _store.get(key) ?? null,
    setItem: (key: string, value: string) => _store.set(key, value),
    removeItem: (key: string) => _store.delete(key),
    clear: () => {
      _store = new Map<string, string>();
    },
    key: (index: number) => Array.from(_store.keys())[index] ?? null,
  };
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: localStorageShim,
  });
}

if (typeof globalThis.BroadcastChannel === "undefined") {
  class NoopBroadcastChannel {
    readonly name: string;
    onmessage: ((event: MessageEvent) => void) | null = null;

    constructor(name: string) {
      this.name = name;
    }

    postMessage(_data: unknown): void {}
    close(): void {}
    addEventListener(): void {}
    removeEventListener(): void {}
    dispatchEvent(): boolean {
      return true;
    }
  }

  // @ts-expect-error — attach the shim to the global scope for tests.
  globalThis.BroadcastChannel = NoopBroadcastChannel;
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
