import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { FormControlLabel, MenuItem, FormControl, FormLabel, RadioGroup, Radio, Typography, Button, Box } from '@mui/material';

import { Checkbox, TextField } from '../../components/core/form/wrapper';
import { FormTitle, renderTypeOptions } from "../../components/core";
import { Table } from "../../components";

import FormActions from '../../components/forms/FormActions'
import { APPROVAL_UPDATED } from "../../actions/types";
import { updateApproval } from "../../actions";
import { required } from "../../components/forms/ValidationUtil";

import { textField } from '../../utils/StyleUtils';
import { isEmpty } from '../../utils/StringUtil';
import { getActivityDisplayText, PENDING, APPROVED, REJECTED } from '../activity/ActivityUtil';
import { TextField as MuiTextField } from '../../components'
import { APPROVER_APP } from '../../components/frame/AppFrame';
import { withinPerscentRange } from '../../utils/FarmCalculator';
import { formRoot, formSection, formRow, formRowSpaceBetween, formTable } from '../../utils/FormStyle';
import { tableError } from '../activity/activityStyle';
import { ACTIVITY_FROM } from '../../components/frame/Routes';
import { asShortStringDate } from '../../utils';

const useStyles = makeStyles(theme => ({
    root: formRoot(theme),
    section: formSection(theme),
    formRowSpaceBetween: formRowSpaceBetween(theme),
    formRow: formRow(theme),
    table: formTable(theme),
    error: tableError(theme),
    textField: textField(theme),
    spacer: {
        width: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(1),
        color: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
    },


    notes: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        margin: theme.spacing(1),
        // backgroundColor: theme.palette.secondary.light,
    },
    em: {
        height: theme.spacing(4),
    },

    checks: {
        margin: theme.spacing(1),
    },    
    message: {
        margin:  theme.spacing(2)
    }

}));
function getMaterialColor(row) {
    const ok = withinPerscentRange(row.usedamount, row.plannedamount, 10);

    if (ok) {
        return { color: 'green', fontWeight: 'bold' };
    }
    else {
        return { color: 'red', fontWeight: 'bold' };
    }
}

function getCostPerAreaUnit(totalPrice, area) {
    if (totalPrice && area && area > 0) {
        return totalPrice / area;
    } else if (totalPrice) {
        return totalPrice;
    } else {
        return 0;
    }
}

function getTitle(approval, text) {
    if (isEmpty(approval.pest)) {
        return getActivityDisplayText(approval, text);
    } else {
        return `${approval.pest} - ${getActivityDisplayText(approval, text)}`;
    }
}

function getMessages(data, text) {

    const messages = []

    let add = false;
    if (isEmpty(data.contractorCode)) {
        messages.push({ color: 'error', message: `${text.noContractor}`})
        add = true;
    }

    if (!isEmpty(data.totalPriceApproverName)) {
        if(add){
            messages.push('|')
        }
        messages.push({ color: 'initial', message: `${text.manualTariffBy}: ${data.totalPriceApproverName}`})
        add = true;
    }

    if (!isEmpty(data.discountApproverName)) {
        if(add){
            messages.push('|')
        }
        messages.push({ color: 'initial', message:`${text.addition}/${text.subtraction} ${text.approved}: ${data.discountApproverName}`})
        add = true;
    }

    if (data.rejectStatusDate !== null) {
        if(add){
            messages.push('|')
        }
        messages.push({ color: 'initial', message:`${text.rejected} ${text.onDate}: ${asShortStringDate(data.rejectStatusDate)}`})
    }
    return messages;
}

const ApprovalFormBase = (props) => {

    const classes = useStyles();
    const {
        handleSubmit, pristine, submitting, text, id, clearApproval, user, initialValues,
        historyNotes, editable, history, initialValues: { activityMaterials, creator, previous,
            rejectStatusDate },
        status, discount, change, area, totalPrice, areaUnit, unitQty, unitPrice,
        discountApprover, discountApprovalDate, totalPriceApprover, totalPriceApprovalDate, discountApproverName, totalPriceApproverName,

    } = props;


    const [polarity, setPolarity] = useState((initialValues.discount && initialValues.discount < 0) ? -1 : 1);
    const [visibleDiscount, setVisibleDiscount] = useState((initialValues.discount && initialValues.discount < 0) ? initialValues.discount * -1 : initialValues.discount);

    const [originalUnitQty, setOriginalUnitQty] = useState(initialValues.unitQty);
    const [originalUnitPrice, setOriginalUnitPrice] = useState(initialValues.unitPrice);

    const [approvalStatus, setApprovalStatus] = useState(initialValues.editable ? '' : initialValues.status);

    const [messages, setMessages] = useState(getMessages(initialValues, text));

    const [editableForm] = useState(initialValues.editable && !isEmpty(initialValues.contractorCode));



    useEffect(() => {
        change('status', null)

    }, [approvalStatus])


    const onUnitPriceChange = (value) => {
        change('unitPrice', value ? value : 0);
        if (value) {
            if(unitQty){
                change('totalPrice', value * unitQty);
            }
            change('totalPriceApprover', user.username);
        }
    }

    const onTotalPriceChange = (value) => {
        change('totalPrice', value ? value : 0);
        if (value) {
            if(unitQty && unitQty !== 0){
                change('unitPrice', (value / unitQty).toFixed(2));
            }
            change('totalPriceApprover', user.username);
        }
    }

    const onChangePrecentage = (percentage) => {
        if (!isEmpty(percentage) && Number(percentage) !== 0) {
            change('discount', Number(percentage));
            setVisibleDiscount(Number(percentage))
            const ratioVal = Number(percentage) / 100.0;
            const ratio = polarity === 1 ? 1 + ratioVal : 1 - ratioVal;
            change('totalPrice', (ratio * totalPrice).toFixed(2));
        } else {
            change('discount', 0);
            setVisibleDiscount(0)

        }
    }

    const setSystemPrice = () => {

            change('totalPrice', originalUnitPrice * originalUnitQty);
            change('unitQty', originalUnitQty);
            change('unitPrice', originalUnitPrice);
            change('totalPriceApprover', null);
            change('discount', 0);
            setVisibleDiscount(0)
    }


    const handleFormSubmit = (data) => {

        data.status = null;
        if (approvalStatus !== '') {
            data.status = approvalStatus;
        }
        if (data.discount) {
            data.discount = data.discount * polarity;
        }
        return updateApproval(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }


    const cancelAction = () => {
        clearApproval();
        history.goBack();
    }

    const onViewClicked = () => {
        history.push(`/ap${ACTIVITY_FROM}${id}`)
    }


    const approveOptions = [];
    approveOptions.push(<MenuItem className={classes.em} key={''} value={''}><em>{''}</em></MenuItem>)
  //  approveOptions.push(<MenuItem key={PENDING} value={PENDING}>{text.pending}</MenuItem>)
    approveOptions.push(<MenuItem key={APPROVED} value={APPROVED}>{text.approved}</MenuItem>)

    if (user.role === APPROVER_APP) {
        approveOptions.push(<MenuItem key={REJECTED} value={REJECTED}>{text.rejected}</MenuItem>)
    }

    const rejectOptions = [];
    if (approvalStatus === REJECTED && !isEmpty(previous) && previous !== creator && user.users && user.users.find(e => e.username === previous)) {        
        const previousUser = user.users.find(e => e.username === previous);
        const creatorUser = user.users.find(e => e.username === creator);
        
        rejectOptions.push(<MenuItem key={previous} value={previous}>{`${previousUser.firstName} ${previousUser.lastName}`}</MenuItem>)
        rejectOptions.push(<MenuItem key={creator} value={creator}>{`${creatorUser.firstName} ${creatorUser.lastName}`}</MenuItem>)

    }

    const originalPriceDIsabled = !editableForm && (originalUnitQty && originalUnitPrice);

    //unitPrice, unitQty, totalPrice, totalPriceDate
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <div className={classes.section}>

                    <FormTitle title={getTitle(initialValues, text)} />
                    <div className={classes.formRowSpaceBetween}>
                        <div>
                            <MuiTextField
                                width={300}
                                select
                                value={approvalStatus}
                                className={classes.textField}
                                disabled={!editableForm}
                                onChange={(e) => setApprovalStatus(e.target.value)}
                                label={text.status}>
                                {approveOptions}
                            </MuiTextField>
                            <FormControlLabel className={classes.checks}
                                disabled={!editableForm}
                                control={<Field name="active" color="primary" component={Checkbox} />}
                                label={text.active} />
                            {rejectOptions.length > 1 &&
                                <Field
                                    width={180}
                                    name="rejectTo"
                                    select
                                    component={TextField}
                                    validate={required}
                                    className={classes.textField}
                                    disabled={!editableForm}
                                    label={text.destination}>
                                    {rejectOptions}
                                </Field>
                            }
                        </div>
                        <Box display={'flex'} alignItems={'center'}>
                            <FormControl disabled={!editableForm} className={classes.checks} component="fieldset">
                                <RadioGroup row name="polarity" value={polarity} onChange={(e) => setPolarity(Number(e.target.value))}>
                                    <FormControlLabel value={1} control={<Radio />} label={`${text.addition} %`} />
                                    <FormControlLabel value={-1} control={<Radio />} label={`${text.subtraction} %`} />
                                </RadioGroup>
                            </FormControl>

                            <MuiTextField
                                width={100}
                                type="number"
                                disabled={!editableForm}
                                value={visibleDiscount ? visibleDiscount : 0}
                                onChange={(e) => setVisibleDiscount(e.target.value)}
                                onBlur={(e) => onChangePrecentage(e.target.value)}
                            //value={percentage}
                            //onChange={(e) => setPercentage(e.target.value)}
                            />
                            <Button onClick={onViewClicked} variant="outlined" className={classes.button}>
                                {text.view}
                            </Button>
                        </Box>
                    </div>
                    <div className={classes.formRowSpaceBetween}>
                        <Field name="unitPrice"
                            component={TextField}
                            type="number"
                            disabled={!editableForm}
                            label={text.unitPrice}
                            onChange={(e) => onUnitPriceChange(Number(e.target.value))}
                            placeholder={text.unitPrice} />

                        <Field name="unitQty"
                            component={TextField}
                            type="number"
                            disabled={!editableForm}
                            label={text.unitQty}
                            placeholder={text.unitQty} />

                        <Field name="totalPrice"
                            component={TextField}
                            type="number"
                            onChange={(e) => onTotalPriceChange(Number(e.target.value))}
                            disabled={!editableForm}
                            label={text.totalPrice}
                            placeholder={text.totalPrice} />
                        <Box padding={1}>
                            {`${text['costPer' + areaUnit]}: ${getCostPerAreaUnit(totalPrice, area).toFixed(2)}`}
                        </Box>
                        <Button disabled={originalPriceDIsabled === 0 ? false : true} onClick={setSystemPrice} variant="outlined" className={classes.button}>
                            {text.originalCost}
                        </Button>
                    </div>
                    {messages.length > 0 &&
                        <div className={classes.formRow}>
                            {messages.map((e, index) => <Typography variant="h6" color={e.color} className={classes.message} key={index}>{e.message}</Typography>)}
                        </div>

                    }

                </div>
                <div className={classes.section}>
                    <div className={classes.formRow}>
                        <div className={classes.notes}>

                            {!isEmpty(historyNotes) && <div >
                                {`${text.notesHistory}:`}
                            </div>}
                            {!isEmpty(historyNotes) &&
                                <div style={{ whiteSpace: 'pre-line' }}>{historyNotes}</div>
                            }
                        </div>
                        <Field name="newNote"
                            disabled={!editableForm}
                            style={{ flex: 1 }}
                            component={TextField}
                            multiline
                            rows="7"
                            label={text.notes}
                            placeholder={text.notes} />
                        <Field name="printNote"
                            style={{ flex: 1 }}
                            disabled={!editableForm}
                            component={TextField}
                            multiline
                            rows="7"
                            label={text.printNotes}
                            placeholder={text.printNotes} />
                    </div>
                </div>

                {activityMaterials.length > 0 && <div className={classes.formRow}>
                    <Table
                        rows={activityMaterials}
                        columns={[
                            {
                                name: 'name', title: text.name,
                                getStyle: row => getMaterialColor(row),
                            },
                            {
                                name: 'code', title: text.code,
                                getStyle: row => getMaterialColor(row),
                            },
                            {
                                name: 'dosage', title: text.dosage,

                                getStyle: row => getMaterialColor(row),
                            },
                            {
                                name: 'usedamount', title: text.usedAmount,
                                getStyle: row => getMaterialColor(row),
                            },
                            {
                                name: 'plannedamount', title: text.plannedAmount,
                                getStyle: row => getMaterialColor(row),
                            },
                        ]}
                    // height={200}
                    />
                </div>}

                <FormActions
                    text={text}
                    editable={editableForm}
                    deletable={false}
                    cancelAction={cancelAction}
                    deleteAction={null}
                    pristine={pristine}
                    submitting={submitting}

                />
            </div>
        </form >

    )
}

const selector = formValueSelector('ApprovalForm');

let ApprovalForm = reduxForm({
    form: 'ApprovalForm',
    onSubmitSuccess: (response, dispatch, props) => {
        props.history.goBack();

        return dispatch({
            type: APPROVAL_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(ApprovalFormBase)

ApprovalForm = connect(
    state => ({
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
        historyNotes: selector(state, 'historyNotes'),
        editable: selector(state, 'editable'),
        discount: selector(state, 'discount'),
        status: selector(state, 'status'),
        area: selector(state, 'area'),
        totalPrice: selector(state, 'totalPrice'),
        unitPrice: selector(state, 'unitPrice'),
        unitQty: selector(state, 'unitQty'),

        discountApproverName: selector(state, 'discountApproverName'),
        discountApprover: selector(state, 'discountApprover'),
        discountApprovalDate: selector(state, 'discountApprovalDate'),
        totalPriceApprover: selector(state, 'totalPriceApprover'),
        totalPriceApproverName: selector(state, 'totalPriceApproverName'),
        totalPriceApprovalDate: selector(state, 'totalPriceApprovalDate'),


    })
    ,
    {})(ApprovalForm);
export default ApprovalForm;
