import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload
            state.token = token
            localStorage.setItem('token',token)
        },
        setUserData: (state, action) => {
            const { user, token } = action.payload
            state.user = user
            state.token = token
        },
        logOut: (state, action) => {
            state.user = null
            localStorage.removeItem('token')
        }
    },
})

export const { setCredentials, logOut, setUserData } = authSlice.actions

export default authSlice.reducer

export const selectUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
