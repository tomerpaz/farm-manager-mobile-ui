import React from 'react';
import { SvgIcon } from '@mui/material';
import { green } from '@mui/material/colors';

export default function (props) {
    return (

        <SvgIcon style={{backgroundColor: green[400], color: 'white'}} {...props} id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M16.2,17H14.2L12,13.2L9.8,17H7.8L11,12L7.8,7H9.8L12,10.8L14.2,7H16.2L13,12M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"/>
        </SvgIcon>
    )
}