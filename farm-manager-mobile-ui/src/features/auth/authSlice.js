import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, lang: null },
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
        setLang: (state, action) => {
            state.lang = action.payload
        },
        logOut: (state, action) => {
            state.user = null
            localStorage.removeItem('token')
        }
    },
})

export const { setCredentials, logOut, setUserData, setLang } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectLang = (state) => state.auth.lang

