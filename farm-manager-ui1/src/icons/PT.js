import React from 'react';
import { SvgIcon } from '@mui/material';

export default function (props) {
    return (
        <SvgIcon viewBox="0 0 9 6" {...props}>
        <rect fill="#f00" width="9" height="6" />
        <rect fill="#060" width="4" height="6" />
    </SvgIcon>
    )
}