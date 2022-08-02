import React, { useState, useEffect } from 'react';
import { uniqBy } from 'lodash';
import { MenuItem } from '@mui/material';
import { TextField, Autocomplete } from '../../../components'
import { asShortStringDate, getCurrentYear } from '../../../utils';
import { infectionLevels, isMatchInfectionLevel } from './PestMonitorCard';
import { getSuggestionsNameId } from '../../../components/core';
import { CloudOutlined, Cloud, WbSunnyOutlined } from '@mui/icons-material'
import { Box } from '@mui/system';

export function filterPestMonitor(mapInfectionLevel, mapPests, pestsGeoJson) {
    return pestsGeoJson.filter(e => isMatchInfectionLevel(mapInfectionLevel, mapPests, e.pestMonitors));
}


export function filterActivities(mapActivities, waypointsGeoJson) {
    const activityIds = mapActivities.map(e => e.id);
    if (activityIds && activityIds.length > 0) {
        return waypointsGeoJson.filter(e => e.activityDef && activityIds.includes(e.activityDef.id));
    } else {
        return waypointsGeoJson;
    }

}

export function renderInfectionLevel(value, onChange, text) {

    return (
        <TextField
            select
            width={100}
            value={value}
            label={text.thresholdLevel}
            onChange={(e) => onChange(e.target.value)}
        >
            {infectionLevels.map((e, index) =>
                <MenuItem key={index} value={e.level}>
                    {text[e.level]}
                </MenuItem>)}
        </TextField>
    )
}

export function renderTimeRange(value, onChange, text) {

    const year = getCurrentYear();
    return (

        <TextField
            select
            width={120}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            label={text.timeRange}
        >
            <MenuItem value={'1d'}>{text.day}</MenuItem>))
            <MenuItem value={'3d'}>3 {text.days}</MenuItem>))
            <MenuItem value={'7d'}>7 {text.days}</MenuItem>))
            <MenuItem value={'14d'}>14 {text.days}</MenuItem>))
            <MenuItem value={'1m'}>{text.month}</MenuItem>))
            <MenuItem value={'3m'}>3 {text.months}</MenuItem>))
            <MenuItem value={'6m'}>6 {text.months}</MenuItem>))
            <MenuItem value={'12m'}>{text.year}</MenuItem>))
            <MenuItem value={'0y'}>{year}</MenuItem>))
            <MenuItem value={'1y'}>{year - 1}</MenuItem>))

        </TextField>
    )
}

export function renderNdviPaletteIds(paletteid, onChange) {
    return (
        <TextField
            select
            width={150}
            value={paletteid}
            onChange={(e) => onChange(e.target.value)}
        >
            <MenuItem value={1}>
                Green
            </MenuItem>
            <MenuItem value={2}>
                Technical
            </MenuItem>
            <MenuItem value={3}>
                Contrast #1
            </MenuItem>
            <MenuItem value={4}>
                Contrast #2
            </MenuItem>
            <MenuItem value={5}>
                Contrast #3
            </MenuItem>
        </TextField>
    )
}
export function getPestOptions(pestsGeoJson, setMapPests, mapPests, text) {
    let options = [];
    pestsGeoJson.forEach(e => {
        options = options.concat(e.pestMonitors.map(pm => pm.pest));
    })


    options = uniqBy(options, 'id');

    return (
        <Box sx={{ width: 400 }}>
            <Autocomplete
                noMargin={true}
                options={getSuggestionsNameId(options)}
                onChange={(v) => setMapPests(v)}
                value={mapPests}
                placeholder={text.pests}
                label={text.pests}

            />
        </Box>
    )
}


export function getActivityOptions(waypointsGeoJson, setMapActivities, mapActivities, text) {
    let options = getSuggestionsNameId(waypointsGeoJson.filter(e => e.activityDef).map(e => e.activityDef));

    options = uniqBy(options, 'id');

    return (
        <Box sx={{ width: 400 }}>
            <Autocomplete
                noMargin={true}
                options={getSuggestionsNameId(options)}
                onChange={(v) => setMapActivities(v)}
                value={mapActivities}
                placeholder={text.activity}
                label={text.activity}

            />
        </Box>
    )
}


const iconStyle = {
    margin: 0,
    padding: 0,
    height: 19,
    paddingLeft: 2,
    paddingRight: 2,
}
export function renderNdviDates(dates, value, onChange, text, dir) {

    return (
        <TextField
            select
            width={200}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <MenuItem value="">
                <em>{text.selectObservation}</em>
            </MenuItem>
            {dates.map((e, index, arr) =>
                <MenuItem key={index} value={e.dt}>
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            {asShortStringDate(new Date(e.dt * 1000))}
                        </div>
                        {e.data && e.data[0] &&
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                                <div>
                                    {e.data[0].imagery.cl.toFixed(0)}%
                                </div>
                                {(e.data[0].imagery.cl <= 10) && <WbSunnyOutlined style={iconStyle} color='secondary' />}
                                {(e.data[0].imagery.cl > 10) && (e.data[0].imagery.cl <= 30) &&
                                    <CloudOutlined style={iconStyle} color='secondary' />}
                                {(e.data[0].imagery.cl > 30) && <Cloud style={iconStyle} color='secondary' />}
                            </div>}
                    </div>
                </MenuItem>
            )}
        </TextField>
        // </div >
    )
}
