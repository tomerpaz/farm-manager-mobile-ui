import React from 'react';
import { makeStyles } from '@mui/styles';
import { DatePicker } from '../../../components/core';
import { TextField, HourInput } from '../../../components/core/form/wrapper';
import { Field } from 'redux-form'
import Autocomplete from "../../../components/core/form/wrapper/Autocomplete";
import { required } from "../../../components/core/form/validation";
import { renderNamValueOptions } from "../../../components/core/optionsUtil";
import { getYearSelectOptions } from '../../../utils';
import { formRowSpaceBetween, formRowSide } from '../../../utils/FormStyle';
import { isPlan } from '../ActivityUtil';
import { ACTIVITY_YEAR_COUNT } from './ActivityHeader';

const useStyles = makeStyles(theme => ({
    root: formRowSpaceBetween(theme),
    side: formRowSide(theme),
}));

const SprayFieldsHeader = (props) => {
    const { text, crops, onCropChange, winds, cropOptions, plantations, activityType } = props;
    const options = winds.map(value => ({ 'name': text[value], value: value }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.side}>
                <DatePicker name='execution'
                    label={text.date}
                    validate={required}
                    {...props} />

                <Field name="selectedCropOption"
                    isMulti={false}
                    component={Autocomplete}
                    width={250}
                    label={text.crop}
                    placeholder={text.crop}
                    options={cropOptions}
                    onChange={onCropChange}
                    validate={required}
                    requiredText={text.required}
                />
            </div>
            <div className={classes.side}>

                {isPlan(activityType) &&
                    <Field
                        name='startHour'
                        label={text.startHour}                        
                        component={HourInput}
                    />

                }
                <Field
                    name='hour'
                    label={text.endHour}
                    validate={required}
                    component={HourInput}
                />

                <Field name="wind"
                    style={{ width: 140 }}
                    select
                    component={TextField}
                    validate={required}
                    label={text.windSpeed}>
                    {renderNamValueOptions(options)}
                </Field>
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
export default SprayFieldsHeader;
