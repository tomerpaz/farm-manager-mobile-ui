import {DELETE_DOMAIN, GET_DOMAIN, SELECT_DOMAIN, INVALIDATE_USER,} from '../actions/types';
import {isEmpty} from "../utils/StringUtil";


const INITIAL_STATE = {
    // sites: [],
    selectedDomain: null,
    // reloadSites: false,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case GET_DOMAIN:
        case SELECT_DOMAIN: {
            const selectedDomain = action.payload;

            if (selectedDomain) {
                if (selectedDomain.field) {
                    selectedDomain.selectedFieldOption = {
                        value: 'field_' + selectedDomain.field.id,
                        label: selectedDomain.field.name,
                        element: selectedDomain.field
                    }
                }

                if (selectedDomain.variety) {
                    selectedDomain.selectedVarietyOption = {
                        value: 'variety_' + selectedDomain.variety.id,
                        element: selectedDomain.variety,
                        label: `${selectedDomain.variety.category}/${selectedDomain.variety.name}`
                    }
                }

                if (selectedDomain.tag1) {
                    selectedDomain.tag1.label = selectedDomain.tag1.name
                }

                if (selectedDomain.tag2) {
                    selectedDomain.tag2.label = selectedDomain.tag2.name
                }


                if (selectedDomain.year) {
                    selectedDomain.yearOption = {
                        value: selectedDomain.year,
                        label: selectedDomain.year,
                        key: selectedDomain.year,
                        id: selectedDomain.year,
                    }
                }
            }

            return {
                ...state,
                selectedDomain: action.payload,
            }
        }
        case DELETE_DOMAIN: {
            return {
                ...state,
                selectedDomain: null,
            }
        }
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        default:
            return state;
    }
}