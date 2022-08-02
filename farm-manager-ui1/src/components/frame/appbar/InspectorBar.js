import React from 'react';
import { AppBarBox } from './AppBarUtil';
import AppBarButton from './components/AppBarButton';
import {
    OVERVIEW_DEFAULT, OVERVIEW_TABS, INSPECTOR_UTILITIES_DEFAULT,
    UTILITIES_TABS, CROP_MANAGEMENT_TABS, CROP_MANAGEMENT_DEFAULT, ANALYSIS_TABS,
    ANALYSIS_DEFAULT,
} from "../Routes";

const InspectorBar = (props) => {
    return (
        <AppBarBox>
            <AppBarButton path={OVERVIEW_TABS} history={props.history} onClick={() => props.history.push(OVERVIEW_DEFAULT)} label={props.text.overview} />
            <AppBarButton path={CROP_MANAGEMENT_TABS} history={props.history} onClick={() => props.history.push(CROP_MANAGEMENT_DEFAULT)} label={props.text.cropManagement} />
            <AppBarButton path={ANALYSIS_TABS} history={props.history} onClick={() => props.history.push(ANALYSIS_DEFAULT)} label={props.text.reports} />
            <AppBarButton path={UTILITIES_TABS} history={props.history} onClick={() => props.history.push(INSPECTOR_UTILITIES_DEFAULT)} label={props.text.utilities} />
        </AppBarBox>
    )
}
export default InspectorBar;