import {
    ACTIVITY_CREATED,
    ACTIVITY_UPDATED,
    GET_ACTIVITIES,
    GET_ACTIVITY,
    GET_PLAN_ACTIVITIES,
    GET_WAYBILLS,
    INVALIDATE_USER,
    LOAD_TRANSLATION,
    NEW_ACTIVITY,
    SET_ACTIVITY,
    SET_ACTIVITY_TABLE_CURRENT_PAGE,
    SET_ACTIVITY_TABLE_END,
    SET_ACTIVITY_TABLE_FILTER,
    SET_ACTIVITY_TABLE_FREE_TEXT_DEEP_SEARCH,
    SET_ACTIVITY_TABLE_FREE_TEXT,
    SET_ACTIVITY_TABLE_SORTING,
    SET_ACTIVITY_TABLE_START,
    SET_WAYBILLS,
    ACTIVITY_DEF_CREATED,
    CUSTOMER_OR_SUPPLIER_CREATED,
    SET_FETCHING_ACTIVITIES,
    SET_FETCHING_PLAN_ACTIVITIES,
    SET_PLAN_ACTIVITY_TABLE_FILTER,
    SET_PLAN_ACTIVITY_TABLE_START,
    SET_PLAN_ACTIVITY_TABLE_SORTING,
    SET_PLAN_ACTIVITY_TABLE_END,
    SET_PLAN_ACTIVITY_TABLE_FREE_TEXT,
    SET_PLAN_ACTIVITY_TABLE_CURRENT_PAGE,
    SET_TABLE_PAGE_SIZE,
    DELETE_ACTIVITY,
    CLEAR_ACTIVITIES,
    MARK_DELETE_ACTIVITY,
    GET_APPROVAL, CLEAR_APPROVAL, UPDATE_APPROVAL_PRINTED, APPROVAL_UPDATED, SET_DOMAIN_HISTORY_TABLE_FILTER} from '../actions/types';
import { getSuggestionsNameElement } from "../components/core/optionsUtil";
import { newDate } from '../utils';
import {format}  from 'date-fns';

import { HOUR_ACTIVITIES } from '../modules/activity/types';

const defaultPageSize = 15;
const INITIAL_STATE = {
    activity: null,
    waybills: [],
    activityTableFilter: null,
    activityTableStart: null,
    activityTableEnd: null,
    activityTableFreeText: '',
    fetchActivities: true,
    isPlanTable: false,
    activityTableSorting: { columnName: 'execution', direction: 'desc' },
    activityTableCurrentPage: 0,
    activityTablePageSize: defaultPageSize,
    activities: [],
    totalActivityCount: 0,

    planActivityTableFilter: null,
    planActivityTableStart: null,
    planActivityTableEnd: null,
    planActivityTableFreeText: '',
    planActivityTableSorting: { columnName: 'execution', direction: 'desc' },
    planActivityTableCurrentPage: 0,
    planActivityTablePageSize: defaultPageSize,
    planActivities: [],
    planTotalActivityCount: 0,
    planFetchActivities: true,

    activityTypeFilterOptions: [],
    execActivityTypeFilterOptions: [],
    planActivityTypeFilterOptions: [],
    reloadDomains: false,

    fetchingActivities: false,
    fetchingPlanActivities: false,
    fetchTime: null,
    planFetchTime: null,

    planFilterTimestamp: null,
    filterTimestamp: null,
    lastActivityUuid: null,

    approval: null,
    lastDeletedUuid: null,

    activityTableFreeTextDeepSearch: false,

    domainHistoryTableFilter: null,


};


export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case INVALIDATE_USER: {
            return {
                ...state,
                ...INITIAL_STATE,
            }
        }

        case MARK_DELETE_ACTIVITY: {
            return {
                ...state,
                lastDeletedUuid: action.payload,
            }
        }

        case LOAD_TRANSLATION:
            const planActivityTableFilter = [{ value: "status_PLAN", label: action.payload.plan }];
            return {
                ...state,
                planActivityTableFilter,
            };

        case GET_APPROVAL: {
            return {
                ...state,
                approval: action.payload,
            };
        }

        case APPROVAL_UPDATED: 
        case CLEAR_APPROVAL: {
            return {
                ...state,
                approval: null,
            };
        }
        case UPDATE_APPROVAL_PRINTED: {
            const  activities = [...state.activities];
            return {
                ...state,
                activities,
            };
        }

        case GET_ACTIVITY: {
            if (action.payload) {
                action.payload.activityDomains = action.payload.domains;
                action.payload.domains = null;
            }

            const activity = action.payload;
            if (activity.activityDef) {
                activity.selectedActivityDefOption = getSuggestionsNameElement(activity.activityDef, 'activityDef');
            }
            if (activity.pestId) {
                activity.pest = { value: activity.pestId, label: activity.pestName }
            }
            if (activity.crop) {
                activity.crop.name = activity.crop.alias;
                activity.selectedCropOption = getSuggestionsNameElement(activity.crop, 'crop');
            }
            if (activity.customer) {
                activity.selectedCustomerOption = getSuggestionsNameElement(activity.customer, 'resource');
            }

            if (action.payload.activityDomains) {
                action.payload.activityDomains.forEach(d => {
                    if (d.container) {
                        d.containerId = d.container.id;
                    }
                    if (d.product) {
                        d.productId = d.product.id;
                    }
                });
            }


            if (activity.hour && activity.hour.includes(":")) {
                const parts = activity.hour.split(":");
                activity.hour = parts[0] + parts[1];
            }


            return {
                ...state,
                activity,
                lastActivityUuid: action.payload.uuid,
            };
        }
        case SET_FETCHING_ACTIVITIES: {
            return {
                ...state,
                fetchingActivities: true,
                fetchTime: action.payload,
            };
        }

        case SET_FETCHING_PLAN_ACTIVITIES: {
            return {
                ...state,
                fetchingPlanActivities: true,
                planFetchTime: action.payload,
            };
        }

        case CLEAR_ACTIVITIES: {
            return {
                ...state,
                activities: [],
                fetchActivities: true,
            }
        }
        case GET_ACTIVITIES: {

            const uuid = state.lastDeletedUuid;
            const activities = uuid ? action.payload.activities.content.filter(e => e.id !== uuid) : action.payload.activities.content;

            const totalActivityCount = action.payload.activities.totalElements;
            const timestamp = action.payload.timestamp;
            const hasNewFilter = (state.filterTimestamp && state.filterTimestamp > timestamp);


            if (state.fetchTime && state.fetchTime > timestamp) {
                console.log('redundant...')
                return {
                    ...state,
                }
            }
            else {
                return {
                    ...state,
                    //activities: hasNewFilter ? state.activities : action.payload.activities.content,
                    activities,
                    totalActivityCount,
                    fetchActivities: hasNewFilter ? true : false,
                    fetchingActivities: false,
                    lastDeletedUuid: null,

                };
            }
        }

        case GET_PLAN_ACTIVITIES: {
            const uuid = state.lastDeletedUuid;
            const planActivities = uuid ? action.payload.activities.content.filter(e => e.id !== uuid) : action.payload.activities.content;
            const planTotalActivityCount = action.payload.activities.totalElements;
            const timestamp = action.payload.timestamp;
            const hasNewFilter = (state.planFilterTimestamp && state.planFilterTimestamp > timestamp);
            if ((state.planFetchTime && state.planFetchTime > timestamp)) {
                console.log('redundant...')
                return {
                    ...state,
                }
            } else {
                return {
                    ...state,
                    planActivities,
                    //planActivities: hasNewFilter ? state.planActivities : action.payload.activities.content,
                    planTotalActivityCount,
                    planFetchActivities: hasNewFilter ? true : false,
                    fetchingPlanActivities: false,
                    lastDeletedUuid: null,
                };
            }

        }
        case NEW_ACTIVITY:
            const execution = newDate();
            const end = newDate();
            const hour = HOUR_ACTIVITIES.includes(action.payload.activityType) ? format(new Date(),"HHmm") : null;

            end.setDate(execution.getDate() + 1)
            if (action.payload) {
                action.payload.activityDomains = [];
                action.payload.domains = null;
                action.payload.execution = execution;
                action.payload.hour = hour;
                action.payload.end = end;
                action.payload.deletable = false;
            }
            return {
                ...state,
                activity: action.payload,

            };
        case SET_ACTIVITY:
            return {
                ...state,
                activity: action.payload,
            };
        case GET_WAYBILLS:
            return {
                ...state,
                waybills: action.payload,
            };
        case SET_WAYBILLS:
            return {
                ...state,
                waybills: action.payload ? action.payload : [],
            };

        case SET_ACTIVITY_TABLE_FILTER: {

            const activityTableFilter = action.payload;
            return {
                ...state,
                activityTableFilter,
                fetchActivities: true,
                filterTimestamp: newDate().getTime(),
            }
        }

        case SET_DOMAIN_HISTORY_TABLE_FILTER: {

            const domainHistoryTableFilter = action.payload;
            return {
                ...state,
                domainHistoryTableFilter,
            }
        }

        case SET_ACTIVITY_TABLE_FREE_TEXT_DEEP_SEARCH: {

            const activityTableFreeTextDeepSearch = action.payload;
            return {
                ...state,
                activityTableFreeTextDeepSearch,
                fetchActivities: true,
                filterTimestamp: newDate().getTime(),
            }
        }

        case SET_PLAN_ACTIVITY_TABLE_FILTER: {
            return {
                ...state,
                planActivityTableFilter: action.payload,
                planFetchActivities: true,
                planFilterTimestamp: newDate().getTime(),

            }
        }
        case SET_ACTIVITY_TABLE_START: {
            const fetchActivities = state.activityTableStart !== action.payload;
            const filterTimestamp = fetchActivities ? newDate().getTime() : state.filterTimestamp;
            return {
                ...state,
                activityTableStart: action.payload,
                fetchActivities,
                filterTimestamp,

            }
        }

        case SET_PLAN_ACTIVITY_TABLE_START: {
            const planFetchActivities = state.planActivityTableStart !== action.payload;
            const planFilterTimestamp = planFetchActivities ? newDate().getTime() : state.planFilterTimestamp;
            return {
                ...state,
                planActivityTableStart: action.payload,
                planFetchActivities,
                planFilterTimestamp,
            }
        }

        case SET_ACTIVITY_TABLE_END: {
            const fetchActivities = state.activityTableEnd !== action.payload;
            const filterTimestamp = fetchActivities ? newDate().getTime() : state.filterTimestamp;
            return {
                ...state,
                activityTableEnd: action.payload,
                fetchActivities,
                filterTimestamp,
            }

        }

        case SET_PLAN_ACTIVITY_TABLE_END: {
            const planFetchActivities = state.planActivityTableEnd !== action.payload;
            const planFilterTimestamp = planFetchActivities ? newDate().getTime() : state.planFilterTimestamp;
            return {
                ...state,
                planActivityTableEnd: action.payload,
                planFetchActivities,
                planFilterTimestamp,

            }
        }
        case SET_ACTIVITY_TABLE_FREE_TEXT: {
            return {
                ...state,
                activityTableFreeText: action.payload,
                fetchActivities: true,
                filterTimestamp: newDate().getTime(),

            }
        }


        case SET_PLAN_ACTIVITY_TABLE_FREE_TEXT: {
            return {
                ...state,
                planActivityTableFreeText: action.payload,
                planFetchActivities: true,
                planFilterTimestamp: newDate().getTime(),

            }
        }

        case SET_ACTIVITY_TABLE_SORTING: {

            return {
                ...state,
                activityTableSorting: action.payload,
                fetchActivities: true,
                filterTimestamp: newDate().getTime(),


            }
        }

        case SET_PLAN_ACTIVITY_TABLE_SORTING: {

            return {
                ...state,
                planActivityTableSorting: action.payload,
                planFetchActivities: true,
                planFilterTimestamp: newDate().getTime(),

            }
        }

        case SET_ACTIVITY_TABLE_CURRENT_PAGE: {
            return {
                ...state,
                activityTableCurrentPage: action.payload,
                fetchActivities: true,
                filterTimestamp: newDate().getTime(),
            }
        }

        case SET_TABLE_PAGE_SIZE: {
            return {
                ...state,
                fetchActivities: true,
            }
        }

        case SET_PLAN_ACTIVITY_TABLE_CURRENT_PAGE: {
            return {
                ...state,
                planActivityTableCurrentPage: action.payload,
                planFetchActivities: true,
                planFilterTimestamp: newDate().getTime(),

            }
        }

        case ACTIVITY_DEF_CREATED: {

            const activity = state.activity;
            if (activity) {
                activity.selectedActivityDefOption = getSuggestionsNameElement(action.payload, 'activityDef');
            }
            return {
                ...state,
                activity,
            };
        }

        case CUSTOMER_OR_SUPPLIER_CREATED: {
            const activity = state.activity;
            if (activity) {
                activity.selectedCustomerOption = getSuggestionsNameElement(action.payload, 'resource');
            }
            return {
                ...state,
                activity,
            };
        }


        case ACTIVITY_CREATED:
        case ACTIVITY_UPDATED: {
            const reloadDomains = action.payload.message === 'reloadDomains' ? true : false;
            return {
                ...state,
                reloadDomains,
                activity: null,
            };
        }

        case DELETE_ACTIVITY: {
            return {
                ...state,
                reloadDomains: true,
            };
        }

        default:
            return state;
    }
}

