import React from 'react';
import { Link } from '@mui/material';
import {
    OVERVIEW_DEFAULT, OVERVIEW_TABS, RESOURCES_TABS_DEFAULT, RESOURCES_TABS, UTILITIES_DEFAULT,
    UTILITIES_TABS, CROP_MANAGEMENT_TABS, CROP_MANAGEMENT_DEFAULT, FOOD_SAFETY_TABS, FOOD_SAFETY_DEFAULT, ANALYSIS_TABS,
    ANALYSIS_DEFAULT,
    LINKS,
    APPROVAL_DEFAULT,
    APPROVAL_TABS,
    OVERVIEW_ALL,
    ANALYSIS_TABS_STANDARDS,
    UPDATES_TABS,
    TRACKER_TABS,
    TRACKER_TABS_DEFAULT
} from "../Routes";
import { isEmpty } from '../../../utils/StringUtil';
import { isBaseUser } from '../../../utils/FarmUtil';
import { getUpdatesDefault, isUpdates } from '../../../modules/updates/UpdatesTabs';
import { isTracker } from '../../../modules/tracker/TrackerTabs';
import AppBarButton from './components/AppBarButton';
import { AppBarBox } from './AppBarUtil';

export function getOverviewDefault() {
    const latest = localStorage.getItem('lastOverview');
    return OVERVIEW_ALL.includes(latest) ? `${OVERVIEW_TABS}${latest}` : OVERVIEW_DEFAULT;
}

export function buildCustomeBarElement(links, history) {
    const result =
        links.filter(e => e.active).map((e, index, arr) => {
            if (e.tab) {
                return (
                    <AppBarButton component={Link} key={index} href={e.url} target="_blank" rel="noopener" label={e.name} />
                )
            } else
                return (
                    <AppBarButton key={index} history={history} onClick={() => history.push(LINKS + "/" + e.id)} label={e.name} />
                )
        })
    return result;
}




const GrowerBar = (props) => {

    const { links, user } = props;
    const isBasic = isBaseUser(user);
    const ANALYSIS_DEFAULT_TAB = isBasic ? ANALYSIS_TABS_STANDARDS : ANALYSIS_DEFAULT;

    return (
        <AppBarBox >
            <AppBarButton path={OVERVIEW_TABS} history={props.history} onClick={() => props.history.push(getOverviewDefault())} label={props.text.overview} />
            <AppBarButton path={CROP_MANAGEMENT_TABS} history={props.history} onClick={() => props.history.push(CROP_MANAGEMENT_DEFAULT)} label={props.text.cropManagement} />
            {isTracker(user) && <AppBarButton path={TRACKER_TABS} history={props.history} onClick={() => props.history.push(TRACKER_TABS_DEFAULT)} label={props.text.tracker} />}
            {!isEmpty(user.manager) && <AppBarButton path={APPROVAL_TABS} history={props.history} onClick={() => props.history.push(APPROVAL_DEFAULT)} label={props.text.approvals} />}
            {!isBasic && <AppBarButton path={FOOD_SAFETY_TABS} history={props.history} onClick={() => props.history.push(FOOD_SAFETY_DEFAULT)} label={props.text.foodSafety} />}
            <AppBarButton path={ANALYSIS_TABS} history={props.history} onClick={() => props.history.push(ANALYSIS_DEFAULT_TAB)} label={props.text.reports} />
            <AppBarButton path={RESOURCES_TABS} history={props.history} onClick={() => props.history.push(RESOURCES_TABS_DEFAULT)} label={props.text.resources} />
            <AppBarButton path={UTILITIES_TABS} history={props.history} onClick={() => props.history.push(UTILITIES_DEFAULT)} label={props.text.utilities} />
            {isUpdates(user) && <AppBarButton path={UPDATES_TABS} history={props.history} onClick={() => props.history.push(getUpdatesDefault(user))} label={props.text.updates} />}
            {buildCustomeBarElement(links, props.history)}
        </AppBarBox>


    )
}

export default GrowerBar;