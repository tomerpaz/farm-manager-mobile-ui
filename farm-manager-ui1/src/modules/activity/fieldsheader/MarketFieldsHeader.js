import React from 'react';
import { Field } from 'redux-form'
import { makeStyles } from '@mui/styles';
import { TextField } from '../../../components/core/form/wrapper';
import { DatePicker } from '../../../components/core';
import { required } from "../../../components/core/form/validation";
import { CUSTOMER } from "../../../reducers/ResourceReducer";
import Autocomplete from "../../../components/core/form/wrapper/Autocomplete";
import { getYearSelectOptions } from '../../../utils';
import { formRowSpaceBetween, formRowSide } from '../../../utils/FormStyle';
import { ACTIVITY_YEAR_COUNT } from './ActivityHeader';

const useStyles = makeStyles(theme => ({
    root: formRowSpaceBetween(theme),
    side: formRowSide(theme),
  }));

const MarketFieldsHeader = (props) => {
    const { text, customerAndSupplierOptions, plantations } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.side}>
                <DatePicker
                    name='execution'
                    label={text.receptionDate}
                    validate={required}
                    {...props} />
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
                    width={200}
                    name="sortBill"
                    type="number"
                    label={text.sortBill}
                    component={TextField}
                />
                <DatePicker
                    name='end'
                    label={text.sortDate}
                    validate={required}
                    {...props} />
                <Field
                    name="invoice"
                    type="number"
                    label={text.invoice}
                    component={TextField}
                />
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
export default MarketFieldsHeader;
