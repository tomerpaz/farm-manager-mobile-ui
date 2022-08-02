import React, { useState, useEffect } from 'react';
import { TextField } from '../../components';
import { numberInputValidation } from "../../utils/NunberUtil";
import InputAdornment from '@mui/material/InputAdornment';


const EditTextCell = (props) => {

    const { column, rowIndex, value, rowData, inputRef, width } = props;
    const [stateValue, setStateValue] = useState(null)
    const [touched, setTouched] = useState(false)

    

    function onBlur(e) {
        if (touched && column.onChange) {
            column.onChange(stateValue, rowData, rowIndex);
            setStateValue(null);
            setTouched(false)
        }
    }

    function onChange(e) {
        let newValue = e.target.value;
        if (column.type === 'number') {
            if (!numberInputValidation(newValue)) {
                newValue = '';
            }
        }
        setStateValue(newValue);
        setTouched(true);
    }

    const currentValue = touched ? stateValue : (value ? value : column.type === 'number' ? 0 : '');
    const InputProps = {};

    if (column.color && column.color(rowData) !== null) {
        InputProps.style = { color: column.color(rowData) }
    }

    const endAdornment = column.endAdornment ? column.endAdornment(rowData) : null;

    if (endAdornment) {
        InputProps.endAdornment = <InputAdornment style={{ paddingLeft: 5, paddingRight: 5 }} position="start">{endAdornment}</InputAdornment>;
    }

    return (
        <TextField
            width={width}
            customermargin={0}
            inputRef={inputRef}
            type={column.type}
            multiline={column.multiline}
            rows={column.rows}
            InputProps={InputProps}
            onFocus={(e) => e.target.select()}
            value={currentValue}
            onBlur={(e) => onBlur(e)}
            onChange={(e) => onChange(e)}
            disabled={column.disabled ? column.disabled(rowData) : false}
        />
    )
}
export default EditTextCell;

