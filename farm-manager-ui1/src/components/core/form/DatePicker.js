import React from 'react';
import FormControl from '@mui/material/FormControl'
import {Field} from 'redux-form'
import {DatePicker} from './wrapper';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

const DatePickerBase = ({text, label, name, required, clearable, onChange, minDate,minDateMessage, maxDate, maxDateMessage, views, format, validate, disabled, error}) => {
    return (
        <FormControl>
            <Field name={name}
                   component={DatePicker}
                   label={label}
                   leftArrowIcon={<ChevronLeft/>}
                   rightArrowIcon={<ChevronRight/>}
                   okLabel={text.ok}
                   cancelLabel={text.cancel}
                   autoOk={true}
                   formatdate={format ? format : text.dateFormat}
                   clearable={clearable}
                   validate={required}
                   onChange={onChange}
                   minDate={minDate}
                   minDateMessage={minDateMessage}
                   maxDate={maxDate}
                   maxDateMessage={maxDateMessage}
                   text={text}
                   views={views}
                   validate={validate}
                   disabled={disabled}

        />
        </FormControl>
    )
}
export default DatePickerBase;