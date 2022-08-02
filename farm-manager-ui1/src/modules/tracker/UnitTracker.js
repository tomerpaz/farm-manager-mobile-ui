import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { getMasterDetailsStyle } from "../../utils/StyleUtils";
import TrackTable from './TrackTable';
import TrackerMap from './TrackerMap';
import { MasterDetailsTableTop, TextField } from '../../components';
import { IconButton, MenuItem, Tooltip } from '@mui/material';
import DiscreteSlider from './SmoothFactorSlider';
import { Sync } from '@mui/icons-material';
import { importTracks } from '../../actions';
import { Loading } from '../../components/core';
import { Box } from '@mui/system';
import TrackerActivity from './TrackerActivity';
import {  asLocalDate} from '..//../utils';

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme, 3, 5));

const UnitTracker = (props) => {
    const { text, lang, domainFilterOption, wialonUnits, getTracks, pageSize, wialonGetUnits, domains, yearFilter,
        getDomainsByYear, trackMaxAvgSpeed, trackMinLength, setTrackMaxAvgSpeed, setTrackMinLength, trackerActivity,
        clearTrackerActivity, user, mapApiKey, selectedTracks, areaUnit, setWarnMessage, history,
    } = props;
    const classes = useStyles();
    const [filter, setFilter] = useState('');
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [sorting, setSorting] = useState({ columnName: 'trackDate', direction: 'desc' })
    const [freeText, setFreeText] = useState('');

    const [viewType, setViewType] = useState(0)

    const [smoothFactor, setSmoothFactor] = useState(1)
    const [currentPage, setCurrentPage] = useState(0)

    const [importing, setImporting] = useState(false)
    

    const unitOptions = wialonUnits.map(e => {
        return {
            value: 'unit_' + e.id,
            label: e.nm,
        }
    })


    useEffect(() => {
        wialonGetUnits();
        if (domains.length === 0) {
            getDomainsByYear(yearFilter);
        }
    }, [])

    useEffect(() => {

        if (!trackerActivity) {
            getTracks(currentPage, pageSize, sorting.columnName, sorting.direction, filter, start, end, trackMaxAvgSpeed, trackMinLength, freeText)
        }
    }, [currentPage, sorting, pageSize, filter, start, end, trackMaxAvgSpeed, trackMinLength, freeText]);

    const syncTracks = (e) => {

        const param = end ? asLocalDate(end) : 0;
        setImporting(true);
        importTracks(param).then(response => {
            getTracks(currentPage, pageSize, sorting.columnName, sorting.direction, filter, start, end, trackMaxAvgSpeed, trackMinLength, freeText)
            setImporting(false);
        }).catch((error) => {
            if (error) {
                console.log(error);
            }
        });

    }

    // console.log('selectedTracks', selectedTracks)
    if (importing) {
        return <Loading />
    }

    const disableControl = trackerActivity !== null;
    const options = unitOptions.concat(domainFilterOption);
    return (
        <Box flex={1}>
            <Box flex={1} display={'flex'} flexDirection='row' >

                <MasterDetailsTableTop options={options} filter={filter} setFilter={setFilter}
                    label={text.typeToSearch}
                    lang={lang}
                    text={text}
                    start={start}
                    clearableDates={true}
                    end={end}
                    sorting={sorting}
                    freeText={freeText}
                    freeTextTitle={text.freeText}
                    onFreeTextChange={setFreeText}
                    onStartChange={setStart}
                    onEndChange={setEnd} />

                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 30, paddingRight: 30 }}>
                    <TextField
                        select
                        width={120}
                        value={trackMaxAvgSpeed}
                        disabled={disableControl}
                        onChange={(e) => setTrackMaxAvgSpeed(Number(e.target.value))}
                        label={'Max Avg Km/h'}
                    >
                        <MenuItem value={7}>
                            {7}
                        </MenuItem>
                        <MenuItem value={9}>
                            {9}
                        </MenuItem>
                        <MenuItem value={15}>
                            {15}
                        </MenuItem>
                        <MenuItem value={50}>
                            {50}
                        </MenuItem>
                    </TextField>
                    <TextField
                        select
                        width={120}
                        value={trackMinLength}
                        disabled={disableControl}
                        onChange={(e) => setTrackMinLength(Number(e.target.value))}
                        label={'Min Length'}
                    >
                        <MenuItem value={100}>
                            {0.1} Km
                        </MenuItem>
                        <MenuItem value={500}>
                            {0.5} Km
                        </MenuItem>
                        <MenuItem value={1000}>
                            {1} Km
                        </MenuItem>
                        <MenuItem value={2000}>
                            {2} Km
                        </MenuItem>
                        <MenuItem value={3000}>
                            {3} Km
                        </MenuItem>
                    </TextField>
                    <TextField
                        select
                        width={200}
                        value={viewType}
                        onChange={(e) => setViewType(e.target.value)}
                        label={text.view}
                    >
                        <MenuItem value={0}>
                            {text.fields}
                        </MenuItem>
                        <MenuItem value={1}>
                            {text.fields} +
                        </MenuItem>
                        <MenuItem value={3}>
                            {`${text.speed}`}
                        </MenuItem>)
                    </TextField>
                    {/* <DiscreteSlider value={smoothFactor} onChange={setSmoothFactor} /> */}
                    <Tooltip title="Sync">
                        <IconButton
                            onClick={syncTracks}
                            variant="outlined"
                        >
                            <Sync />
                        </IconButton>
                    </Tooltip>
                </div>
            </Box>
            <Box flex={1} display={'flex'} flexDirection='row' >
                <div className={classes.master}>
                    {!trackerActivity && <TrackTable start={start} end={end} filter={filter} sorting={sorting} setSorting={setSorting}
                        currentPage={currentPage} setCurrentPage={setCurrentPage}
                        trackMaxAvgSpeed={trackMaxAvgSpeed} trackMinLength={trackMinLength}
                        {...props} />}
                    {trackerActivity && <TrackerActivity trackerActivity={trackerActivity}
                        clearTrackerActivity={clearTrackerActivity} text={text}
                        areaUnit={areaUnit} setWarnMessage={setWarnMessage}
                        history={history} />}
                </div>
                <div className={classes.details}>
                    <TrackerMap user={user} mapApiKey={mapApiKey} domains={domains} trackerActivity={trackerActivity} selectedTracks={selectedTracks} viewType={viewType} smoothFactor={smoothFactor} minSpeed={1} maxSpeed={7} {...props} />
                </div>
            </Box>
        </Box>
    )
}

export default UnitTracker;

