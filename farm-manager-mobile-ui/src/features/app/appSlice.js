import { createSlice } from "@reduxjs/toolkit"
import { asLocalDate, isStringEmpty, newDate, PLAN } from "../../ui/FarmUtil";

export const DEFAULT_PLAN_STATUS = ''
export const DEFAULT_ACTIVITY_STATUS = ''

const lang = localStorage.getItem('lang')
const showInventory = 'true' === localStorage.getItem('showInventory');
const showPlans = 'true' === localStorage.getItem('showPlans');
const newActivityGeo = 'true' === localStorage.getItem('newActivityGeo');
const activeGPS = 'true' === localStorage.getItem('activeGPS');

const showFieldName = 'true' === localStorage.getItem('showFieldName');
const showFieldAlias = 'true' === localStorage.getItem('showFieldAlias');
const showOfficialFieldId = 'true' === localStorage.getItem('showOfficialFieldId');

const scouterId = localStorage.getItem('scouterId');
const scouterName = localStorage.getItem('scouterName');




const appSlice = createSlice({
    name: 'auth',
    initialState: {
        lang: { lang: lang ? lang : 'en', dir: lang === 'he' ? 'rtl' : 'ltr', },
        token: localStorage.getItem('token'),
        refreshToken: localStorage.getItem('refreshToken'),
        fieldFreeTextFilter: '',
        selectedFieldFilterOptions: [],
        selectedActivityFilterOptions: [],
        selectedActivityPlanFilterOptions: [],
        activityFreeTextFilter: '',
        fieldFilter: '',
        currentYear: newDate().getFullYear(),
        fieldDashboardYear: newDate().getFullYear(),
        appBarDialogOpen: false,
        startDateFilter: null,
        endDateFilter: null,
        fieldsViewStatus: 'all',
        activityType: '',
        snackbarMsg: '',
        snackbarSeverity: 'succsess',
        openSettings: false,
        userConf: [],
        inventoryFreeTextFilter: '',
        inventoryDateFilter: asLocalDate(new Date(), true),
        inventoryWarehouseFilter: 0,
        showInventory,
        showPlans,
        openLayers: false,
        showLayers: [],
        editLayer: null,
        mapCenter: null,
        mapZoom: null,
        showFieldName,
        showFieldAlias,
        showOfficialFieldId,
        newActivityGeo,
        accuracy: null,
        longitude: null,
        latitude: null,
        activeGPS,
        visibleLayers: [],
        defaultScouter: isStringEmpty(scouterId) ? null : { id: scouterId, name: scouterName }
        // showPestsLayer: false,
        // showTrapsLayer: false,
        // showIrrigationHeadsLayer: false,
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
        setOpenLayers: (state, action) => {
            state.openLayers = action.payload;
            state.editLayer = null;
        },
        logOut: (state, action) => {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('scouterId')
            localStorage.removeItem('scouterName')
            state.token = null
            state.refreshToken = null;
        }, setCurrentYear: (state, action) => {
            state.currentYear = action.payload
            state.fieldDashboardYear = action.payload
        }, setAppBarDialogOpen: (state, action) => {
            state.appBarDialogOpen = action.payload
        }, setFieldFreeTextFilter: (state, action) => {
            state.fieldFreeTextFilter = action.payload 
        }, setSelectedFieldFilterOptions: (state, action) => {
            state.selectedFieldFilterOptions = action.payload 
        }, setSelectedActivityFilterOptions: (state, action) => {
            state.selectedActivityFilterOptions = action.payload 
        }, setSelectedActivityPlanFilterOptions: (state, action) => {
            state.selectedActivityPlanFilterOptions = action.payload 
        }, setActivityFreeTextFilter: (state, action) => {
            state.activityFreeTextFilter = action.payload
        }, setStartDateFilter: (state, action) => {
            state.startDateFilter = action.payload
        }, setEndDateFilter: (state, action) => {
            state.endDateFilter = action.payload
        }, 
        setFieldDashboardYear: (state, action) => {
            state.fieldDashboardYear = action.payload
        },
        setFieldsViewStatus: (state, action) => {
            state.fieldsViewStatus = action.payload
        },


        setActivityType: (state, action) => {
            state.activityType = action.payload
        },
        setSnackbar: (state, action) => {
            state.snackbarMsg = action.payload.msg;
            state.snackbarSeverity = action.payload.severity ? action.payload.severity : 'success';
        },
        setInventoryFreeTextFilter: (state, action) => {
            state.inventoryFreeTextFilter = action.payload
        },
        setInventoryDateFilter: (state, action) => {
            state.inventoryDateFilter = action.payload
        },
        setInventoryWarehouseFilter: (state, action) => {
            state.inventoryWarehouseFilter = action.payload ? action.payload : 0;
        },
        setShowInventory: (state, action) => {
            localStorage.setItem('showInventory', action.payload);
            state.showInventory = action.payload;
        },
        setShowPlans: (state, action) => {
            localStorage.setItem('showPlans', action.payload);
            state.showPlans = action.payload;
        },
        setShowLayers: (state, action) => {
            state.showLayers = action.payload
        },
        setEditLayer: (state, action) => {
            state.editLayer = action.payload
        },
        setMapCenter: (state, action) => {
            state.mapCenter = action.payload
        },
        setMapZoom: (state, action) => {
            state.mapZoom = action.payload
        },
        setShowFieldAlias: (state, action) => {
            state.showFieldAlias = action.payload;
            localStorage.setItem('showFieldAlias', action.payload);
        },
        setShowOfficialFieldId: (state, action) => {
            state.showOfficialFieldId = action.payload;
            localStorage.setItem('showOfficialFieldId', action.payload);
        },
        setShowFieldName: (state, action) => {
            state.showFieldName = action.payload;
            localStorage.setItem('showFieldName', action.payload);
        },
        setNewActivityGeo: (state, action) => {
            localStorage.setItem('newActivityGeo', action.payload);
            state.newActivityGeo = action.payload;
        },

        setActiveGPS: (state, action) => {
            localStorage.setItem('activeGPS', action.payload);
            state.activeGPS = action.payload;
        },

        setAccuracy: (state, action) => {
            state.accuracy = action.payload
        },
        setLatitude: (state, action) => {
            state.latitude = action.payload
        },
        setLongitude: (state, action) => {
            state.longitude = action.payload
        },
        setDefaultScouter: (state, action) => {
            state.defaultScouter = action.payload
            if (action.payload) {
                localStorage.setItem('scouterId', action.payload?.id);
                localStorage.setItem('scouterName', action.payload?.name);
            }
        },
        setVisibleLayers: (state, action) => {
            const isSelected = state.visibleLayers.find(e => e === action.payload) ? true : false;
            if (isSelected) {

                state.visibleLayers = [...state.visibleLayers].filter(e => e !== action.payload)
            } else {
                state.visibleLayers = [...state.visibleLayers].concat([action.payload])
            }
        },
    },
})

export const { setCredentials, logOut, setLang, setCurrentYear, setAppBarDialogOpen, setFieldFreeTextFilter, setActivityFreeTextFilter,
    setStartDateFilter, setEndDateFilter, 
    setFieldDashboardYear, setFieldsViewStatus,
    setActivityType, setSnackbar, setOpenSettings, setInventoryFreeTextFilter,
    setInventoryDateFilter, setInventoryWarehouseFilter, setShowInventory, setShowPlans, setOpenLayers, setShowLayers, setEditLayer, setMapCenter, setMapZoom,
    setShowFieldAlias, setShowFieldName, setNewActivityGeo, setAccuracy, setActiveGPS, setLongitude, setLatitude, setActivityParentFieldFilter, setActivityBaseFieldFilter, setActivitySiteFilter,
    setShowOfficialFieldId, setVisibleLayers, setDefaultScouter,setSelectedFieldFilterOptions, setSelectedActivityFilterOptions, setSelectedActivityPlanFilterOptions
} = appSlice.actions

export default appSlice.reducer

export const selectCurrentToken = (state) => state.app.token
export const selectLang = (state) => state.app.lang
export const selectCurrentYear = (state) => state.app.currentYear
export const selectAppBarDialogOpen = (state) => state.app.appBarDialogOpen
export const selectFieldFreeTextFilter = (state) => state.app.fieldFreeTextFilter
export const selectActivityFreeTextFilter = (state) => state.app.activityFreeTextFilter
export const selectStartDateFilter = (state) => state.app.startDateFilter
export const selectEndDateFilter = (state) => state.app.endDateFilter
export const selectFieldDashboardYear = (state) => state.app.fieldDashboardYear
export const selectFieldsViewStatus = (state) => state.app.fieldsViewStatus
export const selectActivityType = (state) => state.app.activityType
export const selectSnackbarMsg = (state) => state.app.snackbarMsg
export const selectSnackbarSeverity = (state) => state.app.snackbarSeverity
export const selectOpenSettings = (state) => state.app.openSettings
export const selectInventoryFreeTextFilter = (state) => state.app.inventoryFreeTextFilter
export const selectInventoryDateFilter = (state) => state.app.inventoryDateFilter
export const selectInventoryWarehouseFilter = (state) => state.app.inventoryWarehouseFilter
export const selectShowInventory = (state) => state.app.showInventory
export const selectShowPlans = (state) => state.app.showPlans
export const selectOpenLayers = (state) => state.app.openLayers
export const selectShowLayers = (state) => state.app.showLayers
export const selectEditLayer = (state) => state.app.editLayer
export const selectMapCenter = (state) => state.app.mapCenter
export const selectMapZoom = (state) => state.app.mapZoom
export const selectShowFieldName = (state) => state.app.showFieldName
export const selectShowFieldAlias = (state) => state.app.showFieldAlias
export const selectNewActivityGeo = (state) => state.app.newActivityGeo
export const selectAccuracy = (state) => state.app.accuracy
export const selectActiveGPS = (state) => state.app.activeGPS
export const selectLongitude = (state) => state.app.longitude
export const selectLatitude = (state) => state.app.latitude
export const selectShowOfficialFieldId = (state) => state.app.showOfficialFieldId
export const selectVisibilLayes = (state) => state.app.visibleLayers
export const selectDefaultScouter = (state) => state.app.defaultScouter
export const selectSelectedFieldFilterOptions = (state) => state.app.selectedFieldFilterOptions
export const selectSelectedActivityFilterOptions = (state) => state.app.selectedActivityFilterOptions
export const selectSelectedActivityPlanFilterOptions = (state) => state.app.selectedActivityPlanFilterOptions


