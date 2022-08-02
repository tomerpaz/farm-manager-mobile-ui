import React from 'react';
import {Switch} from 'react-router-dom'

import {PrivateRoute} from "../../../utils";


import {    
   EXPORTER_TABS, EXPORTER_REPORTS, SETTINGS_TABS,

} from "../Routes";

import ExporterTabs from '../../../exporter/ExporterTabs';
import GrowerReports from '../../../exporter/growers/GrowerReports';
import { BusinessSettingsTab } from '../../../modules';


const ExporterRoutes = (props) => (
    
    <div style={{display: 'flex', flex: 1}}>
        <Switch>
            <PrivateRoute path={`${EXPORTER_TABS}:subTab`}
                          authenticated={props.authenticated} {...props}
                          component={ExporterTabs}/>
            <PrivateRoute path={`${EXPORTER_REPORTS}:user`}
                          authenticated={props.authenticated} {...props}
                          component={GrowerReports}/>
            <PrivateRoute path={`${SETTINGS_TABS}:subTab`}
                authenticated={props.authenticated} {...props}
                component={BusinessSettingsTab} />
            


        </Switch>
    </div>
)

export default ExporterRoutes;
