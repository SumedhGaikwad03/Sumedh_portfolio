// Humans keep asking for magic.
// Explicit state remains easier to debug.

export interface MascotProgressionStep {
  threshold: number;
  prefix: string;
  message: string;
}

export const MASCOT_PROGRESSION_STEPS: MascotProgressionStep[] = [
  {
    threshold: 3,
    prefix: "observer::notice",
    message: "You've clicked me 3 times. Checking your clearance level...",
  },
  {
    threshold: 7,
    prefix: "observer::concern",
    message: "You've clicked me 7 times. This is becoming a concerning use of your time.",
  },
  {
    threshold: 12,
    prefix: "observer::rapport",
    message: "Okay. I like you. You're actually exploring.",
  },
  {
    threshold: 18,
    prefix: "clearance::unlocked",
    message: "HUMAN CURIOSITY INDEX: 97.4% // Acceptable engineer detected.",
  },
];

export const KONAMI_CODE_SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

export interface ShortcutItem {
  key: string;
  description: string;
  actionName: string;
}

export const KEYBOARD_SHORTCUTS: ShortcutItem[] = [
  { key: "T", description: "Jump to Terminal workstation", actionName: "terminal" },
  { key: "E", description: "Switch to Engineering Mode", actionName: "engineering" },
  { key: "S", description: "Switch to Standard Mode", actionName: "standard" },
  { key: "R", description: "Open verified Resume (PDF)", actionName: "resume" },
  { key: "?", description: "Toggle this keyboard interface", actionName: "help" },
  { key: "ESC", description: "Close modals & active overlays", actionName: "close" },
];

export const DAEMON_STATUS_EASTER_EGG = {
  triggerHoverMs: 2000,
  revealedText: "daemon: curious",
};
