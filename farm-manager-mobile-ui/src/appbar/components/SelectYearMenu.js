import { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material'
import { selectFieldDashboardYear, selectCurrentYear, setFieldDashboardYear, setCurrentYear } from '../../features/app/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getYearArray } from '../../ui/FarmUtil';
import { useParams } from 'react-router';
import { useFieldsById } from '../../features/fields/fieldsApiSlice';

const SelectYearMenu = () => {

    const dispatch = useDispatch()

    const currentYear = useSelector(selectCurrentYear)
    const currentDashboardYear = useSelector(selectFieldDashboardYear)
    const { fieldId } = useParams()

    const field = useFieldsById(currentYear, Number(fieldId))

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (year) => {
        dispatch(setFieldDashboardYear(year))
        setAnchorEl(null);
    };

    if (!field || !field.plantation) {
        return <></>
    }


    return (

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Button
                size="large"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                {currentDashboardYear}
            </Button>
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
                    <MenuItem sx={{
                        fontWeight: option === currentDashboardYear ? 'bolder' : null
                    }} key={option} value={option} onClick={() => handleChange(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </Box>)
}

export default SelectYearMenu

