import React from 'react';
import Select from './Select';
import {renderAliasIdOptions} from "../optionsUtil";


const CropSelect = (props) => (
    <Select
        classes={props.classes}
        text={props.text.crop}
        emptyText={props.text.crop}
        name={props.name}
        options={props.crops}
        optionsRender={renderAliasIdOptions}
        validate={props.validate}
        width={props.width}
        onChange={props.onChange}

    />
)
export default CropSelect;
