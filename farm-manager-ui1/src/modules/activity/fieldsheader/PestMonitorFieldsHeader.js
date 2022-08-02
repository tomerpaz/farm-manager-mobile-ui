import React from 'react';
import { makeStyles } from '@mui/styles';
import { DatePicker } from '../../../components/core';
import { TextField } from '../../../components/core/form/wrapper';
import { Field } from 'redux-form'
import Autocomplete from "../../../components/core/form/wrapper/Autocomplete";
import { required } from "../../../components/core/form/validation";
import { renderNameIdOptions, renderNamValueOptions } from "../../../components/core/optionsUtil";
import { formRowSpaceBetween, formRowSide } from '../../../utils/FormStyle';

const useStyles = makeStyles(theme => ({
    root: formRowSpaceBetween(theme),
    side: formRowSide(theme),
}));


const PestMonitorFieldsHeader = (props) => {
    const { text, cropOptions, onCropChange, phenologicalStages, executors, isInspector } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.side}>
                <DatePicker name='execution'
                    label={text.date}
                    validate={required}
                    {...props} />
                <Field name="selectedCropOption"
                    width={250}
                    isMulti={false}
                    component={Autocomplete}
                    label={text.crop}
                    placeholder={text.crop}
                    options={cropOptions}
                    onChange={onCropChange}
                    validate={required}
                    requiredText={text.required}
                />
                {phenologicalStages.length > 0 && <Field name="phenologicalStage"
                    style={{ width: 200 }}
                    select
                    component={TextField}
                    label={text.phenologicalStage}>
                    {renderNamValueOptions(phenologicalStages.map(e => ({ name: e, value: e })))}
                </Field>}
            </div>
            <div className={classes.side}>
                <Field name="managerID"
                    style={{ width: 200 }}
                    select
                    component={TextField}
                    validate={!isInspector ? required : null}
                    label={text.scout}>
                    {renderNameIdOptions(executors.filter(e => e.type === 'WORKER' && e.active === true), true)}
                </Field>
            </div>
        </div>
    )
}
export default PestMonitorFieldsHeader;
