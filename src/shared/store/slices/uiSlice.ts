import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

export interface UIState {
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState: UIState = {
  isLoading: false,
  errorMessage: null,
  successMessage: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setErrorMessage: (state, { payload }: PayloadAction<string | null>) => {
      state.errorMessage = payload;
    },
    setSuccessMessage: (state, { payload }: PayloadAction<string | null>) => {
      state.successMessage = payload;
    },
    clearMessages: (state) => {
      state.errorMessage = null;
      state.successMessage = null;
    },
  },
});

export const { setLoading, setErrorMessage, setSuccessMessage, clearMessages } = uiSlice.actions;
export default uiSlice.reducer;

export const selectIsLoading = (state: RootState): boolean => state.ui.isLoading;
export const selectErrorMessage = (state: RootState): string | null => state.ui.errorMessage;
export const selectSuccessMessage = (state: RootState): string | null => state.ui.successMessage;
