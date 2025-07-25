import { Shortcut } from "./types";

export const shortcuts = {
  "new-chat": {
    name: "New Chat",
    hotkey: {
      key: "/",
      ctrlCmd: true,
    },
  },
  search: {
    name: "Search",
    hotkey: {
      key: "?",
      ctrlCmd: true,
      shift: true,
    },
  },
  "focus-input": {
    name: "Focus Input",
    hotkey: {
      key: ".",
      ctrlCmd: true,
    },
  },
  "next-thread": {
    name: "Next Thread",
    hotkey: {
      key: "Tab",
    },
  },
  "previous-thread": {
    name: "Previous Thread",
    hotkey: {
      key: "Tab",
      shift: true,
    },
  },
} as const satisfies Record<string, Shortcut>;
