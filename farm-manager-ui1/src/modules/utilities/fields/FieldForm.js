import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import { FormTitle } from "../../../components/core";
import FormActions from '../../../components/forms/FormActions'
import { Autocomplete } from '../../../components';

import { PolygonMapDraw } from "../../../components/maps";
import { CREATED, FIELD_CREATED, FIELD_UPDATED } from "../../../actions/types";
import { saveField } from "../../../actions/FieldActions";
import { required } from "../../../components/forms/ValidationUtil";

import { renderNameIdOptions, getSuggestionsNameId } from "../../../components/core/optionsUtil";
import { loadDataByName } from "../../../utils/LoadUtil";
import { isEmpty } from "../../../utils/StringUtil";
import { formStyle } from '../../../utils/StyleUtils';
import { getMapCenter } from '../../../utils/FieldUtil';
import { height400, height410 } from '../../../utils';
import { isArrayEmpty } from '../../../components/filters/filterUtil';

const useStyles = makeStyles(theme => formStyle(theme));

const FieldFormBase = (props) => {

    const classes = useStyles();
    const {
        handleSubmit, pristine, submitting, site, lat, lng, polygon, zoom, deletable, text,
        isAdmin,
        fields, id,
        waterSources, users,
        gisPolygons,
        clearField, deleteField,
        change,
        user, sites,
    } = props;

    const [reloadMap, setReloadMap] = useState(true)

    const [selectedGisPolygon, setSelectedGisPolygon] = useState(null)

    useEffect(() => {
        loadDataByName(props, ['fields']);
        props.getGisPolygons();
    }, [])

    useEffect(() => {
        if (reloadMap) {
            setReloadMap(false);
        }
    }, [reloadMap])

    useEffect(() => {
        if (site && !polygon) {
            const selectedSite = sites.filter(e => e.id === site.id);
            console.log('selectedSite', selectedSite);
            console.log('selectedSite.length', selectedSite.length);
            if (selectedSite && selectedSite.length > 0) {
                const siteLat = selectedSite[0].lat;
                const sitelng = selectedSite[0].lng;
                if (siteLat && sitelng) {
                    console.log('siteLat', siteLat);
                    console.log('sitelng', sitelng);
                    change('lat', siteLat);
                    change('lng', sitelng);
                    setReloadMap(true);
                }
            }
        }

    }, [site])

    const baseGisPolygons = gisPolygons.filter(e => e.type === 'base');

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



    const handleFormSubmit = (data) => {
        if (data && data.parentField && !data.parentField.id) {
            data.parentField = null;
        }
        if (data && data.site && !data.site.id) {
            data.site = null;
        }
        return saveField(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }


    const cancelAction = () => {
        clearField();
    }
    const deleteAction = () => {
        clearField();
        deleteField(id);
    }

    const onPolygonDraw = (polygon, zoom, centerLat, centerLng, area) => {
        change('zoom', zoom);
        change('polygon', polygon);
        change('lat', centerLat);
        change('lng', centerLng);
        change('size', area);
        setReloadMap(true);
    }

    const onDeletePolygon = () => {
        change('polygon', null);
        setReloadMap(true);
    }

    let center = lat && lng ? [lat, lng] : getMapCenter(user);
    
    console.log(
    'users', users
    )
    const fieldManagers = isArrayEmpty(users) ? [{username: user.username}]: [{username: user.username}].concat(users)
    console.log(
        'fieldManagers', fieldManagers
        )
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>

                <FormTitle title={text.field} />

                <div className={classes.formRowSpaceBetween}>
                    <Field name="name"
                        style={{ flex: 1 }}
                        className={classes.textField}
                        component={TextField}
                        validate={required}
                        label={text.fieldName}
                        placeholder={text.fieldName} />
                    <Field
                        style={{ flex: 1 }}
                        name="size"
                        type="number"
                        className={classes.textField}
                        label={text.size}
                        placeholder={text.size}
                        component={TextField}
                        validate={required}
                    />
                    <Field name="engName"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        label={text.engName}
                        placeholder={text.engName}
                    />
                    <Field name="waterSource.id"
                        style={{ flex: 1 }}
                        select
                        component={TextField}


                        className={classes.textField}
                        validate={required}
                        label={text.waterSource}>
                        {renderNameIdOptions(waterSources)}
                    </Field>
                </div>

                <div className={classes.formRowSpaceBetween}>
                    <Field name="parentField.id"
                        style={{ flex: 1 }}
                        select
                        component={TextField}
                        className={classes.textField}
                        label={text.parentField}>
                        {renderNameIdOptions(props.parentFields, true)}
                    </Field>
                    <Field name="site.id"
                        style={{ flex: 1 }}
                        select
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.site}>
                        {renderNameIdOptions(props.sites.filter(e => e.active === true), true)}
                    </Field>
                    <Field name="code"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        placeholder={text.code}
                        label={text.code} />
                    <Field name="officialFieldId"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        placeholder={text.officialFieldId}
                        label={text.officialFieldId} />

                    {fieldManagers.length > 1 && <Field name="username"
                        style={{ flex: 1 }}
                        select
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.manager}>
                        {fieldManagers.map(element => (
                            <MenuItem key={element.username}
                                value={element.username}>{element.username}</MenuItem>//.replace(/_/g,'')
                        ))}
                    </Field>}

                </div>
                <div className={classes.formRowSpaceBetween}>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <Field name="soilType"
                            style={{ flex: 1 }}
                            select
                            component={TextField}
                            className={classes.textField}
                            label={text.soilType}>
                            <MenuItem value="soil">{text.soil}</MenuItem>
                            <MenuItem value="soilless">{text.soilless}</MenuItem>
                        </Field>
                        <Field name="type"
                            style={{ flex: 1 }}
                            select
                            component={TextField}
                            className={classes.textField}
                            label={text.type}>
                            <MenuItem value="openField">{text.openField}</MenuItem>
                            <MenuItem value="covered">{text.covered}</MenuItem>
                        </Field>
                    </div>
                    <div style={{ display: 'flex', flex: 1 }}>

                        {baseGisPolygons.length > 0 &&
                            <div style={{ display: 'flex', flex: 1 }}>

                                <Autocomplete
                                    isMulti={false}
                                    select
                                    label={text.copyGisPolygon}
                                    width={'100%'}
                                    value={selectedGisPolygon}
                                    onChange={(e) => setSelectedGisPolygon(e)}
                                    options={getSuggestionsNameId(baseGisPolygons.filter(e => !isEmpty(e.coordinates)))}
                                />
                            </div>
                        }
                        <div style={{ display: 'flex', flex: 1 }}>
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
                            <FormControlLabel
                                control={<Field className={classes.textField} style={{ fontWeight: 600 }} color="primary" name="active" component={Checkbox} />}
                                label={text.active} />
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

            </div>
            <div style={{ display: 'flex', flex: 1 }}>
                {!reloadMap &&
                    <PolygonMapDraw height={height410} minHeight={400} onPolygonDraw={onPolygonDraw} polygon={polygon}
                        polygons={fields.filter(f => !isEmpty(f.polygon) && f.id !== id).map(f => f.polygon)}
                        center={center} color={null} zoom={zoom} {...props}
                        deletePolygon={onDeletePolygon} />}
            </div>
        </form >

    )
}

const selector = formValueSelector('FieldForm');

let FieldForm = reduxForm({
    form: 'FieldForm',
    onSubmitSuccess: (response, dispatch, props) => {
        return dispatch({
            type: CREATED === response.status ? FIELD_CREATED : FIELD_UPDATED,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(FieldFormBase)


FieldForm = connect(
    state => ({

        lng: selector(state, 'lng'),
        lat: selector(state, 'lat'),
        polygon: selector(state, 'polygon'),
        zoom: selector(state, 'zoom'),
        size: selector(state, 'size'),
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
        site: selector(state, 'site'),

    })
    ,
    {})(FieldForm);
export default FieldForm;
