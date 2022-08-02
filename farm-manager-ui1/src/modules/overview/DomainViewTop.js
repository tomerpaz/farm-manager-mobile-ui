import React from 'react';
import { TextField, DatePicker, AddButton } from '../../components'
import { Autocomplete } from '../../components'
import YearPicker from '../../components/core/picker/YearPicker'
import { renderNdviPaletteIds, renderNdviDates, renderInfectionLevel, getPestOptions, renderTimeRange, getActivityOptions } from './map/FieldsMapUtil'
import { Box, MenuItem } from '@mui/material';
import { newDate } from '../../utils';


const DomainViewTop = (props) => {

    const {
        options, filter, setFilter, label, actionUrl, endCropUrl,
        dir, yearFilter, setYearFilter, text,
        setFieldFilterFreeText, fieldFreeText, endSpace,
        domainStatusFilter, setDomainStatusFilter,
        showNdvi, imageryDate, imageryDates, changeImageryDate,
        changeNdviPalette, paletteid, showPests, pestsGeoJson,
        mapRefDate, mapInfectionLevel, mapTimeRange,
        setMapRefDate, setMapInfectionLevel, setMapTimeRange, setMapPests, mapPests,
        polygonsHistory, showWaypoints, mapActivities, setMapActivities, waypointsGeoJson,
        isInspector, growerOptions, imageryType,setImageryType

    } = props;
    const waypoints = !showPests && showWaypoints;

    const ndvi = !showPests && !waypoints && showNdvi && imageryDates.length > 0;


    const showStartEnd = !ndvi && !waypoints && !showPests;

    const showTimeRange = waypoints || showPests;
    return (
        <Box flex={1} display={'flex'} alignItems={'center'} sx={{minHeight: 60}}>

            {showPests && renderInfectionLevel(mapInfectionLevel, setMapInfectionLevel, text)}
            {showPests && getPestOptions(pestsGeoJson, setMapPests, mapPests, text)}

            {waypoints && getActivityOptions(waypointsGeoJson, setMapActivities, mapActivities, text)}


            {showTimeRange && renderTimeRange(mapTimeRange, setMapTimeRange, text)}
            {showTimeRange && <DatePicker clearable={false} value={mapRefDate} text={text} onChange={(e) => setMapRefDate(e ? e : newDate())} placeholder={text.toDate} />}

            {ndvi && renderNdviDates(polygonsHistory, imageryDate, changeImageryDate, text, dir)}
            {ndvi && renderNdviPaletteIds(paletteid, changeNdviPalette)}
            {ndvi && <TextField
                select
                width={100}
                value={imageryType}
                onChange={(e) => setImageryType(e.target.value)}
            >
                <MenuItem value={'ndvi'}>
                    NDVI
                </MenuItem>
                <MenuItem value={'evi'}>
                    EVI
                </MenuItem>
                <MenuItem value={'evi2'}>
                    EVI 2
                </MenuItem>

            </TextField>
            }

            {actionUrl && showStartEnd && !isInspector && <AddButton to={actionUrl} label={text.startCrop} />}
            {endCropUrl && showStartEnd && !isInspector && <AddButton to={endCropUrl} label={text.endCrop} />}
            {showStartEnd &&
                <YearPicker dir={dir} value={yearFilter} onChange={setYearFilter} />
            }

            <Autocomplete
                style={{ flex: 1 }}
                noMargin={true}
                options={growerOptions.length > 0 ? growerOptions.concat(options) : options}
                onChange={setFilter}
                value={filter}
                placeholder={label}
            />
            <TextField
                width={200}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setFieldFilterFreeText(e.target.value)}
                value={fieldFreeText}
                placeholder={text.freeText}
            />

            <TextField
                select
                width={80}
                value={domainStatusFilter}
                onChange={(e) => setDomainStatusFilter(e.target.value)}
                label={text.status}
            >
                <MenuItem value={'all'}>
                    {text.all}
                </MenuItem>
                <MenuItem value={'active'}>
                    {text.active}
                </MenuItem>
                <MenuItem value={'inactive'}>
                    {text.inactive}
                </MenuItem>
            </TextField>
            {endSpace && <div style={{ width: endSpace }}></div>}

        </Box>
    )
}
export default DomainViewTop;


