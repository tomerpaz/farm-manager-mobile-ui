import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ChevronLeft from '@mui/icons-material/ChevronLeft';



const YearPicker = (props) => {

    const { dir, value, onChange } = props;
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => onChange(Number(value) - 1)}>
                {dir === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
            <Button
                variant="text"
                sx={{ color: 'black' }}

            >
                {value}
            </Button>
            <IconButton onClick={() => onChange(Number(value) + 1)}>
                {dir === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
        </div>
    )
}


export default YearPicker;
