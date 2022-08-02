import React from 'react';
import { AppBarBox } from './AppBarUtil';
import AppBarButton from './components/AppBarButton';
import {
    OVERVIEW_DEFAULT, OVERVIEW_TABS, GROUP_UTILITIES_DEFAULT,
    UTILITIES_TABS, ANALYSIS_TABS,
    ANALYSIS_DEFAULT,
    DOCUMENT_TABS,
    APPROVER_DOCUMENT_DEFAULT,
} from "../Routes";

const ApproverBar = (props) => {
    return (
        <AppBarBox>
            <AppBarButton path={OVERVIEW_TABS} history={props.history} onClick={() => props.history.push(OVERVIEW_DEFAULT)} label={props.text.overview} />
            <AppBarButton path={ANALYSIS_TABS} history={props.history} onClick={() => props.history.push(ANALYSIS_DEFAULT)} label={props.text.reports} />
            <AppBarButton path={DOCUMENT_TABS} history={props.history} onClick={() => props.history.push(APPROVER_DOCUMENT_DEFAULT)} label={props.text.documents} />
            <AppBarButton path={UTILITIES_TABS} history={props.history} onClick={() => props.history.push(GROUP_UTILITIES_DEFAULT)} label={props.text.utilities} />
        </AppBarBox>
    )
}
export default ApproverBar;