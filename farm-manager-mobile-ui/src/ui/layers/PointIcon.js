import { BugReportOutlined, CenterFocusStrong, Opacity, Water, AdjustOutlined as Activity } from '@mui/icons-material'
import React from 'react'
import { irrigationHead, parseISOOrNull, trap } from '../FarmUtil';
import { Avatar } from '@mui/material';
import { SECONDARY_MAIN } from '../../App';
import Scout from '@mui/icons-material/PestControl';
import { ACTIVITY, SCOUT } from './LayersDialog';


const height = 32;

const isExpired = (point) => {
    if (point.active && point.expiry) {
        const expiry = parseISOOrNull(point.expiry);
        if (expiry.valueOf() < new Date().valueOf()) {
            return true;
        }
    }
    return false;
}

const getBorderColor = (point) => {
    if (isExpired(point)) {
        return 'red';
    }

    return null;
}

const getBorderWidth = (point) => {
    if (getBorderColor(point) === null) {
        return null;
    }

    return 3;
}

export const SCOUT_POINT_TYPE = "scout";
export const ACTIVITY_POINT_TYPE = "activity";

const getBgColor = (point, color) => {
    if (color) {
        return color;
    } else if (!point.active) {
        return 'gray';
    } else if (point.type === irrigationHead) {
        return '#82b1ff';
    } else {
        return 'white';
    }

}

function PointIcon({ point, color }) {
    const backgroundColor = getBgColor(point, color);
    if (point.type === SCOUT_POINT_TYPE) {
        return <Avatar sx={{ height: height, width: height, backgroundColor, borderColor: getBorderColor(point) }}> <Scout fontSize="medium" sx={{ color: 'black' }} /></Avatar>;
    }
    else if (point.type === trap) {
        return <Avatar sx={{ height: height, width: height, backgroundColor, border: getBorderWidth(point), borderColor: getBorderColor(point) }}> <CenterFocusStrong fontSize="medium" sx={{ color: 'black' }} /></Avatar>;
    }
    else if (point.type === irrigationHead) {
        return <Avatar sx={{ height: height, width: height, backgroundColor, border: getBorderWidth(point), borderColor: getBorderColor(point) }}> <Opacity fontSize="medium" sx={{ color: 'black' }} /></Avatar>;
    } else {
        return <Avatar sx={{ height: height, width: height, backgroundColor, border: getBorderWidth(point), borderColor: getBorderColor(point) }}> <Activity fontSize="medium" sx={{ color: 'black' }} /></Avatar>;
    }
}


export default PointIcon