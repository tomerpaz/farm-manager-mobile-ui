import React from 'react';
import { Switch } from 'react-router-dom'

import {PrivateRoute} from "../../utils";
import PlantationDashboard from "../dashboard/plantation/PlantationDashboard";
import DomainDashboard from "../dashboard/domain/DomainDashboard";
import BusinessSettingsTab from "../tabs/BusinessSettingsTab";
import {
    ACTIVITY_FROM, ANALYSIS_TABS, CROP_MANAGEMENT_TABS, DOMAIN, END, FOOD_SAFETY_TABS, OVERVIEW_CARDS, OVERVIEW_MAP,
    OVERVIEW_TABS, PLAN_FROM,
    PROCUREMENT_FORM,
    RESOURCES_TABS,
    UTILITIES_TABS
} from "./Routes";
import {CropManagementTabs, DomainForm, EndCropForm, OverviewTabs,
    ResourcesTabs, UtilitiesTabs, FoodSafetyTabs, ProcurementForm,
    ActivityForm,AnalysisTabs
} from "../../modules";

function extractReturnRoute(path, prefixToRemove) {
    const route = path.replace(prefixToRemove, '');
    const index = route.indexOf('/');
    return index > 0 ? route.substring(0, index) : route;
}

const FrameRoutes = (props) => (
    <div style={{display: 'flex', flex: 1}}>
        <Switch>
            <PrivateRoute path={`${OVERVIEW_TABS}:subTab`}
                          authenticated={props.authenticated} {...props}
                          component={OverviewTabs}/>
            <PrivateRoute exact path={`${DOMAIN}:subTab/:id`}
                          authenticated={props.authenticated} {...props}
                          exitRoute={`${OVERVIEW_TABS}${extractReturnRoute(props.location.pathname, DOMAIN)}`}
                          component={DomainForm}/>
            <PrivateRoute exact path={`${END}:subTab`}
                          authenticated={props.authenticated} {...props}
                          exitRoute={`${OVERVIEW_TABS}${extractReturnRoute(props.location.pathname, END)}`}
                          component={EndCropForm}/>
            <PrivateRoute path={`${RESOURCES_TABS}:subTab`}
                          authenticated={props.authenticated} {...props}
                          component={ResourcesTabs}/>
            <PrivateRoute path={`${UTILITIES_TABS}:subTab`}
                          authenticated={props.authenticated} {...props}
                          component={UtilitiesTabs}/>
            <PrivateRoute path={`${CROP_MANAGEMENT_TABS}:subTab`}
                          authenticated={props.authenticated} {...props}
                          component={CropManagementTabs}/>
            <PrivateRoute path={`${FOOD_SAFETY_TABS}:subTab`}
                          authenticated={props.authenticated} {...props}
                          component={FoodSafetyTabs}/>
            <PrivateRoute path={`${ANALYSIS_TABS}:subTab`}
                          authenticated={props.authenticated} {...props}
                          component={AnalysisTabs}/>
            <PrivateRoute path={`${ACTIVITY_FROM}:id`}
                          authenticated={props.authenticated} plan={false} {...props}
                          component={ActivityForm}/>
            <PrivateRoute path={`${PLAN_FROM}:id`}
                          authenticated={props.authenticated} plan={true} {...props}
                           component={ActivityForm}/>
            <PrivateRoute path={`${PROCUREMENT_FORM}:id`}
                          authenticated={props.authenticated} {...props}
                          component={ProcurementForm}/>

            <PrivateRoute exact path="/cards/dash/field/:fieldId/:cropID/:year"
                          authenticated={props.authenticated} {...props} exitRoute={OVERVIEW_CARDS}
                          component={PlantationDashboard}/>
            <PrivateRoute exact path="/map/dash/field/:fieldId/:cropID/:year"
                          authenticated={props.authenticated} {...props} exitRoute={OVERVIEW_MAP}
                          component={PlantationDashboard}/>
            <PrivateRoute exact path="/cards/dash/field/:id"
                          authenticated={props.authenticated} {...props} exitRoute={OVERVIEW_CARDS}
                          component={DomainDashboard}/>
            <PrivateRoute exact path="/map/dash/field/:id"
                          authenticated={props.authenticated} {...props} exitRoute={OVERVIEW_MAP}
                          component={DomainDashboard}/>
            <PrivateRoute path="/settings"
                          authenticated={props.authenticated} {...props}
                          component={BusinessSettingsTab}/>
            <PrivateRoute authenticated={props.authenticated} {...props} component={OverviewTabs}/>
        </Switch>
    </div>
)

export default FrameRoutes;
