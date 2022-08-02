import {
    GET_PROCUREMENT, SET_PROCUREMENT, PROCUREMENT_CREATED, PROCUREMENT_UPDATED,
    CUSTOMER_OR_SUPPLIER_CREATED, INVALIDATE_USER,
    SET_PROCUREMENT_FILTER, SET_PROCUREMENT_FILTER_FREE_TEXT, SET_PROCUREMENT_FILTER_START, SET_PROCUREMENT_FILTER_END, GET_PROCUREMENTS,
    SET_PROCUREMENT_CURRENT_PAGE, SET_PROCUREMENT_SORTING, SET_FETCHING_PROCUREMENTS, SET_TABLE_PAGE_SIZE,
    UPLOAD_FILE, DELETE_FILE, SET_SUPPLIER_INVOICE, SET_SUPPLIER_MONTH_INVOICE,
    DUPLICATE_PROCUREMENT,

} from '../actions/types';
import { getSuggestionsNameElement } from "../components/core/optionsUtil";


const INITIAL_STATE = {
    procurements: [],
    procurement: null,
    procuremenetFilter: null,
    procuremenetStart: null,
    procuremenetEnd: null,
    procuremenetFreeText: '',
    fetchProcuremenet: false,
    fetchingProcurement: false,
    procurementCurrentPage: 0,
    procurementTotalCount: 0,
    procurementSorting: { columnName: 'id', direction: 'desc' },
    fetchingProcuremenet: false,
    supplierInvoice: false,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case INVALIDATE_USER: {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case SET_SUPPLIER_INVOICE: {
            return {
                ...state,
                supplierInvoice: action.payload,
            };
        }
        case SET_SUPPLIER_MONTH_INVOICE: {
            return {
                ...state,
                supplierInvoice: null,
            };
        }
        case SET_FETCHING_PROCUREMENTS: {
            return {
                ...state,
                fetchingProcuremenet: true,
            };
        }
        case GET_PROCUREMENTS: {
            // console.log(action);
            const procurements = action.payload.content;
            const procurementCurrentPage = action.payload.number;
            const procurementTotalCount = action.payload.totalElements;

            return {
                ...state,
                procurements,
                procurementCurrentPage,
                procurementTotalCount,
                fetchProcuremenet: false,
                fetchingProcuremenet: false,
            };
        }
        case UPLOAD_FILE:
        case DELETE_FILE:
        case SET_TABLE_PAGE_SIZE: {
            return {
                ...state,
                fetchProcuremenet: true,
                fetchingProcuremenet: false,

            }
        }

        case DUPLICATE_PROCUREMENT:
        case GET_PROCUREMENT:
            const procurement = action.payload;
            procurement.procurementFields = procurement.fields;
            procurement.fields = null;
            procurement.selectedSupplierOption = getSuggestionsNameElement(procurement.supplier, 'resource');

            if(procurement.activityDef){
                procurement.activityDef = getSuggestionsNameElement(procurement.activityDef, 'activityDef');
            }


            if (action.type === DUPLICATE_PROCUREMENT) {
                procurement.id = null;
                procurement.deletable = false;
                if (procurement.procurementFields) {
                    procurement.procurementFields.forEach((item, index) => {
                        item.id = null;
                        item.actvity = null;
                    });
                }
                if (procurement.items) {
                    procurement.items.forEach((item, index) => {
                        item.id = null;
                        if(item.tariff){
                            item.tariff.id = null;
                        }
                    });
                }
            }

            return {
                ...state,
                procurement,

            };




        case SET_PROCUREMENT:
            return {
                ...state,
                procurement: action.payload,
            };


        case SET_PROCUREMENT_SORTING:
            return {
                ...state,
                procurementSorting: action.payload,
                fetchProcuremenet: true,
            };

        case SET_PROCUREMENT_CURRENT_PAGE:
            return {
                ...state,
                procurementCurrentPage: action.payload,
                fetchProcuremenet: true,
            };

        case SET_PROCUREMENT_FILTER_END: {
            const fetchProcuremenet = state.procuremenetEnd !== action.payload;
            return {
                ...state,
                procuremenetEnd: action.payload,
                fetchProcuremenet,
            };
        }
        case SET_PROCUREMENT_FILTER_START: {
            const fetchProcuremenet = state.procuremenetStart !== action.payload;
            return {
                ...state,
                procuremenetStart: action.payload,
                fetchProcuremenet,

            };
        }
        case SET_PROCUREMENT_FILTER_FREE_TEXT:
            return {
                ...state,
                procuremenetFreeText: action.payload,
                fetchProcuremenet: true,

            };
        case SET_PROCUREMENT_FILTER:
            return {
                ...state,
                procuremenetFilter: action.payload,
                fetchProcuremenet: true,

            };

        case PROCUREMENT_CREATED:
        case PROCUREMENT_UPDATED:
            return {
                ...state,
                procurement: null,

            };
        case CUSTOMER_OR_SUPPLIER_CREATED: {
            const procurement = state.procurement;
            if (procurement) {
                procurement.selectedSupplierOption = getSuggestionsNameElement(action.payload, 'resource');
            }
            return {
                ...state,
                procurement,
            };
        }
        default:
            return state;
    }
}

