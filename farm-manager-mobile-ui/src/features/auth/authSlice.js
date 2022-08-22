import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { lang: 'en' },
    reducers: {
        setCredentials: (state, action) => {
            const { token } = action.payload
            localStorage.setItem('token',token)
        },
        setLang: (state, action) => {
            state.lang = action.payload
        },
        logOut: (state, action) => {
            localStorage.removeItem('token')
        }
    },
})

export const { setCredentials, logOut, setLang } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectLang = (state) => state.auth.lang

