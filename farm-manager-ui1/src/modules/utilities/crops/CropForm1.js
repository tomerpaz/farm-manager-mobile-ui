import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { formStyle, } from "../../../utils/StyleUtils";
import FormControlLabel from '@mui/material/FormControlLabel';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import FormActions from '../../../components/forms/FormActions'
import { FormTitle } from "../../../components/core";
import { CREATED, CROP_CREATED, CROP_UPDATED } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { renderNameIdOptions } from "../../../components/core/optionsUtil";
import { getSubstancePesticideLists } from "../../../actions/PesticideListActions";
import { saveCrop } from "../../../actions/CropActions";
import Autocomplete from "../../../components/core/form/wrapper/Autocomplete";
import { Box, MenuItem } from '@mui/material';

const useStyles = makeStyles(theme => formStyle(theme));

const CropFormBase = (props) => {

    const classes = useStyles();
    const { clearCrop, deleteCrop, id, handleSubmit, pristine, submitting, text, deletable, isAdmin, initialValues, baseCropOptions, plantation, change } = props;

    const [substance, setSubstance] = useState(initialValues.substance);
    const [pesticideLists, setPesticideLists] = useState([]);

    useEffect(() => {
        if (substance) {
            getSubstancePesticideLists(substance.id).then(function (response) {
                const temp = response.data;
                temp.forEach((list) => list.name = list.name + ' (' + list.businessName + ')')
                setPesticideLists(temp)
            });
        } else {
            setPesticideLists([]);
        }
    }, [substance]);

    const handleFormSubmit = (data) => {
        return saveCrop(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        clearCrop();
    }

    const deleteAction = () => {
        cancelAction();
        deleteCrop(id);
    }

    const onCropChange = (option) => {
        if (option && option.element) {
            console.log(option.element)
            change('substance', option.element);
            setSubstance(option.element)
        } else {
            change('substance', null);
            setSubstance(null)
        }
    }

    return (

        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.crop} />
                <div className={classes.formRowSpaceBetween}>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <Field name="selectedCropOption"
                            style={{ flex: 1 }}
                            className={classes.textField}
                            isMulti={false}
                            component={Autocomplete}
                            label={text.crop}
                            placeholder={text.crop}
                            options={baseCropOptions}
                            onChange={onCropChange}
                            validate={required}
                            requiredText={text.required}
                        />
                    </div>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <Field name="list.id"
                            style={{ flex: 1 }}
                            className={classes.textField}
                            select
                            component={TextField}
                            validate={required}
                            label={text.pesticideList}>
                            {renderNameIdOptions(pesticideLists)}
                        </Field>
                    </div>
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field name="alias"
                        style={{ flex: 1 }}
                        className={classes.textField}
                        component={TextField}
                        label={text.alias}
                        placeholder={text.alias} />
                    <Field name="code"
                        style={{ flex: 1 }}
                        className={classes.textField}
                        component={TextField}
                        label={text.code} />
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Box flex={1} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Box paddingLeft={1} paddingRight={1}>
                            <FormControlLabel
                                control={<Field className={classes.textField} color="primary" name="plantation" component={Checkbox} />}
                                label={text.plantation} />
                        </Box>
                        <FormControlLabel
                            control={<Field className={classes.textField} color="primary" name="active" component={Checkbox} />}
                            label={text.active} />
                    </Box>
                    <div style={{ display: 'flex', flex: 1 }}>
                        {!plantation &&
                            <Field name="cropRotation"
                                style={{ flex: 1 }}
                                select
                                component={TextField}
                                validate={required}
                                label={text.cropRotation + ' (' + text.years + ')'}>
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                            </Field>
                        }
                    </div>
                </div>

            </div>

            <FormActions
                text={text}
                editable={isAdmin}
                deletable={deletable && isAdmin}
                cancelAction={cancelAction}
                deleteAction={deleteAction}
                pristine={pristine}
                submitting={submitting}
            />
        </form>
    )
}

const selector = formValueSelector('CropForm');

let CropForm = reduxForm({
    form: 'CropForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? CROP_CREATED : CROP_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(CropFormBase)

export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        plantation: selector(state, 'plantation'),
        id: selector(state, 'id'),
    })
)(CropForm));
