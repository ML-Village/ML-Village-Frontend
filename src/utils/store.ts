import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AppState {
  apiKey?: string;
  setApiKey: (key: string) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        apiKey: undefined,
        setApiKey: (apiKey) => set(() => ({ apiKey })),
      }),
      {
        name: "ml-village-storage",
      }
    )
  )
);
