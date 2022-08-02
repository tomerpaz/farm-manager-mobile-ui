import React from 'react';
import { SvgIcon } from '@mui/material';
import color from '@mui/material/colors/grey';

export default function (props) {
    return (

        <SvgIcon style={{backgroundColor: color[500]}}  {...props} id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"/>
        </SvgIcon>
    )
}