import { BugReportOutlined, CenterFocusStrong, Opacity, Water } from '@mui/icons-material'
import React from 'react'
import { irrigationHead, trap } from '../FarmUtil';
import { Avatar } from '@mui/material';
import { SECONDARY_MAIN } from '../../App';

function PointIcon({ point }) {

    if (point.type === "scout") {
        return <BugReportOutlined fontSize="medium"/*sx={{color: 'orange'}}*/ />;
    }
    else if (point.type === trap) {
        return <Avatar sx={{backgroundColor: point.active ? 'white' : 'gray'}}> <CenterFocusStrong fontSize="medium" sx={{backgroundColor: SECONDARY_MAIN}} /></Avatar>;
    }
    else if (point.type === irrigationHead) {
        return <Opacity fontSize="medium"/*sx={{color: 'orange'}}*/ />;
    }
}

export default PointIcon