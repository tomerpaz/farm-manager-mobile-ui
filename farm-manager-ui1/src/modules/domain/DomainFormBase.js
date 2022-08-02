import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import Fragment from 'react';


import FormControlLabel from '@mui/material/FormControlLabel';

import { Link } from 'react-router-dom'
import { MenuItem, Switch, Button, Typography } from '@mui/material';

import { TopBackBar } from "../../components";
import Autocomplete from "../../components/core/form/wrapper/Autocomplete";


import { Autocomplete as SimpleAutocomplete } from '../../components';


import { FormTitle, DatePicker, getSuggestionsNameId, tableSuggestionsNameIdPrefix, renderNameIdOptions, OutlinedButton } from '../../components/core';

import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { TextField, } from '../../components/core/form/wrapper';
import { PolygonMapDraw } from "../../components/maps";
import { saveDomain } from "../../actions";
import { required } from "../../components/core/form/validation";
import FormActions from '../../components/forms/FormActions'
import DomainSelection from '../activity/DomainSelection';
import { formStyle } from "../../utils/StyleUtils";
import { CREATED, DOMAIN_CREATED, DOMAIN_UPDATED } from "../../actions/types";
import { startCrop } from "../../actions/DomainActions";
import { standAloneForm, height110 } from "../../utils/TabUtils";
import { SPLIT } from "../../components/frame/Routes";
import { getYearOptions } from "../../utils/DateUtil";
import { isEmpty } from "../../utils/StringUtil";
import { getMapCenter } from '../../utils/FieldUtil';
import { getByCropId } from '../resources/varieties/VarietyForm';
import GlobalGapSvg from '../../icons/GlobalGapSvg';

const useStyles = makeStyles(theme => formStyle(theme));

const yearOptions = getYearOptions(50);


const DomainFormBase = (props) => {

    const classes = useStyles();

    const { gisPolygons, varietyId, fields,
        fieldInPolygonOptions,
        handleSubmit, pristine, submitting,
        submitFailed, initialValues, lat, lng, polygon, zoom, varieties,
        text, match: { params: { subTab } }, field, deletable, editable, activityDomains, dir, history, id,
        fieldOptions, varietyOptions, user, plantArea, areaUnit, root, domains,
        selectedVarietyOption, user: { business: { maturity } },
        change, touch,
        deleteDomain, exitRoute, array,
        tags, productCategoryOptions, productCategories, crops,
        fieldinPolygon
    } = props;


    const [reloadMap, setReloadMap] = useState(true)
    const [multi, setMulti] = useState(false)
    const [openFields, setOpenFields] = useState(false)
    const [expendFieldTable, setExpendFieldTable] = useState(false)
    const [initFieldIn, setInitFieldIn] = useState(false)
    const [selectedGisPolygon, setSelectedGisPolygon] = useState(null)

    const [fieldInPlantings, setFieldInPlantings] = useState([])

    useEffect(() => {
        if (reloadMap === true) {
            setReloadMap(false);
        }
    }, [reloadMap])


    useEffect(() => {
        if (fieldinPolygon) {
            const plantings = fieldinPolygon.element.plantings;
            plantings.forEach(e => e.name = `${e.planting_year}/${e.cultivarName}`);
            setFieldInPlantings(plantings);
        }

    }, [fieldinPolygon])

    useEffect(() => {
        if (selectedGisPolygon && selectedGisPolygon.element) {
            const data = selectedGisPolygon.element;
            change('polygon', data.coordinates);
            change('lat', data.lat);
            change('lng', data.lng);
            change('size', data.area);
            setReloadMap(true);

        }
    }, [selectedGisPolygon])

    useEffect(() => {
        if (initialValues && initialValues.fieldinId && fieldInPolygonOptions.length > 0 && initFieldIn === false) {
            const fieldInPolygonTemp = fieldInPolygonOptions.find(e => e.value === initialValues.fieldinId)
            if (fieldInPolygonTemp) {
                // initialValues.fieldinPolygon = fieldInPolygonTemp
                change('fieldinPolygon', fieldInPolygonTemp)
            }
            setInitFieldIn(true);

        }
    }, [fieldInPolygonOptions])

    let center = lat && lng ? [lat, lng] : getMapCenter(user);
    var varietyObject = varieties.find((obj) => obj.id === varietyId);
    let color = varietyObject ? varietyObject.description : null;

    const isPlantation = selectedVarietyOption ? selectedVarietyOption.element.attribute3 === 'true' : false;

    const plantGisPolygons = gisPolygons.filter(e => e.type === 'plant');

    const [cropProductCategoryOptions, setCropProductCategoryOptions] = useState(productCategoryOptions);

    const onPolygonDraw = (polygon, zoom, centerLat, centerLng, area) => {
        change('zoom', zoom);
        change('polygon', polygon);
        change('lat', centerLat);
        change('lng', centerLng);
        change('plantArea', area);
        setReloadMap(true);

    }

    const onDeletePolygon = () => {
        change('polygon', null);
        setReloadMap(true);
    }

    const handleFormSubmit = (data) => {

        if (data.activityDomains && data.activityDomains.length > 0) {
            const request = data;
            request.domains = data.activityDomains;
            return startCrop(request).catch((error) => {
                if (error) {
                    console.log(error);
                    throw new SubmissionError(error)
                }
            });
        } else {

            data.fieldinId = (data.fieldinPolygon && data.fieldinPolygon.value) ? data.fieldinPolygon.value : null;

            return saveDomain(data).catch((error) => {
                if (error) {
                    console.log(error);
                    throw new SubmissionError(error)
                }
            });
        }
    }

    const cancelAction = (e) => {
        history.push(exitRoute);
    }

    const deleteAction = (e) => {
        deleteDomain(initialValues.id);
        history.push(exitRoute);
    }

    const onFieldChange = (e) => {

        if (e && e.element) {
            change('field', e.element);
            change('plantArea', e.element.size);
            change('polygon', e.element.polygon);
            change('lng', e.element.lng);
            change('lat', e.element.lat);
            change('zoom', e.element.zoom);
            touch("selectedFieldOption");
            setReloadMap(true);

        }
    }

    useEffect(() => {
        if (selectedVarietyOption && selectedVarietyOption.element) {
            setCropProductCategoryOptions(getByCropId(productCategories, crops, selectedVarietyOption.element.cropID));
        } else {
            setCropProductCategoryOptions(null);

        }
    }, [selectedVarietyOption, crops, productCategories]);

    const onVarietyChange = (e) => {
        if (e && e.element) {
            change('variety', e.element);
            change('cropProductCategoryId', null);
            touch("selectedVarietyOption");
            setReloadMap(true);
        }
    }

    const onYearChange = (e) => {
        if (e && e.value) {
            change('year', e.value);
        } else {
            change('year', null);
        }
    }

    const changeMulti = (event) => {
        setMulti(event.target.checked)
        change('activityDomains', []);
    }

    const handleExpendFieldTable = () => {

        setExpendFieldTable(!expendFieldTable)
    };

    const handleClickCloseFields = (selectedFields) => {
        setOpenFields(false);

        touch("activityDomains");

        if (selectedFields) {
            selectedFields.forEach(function (field, index, arr) {
                array.unshift("activityDomains", { field, activityArea: field.size, plantArea: field.size });
            });
        }
    };

    const removerActivityDomain = (index) => {
        array.remove(`activityDomains`, index);
    }

    const changeFieldActualSize = (value, row) => {
        value = Number(value);
        change(`activityDomains[${row.rowId}].plantArea`, value);
        change(`activityDomains[${row.rowId}].activityArea`, value);
    }

    return (
        <div className={classes.formFrame}>
            <div>
                <TopBackBar dir={dir} label={`${text.back}`} history={history} />
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)} >
                <div style={{ minHeight: standAloneForm, backgroundColor: 'white' }}>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }} >
                        <div style={{ flex: 2, padding: 10 }}>
                            <div className={classes.formRowSpaceBetween}>
                                <FormTitle title={text.startCrop} />
                                {id && !multi && editable &&
                                    <OutlinedButton to={`${SPLIT}${subTab}/${id}`}>
                                        {text.split}
                                    </OutlinedButton>
                                }
                            </div>
                            {editable && !id &&
                                <FormControlLabel
                                    control={
                                        <Switch
                                            className={classes.textField}

                                            checked={multi}
                                            onChange={changeMulti}
                                            value="checkedA"
                                            color="primary"
                                        />
                                    }
                                    label={text.multipleFieldsSelection}
                                />}
                            {!multi &&
                                <div className={classes.formRowSpaceBetween}>
                                    <Field name="selectedFieldOption"
                                        style={{ flex: 2 }}
                                        isMulti={false}
                                        component={Autocomplete}
                                        label={text.field}
                                        placeholder={text.field}
                                        options={fieldOptions.filter(e => e.value.startsWith("field_"))}
                                        onChange={onFieldChange}
                                        validate={required}
                                        requiredText={text.required}
                                    />
                                    <Field
                                        style={{ flex: 1 }}
                                        name="plantArea"
                                        type="number"
                                        className={classes.textField}
                                        label={text.size}
                                        component={TextField}
                                        validate={required}
                                    />
                                </div>}
                            <div className={classes.formRowSpaceBetween}>
                                <Field name="selectedVarietyOption"
                                    style={{ flex: 2 }}
                                    isMulti={false}
                                    component={Autocomplete}
                                    label={`${text.crop}/${text.variety}`}
                                    placeholder={`${text.crop}/${text.variety}`}
                                    options={varietyOptions}
                                    onChange={(e) => onVarietyChange(e)}
                                    validate={required}
                                    requiredText={text.required}
                                />
                                <Field name="alias"
                                    style={{ flex: 1 }}
                                    component={TextField}
                                    className={classes.textField}
                                    label={text.alias}
                                />
                            </div>
                            {cropProductCategoryOptions &&
                                <div className={classes.formRowSpaceBetween}>
                                    <Field
                                        style={{ flex: 1 }}
                                        name="cropProductCategoryId"
                                        select
                                        component={TextField}
                                        className={classes.textField}
                                        validate={required}
                                        label={'GG Product Category'}>
                                        {renderNameIdOptions(cropProductCategoryOptions)}
                                    </Field>
                                    {!multi && initialValues.ggId &&
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <GlobalGapSvg width={40} height={40} />
                                        </div>
                                    }
                                    {!multi && initialValues.ggId &&
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            < Typography color={'primary'} style={{ fontWeight: 'bold', paddingLeft: 20, paddingRight: 20 }}>{initialValues.ggId}</Typography>
                                        </div>
                                    }
                                </div>
                            }
                            <div className={classes.formRowSpaceBetween}>
                                <DatePicker name='plant'
                                    label={text.start}
                                    style={{ flex: 1 }}
                                    validate={required}
                                    {...props}
                                />

                                <DatePicker name='root'
                                    style={{ flex: 1 }}
                                    label={text.end}
                                    clearable={true}
                                    {...props}
                                />

                                {!isPlantation && <Field
                                    name="yearOption"
                                    type="number"
                                    style={{ flex: 1 }}
                                    isMulti={false}
                                    label={text.season}
                                    onChange={onYearChange}
                                    placeholder={text.season}
                                    component={Autocomplete}
                                    options={yearOptions}
                                    validate={required}
                                />}
                                {isPlantation && maturity &&
                                    <DatePicker name='maturity'
                                        style={{ flex: 1 }}
                                        label={text.maturity}
                                        clearable={true}
                                        {...props}
                                    />
                                }

                            </div>
                            {isPlantation && <div className={classes.formRowSpaceBetween}>



                            </div>}
                            <div className={classes.formRowSpaceBetween}>

                                <Field
                                    name="density"
                                    type="number"
                                    style={{ flex: 1 }}

                                    className={classes.textField}
                                    label={text.density}
                                    component={TextField}
                                    validate={required}
                                />
                                {isPlantation &&

                                    <Field
                                        name="plantSpacing"
                                        type="number"
                                        style={{ flex: 1 }}
                                        className={classes.textField}
                                        label={text.plantSpacing}
                                        component={TextField}
                                    />}
                                {isPlantation &&
                                    <Field
                                        name="rowSpacing"
                                        type="number"
                                        style={{ flex: 1 }}
                                        className={classes.textField}
                                        label={text.rowSpacing}
                                        component={TextField}
                                    />}

                            </div>
                            {fieldInPolygonOptions.length > 0 &&
                                <div className={classes.formRowSpaceBetween}>
                                    <div style={{ display: 'flex', flex: 1 }}>
                                        <Field name="fieldinPolygon"
                                            fullWidth={true}
                                            isMulti={false}
                                            component={Autocomplete}
                                            className={classes.textField}
                                            style={{ flex: 1 }}
                                            label={"Field-In"}
                                            placeholder={"Field-In"}
                                            options={fieldInPolygonOptions}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flex: 1 }}>
                                        <Field
                                            style={{ flex: 1 }}
                                            name="fieldinPlantingId"
                                            select
                                            component={TextField}
                                            className={classes.textField}
                                            label={"Field-In Planting"}>
                                            {renderNameIdOptions(fieldInPlantings, true, '')}
                                        </Field>
                                    </div>
                                </div>
                            }
                            {!multi && plantGisPolygons.length > 0 &&
                                <div className={classes.formRowSpaceBetween}>
                                    <SimpleAutocomplete
                                        isMulti={false}
                                        select
                                        label={text.copyGisPolygon}
                                        style={{ flex: 1 }}
                                        value={selectedGisPolygon}
                                        onChange={(e) => setSelectedGisPolygon(e)}
                                        options={getSuggestionsNameId(plantGisPolygons.filter(e => !isEmpty(e.coordinates)))}
                                    />

                                    <Field name="zoom"
                                        style={{ width: 100 }}
                                        select
                                        component={TextField}
                                        className={classes.textField}
                                        onChange={e => setReloadMap(true)}
                                        label={'Zoom'}>
                                        <MenuItem key='14' value="14">14</MenuItem>
                                        <MenuItem key='15' value="15">15</MenuItem>
                                        <MenuItem key='16' value="16">16</MenuItem>
                                        <MenuItem key='17' value="17">17</MenuItem>
                                        <MenuItem key='18' value="18">18</MenuItem>
                                    </Field>
                                </div>
                            }
                            {!isEmpty(user.business.tag1 || !isEmpty(user.business.tag2)) && <div className={classes.formRowSpaceBetween}>

                                {!isEmpty(user.business.tag1) && <Field name="tag1"
                                    fullWidth={true}
                                    isMulti={false}
                                    component={Autocomplete}
                                    label={user.business.tag1}
                                    placeholder={user.business.tag1}
                                    options={getSuggestionsNameId(tags.filter(e => e.active === true && e.type === 1))}
                                />}
                                {!isEmpty(user.business.tag2) && <Field name="tag2"
                                    fullWidth={true}
                                    isMulti={false}
                                    component={Autocomplete}
                                    label={user.business.tag2}
                                    placeholder={user.business.tag2}
                                    options={getSuggestionsNameId(tags.filter(e => e.active === true && e.type === 2, 'tag'))}
                                />}
                            </div>}
                            <div className={classes.formRowSpaceBetween}>
                                <Field name="description"
                                    style={{ flex: 1 }}
                                    component={TextField}
                                    multiline
                                    rows="2"
                                    className={classes.textField}
                                    label={text.note} />
                            </div>
                            <FormActions
                                text={text}
                                deletable={deletable}
                                cancelAction={cancelAction}
                                deleteAction={deleteAction}
                                pristine={pristine}
                                submitting={submitting}
                                editable={editable}
                            />

                        </div>
                        <div style={{ display: 'flex', flex: 3, flexDirection: 'column', }}>

                            {!multi &&
                                <div style={{ display: 'flex', flex: 1, }}>
                                    {!reloadMap &&
                                        <PolygonMapDraw onPolygonDraw={onPolygonDraw} polygon={polygon}
                                            height={height110}
                                            polygons={domains.filter(f => !isEmpty(f.polygon) && f.id !== id).map(f => f.polygon)}
                                            center={center} color={color} zoom={zoom} {...props}
                                            deletePolygon={onDeletePolygon}
                                        />}

                                </div>}
                            {multi &&
                                <div style={{ flex: 1, padding: 20 }}>
                                    <DomainSelection
                                        activityType='START_CROP'
                                        handleClickOpenFields={() => setOpenFields(!openFields)}
                                        handleExpendFieldTable={handleExpendFieldTable}
                                        text={text}
                                        renderDomainSelections={true}
                                        handleClickCloseFields={handleClickCloseFields}
                                        activityDomains={activityDomains} expendFieldTable={expendFieldTable}
                                        openFields={openFields}
                                        cropID={null}
                                        changeFieldActualSize={changeFieldActualSize}
                                        removerActivityDomain={removerActivityDomain}
                                        activityArea={null}
                                        baseFields={true}
                                        {...props}
                                    />
                                </div>
                            }

                        </div>
                    </div>
                </div>

            </form>
        </div >

    )


}



const selector = formValueSelector('DomainForm');

let DomainForm = reduxForm({
    form: 'DomainForm',
    onSubmitSuccess: (response, dispatch, props) => {
        props.history.push(props.exitRoute);
        return dispatch({
            type: CREATED === response.status ? DOMAIN_CREATED : DOMAIN_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(errors);

    }
})(DomainFormBase)


DomainForm = connect(
    state => ({
        //  initialValues: state.domain.selectedDomain,
        id: selector(state, 'id'),
        lng: selector(state, 'lng'),
        lat: selector(state, 'lat'),
        polygon: selector(state, 'polygon'),
        zoom: selector(state, 'zoom'),
        field: selector(state, 'field'),
        varietyId: selector(state, 'variety.id'),
        plantArea: selector(state, 'plantArea'),
        deletable: selector(state, 'deletable'),
        editable: selector(state, 'editable'),
        activityDomains: selector(state, 'activityDomains'),
        selectedVarietyOption: selector(state, 'selectedVarietyOption'),
        id: selector(state, 'id'),
        year: selector(state, 'year'),
        root: selector(state, 'root'),
        fieldinPolygon: selector(state, 'fieldinPolygon'),
    })
)(DomainForm);
export default DomainForm;
