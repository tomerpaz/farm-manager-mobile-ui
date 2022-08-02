import React from 'react'
import SimpleActivityFieldTable from './SimpleActivityFieldTable';
import SimpleFieldTable from './SimpleFieldTable';
import PlantFieldTable from './PlantFieldTable';
import HarvestFieldTable from './HarvestFieldTable'
import MarketFieldTable from './MarketFieldTable';
import {HARVEST, MARKET, PEST_MONITOR} from "../types";

const NON_EDITABLE_ACTIVITY_AREA = [PEST_MONITOR];

const FieldTable = (props) => {


    switch (props.activityType) {
        case 'END_CROP': {
            return <SimpleFieldTable {...props}/>
        }
        case 'START_CROP': {
            return <PlantFieldTable {...props}/>
        }
        case HARVEST : {
            return <HarvestFieldTable {...props} />
        }
        case MARKET : {
            return <MarketFieldTable {...props} />
        }
        default:
            return <SimpleActivityFieldTable
                editActivityArea={NON_EDITABLE_ACTIVITY_AREA.indexOf(props.activityType) < 0 }
                {...props}/>
    }
}
export default FieldTable;