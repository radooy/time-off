import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    name: '',
    paidLeave: 0
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.loggedIn = true;
            state.name = action.payload.name;
            state.paidLeave = action.payload.paidLeave;
        },
        logOut: (state) => {
            state.loggedIn = false;
            state.name = '';
            state.paidLeave = 0;
        }
    }
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
