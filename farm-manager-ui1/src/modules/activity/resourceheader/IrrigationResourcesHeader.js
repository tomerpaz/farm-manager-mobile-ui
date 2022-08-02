import React from 'react';
import { Divider } from '@mui/material';
import { Typography, Switch } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem'
import { makeStyles } from '@mui/styles';
import { required } from "../../../components/core/form/validation";
import { renderIrrigationOptions } from "../../../components/core/optionsUtil";
import { Field } from 'redux-form'
import { TextField } from '../../../components/core/form/wrapper';
import Calculator from '../../../icons/Calculator';


import { formRow, formRowSide } from '../../../utils/FormStyle';
import DecoratedLabel from '../../../components/DecoratedLabel';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex', flex: 1, flexDirection: 'column'
    },
    formRow: formRow(theme),
    centerFlex: formRowSide(theme),
}));

const perIrrigationDay = 'PER_AREA_UNIT_PER_IRREGATION_DAY';
const IrrigationFieldsHeader = (props) => {
    const {
        text, irrigationMethods, fertilizeMethods,
        onChange, irrigationDays, irrigationMethod, resources,
        calculator, areaUnit
    } = props;

    const hasFertilizers = resources.filter((resource, index, arr) => resource.resourceType === 'FERTILIZER').length > 0
    const classes = useStyles();

    return (

        <div className={classes.root}>
            <div className={classes.formRow}>
                <IconButton onClick={() => onChange(null, null, null, 'calculator')}>
                    <Calculator className={calculator ? classes.iconEnabled : classes.iconDisabled} />
                </IconButton>
                <Switch
                    checked={calculator}
                    onChange={(e) => onChange(null, null, null, 'calculator')}
                    color="primary"
                />
                {calculator && irrigationMethod === perIrrigationDay &&
                    <div className={classes.centerFlex}>
                         <DecoratedLabel text ={`${irrigationDays} ${text.irrigationDays}`} />
                    </div>
                }
            </div>
            <Divider />
            <div className={classes.formRow}>
                <Field name="irrigationMethod"
                    select
                    width={200}
                    component={TextField}
                    validate={calculator ? required : null}
                    label={text.irrigationMethod}
                    onChange={onChange}
                    disabled={!calculator}
                >
                    <MenuItem value="">
                        <em>{text.irrigationMethod}</em>
                    </MenuItem>
                    {renderIrrigationOptions(irrigationMethods, text, areaUnit)}
                </Field>
                <Field
                    name="irrigationFrequency"
                    type="number"
                    width={200}
                    label={text.irrigationFrequency}
                    component={TextField}
                    validate={calculator && irrigationMethod === perIrrigationDay ? required : null}
                    onChange={onChange}
                    disabled={!(calculator && irrigationMethod === perIrrigationDay)}
                />
                <Field name="fertilizeMethod"
                    select
                    width={200}
                    component={TextField}
                    validate={hasFertilizers && calculator ? required : null}
                    disabled={!calculator}
                    onChange={onChange}
                    label={text.fertilizeMethod}>
                    <MenuItem value="">
                        <em>{text.fertilizeMethod}</em>
                    </MenuItem>
                    {renderIrrigationOptions(fertilizeMethods, text, areaUnit)}
                </Field>
            </div>
        </div>
    )
}
export default IrrigationFieldsHeader;



