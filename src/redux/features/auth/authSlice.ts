import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isLoggedIn: false,
    token: '',
    user: null,
    userId: '',
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.accessToken;
            state.userId = action.payload.id;
            state.user = action.payload.user;
            console.log(state.user);
            
        },
        logOut: (state, action) => {
            state.token = '';
            state.user = null;
            state.userId = '';
        },
    }
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;


