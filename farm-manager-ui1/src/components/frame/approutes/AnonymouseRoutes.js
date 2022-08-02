import React from 'react';
import { Route, Switch } from 'react-router-dom'

import {
   ADMIN_RESOURCES_TABS, ADMIN_TABS, ADMIN_UTILITY_TABS,

} from "../Routes";
import {AdminTabs,ResourcesTabs,UtilityTabs
} from "../../../admin";
import SigninForm from "../../forms/SigninForm";

function extractReturnRoute(path, prefixToRemove) {
    const route = path.replace(prefixToRemove, '');
    const index = route.indexOf('/');
    return index > 0 ? route.substring(0, index) : route;
}

const GrowerRoutes = (props) => (

    <div style={{display: 'flex', flex: 1}}>
        <Switch>
            {/*<PrivateRoute path={`${ADMIN_TABS}:subTab`}*/}
                          {/*authenticated={props.authenticated} {...props}*/}
                          {/*component={AdminTabs}/>*/}
            {/*<PrivateRoute path={`${ADMIN_RESOURCES_TABS}:subTab`}*/}
                          {/*authenticated={props.authenticated} {...props}*/}
                          {/*component={ResourcesTabs}/>*/}
            {/*<PrivateRoute path={`${ADMIN_UTILITY_TABS}:subTab`}*/}
                          {/*authenticated={props.authenticated} {...props}*/}
                          {/*component={UtilityTabs}/>*/}
            {/*<SigninForm  {...props}/>*/}
            <Route  {...props} component={SigninForm}/>



        </Switch>
    </div>
)

export default GrowerRoutes;
