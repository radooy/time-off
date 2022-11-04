import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: '',
    loggedIn: false,
    name: '',
    paidLeave: 0,
    history: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.id = action.payload.id;
            state.loggedIn = true;
            state.name = action.payload.name;
            state.paidLeave = action.payload.paidLeave;
            state.history = action.payload.history;
        },
        logOut: (state) => {
            Object.assign(state, initialState);
        },
        requestPaidLeave: (state, action) => {
            state.paidLeave = action.payload.paidLeave;
            state.history.push(action.payload.historyObject);
        }
    }
});

export const { logIn, logOut, requestPaidLeave } = authSlice.actions;

export default authSlice.reducer;
