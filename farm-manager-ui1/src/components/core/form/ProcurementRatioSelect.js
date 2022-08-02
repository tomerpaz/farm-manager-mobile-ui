import React from 'react';
import Select from './Select';
import {renderNameIdOptions} from "../optionsUtil";

//PER_FIELD, PER_AREA_UNIT, MANUAL
function getRationOptions(text){
    return [
        {id: 'PER_AREA_UNIT' , name: text.perAreaUnit},
        {id: 'PER_FIELD' , name: text.perField},
        {id: 'MANUAL' , name: text.perUnit}
    ]
}

const ProcurementRationSelect = (props) => (
    <Select
        classes={props.classes}
        text={props.text.distributionRatio}
        emptyText={props.text.distributionRatio}
        name={props.name}
        options={getRationOptions(props.text)}
        optionsRender={renderNameIdOptions}
        validate={props.validate}
        onChange={props.onChange}
    />
)
export default ProcurementRationSelect;
//
/*
  "distributionRatio": "Distribution Ratio",
  "perField": "Per Field",
  "perAreaUnit": "Per Field Size",
  "perUnit": "Per Unit"
 */