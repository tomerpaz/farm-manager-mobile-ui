import { createSlice } from "@reduxjs/toolkit"
import { asLocalDate, newDate, PLAN } from "../../ui/FarmUtil";

export const DEFAULT_PLAN_STATUS = PLAN
export const DEFAULT_ACTIVITY_STATUS = ''

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
        activityPlanTypeFilter: '',
        fieldSiteFilter: 0,
        fieldBaseFieldFilter: 0,
        fieldsViewStatus: 'all',
        activityStatusFilter: '',
        activityPlanStatusFilter: DEFAULT_PLAN_STATUS,
        activityType: '',
        snackbarMsg: '',
        snackbarSeverity: 'succsess',
        openSettings: false,
        userConf: [],
        inventoryFreeTextFilter: '',
        inventoryDateFilter: asLocalDate(new Date(), true),
        inventoryWarehouseFilter: 0,
        showInventory: localStorage.getItem('showInventory') ? Boolean(localStorage.getItem('showInventory')) : false,
        showPlans: localStorage.getItem('showPlans') ? Boolean(localStorage.getItem('showPlans')) : false,

    },
    reducers: {
        setCredentials: (state, action) => {
            const { token, refreshToken } = action.payload;
            if (token) {
                localStorage.setItem('token', token);
            } else {
                localStorage.removeItem('token')
            }
            localStorage.setItem('refreshToken', refreshToken);
            state.token = token;
            state.refreshToken = refreshToken;
        },
        setLang: (state, action) => {
            localStorage.setItem('lang', action.payload.lang);
            state.lang = action.payload;
        },
        setOpenSettings: (state, action) => {
            state.openSettings = action.payload
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
        }, setActivityPlanTypeFilter: (state, action) => {
            state.activityPlanTypeFilter = action.payload
        }, setActivityPlanStatusFilter: (state, action) => {
            state.activityPlanStatusFilter = action.payload
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

        setActivityStatusFilter: (state, action) => {
            state.activityStatusFilter = action.payload
        },
        setActivityPlanStatusFilter: (state, action) => {
            state.activityPlanStatusFilter = action.payload
        },

        setActivityType: (state, action) => {
            state.activityType = action.payload
        },
        setSnackbar: (state, action) => {
            state.snackbarMsg = action.payload.msg;
            state.snackbarSeverity = action.payload.severity ? action.payload.severity : 'success' ;
        },
        setInventoryFreeTextFilter: (state, action) => {
            state.inventoryFreeTextFilter = action.payload
        },
        setInventoryDateFilter: (state, action) => {
            state.inventoryDateFilter = action.payload
        }, 
        setInventoryWarehouseFilter: (state, action) => {
            state.inventoryWarehouseFilter = action.payload ?  action.payload: 0;
        },
        setShowInventory: (state, action) => {
            localStorage.setItem('showInventory', action.payload);
            state.showInventory = action.payload;
        },
        setShowPlans: (state, action) => {
            localStorage.setItem('showPlans', action.payload);
            state.showPlans = action.payload;
        }
    },
})

export const { setCredentials, logOut, setLang, setCurrentYear, setAppBarDialogOpen, setFieldFreeTextFilter, setActivityFreeTextFilter,
    setStartDateFilter, setEndDateFilter, setActivityTypeFilter, setFieldSiteFilter, setFieldBaseFieldFilter, setFieldDashboardYear, setFieldsViewStatus,
    setActivityPlanStatusFilter, setActivityPlanTypeFilter, setActivityStatusFilter, setActivityType, setSnackbar, setOpenSettings, setInventoryFreeTextFilter,
    setInventoryDateFilter, setInventoryWarehouseFilter, setShowInventory,setShowPlans } = appSlice.actions

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
export const selectActivityPlanTypeFilter = (state) => state.app.activityPlanTypeFilter
export const selectFieldSiteFilter = (state) => state.app.fieldSiteFilter
export const selectFieldBaseFieldFilter = (state) => state.app.fieldBaseFieldFilter
export const selectFieldDashboardYear = (state) => state.app.fieldDashboardYear
export const selectFieldsViewStatus = (state) => state.app.fieldsViewStatus
export const selectActivityStatusFilter = (state) => state.app.activityStatusFilter
export const selectActivityPlanStatusFilter = (state) => state.app.activityPlanStatusFilter
export const selectActivityType = (state) => state.app.activityType
export const selectSnackbarMsg = (state) => state.app.snackbarMsg
export const selectSnackbarSeverity = (state) => state.app.snackbarSeverity
export const selectOpenSettings = (state) => state.app.openSettings
export const selectInventoryFreeTextFilter = (state) => state.app.inventoryFreeTextFilter
export const selectInventoryDateFilter = (state) => state.app.inventoryDateFilter
export const selectInventoryWarehouseFilter = (state) => state.app.inventoryWarehouseFilter
export const selectShowInventory = (state) => state.app.showInventory
export const selectShowPlans = (state) => state.app.showPlans

