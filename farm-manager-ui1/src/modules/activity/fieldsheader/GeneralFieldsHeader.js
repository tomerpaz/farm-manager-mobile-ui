import React, { Fragment } from 'react';
import { Field } from 'redux-form'
import { DatePicker } from '../../../components/core';
import { required } from "../../../components/core/form/validation";
import { makeStyles } from '@mui/styles';
import { spacer, } from "../../../utils/StyleUtils";
import Autocomplete from "../../../components/core/form/wrapper/Autocomplete";
import { TextField, HourInput } from '../../../components/core/form/wrapper';

import { GENERAL } from "../types";
import { getYearSelectOptions } from '../../../utils';
import { formRowSpaceBetween, formRowSide } from '../../../utils/FormStyle';
import { isPlan } from '../ActivityUtil';
import { ACTIVITY_YEAR_COUNT } from './ActivityHeader';


const useStyles = makeStyles(theme => ({
    root: formRowSpaceBetween(theme),
    side: formRowSide(theme),
}));
const activityTypes = [GENERAL];

const GeneralFieldsHeader = (props) => {
    const { text, activityDefOptions, plantations, onActivityDefChange, activityType } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.side}>
                <DatePicker name='execution'
                    label={text.date}
                    validate={required}
                    {...props} />
                <div style={{ flex: 1 }}>
                    <Field name="selectedActivityDefOption"
                        width={250}
                        isMulti={false}
                        component={Autocomplete}
                        label={text.activity}
                        placeholder={text.activity}
                        options={activityDefOptions.filter(e => activityTypes.includes(e.element.type))}
                        validate={required}
                        requiredText={text.required}
                        onChange={onActivityDefChange}
                    />
                </div>
            </div>
            <div>
                {isPlan(activityType) &&
                    <Fragment>
                        <Field
                            name='startHour'
                            label={text.startHour}
                            component={HourInput}
                        />
                        <Field
                            name='hour'
                            label={text.endHour}
                            component={HourInput}
                        />
                    </Fragment>
                }
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
export default GeneralFieldsHeader;
