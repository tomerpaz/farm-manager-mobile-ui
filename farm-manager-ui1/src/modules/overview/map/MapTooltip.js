import React from 'react';
import { mapTextStyle } from '../../../utils/StyleUtils';
import { Typography } from '@mui/material';
import { Tooltip } from 'react-leaflet';

export const MAX_PER_MAP = 600;

const MapTooltip = (props) => {

    const { textArr, large } = props;
    const variant  = large ? 'h6' : 'subtitle1';

    if(textArr.length === 0){
        return (<div></div>)
    }

    return (
        <Tooltip
        className={'empty-tooltip'}
        direction="center" opacity={0.8} permanent>        
            {textArr.map((e, index) =>
                <Typography key={index} variant={variant} style={mapTextStyle} >{e}</Typography>
            )}
        </Tooltip>
    )
}
export default MapTooltip;



