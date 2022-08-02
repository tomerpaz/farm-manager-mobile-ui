import React, { useState, useEffect } from 'react';
import { Badge, Toolbar, Typography, AppBar, IconButton, Menu, ListItemIcon, ListItemText, MenuItem, Box } from '@mui/material';
import { MoreVert, Notifications } from '@mui/icons-material/'


import { withRouter } from 'react-router-dom'
import { getIcon } from "../../icons/IconUtil";

import SignOut from '@mui/icons-material/PowerSettingsNew'
import Settings from '../../icons/Settings'
import AppSnackbar from '../../components/core/util/AppSnackbar'

import { GrowerRoutes, AdminRoutes, ExporterRoutes, InspectorRoutes, ApproverRoutes, GroupAdminRoutes } from "./approutes";
import { Loading } from "../core";
import LeafLogo from "../../icons/LeafLogo";

import { GrowerBar, AdminBar, AnonymousBar, ExporterBar, InspectorBar, ApproverBar, GroupAdminBar } from './appbar';
import { OVERVIEW_DEFAULT, SETTINGS_USER, EXPORTER_GROWERS, ADMIN_BUSINESS, NOTIFICATIONS } from "./Routes";
import SigninForm from "../forms/SigninForm";

const GROWER_APP = 'grower';
const ADMIN_APP = 'admin';
const EXPORTER_APP = 'exporter';
export const INSPECTOR_APP = 'inspector';
export const APPROVER_APP = 'approver';
export const GROUP_ADMIN_APP = 'groupAdmin';



const AppFrame = (props) => {
    const { location, authenticated, getGlobalData, global, loadTranslation, signOut,
        history,
        variant, message, text, user, notifications, getNotifications, fetchNotifications, navigateOnCtitical } = props;

    const [anchorEl, setAnchorEl] = useState(null)

    const open = Boolean(anchorEl);

    const rootLocation = location.pathname === '/';

    let appType = user ? user.appType : '';


    useEffect(() => {
        if (navigateOnCtitical) {
            history.push('/notifications');
        }
    }, [navigateOnCtitical])

    useEffect(() => {
        if (authenticated && !global) {
            getGlobalData();
        }
    }, [authenticated, global])

    useEffect(() => {
        if (user) {
            if (rootLocation) {
                let defaultRoute = OVERVIEW_DEFAULT;
                if (appType === EXPORTER_APP) {
                    defaultRoute = EXPORTER_GROWERS
                } else if (appType === ADMIN_APP) {
                    defaultRoute = ADMIN_BUSINESS
                }
                history.push(defaultRoute);
            }
            if (appType === GROWER_APP) {
                getNotifications();
            }
        }
    }, [user])

    useEffect(() => {
        if (fetchNotifications && appType === GROWER_APP) {
            getNotifications();
        }
    }, [fetchNotifications])

    function handleChangeLang(lang) {
        loadTranslation(lang);
        setAnchorEl(null);
    }

    function doSignOut() {
        setAnchorEl(null);
        signOut();
    }


    function openMenuItem(route) {
        setAnchorEl(null);
        history.push(route);
    }

    if (!text) {
        return <Loading />
    }

    return (
        <Box flex={1} flexDirection={'column'} display={'flex'}>

            <AppBar padding={0} elevation={0} position="sticky">
                <Toolbar variant="dense" padding={0} margin={0}>


                    {appType === GROWER_APP && <GrowerBar {...props} documentor={true} />}
                    {appType === EXPORTER_APP && <ExporterBar {...props} />}
                    {appType === ADMIN_APP && <AdminBar {...props} />}
                    {appType === INSPECTOR_APP && <InspectorBar {...props} documentor={true} />}
                    {appType === APPROVER_APP && <ApproverBar appType={appType} {...props} />}
                    {appType === GROUP_ADMIN_APP && <GroupAdminBar appType={appType} {...props} />}
                    {appType === '' && <AnonymousBar {...props} />}

                    <div style={{ width: '100%' }}></div>
                    <div dir='ltr' style={{ display: 'flex', flex: 1, alignItems: 'center',  marginTop: 1, }}>
                        <div style={{ display: 'flex', flex: 1 }}>
                            <LeafLogo sx={{ margin: 1 }} />
                        </div>
                        <Typography variant="h6" color="inherit" sx={
                            {
                                marginTop: 1,
                                whiteSpace: 'nowrap',
                                fontWeight: 600,
                                letterSpacing: 1.5
                            }
                        }>
                            Farm Manager
                        </Typography>
                    </div>
                    <Box display={'flex'} paddingTop={0.5} alignContent={'center'}>
                        {appType === GROWER_APP && <IconButton color="inherit" onClick={() => openMenuItem(NOTIFICATIONS)}>
                            <Badge badgeContent={notifications ? notifications.size : null} color="error" >
                                <Notifications />
                            </Badge>
                        </IconButton>}

                        <IconButton color="inherit" onClick={(event) => setAnchorEl(event.currentTarget)}>
                            <MoreVert />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={() => setAnchorEl(null)}
                        >
                            {authenticated && user &&
                                <MenuItem onClick={() => openMenuItem(SETTINGS_USER)}>
                                    <ListItemIcon >
                                        <Settings />
                                    </ListItemIcon>
                                    <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                                </MenuItem>
                            }
                            <MenuItem onClick={() => handleChangeLang('en')} value={'en'}>
                                <ListItemIcon >
                                    {getIcon('en')}
                                </ListItemIcon>
                                <ListItemText primary='English' />
                            </MenuItem>

                            <MenuItem onClick={() => handleChangeLang('he')} value={'he'}>
                                <ListItemIcon >
                                    {getIcon('he')}
                                </ListItemIcon>
                                <ListItemText primary='עברית' />
                            </MenuItem>
                            <MenuItem onClick={() => handleChangeLang('es')} value={'es'}>
                                <ListItemIcon >
                                    {getIcon('es')}
                                </ListItemIcon>
                                <ListItemText primary='Español' />
                            </MenuItem>
                            <MenuItem onClick={() => handleChangeLang('nl')} value={'nl'}>
                                <ListItemIcon >
                                    {getIcon('nl')}
                                </ListItemIcon>
                                <ListItemText primary='Nederlands' />
                            </MenuItem>
                            <MenuItem onClick={() => handleChangeLang('pt')} value={'pt'}>
                                <ListItemIcon >
                                    {getIcon('pt')}
                                </ListItemIcon>
                                <ListItemText primary='Português' />
                            </MenuItem>
                            {authenticated &&
                                <MenuItem onClick={doSignOut}>
                                    <ListItemIcon >
                                        <SignOut />
                                    </ListItemIcon>
                                    <ListItemText primary={text.signOut} />
                                </MenuItem>
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            <div >
                {appType === GROWER_APP && !rootLocation && <GrowerRoutes {...props} documentor={true} />}
                {appType === INSPECTOR_APP && !rootLocation && <InspectorRoutes {...props} documentor={true} />}
                {appType === APPROVER_APP && user && !rootLocation && <ApproverRoutes {...props} />}
                {appType === ADMIN_APP && user && !rootLocation && <AdminRoutes {...props} />}
                {appType === EXPORTER_APP && !rootLocation && <ExporterRoutes {...props} />}
                {appType === GROUP_ADMIN_APP && user && !rootLocation && <GroupAdminRoutes {...props} />}

                {appType === '' && <SigninForm {...props} />}
            </div>

            <AppSnackbar
                open={message ? true : false}
                variant={variant}
                onClose={() => props.setMessage(null)}
                dir={props.dir}
                message={message}
            />
        </Box>
    );
}

export default withRouter(AppFrame);