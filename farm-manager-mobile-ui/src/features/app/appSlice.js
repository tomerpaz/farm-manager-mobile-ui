import { createSlice } from "@reduxjs/toolkit"
import { newDate } from "../../ui/FarmUtil";

const appSlice = createSlice({
    name: 'auth',
    initialState: { lang: {lang: 'en', dir: 'rtl', } , 
    token: localStorage.getItem('token'), 
    refreshToken: localStorage.getItem('refreshToken'), 
    fieldFilter: '', currentYear: newDate().getFullYear()},
    reducers: {
        setCredentials: (state, action) => {
            const {token, refreshToken} = action.payload;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            state.token = token;
            state.refreshToken = refreshToken;
        },
        setLang: (state, action) => {
            state.lang = action.payload
        },
        logOut: (state, action) => {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            state.token = null
            state.refreshToken = null;

        },
        setCurrentYear: (state, action) => {
            state.currentYear = action.payload
        },
    },
})

export const { setCredentials, logOut, setLang, setCurrentYear } = appSlice.actions

export default appSlice.reducer

export const selectCurrentToken = (state) => state.app.token
export const selectLang = (state) => state.app.lang
export const selectCurrentYear = (state) => state.app.currentYear

