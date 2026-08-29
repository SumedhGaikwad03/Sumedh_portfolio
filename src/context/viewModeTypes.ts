import { createContext } from "react";

export type ViewMode = "STANDARD" | "ENGINEERING";

export interface ViewModeContextType {
  mode: ViewMode;
  isTransitioning: boolean;
  transitionTarget: ViewMode | null;
  setMode: (mode: ViewMode) => void;
  toggleMode: () => void;
}

export const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);
export const STORAGE_KEY = "portfolio_view_mode";
