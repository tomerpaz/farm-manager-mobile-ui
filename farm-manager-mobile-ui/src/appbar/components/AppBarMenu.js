import { Logout, More, MoreVert, Settings } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut, selectLang, setOpenSettings } from '../../features/app/appSlice';
import SettingsDialog from '../../ui/settings/SettingsDialog';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import LayersDialog from '../../ui/layers/LayersDialog';



const AppBarMenu = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const text = useSelector(selectLang)

    const [anchorEl, setAnchorEl] = React.useState(null);

    const { data: user, isSuccess } = useGetUserDataQuery()

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        dispatch(logOut());

        navigate("/login");
    };

    const handleSettings = () => {
        setAnchorEl(null);
        dispatch(setOpenSettings(true));

    };

    return (

        <Box flex={1} display={'flex'} justifyContent={'end'} /*sx={{ display: { xs: 'flex', md: 'none' } }}*/>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <MoreVert />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>
                    <IconButton
                        size="large"
                        aria-label="log out"
                        color="inherit"
                    >
                        <Logout />
                    </IconButton>
                    {text.logout}
                </MenuItem>
                <MenuItem onClick={handleSettings}>
                    <IconButton
                        size="large"
                        aria-label="settings"
                        color="inherit"
                    >
                        <Settings />
                    </IconButton>
                    {isSuccess ? user.displayName: text.settings}
                </MenuItem>
            </Menu>
            <SettingsDialog/>
            <LayersDialog/>
        </Box>)
}

export default AppBarMenu


/*
  <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>

*/