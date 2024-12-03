import { BugReportOutlined, CenterFocusStrong, Opacity, Water,  AdjustOutlined as Activity } from '@mui/icons-material'
import React from 'react'
import { irrigationHead, parseISOOrNull, trap } from '../FarmUtil';
import { Avatar } from '@mui/material';
import { SECONDARY_MAIN } from '../../App';
import Scout from '@mui/icons-material/PestControl';


const height = 32;

const isExpired = ( point) => {
    if(point.active && point.expiry){
        const expiry =  parseISOOrNull(point.expiry);
        if(expiry.valueOf() < new Date().valueOf()) {
            return true;
        }
    }
    return false;
}

const getBorderColor = ( point ) => {
    if(isExpired(point)) {
        return 'red';
    }

    return null;
}

const getBorderWidth = ( point ) => {
    if(getBorderColor(point) === null) {
        return null;
    }

    return 3;
}

export const SCOUT_POINT_TYPE = 'scout';
export const ACTIVITY_POINT_TYPE = 'activity';

function PointIcon({ point }) {
    if (point.type === SCOUT_POINT_TYPE) {
        return <Avatar sx={{height: height, width: height,backgroundColor:  'white',  borderColor: getBorderColor(point)}}> <Scout fontSize="medium" sx={{color: 'black'}} /></Avatar>;
    }
    else if (point.type === trap) {
        return <Avatar sx={{height: height, width: height,backgroundColor: point.active ? 'white' : 'gray', border: getBorderWidth(point), borderColor: getBorderColor(point)}}> <CenterFocusStrong fontSize="medium" sx={{color: 'black'}} /></Avatar>;
    }
    else if (point.type === irrigationHead) {
        return <Avatar sx={{height: height, width: height,backgroundColor: point.active ? '#82b1ff' : 'gray', border: getBorderWidth(point), borderColor: getBorderColor(point)}}> <Opacity fontSize="medium" sx={{color: 'black'}} /></Avatar>;
    } else {
        return <Avatar sx={{height: height, width: height,backgroundColor: point.active ? 'white' : 'gray', border: getBorderWidth(point), borderColor: getBorderColor(point)}}> <Activity fontSize="medium" sx={{color: 'black'}} /></Avatar>;
    }
}


export default PointIcon