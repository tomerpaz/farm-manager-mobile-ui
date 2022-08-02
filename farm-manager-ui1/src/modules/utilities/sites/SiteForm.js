import {  useState, useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import {
    FeatureGroup, MapContainer, Circle, useMapEvents
} from 'react-leaflet';


import FormControlLabel from '@mui/material/FormControlLabel';
import { withRouter } from 'react-router-dom'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import { Checkbox, TextField } from '../../../components/core/form/wrapper';
import { saveSite } from "../../../actions/SiteActions";
import FormActions from '../../../components/forms/FormActions'
import { FormTitle } from "../../../components/core";
import { CREATED, SITE_CREATE, SITE_UPDATE } from "../../../actions/types";
import { required } from "../../../components/forms/ValidationUtil";
import { formStyle } from "../../../utils/StyleUtils";
import GeoSearch from '../../../components/maps/controls/GeoSearch';
import GeoLocation from '../../../components/maps/controls/GeoLocation';
import { getMapCenter } from '../../../utils/FieldUtil';
import { Typography } from '@mui/material';

import { height500 } from '../../../utils';
import { isEmpty } from '../../../utils/StringUtil';
import GlobalGapSvg from '../../../icons/GlobalGapSvg';
import SatelliteMapProvider from '../../../components/maps/SatelliteMapProvider';

const useStyles = makeStyles(theme => formStyle(theme));




const SiteFormBase = (props) => {

    const classes = useStyles();
    const {
        handleSubmit, pristine, submitting, text, id, deletable, clearSite, deleteSite, user, change,
        isAdmin, lat, lng, zoom, ggGeoName, ggGeoCountry, initialValues, user: { mapProvider }, googleMapKey, bingMapKey
    } = props;


    const height = height500;

    const [center, setCenter] = useState(initialValues.lat && initialValues.lng ? [initialValues.lat, initialValues.lng] : getMapCenter(user))

    const [renderMap, setRenderMap] = useState(false);

    useEffect(() => {
        setRenderMap(true);
    
    
    }, []);

    function HandleMapEvents(e) {
        const m = useMapEvents({
            // zoomend: () => {
            //     setZoom(m.getZoom())
            // },
            dragend: (e) => {
                setCenter(e.target.getCenter())
            },
            click: (e) => {
                change('lng', e.latlng.lng.toFixed(5));
                change('lat', e.latlng.lat.toFixed(5));
            }
        })
        return <div></div>
    }

    const handleFormSubmit = (data) => {
        return saveSite(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }

    const cancelAction = () => {
        clearSite();
    }

    const deleteAction = () => {
        cancelAction();
        deleteSite(id);
    }

    return (

        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.root}>
                <FormTitle title={text.site} />
                <div className={classes.formRowSpaceBetween}>
                    <Field name="name"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        validate={required}
                        label={text.name}
                        placeholder={text.name} />
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field
                        name="size"
                        type="number"
                        style={{ flex: 1 }}
                        validate={!isEmpty(user.business.ggBearer) ? required : null}
                        className={classes.textField}
                        label={text.size}
                        component={TextField}
                    />
                    <Field name="code"
                        style={{ flex: 1 }}
                        component={TextField}
                        className={classes.textField}
                        label={text.code} />
                </div>
                <div className={classes.formRowSpaceBetween}>
                    <Field name="description"
                        style={{ flex: 1 }}
                        component={TextField}
                        multiline
                        rows="2"
                        className={classes.textField}
                        label={text.note} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {ggGeoName && <GlobalGapSvg {...props} />}
                    {initialValues.ggId && <Typography color={'primary'} style={{ fontWeight: 'bold', paddingLeft: 20, paddingRight: 20 }}>{initialValues.ggId}</Typography>}
                    {ggGeoName && <Typography color={'primary'} style={{ fontWeight: 'bold', paddingLeft: 20, paddingRight: 20 }}>{`${ggGeoName}, ${ggGeoCountry}`}</Typography>}
                    <Typography style={{ paddingLeft: 20, paddingRight: 20 }}>{lng}</Typography>
                    <Typography style={{ paddingLeft: 20, paddingRight: 20 }}>{lat}</Typography>
                    <FormControlLabel
                        control={<Field className={classes.textField} color="primary" name="active" component={Checkbox} />}
                        label={text.active} />
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

            <div dir='ltr' style={{ style: 'flex', flex: 1, paddingTop: 8 }}>
            {renderMap &&   <MapContainer 
                    style={{ height: height, width: '100%' }}
                    dragging={true} center={center}
                    zoom={zoom ? zoom : 16}
                    zoomControl={true} 
                >
                    <SatelliteMapProvider mapPovider={mapProvider} googleMapKey={googleMapKey} bingMapKey={bingMapKey} />
                    <FeatureGroup>
                        <GeoSearch position="topleft"
                            searchLabel={text.typeToSearch} />
                        <GeoLocation position="topleft" />

                    </FeatureGroup>
                    {lat && lng &&
                        <Circle
                            center={[lat, lng]}
                            pathOptions={{ color: 'red', fillColor: 'red' }}
                            radius={30}
                            stroke={true}
                        />
                    }
                    <HandleMapEvents />
                </MapContainer>}
            </div>
        </form>
    )
}


const selector = formValueSelector('SiteForm');

let SiteForm = reduxForm({
    form: 'SiteForm',
    onSubmitSuccess: (response, dispatch, props) => {
        props.history.push(props.exitRoute);
        return dispatch({
            type: CREATED === response.status ? SITE_CREATE : SITE_UPDATE,
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log(props);
    }
})(SiteFormBase)

export default withRouter(connect(
    state => ({
        lng: selector(state, 'lng'),
        lat: selector(state, 'lat'),
        deletable: selector(state, 'deletable'),
        id: selector(state, 'id'),
        ggGeoName: selector(state, 'ggGeoName'),
        ggGeoCountry: selector(state, 'ggGeoCountry'),
    })
)(SiteForm));
