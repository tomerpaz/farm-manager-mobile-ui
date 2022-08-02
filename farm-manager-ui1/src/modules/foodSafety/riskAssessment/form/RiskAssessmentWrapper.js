import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import Loading from "../../../../components/core/util/Loading";
import { loadDataByName, _crops, _executors, _fields } from "../../../../utils/LoadUtil";
import { newDate } from '../../../../utils';
import RiskAssessmentForm from './RiskAssessmentForm';



const RiskAssessmentWarapper = (props) => {

    const {
        riskAssessment,
        getRiskAssessment, setRiskAssessment, match: { params }, duplicate,
    } = props;

    useEffect(() => {
        loadDataByName(props, [_executors, _crops, _fields]);
        if (params.id && params.id !== '0') {
            getRiskAssessment(params.id, duplicate);
        } else {
            setRiskAssessment({
                date: newDate(),
                risks: [],
            });
        }
        return () => {
            setRiskAssessment(null);
        }
    }, []);

    if (!riskAssessment) {
        return (
            <Loading />
        )
    }

    return (
        <RiskAssessmentForm {...props} />
    )
}
export default withRouter(RiskAssessmentWarapper);