import React from 'react';
import NumberFormat from 'react-number-format';
import { TextField } from '../../../'

function limit(val, max) {
    if (val.length === 1 && val[0] > max[0]) {
        val = '0' + val;
    }
    if (val.length === 2) {
        if (Number(val) === 0) {
            val = '00';
            //this can happen when user paste number
        } else if (val > max) {
            val = max;
        }
    }
    return val;
}

function formatHour(val) {
    if (val) {
        let month = limit(val.substring(0, 2), '23');
        let date = limit(val.substring(2, 4), '59');
        return month + (date.length ? ':' + date : '');
    }
}

const HourInput = ({
    input,
    meta: { touched, invalid, error, },
    ...custom
}) => (
        <NumberFormat width={110} customInput={TextField} format={formatHour}
            error={touched && invalid}
            {...input}
            {...custom}
        />
    )

export default HourInput;


