import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModelState {
  optimizer?: string;
  learningRate?: number;
  epochs?: number;
  initialized: boolean;
}

const initialState: ModelState = {
  optimizer: "adam",
  learningRate: 0.01,
  epochs: 50,
  initialized: false,
};

export type SetOptimizer = PayloadAction<{ optimizer: string }>;
export type SetLearningRate = PayloadAction<{ learningRate: number }>;
export type SetEpochs = PayloadAction<{ epochs: number }>;
export type SetModelOptions = PayloadAction<{
  optimizer: string;
  learningRate: number;
  epochs: number;
}>;
export type SetModelInitialized = PayloadAction<{ initialized: boolean }>;

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setOptimizer: (state, action: SetOptimizer) => {
      const { optimizer } = action.payload;
      state.optimizer = optimizer;
    },
    setLearningRate: (state, action: SetLearningRate) => {
      const { learningRate } = action.payload;
      state.learningRate = learningRate;
    },
    setEpochs: (state, action: SetEpochs) => {
      const { epochs } = action.payload;
      state.epochs = epochs;
    },
    setModelOptions: (state, action: SetModelOptions) => {
      const { optimizer, learningRate, epochs } = action.payload;
      state.optimizer = optimizer;
      state.learningRate = learningRate;
      state.epochs = epochs;
    },
    setModelInitialized: (state, action: SetModelInitialized) => {
      const { initialized } = action.payload;
      state.initialized = initialized;
    },
  },
});

export const {
  setOptimizer,
  setLearningRate,
  setEpochs,
  setModelOptions,
  setModelInitialized,
} = modelSlice.actions;

export default modelSlice.reducer;
