import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type LangState = {
  lang: string;
  setLang: (lang: string) => void;
};

export const useStore = create<LangState>()(
  devtools(
    persist(
      (set) => ({
        lang: "en",
        setLang: (lang) => set({ lang }),
      }),
      {
        name: "lang-storage",
      }
    )
  )
);
