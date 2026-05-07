import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: { Role: string } = {
    Role: "",

}


const userCreation = createSlice({
    name: "appContent",
    initialState,
    reducers: {
        setUserRole: (state: any, action: PayloadAction<string>) => {
            state.Role = action.payload;
        },

    },
});
export const { setUserRole } = userCreation.actions;
export default userCreation.reducer;
