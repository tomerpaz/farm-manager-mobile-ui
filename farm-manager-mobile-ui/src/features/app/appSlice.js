import { createSlice } from "@reduxjs/toolkit"
import { newDate } from "../../ui/FarmUtil";

const appSlice = createSlice({
    name: 'auth',
    initialState: {
        lang: { lang: 'en', dir: 'rtl', },
        token: localStorage.getItem('token'),
        refreshToken: localStorage.getItem('refreshToken'),
        fieldFreeTextFilter: '',
        activityFreeTextFilter: '',
        fieldFilter: '', currentYear: newDate().getFullYear(),
        appBarDialogOpen: false,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { token, refreshToken } = action.payload;
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
        setAppBarDialogOpen: (state, action) => {
            state.appBarDialogOpen = action.payload
        },
        setFieldFreeTextFilter: (state, action) => {
            state.fieldFreeTextFilter = action.payload
        },
        setActivityFreeTextFilter: (state, action) => {
            state.activityFreeTextFilter = action.payload
        },
        
    },
})

export const { setCredentials, logOut, setLang, setCurrentYear, setAppBarDialogOpen, setFieldFreeTextFilter, setActivityFreeTextFilter } = appSlice.actions

export default appSlice.reducer

export const selectCurrentToken = (state) => state.app.token
export const selectLang = (state) => state.app.lang
export const selectCurrentYear = (state) => state.app.currentYear
export const selectAppBarDialogOpen = (state) => state.app.appBarDialogOpen
export const selectFieldFreeTextFilter = (state) => state.app.fieldFreeTextFilter
export const selectActivityFreeTextFilter = (state) => state.app.activityFreeTextFilter


