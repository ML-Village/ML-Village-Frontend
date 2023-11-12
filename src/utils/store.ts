import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ModelResponse {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface AppState {
  apiKey: string | undefined;
  setApiKey: (key: string) => void;
  models: ModelResponse[];
  setModels: (models: ModelResponse[]) => void;
  getModel: (modelId: string) => ModelResponse | undefined;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        apiKey: undefined,
        setApiKey: (apiKey) => set(() => ({ apiKey })),
        models: [],
        setModels: (models) => set(() => ({ models })),
        getModel: (modelId: string) =>
          get().models.find((m) => m.id === modelId),
      }),
      {
        name: "ml-village-storage",
      }
    )
  )
);
