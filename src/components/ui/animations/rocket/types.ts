export type RocketTheme = 'light' | 'dark';
export type RocketPhase =
  | 'idle'
  | 'assembling'
  | 'ready'
  | 'ignition'
  | 'flight'
  | 'returning'
  | 'settling'
  | 'separating';
export type RocketStatus = 'loading' | 'ready' | 'error';
export interface RocketController {
  setTheme(theme: RocketTheme): void;
  setPaused(paused: boolean): void;
  activate(): void;
  dispose(): void;
}
