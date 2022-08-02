import React from 'react';
import { Switch } from 'react-router-dom'

import { PrivateRoute } from "../../../utils";
import { FieldDashboard, SatelliteImagery, Sensing } from '../../../components'
import {
    ACTIVITY_FROM, ANALYSIS_TABS, CROP_MANAGEMENT_ACTIVITIES, CROP_MANAGEMENT_PLANS, CROP_MANAGEMENT_TABS,
    DOMAIN,
    DOMAIN_HISTORY,
    OVERVIEW_CARDS, OVERVIEW_MAP,
    OVERVIEW_TABS, PLAN_FROM,
    SETTINGS_TABS,
    UTILITIES_TABS, LINKS
} from "../Routes";
import {
    CropManagementTabs, DomainForm, OverviewTabs,
    UtilitiesTabs,
    ActivityForm, AnalysisTabs, DomainHistoryTable, BusinessSettingsTab,
} from "../../../modules";

import ExternalLink from '../../../modules/links/ExternalLink';

function extractReturnRoute(path, prefixToRemove) {
    const route = path.replace(prefixToRemove, '');
    const index = route.indexOf('/');
    return index > 0 ? route.substring(0, index) : route;
}

const InspectorRouts = (props) => (
    
    <div style={{ display: 'flex', flex: 1 }}>
    <Switch>
    <PrivateRoute path={`${LINKS}/:id`}
            authenticated={props.authenticated} {...props}
            component={ExternalLink} />            
        <PrivateRoute path={`${OVERVIEW_TABS}:subTab`}
            authenticated={props.authenticated} {...props}
            component={OverviewTabs} />
        <PrivateRoute exact path={`${DOMAIN}:subTab/:id`}
            authenticated={props.authenticated} {...props}
            exitRoute={`${OVERVIEW_TABS}${extractReturnRoute(props.location.pathname, DOMAIN)}`}
            component={DomainForm} />
        <PrivateRoute path={`${UTILITIES_TABS}:subTab`}
            authenticated={props.authenticated} {...props}
            component={UtilitiesTabs} />
        <PrivateRoute path={`${CROP_MANAGEMENT_TABS}:subTab`}
            authenticated={props.authenticated} {...props}
            component={CropManagementTabs} />
        <PrivateRoute path={`${ANALYSIS_TABS}:subTab`}
            authenticated={props.authenticated} {...props}
            component={AnalysisTabs} />
        <PrivateRoute path={`/t${ACTIVITY_FROM}:id`}
            authenticated={props.authenticated} plan={false} {...props}
            exitRoute={CROP_MANAGEMENT_ACTIVITIES}
            component={ActivityForm} />
        <PrivateRoute path={`/m${ACTIVITY_FROM}:id`}
            authenticated={props.authenticated} plan={false} {...props}
            exitRoute={OVERVIEW_MAP}
            component={ActivityForm} />
        <PrivateRoute path={`/c${ACTIVITY_FROM}:id`}
            authenticated={props.authenticated} plan={false} {...props}
            exitRoute={OVERVIEW_CARDS}
            component={ActivityForm} />
        <PrivateRoute path={`/h${ACTIVITY_FROM}:id`}
            authenticated={props.authenticated} plan={false} {...props}
            component={ActivityForm} />
        <PrivateRoute path={`/t${PLAN_FROM}:id`}
            authenticated={props.authenticated} plan={true} {...props}
            exitRoute={CROP_MANAGEMENT_PLANS}
            component={ActivityForm} />
        <PrivateRoute path={`/:mode${ACTIVITY_FROM}:id`}
            authenticated={props.authenticated} {...props}
            exitRoute={CROP_MANAGEMENT_ACTIVITIES}
            component={ActivityForm} />
        <PrivateRoute path={`/:mode${PLAN_FROM}:id`}
            authenticated={props.authenticated} {...props}
            exitRoute={CROP_MANAGEMENT_PLANS}
            component={ActivityForm} />
        <PrivateRoute path={`/c${DOMAIN_HISTORY}:id`} isPlans={false}
            authenticated={props.authenticated}  {...props}
            exitRoute={OVERVIEW_CARDS}
            component={DomainHistoryTable} />
        <PrivateRoute path={`/m${DOMAIN_HISTORY}:id`} isPlans={false}
            authenticated={props.authenticated}  {...props}
            exitRoute={OVERVIEW_MAP}
            component={DomainHistoryTable} />

        <PrivateRoute exact path="/cards/dash/field/:domainId/:year"
            authenticated={props.authenticated} {...props} exitRoute={OVERVIEW_CARDS}
            component={FieldDashboard} />
        <PrivateRoute exact path="/map/dash/field/:domainId/:year"
            authenticated={props.authenticated} {...props} exitRoute={OVERVIEW_MAP}
            component={FieldDashboard} />
        <PrivateRoute exact path="/cards/dash/field/:domainId"
            authenticated={props.authenticated} {...props} exitRoute={OVERVIEW_CARDS}
            component={FieldDashboard} />
        <PrivateRoute exact path="/map/dash/field/:domainId"
            authenticated={props.authenticated} {...props} exitRoute={OVERVIEW_MAP}
            component={FieldDashboard} />
        <PrivateRoute exact path="/cards/satellite/:domainId/:imageryId"
            authenticated={props.authenticated} {...props} exitRoute={OVERVIEW_CARDS}
            component={SatelliteImagery} />
        <PrivateRoute exact path="/map/satellite/:domainId/:imageryId"
            authenticated={props.authenticated} {...props} exitRoute={OVERVIEW_MAP}
            component={SatelliteImagery} />

        <PrivateRoute exact path="/cards/sensing/:domainId/:imageryId"
            authenticated={props.authenticated} {...props} exitRoute={OVERVIEW_CARDS}
            component={Sensing} />
        <PrivateRoute exact path="/map/sensing/:domainId/:imageryId"
            authenticated={props.authenticated} {...props} exitRoute={OVERVIEW_MAP}
            component={Sensing} />



        <PrivateRoute path={`${SETTINGS_TABS}:subTab`}
            authenticated={props.authenticated} {...props}
            component={BusinessSettingsTab} />

        <PrivateRoute authenticated={props.authenticated} {...props} component={OverviewTabs} />


    </Switch>
</div>
)

export default InspectorRouts;
