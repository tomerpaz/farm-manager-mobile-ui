import { SELECT_COMPOUND,CREATE_COMPOUND,GET_COMPOUND,UPDATE_COMPOUND,DELETE_COMPOUND,GET_COMPOUNDS,CLEAR_COMPOUND, INVALIDATE_USER} from '../actions/types';


const INITIAL_STATE = {
    compounds: [],
    selectedCompound: null,
    createNewCompound: false,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_COMPOUND:
        case SELECT_COMPOUND: {
            return {
                ...state,
                selectedCompound: action.payload,
                createNewCompound: false,
            }
        }
        case INVALIDATE_USER : {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case GET_COMPOUNDS: {
            return {
                ...state,
                compounds: action.payload,
            }
        }

        case DELETE_COMPOUND: {
            const compounds = state.compounds.filter((e) => e.id !== action.payload);
            return {
                ...state,
                selectedCompound: null,
                createNewCompound: true,
                compounds
            }
        }
        case CREATE_COMPOUND:
        case UPDATE_COMPOUND: {
            const compounds = state.compounds.filter((e) => e.id !== action.payload.id);
            compounds.push(action.payload);
            return {
                ...state,
                selectedCompound: null,
                createNewCompound: true,
                compounds,
            }
        }
        case CLEAR_COMPOUND: {
            return {
                ...state,
                selectedCompound: null,
                createNewCompound: true,
            }
        }
        default:
            return state;
    }
}