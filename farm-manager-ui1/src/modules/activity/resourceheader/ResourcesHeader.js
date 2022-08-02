import React from 'react'
import {SPRAY, FERTILIZE_IRRIGATION, SPRAY_PLAN, FERTILIZE_IRRIGATION_PLAN, PEST_MONITOR} from '../types'
import SprayResourcesHeader from './SprayResourcesHeader';
import IrrigationResourcesHeader from './IrrigationResourcesHeader';
import PestMonitorResourcesHeader from './PestMonitorResourcesHeader';

const ResourcesHeader = (props) => {


    switch (props.activityType) {
        case SPRAY_PLAN:
        case SPRAY: {
            return (
                <SprayResourcesHeader onCropChange={props.changeCrop} {...props} />
            )
        }
        case FERTILIZE_IRRIGATION_PLAN:
        case FERTILIZE_IRRIGATION: {
            return (
                <IrrigationResourcesHeader irrigationDays={props.irrigationDays} {...props} />
            )
        }
        case PEST_MONITOR: {
            return (
                <PestMonitorResourcesHeader {...props} />
            )
        }
        default:
            return <div></div>;
    }

}

export default ResourcesHeader;