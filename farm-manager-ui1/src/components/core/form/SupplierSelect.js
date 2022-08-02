import React from 'react';
import Select from './Select';
import {renderNameIdOptions} from "../optionsUtil";


const SupplierSelect = (props) => (
    <Select
        classes={props.classes}
        text={props.text.supplier}
        emptyText={props.text.supplier}
        name={props.name}
        options={props.suppliers}
        optionsRender={renderNameIdOptions}
        validate={props.validate}
    />
)
export default SupplierSelect;
