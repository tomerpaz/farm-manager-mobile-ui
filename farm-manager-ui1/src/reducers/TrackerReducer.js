import {
    INVALIDATE_USER, WIALON_GET_TOKEN, WIALON_SYNC_FIELDS, WIALON_GET_UNITS, WIALON_SAVE_TOKEN, WIALON_DELETE_TOKEN, WIALON_SYNCHING, GET_TRACKS, SET_SELECTED_TRACKS,
    ADD_SELECTED_TRACK, SET_TRACK_MAX_AVG_SPEED, SET_TRACK_MIN_LENGHT, GET_TRACKER_ACTIVITY, CLEAR_TRACKER_ACTIVITY, ACTIVITY_CREATED, ACTIVITY_UPDATED, DELETE_ACTIVITY
} from '../actions/types';

const INITIAL_STATE = {
    wialonToken: null,
    wialonUnits: [],
    wialonSynching: false,
    tracks: [],
    tracksCount: 0,
    selectedTracks: [],
    trackMinLength: 500,
    trackMaxAvgSpeed: 7,
    trackerActivity: null,

};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case WIALON_SAVE_TOKEN:
        case WIALON_GET_TOKEN: {
            return {
                ...state,
                wialonToken: action.payload,
            }
        }
        case WIALON_SYNCHING: {
            return {
                ...state,
                wialonSynching: action.payload,
            }
        }
        case SET_TRACK_MIN_LENGHT: {
            return {
                ...state,
                trackMinLength: action.payload,
            }
        }
        case SET_TRACK_MAX_AVG_SPEED: {
            return {
                ...state,
                trackMaxAvgSpeed: action.payload,
            }
        }
        case WIALON_SYNCHING: {
            return {
                ...state,
                wialonSynching: action.payload,
            }
        }
        case GET_TRACKS: {
            return {
                ...state,
                tracks: action.payload.content,
                tracksCount: action.payload.totalElements,
                selectedTracks: [],
                trackerActivity: null,
            }
        }
        case DELETE_ACTIVITY:
        case ACTIVITY_CREATED:
        case ACTIVITY_UPDATED: {
            console.log(action)
            return {
                ...state,
                selectedTracks: [],
                trackerActivity: null,
            }
        }
        case GET_TRACKER_ACTIVITY: {
            return {
                ...state,
                trackerActivity: action.payload,
                selectedTracks: action.payload.tracks ? action.payload.tracks : []
            }
        }
        case CLEAR_TRACKER_ACTIVITY: {
            return {
                ...state,
                trackerActivity: null,
                selectedTracks: []
            }
        }
        case ADD_SELECTED_TRACK: {
            const t = action.payload;
            return {
                ...state,
                selectedTracks: state.selectedTracks.concat([t]),
                tracks: state.tracks.map((e) => e.id === t.id ? t : e)
            }
        }

        case SET_SELECTED_TRACKS: {
            return {
                ...state,
                selectedTracks: action.payload,
            }
        }
        case WIALON_DELETE_TOKEN:
        case INVALIDATE_USER: {
            return {
                ...state,
                ...INITIAL_STATE
            };
        }
        case WIALON_SYNC_FIELDS: {
            return {
                ...state,
                wialonSynching: false,
            }
        }


        case WIALON_GET_UNITS: {
            return {
                ...state,
                wialonUnits: action.payload,
            }
        }
        default:
            return state;
    }
}