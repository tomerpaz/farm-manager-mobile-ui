import React from 'react';
import {
    ADMIN_TABS, ADMIN_TABS_DEFAULT, ADMIN_RESOURCES_TABS, ADMIN_RESOURCES_TABS_DEFAULT,
    ADMIN_UTILITY_TABS, ADMIN_UTILITY_TABS_DEFAULT, ADMIN_STANDARDS_TABS, ADMIN_STANDARDS_TABS_DEFAULT
} from "../Routes";
import { AppBarBox } from './AppBarUtil';
import AppBarButton from './components/AppBarButton';


const AdminBar = (props) => {
    return (
        <AppBarBox>
            <AppBarButton path={ADMIN_TABS} history={props.history} onClick={() => props.history.push(ADMIN_TABS_DEFAULT)} label={props.text.system} />
            <AppBarButton path={ADMIN_RESOURCES_TABS} history={props.history} onClick={() => props.history.push(ADMIN_RESOURCES_TABS_DEFAULT)} label={props.text.resources} />
            <AppBarButton path={ADMIN_UTILITY_TABS} history={props.history} onClick={() => props.history.push(ADMIN_UTILITY_TABS_DEFAULT)} label={props.text.utilities} />
            <AppBarButton path={ADMIN_STANDARDS_TABS} history={props.history} onClick={() => props.history.push(ADMIN_STANDARDS_TABS_DEFAULT)} label={props.text.standards} />
        </AppBarBox>
    )
}

export default AdminBar;