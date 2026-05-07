import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Slice/Slice'
const store = configureStore({
    reducer: {
        appContent: userReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
