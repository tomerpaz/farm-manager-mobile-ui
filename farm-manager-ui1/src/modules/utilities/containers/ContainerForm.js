import React from 'react'
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import FormActions from '../../../components/forms/FormActions'
import { FormTitle } from "../../../components/core";
import { CONTAINER_CREATED, CONTAINER_UPDATED,CREATED,} from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle, } from "../../../utils/StyleUtils";
import { MARKET } from "./ContainerTable";
import { saveContainer } from "../../../actions/ContainerActions";
import { Box } from '@mui/material';


const useStyles = makeStyles(theme => formStyle(theme));

const ContainerFormBase = (props) => {

    const classes = useStyles();
    const { clearContainer, deleteContainer, id, containerType, handleSubmit, pristine, submitting, text, deletable, isAdmin } = props;

    const handleFormSubmit = (data) => {
        return saveContainer(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        clearContainer();
    }

    const deleteAction = () => {
        cancelAction();
        deleteContainer(id);
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={containerType === MARKET ? text.marketingQuality : text.container} />
                <div className={classes.formRowSpaceBetween}>
                    <Field name="name"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.name}
                        placeholder={text.name} />
                    <Field
                        name="capacity"
                        style={{ flex: 1 }}
                        type="number"
                        className={classes.textField}
                        label={text.weight}
                        component={TextField}
                    />

                </div>
                <Box marginLeft={1} marginRight={1} >
                    <FormControlLabel
                        control={<Field className={classes.textField} color="primary" name="active" component={Checkbox} />}
                        label={text.active} />
                </Box>
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


const selector = formValueSelector('ContainerForm');

let ContainerForm = reduxForm({
    form: 'ContainerForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? CONTAINER_CREATED : CONTAINER_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(ContainerFormBase)

export default withRouter(connect(
    state => ({
        deletable: selector(state, 'deletable'),
        containerType: selector(state, 'containerType'),
        id: selector(state, 'id'),
    })
)(ContainerForm));
