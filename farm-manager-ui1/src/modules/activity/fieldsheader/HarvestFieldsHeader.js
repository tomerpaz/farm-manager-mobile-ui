import React from 'react';
import { Field } from 'redux-form'
import { makeStyles } from '@mui/styles';
import { TextField } from '../../../components/core/form/wrapper';
import { DatePicker } from '../../../components/core';
import Autocomplete from "../../../components/core/form/wrapper/Autocomplete";
import { required } from "../../../components/core/form/validation";
import { HARVEST } from "../types";
import { CUSTOMER } from "../../../reducers/ResourceReducer";
import { getYearSelectOptions } from '../../../utils';
import { formRowSpaceBetween, formRowSide } from '../../../utils/FormStyle';
import { ACTIVITY_YEAR_COUNT } from './ActivityHeader';

const useStyles = makeStyles(theme => ({
    root: formRowSpaceBetween(theme),
    side: formRowSide(theme),
  }));

const HarvestFieldsHeader = (props) => {
    const { text, activityDefOptions, customerAndSupplierOptions, plantations, onActivityDefChange} = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.side}>
                <DatePicker
                    name='execution'
                    label={text.date}
                    validate={required}
                    {...props} />

                <Field name="selectedActivityDefOption"
                    width={250}
                    isMulti={false}
                    component={Autocomplete}
                    label={text.activity}
                    placeholder={text.activity}
                    options={activityDefOptions.filter(e => HARVEST === e.element.type)}
                    validate={required}
                    requiredText={text.required}
                    onChange={onActivityDefChange}
                />
                <Field name="selectedCustomerOption"
                    width={250}
                    isMulti={false}
                    component={Autocomplete}
                    label={text.customer}
                    placeholder={text.customer}
                    options={customerAndSupplierOptions.filter(e => CUSTOMER === e.element.type)}
                    validate={required}
                    requiredText={text.required}
                />
                <Field
                    name="waybill"
                    type="number"
                    label={text.waybill}                   
                    component={TextField}
                />
            </div>
            <div >
                {plantations &&
                    <Field
                        name="year"
                        select
                        style={{width: 100}}
                        component={TextField}
                        label={text.season}>
                        {getYearSelectOptions(ACTIVITY_YEAR_COUNT)}
                    </Field>
                }
            </div>
        </div>
    )
}
export default HarvestFieldsHeader;
