import React from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import { isEmpty } from '../../../utils/StringUtil';
import TextField from '../textfield/TextFIeld';

const filterOptions = createFilterOptions({
    // matchFrom: 'start',
    stringify: option => '' + option.label,
});

function getOptionLabel(e) {
    if (!isEmpty(e.name)) {
        return "" + e.name;
    }
    return "" + e.label;
}



const ComboBox = (props) => {
    const { isMulti, options, onChange, placeholder, value, label, closeMenuOnSelect, width, error, customermargin, blurOnSelect } = props
    // const style = width ? { maxWidth: width, width: width } : { minWidth: 200 };
    const multiple = isMulti === false ? false : true
    const empty = multiple ? [] : null;
    const valueOk = multiple && value && value.length > 0 && value[0] === null ? false : true

    return (
        <Autocomplete
            filterOptions={filterOptions}

            isOptionEqualToValue={(optionToEval, valueToEval) =>
                (optionToEval.id && (optionToEval.id === valueToEval.id)) ||
                (optionToEval.key && (optionToEval.key === valueToEval.key)) ||
                (optionToEval.value && (optionToEval.value === valueToEval.value))
            }
            options={options}
            getOptionLabel={option => getOptionLabel(option)}
            sx={{
                display: 'flex',
                flex: 1,
                padding: 0,
                margin: 0,
                input: {
                    padding: 0,
                    margin: 0,
                },
            }}
            size="small"
            renderOption={({ key, ...props }, option, { selected }) => {
                return <li {...props} key={option.value}>{getOptionLabel(option)}</li>
            }}
            multiple={multiple}
            onChange={(e, c) => onChange(c, e)}
            disableCloseOnSelect={closeMenuOnSelect === false}
            value={value && valueOk ? value : empty}
            renderInput={params => (
                <TextField
                    customermargin={customermargin}
                    width={width}
                    error={error}
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    fullWidth

                />
            )}

        />
    )
}

export default ComboBox;