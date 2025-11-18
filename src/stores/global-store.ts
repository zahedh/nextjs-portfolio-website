import { createStore } from 'zustand/vanilla';

export type GlobalState = {
  isDark: boolean;
};

export type GlobalActions = {
  toggleTheme: () => void;
};

export type GlobalStore = GlobalState & GlobalActions;

export const initGlobalStore = (): GlobalState => {
  return {
    isDark: false,
  };
};

export const defaultInitState: GlobalState = {
  isDark: false,
};

export const createGlobalStore = (
  initState: GlobalState = defaultInitState
) => {
  return createStore<GlobalStore>()((set, get) => ({
    ...initState,
    toggleTheme: () => {
      const html = document.documentElement;
      const currentIsDark = get().isDark;
      const nextTheme = currentIsDark ? 'light' : 'dark';

      html.classList.toggle('dark');
      localStorage.setItem('theme', nextTheme);
      set({ isDark: !currentIsDark });
    },
  }));
};
