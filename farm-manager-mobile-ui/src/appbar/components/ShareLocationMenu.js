import { Share, ShareLocation } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { logOut, selectLang } from '../../features/app/appSlice';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { useFieldsById } from '../../features/fields/fieldsApiSlice';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


const ShareLocationMenu = ({field}) => {




 //   console.log(navigator.appVersion);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    console.log('field',field);

    return (

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <Share />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/* <MenuItem onClick={() => console.log('Google Maps')}>
                    <IconButton
                        size="large"
                        aria-label="log out"
                        color="inherit"
                    >
                        <ShareLocation />
                    </IconButton>

                    {'Google'}
                </MenuItem> */}
                <MenuItem onClick={()=> window.open('whatsapp://send?text=This is WhatsApp sharing example using button')}>
                    <IconButton
                        size="large"
                        aria-label="log out"
                        color="inherit"
                    >
                        <WhatsAppIcon />
                    </IconButton>

                    {'Whatsapp'}
                </MenuItem>
            </Menu>
        </Box>)
}

export default ShareLocationMenu


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