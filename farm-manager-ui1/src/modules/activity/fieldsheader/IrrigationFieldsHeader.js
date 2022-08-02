import React from 'react';
import { Field } from 'redux-form'
import { makeStyles } from '@mui/styles';
import { TextField } from '../../../components/core/form/wrapper';
import { DatePicker } from '../../../components/core';
import { required } from "../../../components/core/form/validation";
import { getYearSelectOptions } from '../../../utils';
import { formRowSpaceBetween, formRowSide } from '../../../utils/FormStyle';
import { ACTIVITY_YEAR_COUNT } from './ActivityHeader';

const useStyles = makeStyles(theme => ({
    root: formRowSpaceBetween(theme),
    side: formRowSide(theme),
  }));

const IrrigationFieldsHeader = (props) => {
    const { text, onDateChange, plantations } = props;
    const classes = useStyles();

    let startDate = props.start;
    let endDate = props.end;

    if (!(endDate instanceof Date)) {
        endDate = new Date(endDate);
    }
    const maxStart = new Date(endDate.getTime());
    maxStart.setDate(endDate.getDate() - 1)

    if (!(props.start instanceof Date)) {
        startDate = new Date(startDate);
    }
    const minEnd = new Date(startDate.getTime());
    minEnd.setDate(startDate.getDate() + 1)

    return (
        <div className={classes.root}>
            <div className={classes.side}>
                <DatePicker name='execution'
                    label={text.start}
                    validate={required}
                    onChange={onDateChange}
                    //maxDate={maxStart}
                    maxDateMessage={''}
                    {...props} />
                <DatePicker name='end'
                    label={text.end}
                    validate={required}
                    onChange={onDateChange}
                   // minDate={minEnd}
                    minDateMessage={''}
                    {...props} />
            </div>
            <div>
                {plantations &&
                    <Field
                        name="year"
                        select
                        style={{ width: 100 }}
                        component={TextField}
                        label={text.season}>
                        {getYearSelectOptions(ACTIVITY_YEAR_COUNT)}
                    </Field>
                }
            </div>
        </div>
    )
}
export default IrrigationFieldsHeader;



