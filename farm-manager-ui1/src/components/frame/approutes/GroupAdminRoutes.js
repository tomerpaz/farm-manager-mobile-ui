import React from 'react';
import { Switch } from 'react-router-dom'

import { PrivateRoute } from "../../../utils";
import { FieldDashboard, SatelliteImagery, Sensing } from '../..'
import {
    ACTIVITY_FROM, ANALYSIS_TABS,
    DOMAIN,
    DOMAIN_HISTORY,
    OVERVIEW_CARDS, OVERVIEW_MAP,
    OVERVIEW_TABS, SETTINGS_TABS,
    UTILITIES_TABS, LINKS, APPROVAL_FROM, DOCUMENT_TABS,
} from "../Routes";
import {
    DomainForm, OverviewTabs,
    ResourcesTabs, UtilitiesTabs,
    ActivityForm, AnalysisTabs, DomainHistoryTable, BusinessSettingsTab,
     Approval
} from "../../../modules";


import ExternalLink from '../../../modules/links/ExternalLink';
import DocumenttTabs from '../../../modules/foodSafety/DocumenttTabs';
import GroupUtilityTabs from '../../../group/GroupUtilityTabs';

function extractReturnRoute(path, prefixToRemove) {
    const route = path.replace(prefixToRemove, '');
    const index = route.indexOf('/');
    return index > 0 ? route.substring(0, index) : route;
}

const ApproverRoutes = (props) => (

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
                component={GroupUtilityTabs} />
            <PrivateRoute path={`${ANALYSIS_TABS}:subTab`}
                authenticated={props.authenticated} {...props}
                component={AnalysisTabs} />
            <PrivateRoute path={`${DOCUMENT_TABS}:subTab`}
                authenticated={props.authenticated} {...props}
                component={DocumenttTabs}  isExporter={true}/>
            <PrivateRoute path={`/t${ACTIVITY_FROM}:id`}
                authenticated={props.authenticated} plan={false} {...props}
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
            <PrivateRoute path={`/ap${ACTIVITY_FROM}:id`}
                authenticated={props.authenticated} plan={false} {...props}
                component={ActivityForm} />
            {/* <PrivateRoute path={`/:mode${ACTIVITY_FROM}:id`}
                authenticated={props.authenticated} {...props}
                component={ActivityForm} /> */}

            <PrivateRoute path={`${APPROVAL_FROM}:id`}
                authenticated={props.authenticated} {...props}
                component={Approval} />
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

export default ApproverRoutes;
