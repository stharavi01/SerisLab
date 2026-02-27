import { create } from "zustand";

interface WaitlistStore {
  open: boolean;
  source: string;
  setOpen: (open: boolean, source?: string) => void;
}

export const useWaitlistStore = create<WaitlistStore>((set) => ({
  open: false,
  source: "landing-page",
  setOpen: (open, source) =>
    set((state) => ({
      open,
      source: source ?? state.source,
    })),
}));
