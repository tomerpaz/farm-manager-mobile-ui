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
        fieldFilter: '', 
        currentYear: newDate().getFullYear(),
        fieldDashboardYear: newDate().getFullYear(),
        appBarDialogOpen: false,
        startDateFilter: null,
        endDateFilter: null,
        activityTypeFilter: '',
        fieldSiteFilter: 0,
        fieldBaseFieldFilter: 0,
        fieldsViewStatus: 'all', 
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
        }, setCurrentYear: (state, action) => {
            state.currentYear = action.payload
            state.fieldDashboardYear = action.payload          
        }, setAppBarDialogOpen: (state, action) => {
            state.appBarDialogOpen = action.payload
        }, setFieldFreeTextFilter: (state, action) => {
            state.fieldFreeTextFilter = action.payload
        }, setActivityFreeTextFilter: (state, action) => {
            state.activityFreeTextFilter = action.payload
        }, setStartDateFilter: (state, action) => {
            state.startDateFilter = action.payload
        }, setEndDateFilter: (state, action) => {
            state.endDateFilter = action.payload
        }, setActivityTypeFilter: (state, action) => {
            state.activityTypeFilter = action.payload
        }, setFieldSiteFilter: (state, action) => {
            state.fieldSiteFilter = action.payload
            state.fieldBaseFieldFilter = 0;
        }, setFieldBaseFieldFilter: (state, action) => {
            state.fieldBaseFieldFilter = action.payload;
            state.fieldSiteFilter = 0;
        },
        setFieldDashboardYear: (state, action) => {
            state.fieldDashboardYear = action.payload          
        },
        setFieldsViewStatus: (state, action) => {
            state.fieldsViewStatus = action.payload          
        },
    },
})

export const { setCredentials, logOut, setLang, setCurrentYear, setAppBarDialogOpen, setFieldFreeTextFilter, setActivityFreeTextFilter,
    setStartDateFilter, setEndDateFilter, setActivityTypeFilter, setFieldSiteFilter, setFieldBaseFieldFilter, setFieldDashboardYear, setFieldsViewStatus } = appSlice.actions

export default appSlice.reducer

export const selectCurrentToken = (state) => state.app.token
export const selectLang = (state) => state.app.lang
export const selectCurrentYear = (state) => state.app.currentYear
export const selectAppBarDialogOpen = (state) => state.app.appBarDialogOpen
export const selectFieldFreeTextFilter = (state) => state.app.fieldFreeTextFilter
export const selectActivityFreeTextFilter = (state) => state.app.activityFreeTextFilter
export const selectStartDateFilter = (state) => state.app.startDateFilter
export const selectEndDateFilter = (state) => state.app.endDateFilter
export const selectActivityTypeFilter = (state) => state.app.activityTypeFilter
export const selectFieldSiteFilter = (state) => state.app.fieldSiteFilter
export const selectFieldBaseFieldFilter = (state) => state.app.fieldBaseFieldFilter
export const selectFieldDashboardYear = (state) => state.app.fieldDashboardYear
export const selectFieldsViewStatus = (state) => state.app.fieldsViewStatus