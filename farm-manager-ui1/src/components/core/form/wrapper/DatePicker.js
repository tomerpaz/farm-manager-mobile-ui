import React from 'react';

import { DatePicker } from '../../..';


const renderDatePicker = ({
    input: { onChange, value, onBlur, ...inputProps },
    meta: { touched, invalid, error,   },
    onChange: onChangeFromField,
    defaultValue,
    label,
    text,
    disabled,
    ...props
}) => (
        <DatePicker
            {...inputProps}
            text={text}
            value={value ? value : null}
            format={props.formatdate}
            clearable={props.clearable ? props.clearable : false}
            label={label}
            error={touched && invalid }
            disabled={disabled}
            onChange={event => {
                if (props.clearable !== true && !event) {
                    return;
                }
                onChange(event);
                if (onChangeFromField) {
                    onChangeFromField(event);
                }
            }}
            onBlur={() => onBlur(value)}
        />
    )

export default renderDatePicker;

