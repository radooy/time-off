import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    name: ''
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.loggedIn = true;
            state.name = action.payload;
        },
        logOut: (state) => {
            state.loggedIn = false;
            state.name = '';
        }
    }
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
