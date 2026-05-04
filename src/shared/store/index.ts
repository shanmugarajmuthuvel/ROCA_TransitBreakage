import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

export const configureAppStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefault) => getDefault({ serializableCheck: false }),
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof configureAppStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
