import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem('mern_auth'))

const initialState = {
    user: user ? user : null
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('mern_auth', JSON.stringify(state.user))
        },
        logoutUser: (state) => {
            state.user = null
            localStorage.removeItem('mern_auth')
        }
    }
})

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer