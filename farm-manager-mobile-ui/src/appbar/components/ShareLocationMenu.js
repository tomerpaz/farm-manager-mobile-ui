import { useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import { Share } from '@mui/icons-material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';


export const shareMsg =(lat,lng)=> {
    return encodeURIComponent(`Maps:\nhttps://www.google.com/maps/search/?api=1&query=${lat},${lng}\n\nWaze:\nhttps://waze.com/ul?q=&ll=${lat},${lng}&navigate=yes`);
}

export const msgWhatsapp = (msg) => {
    window.open(`whatsapp://send?text=${msg}`);
}

export const msgTelegram = (msg) => {
    window.open(`tg://msg?text=${msg}`);
}

const ShareLocationMenu = ({ lat, lng }) => {


    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const msg = shareMsg(lat,lng);
    

    return (

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                // aria-controls="menu-appbar"
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
                <MenuItem onClick={() =>  msgWhatsapp(msg)}>
                    <IconButton
                        size="large"
                        aria-label="log out"
                        color="inherit"
                    >
                        <WhatsAppIcon />
                    </IconButton>
                    {'Whatsapp'}
                </MenuItem>
                <MenuItem onClick={() => msgTelegram(msg)}>
                    <IconButton
                        size="large"
                        aria-label="log out"
                        color="inherit"
                    >
                        <TelegramIcon />
                    </IconButton>
                    {'Telegram'}
                </MenuItem>
            </Menu>
        </Box>)
}

export default ShareLocationMenu

