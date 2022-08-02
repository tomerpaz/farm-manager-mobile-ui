import React from 'react';
import { Switch } from 'react-router-dom'

import { PrivateRoute } from "../../../utils";
import { FieldDashboard, SatelliteImagery, Sensing } from '../../../components'
import {
    ACTIVITY_FROM, ANALYSIS_TABS, CROP_MANAGEMENT_ACTIVITIES, CROP_MANAGEMENT_PLANS, CROP_MANAGEMENT_TABS,
    DOMAIN, SPLIT,
    DOMAIN_HISTORY, END,
    FOOD_SAFETY_TABS,
    OVERVIEW_CARDS, OVERVIEW_MAP,
    OVERVIEW_TABS, PLAN_FROM,
    PROCUREMENT_FORM,
    RESOURCES_TABS, RISK_ASSESSMENT_FORM, SETTINGS_TABS,
    UTILITIES_TABS, WATERSYS, WATERSYS_GENERIC, GPS, UPLOAD, FERTILIZEHUB, GIS_SETTINGS, LINKS, DATA_EXCHANGE, APPROVAL_TABS, APPROVAL_FROM, NOTIFICATIONS, WIALON, UPDATES_TABS, TRACKER_TABS
} from "../Routes";
import {
    CropManagementTabs, DomainForm, DomainSplitForm, EndCropForm, OverviewTabs,
    ResourcesTabs, UtilitiesTabs, FoodSafetyTabs, Procurement,
    ActivityForm, AnalysisTabs, DomainHistoryTable, BusinessSettingsTab,
    WaterSystemInterface, RiskAssessmentForm, UploadManager, Gis, ApprovalTabs, Approval
} from "../../../modules";
import FertilizeHubMasterDetails from '../../../modules/fertilizehub/FertilizeHubMasterDetails';

import ExternalLink from '../../../modules/links/ExternalLink';
import ImportExportManager from '../../../modules/data/ImportExportManager';
import { isEmpty } from '../../../utils/StringUtil';
import Notifications from '../../../modules/notifications/Notifications';
import WialonSettings, { isWialonAdmin } from '../../../modules/wialon/WialonSettings';
import UpdatesTabs, { isUpdates } from '../../../modules/updates/UpdatesTabs';
import TrackerTabs, { isTracker } from '../../../modules/tracker/TrackerTabs';

function extractReturnRoute(path, prefixToRemove) {
    const route = path.replace(prefixToRemove, '');
    const index = route.indexOf('/');
    return index > 0 ? route.substring(0, index) : route;
}

const GrowerRoutes = (props) => (
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
            <PrivateRoute exact path={`${SPLIT}:subTab/:id`}
                authenticated={props.authenticated} {...props}
                exitRoute={`${OVERVIEW_TABS}${extractReturnRoute(props.location.pathname, DOMAIN)}`}
                component={DomainSplitForm} />
            <PrivateRoute path={`${APPROVAL_TABS}:subTab`}
                authenticated={props.authenticated} {...props}
                component={ApprovalTabs} />
            <PrivateRoute exact path={`${END}:subTab`}
                authenticated={props.authenticated} {...props}
                exitRoute={`${OVERVIEW_TABS}${extractReturnRoute(props.location.pathname, END)}`}
                component={EndCropForm} />
            <PrivateRoute path={`${RESOURCES_TABS}:subTab`}
                authenticated={props.authenticated} {...props}
                component={ResourcesTabs} />
            <PrivateRoute path={`${UTILITIES_TABS}:subTab`}
                authenticated={props.authenticated} {...props}
                component={UtilitiesTabs} />
            <PrivateRoute path={`${CROP_MANAGEMENT_TABS}:subTab`}
                authenticated={props.authenticated} {...props}
                component={CropManagementTabs} />
            <PrivateRoute path={`${FOOD_SAFETY_TABS}:subTab`}
                authenticated={props.authenticated} {...props}
                component={FoodSafetyTabs} />
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

            <PrivateRoute path={`/ap${ACTIVITY_FROM}:id`}
                authenticated={props.authenticated} plan={false} {...props}
                component={ActivityForm} />
            <PrivateRoute path={`/et${ACTIVITY_FROM}:id`}
                authenticated={props.authenticated} {...props}
                component={ActivityForm} />

            <PrivateRoute path={`/t${PLAN_FROM}:id`}
                authenticated={props.authenticated} plan={true} {...props}
                exitRoute={CROP_MANAGEMENT_PLANS}
                component={ActivityForm} />
            <PrivateRoute path={`/:mode${ACTIVITY_FROM}:id/back`}
                authenticated={props.authenticated} {...props}
                component={ActivityForm} />
            <PrivateRoute path={`/:mode${ACTIVITY_FROM}:id`}
                authenticated={props.authenticated} {...props}
                exitRoute={CROP_MANAGEMENT_ACTIVITIES}
                component={ActivityForm} />
            <PrivateRoute path={`/:mode${PLAN_FROM}:id`}
                authenticated={props.authenticated} {...props}
                exitRoute={CROP_MANAGEMENT_PLANS}
                component={ActivityForm} />
            <PrivateRoute path={`/:mode${PROCUREMENT_FORM}:id`}
                authenticated={props.authenticated} {...props}
                component={Procurement} />
            <PrivateRoute path={`/c${DOMAIN_HISTORY}:id`} isPlans={false}
                authenticated={props.authenticated}  {...props}
                exitRoute={OVERVIEW_CARDS}
                component={DomainHistoryTable} />
            <PrivateRoute path={`/m${DOMAIN_HISTORY}:id`} isPlans={false}
                authenticated={props.authenticated}  {...props}
                exitRoute={OVERVIEW_MAP}
                component={DomainHistoryTable} />
            {/* 
            <PrivateRoute path={`/h${GPS}:domain/:uuid`}
                authenticated={props.authenticated} {...props}
                component={GpsLog} /> */}

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

            {isUpdates(props.user) && <PrivateRoute path={`${UPDATES_TABS}:subTab`}
                authenticated={props.authenticated} {...props}
                component={UpdatesTabs} />}

            {isTracker(props.user) && <PrivateRoute path={`${TRACKER_TABS}:subTab`}
                authenticated={props.authenticated} {...props}
                component={TrackerTabs} />}

            <PrivateRoute path={`${SETTINGS_TABS}:subTab/:module`}
                authenticated={props.authenticated} {...props}
                component={BusinessSettingsTab} />

            <PrivateRoute path={`${SETTINGS_TABS}:subTab`}
                authenticated={props.authenticated} {...props}
                component={BusinessSettingsTab} />

            <PrivateRoute path={`${WATERSYS}:system`}
                authenticated={props.authenticated} {...props}
                component={WaterSystemInterface} />
            <PrivateRoute path={`${FERTILIZEHUB}`}
                authenticated={props.authenticated} {...props}
                component={FertilizeHubMasterDetails} />
            <PrivateRoute path={`${GIS_SETTINGS}`}
                authenticated={props.authenticated} {...props}
                component={Gis} />
            <PrivateRoute path={`${DATA_EXCHANGE}`}
                authenticated={props.authenticated} {...props}
                component={ImportExportManager} />
            {isWialonAdmin(props.user) && <PrivateRoute path={`${WIALON}`}
                authenticated={props.authenticated} {...props}
                component={WialonSettings} />}

            <PrivateRoute path={`${RISK_ASSESSMENT_FORM}:id`}
                authenticated={props.authenticated} {...props}
                component={RiskAssessmentForm} />

            <PrivateRoute path={`/d${RISK_ASSESSMENT_FORM}:id`}
                authenticated={props.authenticated} duplicate={true} {...props}
                component={RiskAssessmentForm} />

            <PrivateRoute exact path={`${UPLOAD}:module/:id`}
                authenticated={props.authenticated} {...props}
                component={UploadManager} />

            {!isEmpty(props.user.manager) && <PrivateRoute path={`${APPROVAL_FROM}:id`}
                authenticated={props.authenticated} {...props}
                component={Approval} />}

            <PrivateRoute path={`${NOTIFICATIONS}`}
                authenticated={props.authenticated} {...props}
                component={Notifications} />

            <PrivateRoute authenticated={props.authenticated} {...props} component={OverviewTabs} />


        </Switch>
    </div>
)

export default GrowerRoutes;
