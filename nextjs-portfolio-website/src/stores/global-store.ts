import { createStore } from 'zustand/vanilla'

export type GlobalState = {
    count: number
}

export type GlobalActions = {
    decrementCount: () => void
    incrementCount: () => void
}

export type GlobalStore = GlobalState & GlobalActions

export const initGlobalStore = (): GlobalState => {
    return { count: new Date().getFullYear() }
}

export const defaultInitState: GlobalState = {
    count: 0,
}

export const createGlobalStore = (
    initState: GlobalState = defaultInitState,
) => {
    return createStore<GlobalStore>()((set) => ({
        ...initState,
        decrementCount: () => set((state) => ({ count: state.count - 1 })),
        incrementCount: () => set((state) => ({ count: state.count + 1 })),
    }))
}
