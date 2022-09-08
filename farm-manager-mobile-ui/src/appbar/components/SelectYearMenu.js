import { useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import { FilterAlt } from '@mui/icons-material';
import { selectCurrentYear, setCurrentYear } from '../../features/app/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getYearArray } from '../../ui/FarmUtil';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';

const SelectYearMenu = () => {

    const dispatch = useDispatch()

    const currentYear = useSelector(selectCurrentYear)

    const { data: user } = useGetUserDataQuery()


    const noFilter = user && user.year === currentYear;


    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (year) => {
        dispatch(setCurrentYear(year))
        setAnchorEl(null);
    };



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
                <FilterAlt sx={{ color: noFilter ? null : 'blue' }} />
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
                {getYearArray().map((option) => (
                    <MenuItem sx={{ fontWeight: option === currentYear ? 'bolder' : null }} key={option} value={option} onClick={() => handleChange(option)}>
                        {option}
                    </MenuItem>
                ))}


            </Menu>
        </Box>)
}

export default SelectYearMenu

