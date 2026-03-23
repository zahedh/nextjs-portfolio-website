import { createStore } from 'zustand/vanilla';

/** Shape of the global UI state shared across the app. */
export type GlobalState = {
  isDark: boolean;
  heroAnimationComplete: boolean;
  selectedSkillId: string | null;
};

/** Actions for mutating the global UI state. */
export type GlobalActions = {
  toggleTheme: () => void;
  setHeroAnimationComplete: () => void;
  setSelectedSkillId: (id: string | null) => void;
};

/** Combined type for the global store (state + actions). */
export type GlobalStore = GlobalState & GlobalActions;

/** Returns the initial global store state. */
export const initGlobalStore = (): GlobalState => {
  return {
    isDark: false,
    heroAnimationComplete: false,
    selectedSkillId: null,
  };
};

/** Default initial state used when no override is provided. */
export const defaultInitState: GlobalState = {
  isDark: false,
  heroAnimationComplete: false,
  selectedSkillId: null,
};

/**
 * Creates the global Zustand store instance.
 */
export const createGlobalStore = (
  initState: GlobalState = defaultInitState
) => {
  return createStore<GlobalStore>()((set, get) => ({
    ...initState,
    /** Toggles between light and dark mode and persists the choice. */
    toggleTheme: () => {
      const html = document.documentElement;
      const currentIsDark = get().isDark;
      const nextTheme = currentIsDark ? 'light' : 'dark';

      html.classList.toggle('dark');
      localStorage.setItem('theme', nextTheme);
      set({ isDark: !currentIsDark });
    },
    setHeroAnimationComplete: () => set({ heroAnimationComplete: true }),
    setSelectedSkillId: (id) => set({ selectedSkillId: id }),
  }));
};
