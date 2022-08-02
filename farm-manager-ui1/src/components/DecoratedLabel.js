import React from 'react';
import { Typography } from '@mui/material';

import { DecoratedLableSx } from '../utils/StyleUtils';

const DecoratedLabel = ({text}) => {
    return (
            <Typography sx={DecoratedLableSx()}>
                {text}
            </Typography>
    )
}
export default DecoratedLabel;
