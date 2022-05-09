import create from 'zustand';

interface GameDashboardState {
  showGridLines: boolean;
  setShowGridLines: (showGridLines: boolean) => void;
  showBenchmark: boolean;
  setShowBenchmark: (showBenchmark: boolean) => void;
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
  showBenchmark: false,
  setShowBenchmark: (showBenchmark) =>
    set((state) => ({
      ...state,
      showBenchmark,
    })),
  enableRandomColorGeneration: false,
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
