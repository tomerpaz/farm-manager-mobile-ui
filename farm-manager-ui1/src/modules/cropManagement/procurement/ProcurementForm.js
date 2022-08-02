import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { formRoot, formSection, formRow, formRowSpaceBetween, formTable } from '../../../utils/FormStyle';
import { connect } from 'react-redux';
import { sumBy } from 'lodash';

import { saveProcurement, deleteProcurement } from '../../../actions';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import FormActions from '../../../components/forms/FormActions';
import { CROP_MANAGEMENT_PROCUREMENT } from '../../../components/frame/Routes';
import { PROCUREMENT_CREATED, PROCUREMENT_UPDATED, CREATED, SET_MESSAGE } from '../../../actions/types';
import { FormTitle, getSuggestionsNameElement, renderNameIdOptions } from '../../../components/core';
import { QuickAdd, QuickAddDialog } from '../../';

import { Divider, Typography, IconButton, Badge, Box } from '@mui/material';
import { PROCUREMENT } from '../../activity/types';
import { scrollToFirstError } from '../../../components/core/form/FormUtil';
import { Autocomplete, TextField } from '../../../components/core/form/wrapper';

import DatePicker from '../../../components/core/form/DatePicker';
import { SUPPLIER } from '../../../reducers/ResourceReducer';
import { requiredArray, required, requiredFieldsArray } from '../../../components/core/form/validation';
import { tableError } from '../../activity/activityStyle';
import { AddButton } from '../../../components';
import ProcurementResourceTable, { getPrice } from './form/ProcurementResourceTable';
import { ResourceSelectionTable, DomainSelectionTable } from '../../../components/tables/selection';
import { Delete, DragHandle, FormatAlignJustify } from '@mui/icons-material';
import { getRationOptions } from './ProcurementUtil';
import ProcurementFieldTable from './form/ProcurementFieldTable';
import { getYearSelectOptions } from '../../../utils';
import { numberFormatter } from '../../../utils/NunberUtil';
import { ACTIVITY_YEAR_COUNT } from '../../activity/fieldsheader/ActivityHeader';
import DecoratedLabel from '../../../components/DecoratedLabel';

const useStyles = makeStyles(theme => ({
    root: formRoot(theme),
    section: formSection(theme),
    formRowSpaceBetween: formRowSpaceBetween(theme),
    formRow: formRow(theme),
    table: formTable(theme),
    error: tableError(theme),
    spacer: {
        width: theme.spacing(1)
    }

}));

const ProcurementFormBase = (props) => {

    const { handleSubmit, totalCost, initialValues, deletable,
        pristine, submitting, text, user, history, customerAndSupplierOptions, procurementFields,
        items, currency, substances, array, procurementDate, defaultWarehouse, change, fieldRatioType,
        activityDefOptions, plantations, areaUnit,
        id, dispatch,
    } = props;

    const classes = useStyles();

    const [quickAdd, setQuickAdd] = useState(null);
    const [openResources, setOpenResources] = useState(false)
    const [openFields, setOpenFields] = useState(false)
    const [expendFieldTable, setExpendFieldTables] = useState(false)
    const [calcCosts, setCalcCosts] = useState(false)


    useEffect(() => {
        if (calcCosts && procurementFields) {
            const totalAmount = sumBy(procurementFields, 'ratio');

            procurementFields.forEach(function (domain, index, arr) {
                const amount = domain.ratio ? domain.ratio : 1;
                const portion = amount / totalAmount;
                const cost = portion * totalCost;

                change(`procurementFields[${index}].cost`, cost ? cost.toFixed(2) : 0);
            });
            setCalcCosts(false)

        }
    }, [calcCosts])

    const handleFormSubmit = (data) => {
        if (data.selectedSupplierOption) {
            data.supplier = data.selectedSupplierOption.element;
        }
        // if (data.selectedActivityDefOption) {
        //     data.activityDef = data.selectedActivityDefOption.element;
        // }
        return saveProcurement(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });

    };

    const changeResourceTableColumn = (column, value, rowData, rowIndex) => {

        console.log(value, column);

        if (column === 'delete') {
            array.remove(`items`, rowIndex);
            return;
        }
        else if (column === 'duplicate') {
            const r = rowData;
            const duplicate = {
                resource: r.resource,
                resourceType: r.resourceType,
                description: r.description,
                tariff: {
                    effectiveFrom: r.tariff.effectiveFrom,
                    unit: r.tariff.unit,
                },
                warehouse: r.warehouse
            }
            array.insert(`items`, rowIndex + 1, duplicate);
        }
        else {
            if (value) {
                console.log('column', column)
                if (column === 'tariff.price' && rowData.amount) {
                    value = Number(value);
                    change(`items[${rowIndex}].totalCost`, Number(value * rowData.amount));
                } else if (column === 'totalCost' && rowData.amount) {
                    value = Number(value);
                    change(`items[${rowIndex}].tariff.price`, getPrice(value / rowData.amount));
                } else if (column === 'amount' && rowData.tariff && rowData.tariff.price) {
                    change(`items[${rowIndex}].totalCost`, Number(value * rowData.tariff.price));
                } else if (column === 'amount' && rowData.totalCost && rowData.totalCost !== 0) {
                    change(`items[${rowIndex}].tariff.price`, getPrice(rowData.totalCost / value));
                }
            }
            change(`items[${rowIndex}].${column}`, value);
        }
    }
    const handleClickCloseFields = (selectedDomains) => {
        setOpenFields(false)

        if (selectedDomains) {
            let alreadySelected = procurementFields.map(pf => pf.domain.id);
            let newDomains = selectedDomains.filter(domain => !alreadySelected.includes(domain.id));

            newDomains.forEach(function (domain, index, arr) {
                const procurementField = {
                    domain: domain,
                    ratio: fieldRatioType === 'PER_FIELD' ? 1 : domain.plantArea,
                    cost: 0,
                }
                array.unshift("procurementFields", procurementField);
            });
            setCalcCosts(true);
        }
    }
    const handleClickCloseResources = (selectedItems) => {
        setOpenResources(false);


        if (selectedItems) {
            selectedItems.forEach((item) => {
                if (procurementDate) {
                    item.tariff.effectiveFrom = procurementDate;
                }
                if (!item.warehouse) {
                    item.warehouse = defaultWarehouse;
                }
                if (!item.totalCost) {
                    item.totalCost = 0;
                }
                array.unshift("items", item)
            });
        }

    }

    const changeFieldTableColumn = (column, value, tableRow, index) => {

        if (column === 'delete') {
            array.remove(`procurementFields`, index);
            setCalcCosts(true)
            return;
        } else {
            change(`procurementFields[${tableRow.rowId}].${column}`, value);

            if (column === 'ratio') {
                setCalcCosts(true)
            }
        }
    }

    const cancelAction = () => {
        history.push(CROP_MANAGEMENT_PROCUREMENT)
    }

    const deleteAction = () => {

        deleteProcurement(id).then(response => {
            const { data: { status, count, resultMessage } } = response;
            let message = resultMessage;
            if (status === 'OK') {
                if (count === 1) {
                    message = text.recordDeleted;
                } else if (count > 1) {
                    message = `${count} ${text.recordsDeleted}`;
                }
                cancelAction();
            }
            dispatch({
                type: SET_MESSAGE,
                payload: message
            });
        })
    }

    const totalArea = sumBy(procurementFields, 'domain.plantArea');


    const changeRatio = (fieldRatioType) => {


        if (fieldRatioType === 'PER_FIELD') {
            procurementFields.forEach(function (pfp, index, arr) {
                change(`procurementFields[${index}].ratio`, 1);
            });
        } else if (fieldRatioType === 'PER_AREA_UNIT') {
            procurementFields.forEach(function (pfp, index, arr) {
                change(`procurementFields[${index}].ratio`, pfp.domain.plantArea);
            });
        }
        setCalcCosts(true);
    }

    const onQuickAddClose = (type, data) => {
        setQuickAdd(null);
        if (data) {
            change('selectedSupplierOption', getSuggestionsNameElement(data, 'resource'))
        }
    }

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className={classes.section}>
                    <div className={classes.formRowSpaceBetween}>
                        <FormTitle title={text.procurement} />
                        <QuickAdd type={PROCUREMENT} user={user}
                            onClick={(quickAdd) => setQuickAdd(quickAdd)}
                        />
                    </div>
                    <Divider />
                    <div className={classes.formRow}>
                        <DatePicker name='procurementDate'
                            label={text.date}
                            validate={required}
                            text={text}
                        />
                        <Field
                            name="procurementRef"
                            type="number"
                            width={150}
                            label={text.invoice}
                            component={TextField}
                            onFocus={(e) => e.target.select()}
                            validate={required}
                        />
                        <Field name="selectedSupplierOption"
                            width={280}
                            isMulti={false}
                            component={Autocomplete}
                            label={text.supplier}
                            placeholder={text.supplier}
                            options={customerAndSupplierOptions.filter(e => SUPPLIER === e.element.type)}
                            validate={required}
                            requiredText={text.required}
                        />
                        <div className={classes.spacer}></div>
                        <Field
                            name="category"
                            type="number"
                            width={150}
                            label={text.waybill}
                            className={classes.textField}
                            component={TextField}
                            onFocus={(e) => e.target.select()}
                        />
                        <div className={classes.spacer}></div>

                        <Field name='description'
                            component={TextField}
                            width={350}
                            label={text.note}
                            onFocus={(e) => e.target.select()}
                        />
                        <div style={{ flex: 1 }}></div>
                        {plantations && procurementFields &&
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

                {items &&
                    <div className={classes.section}>
                        <div className={classes.formRowSpaceBetween}>
                            <FormTitle title={text.items} />
                            <DecoratedLabel text=
                                {`${text.total}: ${numberFormatter(sumBy(items, 'totalCost'), 2)} ${text[currency]}`}
                            />
                        </div>
                        <Divider />
                        <div className={classes.formRow}>
                            <AddButton onClick={() => setOpenResources(true)} label={text.items} />
                        </div>

                        < ResourceSelectionTable activityType={PROCUREMENT} open={openResources}
                            substances={substances}  {...props}
                            handleClose={(items) => handleClickCloseResources(items)} />
                        <Field
                            validate={requiredArray}
                            name="items"
                            component={({
                                meta: { touched, error, warning }
                            }) =>
                                <div name="items" className={classes.table}>
                                    {touched && error &&
                                        <Typography variant='caption' noWrap
                                            className={classes.error}>
                                            {error}
                                        </Typography>}

                                    <ProcurementResourceTable   {...props}
                                        items={items}
                                        changeResourceTableColumn={changeResourceTableColumn}
                                    />
                                </div>
                            }
                        />
                    </div>
                }
                {procurementFields &&
                    <div className={classes.section}>
                        <div className={classes.formRowSpaceBetween}>
                            <FormTitle title={text.genericProcurement} />
                            {totalCost && procurementFields && totalArea > 0 &&
                                <DecoratedLabel text=
                                    {`${text['per' + areaUnit]}: ${(totalCost / totalArea).toFixed(2)} ${text[currency]}`}
                                />
                            }
                        </div>
                        <Divider />
                        <div className={classes.formRowSpaceBetween}>
                            <AddButton onClick={() => setOpenFields(true)} label={text.fields} />
                            <div>
                                <IconButton onClick={() => setExpendFieldTables(!expendFieldTable)}>
                                    <Badge badgeContent={procurementFields.length} color="primary">
                                        {expendFieldTable ? <DragHandle /> : <FormatAlignJustify />}
                                    </Badge>
                                </IconButton>
                            </div>
                            <Field name="activityDef"
                                width={250}
                                isMulti={false}
                                component={Autocomplete}
                                label={text.activity}
                                placeholder={text.activity}
                                options={activityDefOptions.filter(e => PROCUREMENT === e.element.type)}
                                validate={required}
                                requiredText={text.required}
                            />
                            <Field name='totalCost'
                                component={TextField}
                                type='number'
                                width={150}
                                label={text.totalCost}
                                validate={required}
                                onChange={() => setCalcCosts(true)}
                                onFocus={(e) => e.target.select()}
                            />
                            <Field name="fieldRatioType"
                                select
                                width={100}
                                component={TextField}
                                validate={required}
                                onChange={(preventDefault, newValue, preValue, elementName) => changeRatio(newValue)}
                                label={text.distributionRatio}>
                                {renderNameIdOptions(getRationOptions(text))}
                            </Field>

                            <IconButton onClick={e => change(`procurementFields`, [])}>
                                <Delete />
                            </IconButton>

                        </div>
                        <DomainSelectionTable open={openFields}  {...props}
                            handleClose={(fields) => handleClickCloseFields(fields)} />


                        <Field
                            validate={requiredFieldsArray}
                            name="procurementFields"
                            component={({ meta: { touched, error, warning } }) =>
                                <div className={classes.table} >
                                    {touched && error &&
                                        <Typography variant='caption' noWrap
                                            className={classes.error}>
                                            {error}
                                        </Typography>}
                                    <ProcurementFieldTable  {...props}
                                        text={text}
                                        procurementFields={procurementFields}
                                        changeFieldTableColumn={changeFieldTableColumn}
                                        expendFieldTable={expendFieldTable}
                                        changeFieldActualSize={null}
                                    />
                                </div>
                            }
                        />
                    </div>}

                <FormActions
                    text={text}
                    deletable={deletable}
                    cancelAction={cancelAction}
                    deleteAction={deleteAction}
                    pristine={pristine}
                    submitting={submitting}
                />
            </form>
            {quickAdd != null && <QuickAddDialog type={quickAdd} onClose={onQuickAddClose} {...props} />}
        </div>
    )
}

const selector = formValueSelector('ProcurementForm');

let ProcurementForm = reduxForm({
    form: 'ProcurementForm',
    onSubmitSuccess: (response, dispatch, props) => {
        props.history.push(CROP_MANAGEMENT_PROCUREMENT);
        return dispatch({
            type: CREATED === response.status ? PROCUREMENT_CREATED : PROCUREMENT_UPDATED,
            payload: response.data
        });


    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(errors);
        scrollToFirstError(errors);

    }
})(ProcurementFormBase)

ProcurementForm = connect(

    state => ({
        // initialValues: state.procurement.procurement,
        deletable: selector(state, 'deletable'),
        items: selector(state, 'items'),
        id: selector(state, 'id'),
        procurementFields: selector(state, 'procurementFields'),
        fieldRatioType: selector(state, 'fieldRatioType'),
        totalCost: selector(state, 'totalCost'),
        procurementDate: selector(state, 'procurementDate'),

        //  selectedSupplierOption: selector(state, 'selectedSupplierOption'),

    })
    ,
    {})(ProcurementForm);
export default ProcurementForm;



