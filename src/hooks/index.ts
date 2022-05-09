import create from 'zustand';

interface GameDashboardState {
  showGridLines: boolean;
  setShowGridLines: (showGridLines: boolean) => void;
  enableRandomColorGeneration: boolean;
  setEnableRandomColorGeneration: (
    enableRandomColorGeneration: boolean,
  ) => void;
  colorThreshold: number;
  setColorThreshold: (colorThreshold: number) => void;
  scaleFactor: number;
  setScaleFactor: (scaleFactor: number) => void;
}

const useStore = create<GameDashboardState>((set) => ({
  showGridLines: false,
  setShowGridLines: (showGridLines) =>
    set((state) => ({
      ...state,
      showGridLines,
    })),
  enableRandomColorGeneration: true,
  setEnableRandomColorGeneration: (enableRandomColorGeneration) =>
    set((state) => ({
      ...state,
      enableRandomColorGeneration,
    })),
  colorThreshold: 100,
  setColorThreshold: (colorThreshold) =>
    set((state) => ({
      ...state,
      colorThreshold,
    })),

  scaleFactor: 1,
  setScaleFactor: (scaleFactor) =>
    set((state) => ({
      ...state,
      scaleFactor,
    })),
}));

export default useStore;
