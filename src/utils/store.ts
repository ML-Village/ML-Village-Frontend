import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AppState {
  bears: number;
  increase: (by: number) => void;
}

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
      }),
      {
        name: "ml-village-storage",
      }
    )
  )
);
