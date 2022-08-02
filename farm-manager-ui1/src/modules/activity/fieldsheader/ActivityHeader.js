import React from 'react'
import {
    FERTILIZE_IRRIGATION, FERTILIZE_IRRIGATION_PLAN, GENERAL, GENERAL_PLAN, HARVEST, MARKET, PEST_MONITOR,
    SPRAY, SPRAY_PLAN
} from '../types'
import SprayFieldsHeader from './SprayFieldsHeader';
import GeneralFieldsHeader from './GeneralFieldsHeader';
import IrrigationFieldsHeader from './IrrigationFieldsHeader';
import HarvestFieldsHeader from './HarvestFieldsHeader';
import MarketFieldsHeader from './MarketFieldsHeader';
import PestMonitorFieldsHeader from './PestMonitorFieldsHeader';

export const ACTIVITY_YEAR_COUNT = 18;

const ActivityHeader = (props) => {
    switch (props.activityType) {
        case SPRAY_PLAN:
        case SPRAY: {
            return <SprayFieldsHeader onCropChange={props.changeCrop} {...props} />
        }
        case GENERAL_PLAN:
        case GENERAL: {
            return <GeneralFieldsHeader {...props} />
        }
        case FERTILIZE_IRRIGATION_PLAN:
        case FERTILIZE_IRRIGATION: {
            return <IrrigationFieldsHeader  {...props} />
        }
        case HARVEST: {
            return <HarvestFieldsHeader {...props}/>
        }
        case MARKET: {
            return <MarketFieldsHeader {...props}/>
        }
        case PEST_MONITOR: {
            return <PestMonitorFieldsHeader onCropChange={props.changeCrop} {...props}/>
        }

        default:
            return <div>Unsupported {props.activityType}</div>;
    }
}

export default ActivityHeader;