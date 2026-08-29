export type MascotActionType =
  | "SWITCH_TO_ENGINEERING"
  | "SWITCH_TO_STANDARD"
  | "SCROLL_TO_TERMINAL"
  | "SCROLL_TO_PROJECTS"
  | "SCROLL_TO_SYSTEMS";

export interface MascotTip {
  id: string;
  prefix?: string;
  message: string;
  action?: MascotActionType;
  actionLabel?: string;
  availableWhen: "STANDARD" | "ENGINEERING" | "ANY";
}

export const MASCOT_TIPS: MascotTip[] = [
  // STANDARD Mode Discovery Tips
  {
    id: "std_eng_discovery",
    prefix: "engineering_view",
    message: "Engineering view is available. Switch modes to inspect capability graphs, invariants, and system boundaries.",
    action: "SWITCH_TO_ENGINEERING",
    actionLabel: "SWITCH TO ENGINEERING",
    availableWhen: "STANDARD",
  },
  {
    id: "std_project_probes",
    prefix: "observer::tip",
    message: "Selected Work project cards contain interactive architecture simulation probes.",
    action: "SCROLL_TO_PROJECTS",
    actionLabel: "VIEW PROJECTS",
    availableWhen: "STANDARD",
  },
  {
    id: "std_terminal_access",
    prefix: "terminal::cli",
    message: "Terminal access available. Try typing 'projects' or 'open finance-one' in the console.",
    action: "SCROLL_TO_TERMINAL",
    actionLabel: "OPEN TERMINAL",
    availableWhen: "STANDARD",
  },

  // ENGINEERING Mode Technical Tips
  {
    id: "eng_systems_map",
    prefix: "engineering_mode",
    message: "Systems Map active. Capability matrix exposes cross-project architecture threads.",
    action: "SCROLL_TO_SYSTEMS",
    actionLabel: "VIEW SYSTEMS",
    availableWhen: "ENGINEERING",
  },
  {
    id: "eng_terminal_dossier",
    prefix: "terminal::ready",
    message: "Terminal interface active. Try 'projects' or 'open finance-one' in the command console above.",
    action: "SCROLL_TO_TERMINAL",
    actionLabel: "OPEN TERMINAL",
    availableWhen: "ENGINEERING",
  },
  {
    id: "eng_switch_standard",
    prefix: "observer::mode",
    message: "Standard view is available if you want a fast, concise recruiter overview.",
    action: "SWITCH_TO_STANDARD",
    actionLabel: "SWITCH TO STANDARD",
    availableWhen: "ENGINEERING",
  },
  {
    id: "eng_dna_principles",
    prefix: "telemetry::dna",
    message: "Technical DNA diagnostic console details Correctness, SSRF boundaries, and TraCI clock locks.",
    action: "SCROLL_TO_SYSTEMS",
    actionLabel: "VIEW DNA SPECS",
    availableWhen: "ENGINEERING",
  },
];

export const mascotDiscoveryTips: string[] = MASCOT_TIPS.map((t) => t.message);

