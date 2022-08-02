import {
    GET_RISK_ASSESSMENT, SET_RISK_ASSESSMENT, RISK_ASSESSMENT_CREATED,
    RISK_ASSESSMENT_UPDATED, GET_RISKS, INVALIDATE_USER, SELECT_RISK, GET_RISK, RISK_CREATED, RISK_UPDATED, DELETE_RISK
} from '../actions/types';
import {getSuggestionsNameElement} from "../components/core/optionsUtil";


const INITIAL_STATE = {
    riskAssessment: null,
    risks: [],
    selectedRisk: null,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {


        case GET_RISK_ASSESSMENT:
            const riskAssessment = action.payload;
            if (riskAssessment) {
                if(riskAssessment.resource) {
                    riskAssessment.selectedExecutor = getSuggestionsNameElement(riskAssessment.resource,'resource');
                }
                if(riskAssessment.selectedCrops){
                    riskAssessment.selectedCropOptions =   riskAssessment.selectedCrops.map(e => getSuggestionsNameElement(e,'crop'));
                }
                if(riskAssessment.selectedFields){
                    riskAssessment.selectedFieldOptions =  riskAssessment.selectedFields.map(e =>getSuggestionsNameElement(e,'field'));
                }
            }
            return {
                ...state,
                riskAssessment,
            };
        case SET_RISK_ASSESSMENT:
            return {
                ...state,
                riskAssessment: action.payload,
            };
        case GET_RISKS:
            return {
                ...state,
                risks: action.payload,
            };
        case GET_RISK:
        case SELECT_RISK:
            return {
                ...state,
                selectedRisk: action.payload,
            };
            case INVALIDATE_USER : {
                return {
                    ...state,
                    ...INITIAL_STATE
                };
            }
        case RISK_ASSESSMENT_CREATED:
        case RISK_ASSESSMENT_UPDATED:
            return {
                ...state,
                riskAssessment: null,
            };
        case RISK_CREATED:
        case RISK_UPDATED:
            const risks = state.risks.filter((e) => e.id !== action.payload.id);
            risks.unshift(action.payload);

            return {
                ...state,
                risks,
                selectedRisk: null,
            };
        case DELETE_RISK: {
            const risks = state.risks.filter((e) => e.id !== action.payload);

            return {
                ...state,
                risks,
            }
        }
        default:
            return state;
    }
}

