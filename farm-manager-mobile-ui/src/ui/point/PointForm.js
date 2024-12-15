import { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { AppBar, Autocomplete, Box, Checkbox, DialogActions, DialogContent, FormControlLabel, IconButton, InputAdornment, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentYear, selectLang, selectMapCenter, selectMapZoom, selectShowFieldAlias, selectShowFieldName, setMapCenter, setMapZoom, setSnackbar } from '../../features/app/appSlice';
import TextFieldBase from '../../components/ui/TextField';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { useCreateFieldPointMutation, useDeleteFieldPointMutation, useGetPointsQuery, useUpdateFieldPointMutation } from '../../features/points/pointsApiSlice';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Cancel, Close, Delete, PestControl, Save } from '@mui/icons-material';
import { displayFieldName, FormSpacer, getExpieryText, getFillColor, getOpacity, getPointTypes, isArrayEmpty, isMobile, mapDisplayFieldName, MapToolTip, MAX_PER_MAP, stopMapEventPropagation, trap, UI_SIZE } from '../FarmUtil';
import { useGetPestsQuery } from '../../features/pests/pestsApiSlice';
import { DatePicker } from '@mui/x-date-pickers';
import { useFields } from '../../features/fields/fieldsApiSlice';
import { CircleMarker, MapContainer, Polygon, Tooltip, useMapEvents } from 'react-leaflet';
import SatelliteMapProvider from '../../components/map/SatelliteMapProvider';
import GeoLocation from '../../components/GeoLocation';
import PointIcon from '../layers/PointIcon';
import Loading from '../../components/Loading';

const PointForm = ({ defaultValues, open, handleClose, deletable,/*, types*/ }) => {

  const text = useSelector(selectLang)

  const { data: user } = useGetUserDataQuery()

  const { data: pests, isLoading: isPestsLoading } = useGetPestsQuery();

  const [createFieldPoint] = useCreateFieldPointMutation();
  const [updateFieldPoint] = useUpdateFieldPointMutation()
  const [deleteFieldPoint] = useDeleteFieldPointMutation()

  const dispatch = useDispatch()

  const year = useSelector(selectCurrentYear);
  const fields = useFields(year).filter(f => f.geoPoints);

  const { data: points, isLoading: isLoadingPoints, isFetching: isFetchingPoints } = useGetPointsQuery({ types: [defaultValues.type] });

  const displayFields = fields.filter(e => e.baseFieldActive);

  const { control, register, handleSubmit, getValues, watch, formState: { errors },
    formState: { isDirty, dirtyFields }, reset, setValue, trigger
  } = useForm({ defaultValues });

  //const type = useWatch({ control, name: "type" })
  // const [type, setType] = useState(defaultValues.type);

  const lng = useWatch({ control, name: "lng" })
  const lat = useWatch({ control, name: "lat" })

  //  console.log(type);
  const saveFieldPoint = (data) => {
    if (data.id === null) {
      return createFieldPoint(data).unwrap();
    } else {
      return updateFieldPoint(data).unwrap();
    }
  }

  const mapCliecked = (e, f, type) => {

    //                name: `${text[editLayer]} - ${displayFieldName(f)}: ${points.length + 1} `,


    // console.log('mapCliecked', type)


    // console.log(e);
    setValue('lng', e.latlng.lng.toFixed(5));
    setValue('lat', e.latlng.lat.toFixed(5));
    if (f) {
      setValue('fieldId', f.id);
      if (defaultValues.id === null) {
        setValue('name', `${displayFieldName(displayFields.find(e => e.id === f.id))} ${text[defaultValues.type]} - ${points.length}`)
      }
    }


    stopMapEventPropagation(e);

  }

  const onSubmit = async (data) => {
    try {
      const result = await saveFieldPoint(data);

      dispatch(setSnackbar({ msg: data.id ? text.recordUpdated : text.recordCreated, severity: 'success' }))
      handleClose('save', result);
    } catch (err) {
      console.log(err);
    }
  }

  const onAction = (action) => {
    if (action === 'delete') {
      deleteFieldPoint({ id: defaultValues.id })
    }
    handleClose('delete');
    //  setOpen(false)
  }

  const heightOffset =  defaultValues.type === trap ? 515 : 300; 
  const desktopOffset =  isMobile() ? 0 : 50;
  const height = window.innerHeight - (heightOffset+desktopOffset);

  const systemCenter = useSelector(selectMapCenter);
  const [zoom, setZoom] = useState(useSelector(selectMapZoom));
  const [center, setCenter] = useState(defaultValues.id ? [defaultValues.lat, defaultValues.lng] : systemCenter);

  const showFieldAlias = useSelector(selectShowFieldAlias);
  const showFieldName = useSelector(selectShowFieldName);
  const showMapToolTip = showFieldAlias || showFieldName;


  const [map, setMap] = useState(0);


  function HandleMapEvents() {
    const m = useMapEvents({
      zoomend: () => {
        setZoom(m.getZoom());
      },
      dragend: (e) => {
        setCenter([e.target.getCenter().lat, e.target.getCenter().lng]);

      },
      click: (e) => {


        // console.log('lng', e.latlng.lng.toFixed(5));
        // console.log('lat', e.latlng.lat.toFixed(5));

        mapCliecked(e, null, 'map');
      }
    })
    return <div></div>
  }


  // if (defaultValues.type === trap && isPestsLoading) {
  //   return <></>
  // }



  const pointsLoaded = isFetchingPoints && isLoadingPoints;
  const pestLoaded = !isPestsLoading
  const getDisplayPoints = () => {
    return (!isFetchingPoints && !isLoadingPoints) ?  points.filter(e => e.active && e.id !== defaultValues.id) : []  }
  return (

    <Dialog fullScreen={isMobile()} fullWidth={!isMobile()}
      open={open}>
      <AppBar sx={{ position: 'relative' }} elevation={0}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {`${text[defaultValues.type]}`}
          </Typography>
          <IconButton
            edge="start"
            onClick={() => handleClose(null)}
            color="inherit"
            aria-label="done"
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(onSubmit)} >

        <DialogContent>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Controller
              control={control}
              name="name"
              render={({ field: { ref, ...field } }) => (
                <TextFieldBase
                  id="point-name"
                  size={UI_SIZE}
                  label={text.name} fullWidth {...field} />
              )}
            />
          </Box>
          {/* <Box margin={2} />
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <TextField
                  id="field-point-type"
                  select
                  {...field}
                  size={UI_SIZE}
                  label={text.type}
                  fullWidth
                >
                  {types.map((option) => (
                    <MenuItem key={option} value={option}>
                      {text[option]}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box> */}
          {defaultValues.type === trap &&
            <Fragment>

              <FormSpacer />

              <Controller
                name="fieldId"
                control={control}
                rules={{ required: true }}
                render={({ field: { ref, onChange, ...field } }) => <Autocomplete
                  // disablePortal
                  blurOnSelect={true}
                  onChange={(_, data) => onChange(data)}
                  options={displayFields.map(e => e.id)}

                  // fullWidth
                  size={UI_SIZE}
                  sx={{ flex: 2 }}
                  getOptionLabel={(option) => option ? displayFieldName(displayFields.find(e => e.id === option)) : ''}
                  isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value)?.toString()}
                  renderInput={(params) => <TextFieldBase error={errors.fieldId ? true : false} sx={{ marginTop: 0.5 }} {...params} label={text.field} />}
                  {...field} />}
              />
              <FormSpacer />

              <Controller
                name="pest"
                control={control}
                rules={{ required: true }}
                render={({ field: { ref, onChange, ...field } }) => <Autocomplete
                  // disablePortal
                  blurOnSelect={true}
                  onChange={(_, data) => onChange(data)}
                  options={isPestsLoading ? [] :  pests.filter(e => e.active)}

                  // fullWidth
                  size={UI_SIZE}
                  sx={{ flex: 2 }}
                  getOptionLabel={(option) => option ? option.name : ''}
                  isOptionEqualToValue={(option, value) => (value === undefined) || option?.id?.toString() === (value?.id ?? value)?.toString()}
                  renderInput={(params) => <TextFieldBase error={errors.pest ? true : false} sx={{ marginTop: 0.5 }} {...params} label={text.pest} />}
                  {...field} />}
              />
              <FormSpacer />
              <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>

                <Controller
                  name="expiry"
                  control={control}
                  render={({ field }) =>
                    <DatePicker label={getExpieryText(text, defaultValues.type)}
                      closeOnSelect
                      showToolbar={false}
                      localeText={{
                        cancelButtonLabel: text.cancel,
                        clearButtonLabel: text.clear,
                        okButtonLabel: text.save
                      }}
                      slotProps={{
                        textField: { size: UI_SIZE, variant: 'outlined', sx: { marginTop: 0.5, flex: 1 } },
                        actionBar: { actions: ["cancel", "clear"] }
                      }}
                      {...field} />}
                />
              </Box>  
            </Fragment>
          }

          {defaultValues.id !== null && <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Controller
              control={control}
              name="active"
              render={({ field: { ref, value, onChange, ...field } }) => (
                <FormControlLabel control={
                  <Checkbox checked={value} onChange={onChange} />
                } label={text.active} />

              )}
            />
          </Box>}




          <Box marginTop={2} flex={1} style={{ height: '100%' }} id="map" dir='ltr' >
            <MapContainer style={{ height: height, width: '100%' }} center={center} zoom={zoom} scrollWheelZoom={false}
              ref={setMap}
            >

              <SatelliteMapProvider />
              <GeoLocation />
              {displayFields.map((f, index) =>
                <Polygon field={f} key={f.id}
                  color={f.color}
                  fillColor={getFillColor(f)}
                  fillOpacity={getOpacity(f)}
                  eventHandlers={{
                    click: (e) => {
                      mapCliecked(e, f, 'polygon');
                    }
                  }}
                  positions={f.geoPoints}>
                  {showMapToolTip && index < MAX_PER_MAP && <Tooltip
                    className={'empty-tooltip'}
                    direction="center" opacity={1} permanent>
                    <MapToolTip textArr={[mapDisplayFieldName(f, showFieldName, showFieldAlias)]} />
                  </Tooltip>}
                </Polygon>
              )}

              {getDisplayPoints().map((e, index, arr) =>

                <CircleMarker

                  // eventHandlers={{
                  //   click: (event) => {

                  //     mapCliecked(event, e, 'point', index);
                  //   }
                  // }}
                  key={index} radius={12}
                  color={e.active ? 'white' : 'gray'}
                  weight={4}
                  fillColor={e.active ? 'white' : 'gray'}
                  fillOpacity={1}
                  center={[e.lat, e.lng]}
                >
                  <Tooltip
                    className={'empty-tooltip'}
                    direction="center" opacity={0.3} permanent>
                    <PointIcon point={e} />
                  </Tooltip>
                </CircleMarker>
              )}

              {lat && lng &&

                < CircleMarker

                  // eventHandlers={{
                  //   click: (event) => {

                  //     mapCliecked(event, e, 'point', index);
                  //   }
                  // }}
                  radius={12}
                  color={'white'}
                  weight={4}
                  fillColor={'white'}
                  fillOpacity={1}
                  center={[lat, lng]}
                >
                  <Tooltip
                    className={'empty-tooltip'}
                    direction="center" opacity={1} permanent>
                    <PointIcon point={defaultValues} color={'orange'} />
                  </Tooltip>
                </CircleMarker>
              }
              <HandleMapEvents />
            </MapContainer>
            <Box height={10} display={'flex'} justifyContent={'space-around'}>
              {lat && <Typography >{`${lat}/${lng}`}</Typography>}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          {defaultValues.id && deletable && <Button size='large' endIcon={<Delete />} variant='outlined' onClick={() => onAction('delete')}>{text.delete}</Button>}

          <Button size='large' endIcon={<Save />} disabled={!isDirty} disableElevation={true} variant='contained' type="submit" >
            {text.save}
          </Button>
          {/* {!defaultValues.id &&
            <Button size='large' endIcon={<PestControl />} variant='contained' type="submit" onClick={() => console.log('save +')}>{`${text.save} +`}</Button>
          } */}
        </DialogActions>
      </form >

    </Dialog >
  );

}
export default PointForm;
