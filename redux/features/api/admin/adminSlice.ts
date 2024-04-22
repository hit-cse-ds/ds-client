import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    allUsers: "",
};

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers: {
        allUsers: (state,action: PayloadAction<{allUsers:string}>) => {
            state.allUsers = action.payload.allUsers;
        },
    },
});

export const { allUsers } = adminSlice.actions;

export default adminSlice.reducer;