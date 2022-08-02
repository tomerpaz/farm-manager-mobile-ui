import React, { useState, useEffect } from 'react';
import { TextField, YesNoDialog } from '../../components'
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem'
import { Sync, Download } from '@mui/icons-material';

import { Box, Typography } from '@mui/material';
import { Divider, FormControlLabel, Checkbox } from '@mui/material';
import { UPLOAD } from "../../components/frame/Routes";
import {  OutlinedButton } from '../../components/core';
import { getGisFile } from '../../actions';


const GisSettings = (props) => {


    const {
        history, text,
        gisPolygons,
        setGisPolygonId,
        setGisPolygonName,
        gisPolygonNameAttr,
        gisPolygonIdAttr,
        gisPolygonAttributes,
        deleteGisData,
        refresh,
        showName, showId, setShowName, setShowId,
        polygonType, setPolygonType

    } = props;
    const [deleteOpen, setDeleteOpen] = useState(false);


    const handleClose = (value) => {
        if (value) {
            deleteGisData(polygonType);
        }
        setDeleteOpen(false);
    };


    const TEXT_BOX_WIDTH = 280;
    return (
        <Box flex={1} display={'flex'} flexDirection='column'

            padding={2}
            // minWidth={2}
            backgroundColor='white'
            height='100%'
        >
            <Box display={'flex'} justifyContent='space-between'>
                {<Typography  variant="h6" gutterBottom>
                    {'GIS'}
                </Typography>}

                {<IconButton onClick={() => refresh()}>
                    <Sync />
                </IconButton>}

            </Box>
            <Typography paddingTop={2} variant='h6'>{text.import}</Typography>
            <Divider/>

            <Box paddingTop={2} display= 'flex' alignItems='center' justifyContent= 'space-between' >

                <TextField
                    select
                    label={text.type}
                    width={TEXT_BOX_WIDTH}
                    value={polygonType}
                    onChange={(e) => setPolygonType(e.target.value)}
                >
                    <MenuItem value={'base'}> {text.baseFields}</MenuItem>
                    <MenuItem value={'plant'}> {text.plant}</MenuItem>

                </TextField>

                {gisPolygons.length === 0 &&
                    <OutlinedButton
                        onClick={() => history.push(`${UPLOAD}${`gis${polygonType}`}/0`)
                        }>
                        {text.add}
                    </OutlinedButton>}

                {gisPolygons.length !== 0 &&
                    <OutlinedButton 
                        onClick={() => setDeleteOpen(true)}>
                        {text.delete}
                    </OutlinedButton>}

            </Box>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextField
                    select
                    label={text.id}
                    width={TEXT_BOX_WIDTH}
                    value={gisPolygonIdAttr}
                    onChange={(e) => setGisPolygonId(polygonType, e.target.value)}
                >
                    <MenuItem key="" value="">
                        <em></em>
                    </MenuItem>
                    {gisPolygonAttributes.map(element => (

                        <MenuItem key={element} value={element}> {element}</MenuItem>
                    ))}
                </TextField>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showId}
                            onChange={() => setShowId(!showId)}
                            value={showId}
                        />
                    }
                    label={text.show}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextField
                    select
                    label={text.description}
                    width={TEXT_BOX_WIDTH}
                    value={gisPolygonNameAttr}
                    onChange={(e) => setGisPolygonName(polygonType, e.target.value)}
                >
                    <MenuItem key="" value="">
                        <em></em>
                    </MenuItem>
                    {gisPolygonAttributes.map(element => (
                        <MenuItem key={element} value={element}> {element}</MenuItem>
                    ))}
                </TextField>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showName}
                            onChange={() => setShowName(!showName)}
                            value={showName}
                        />
                    }
                    label={text.show}
                />
            </div>
            <Typography  variant="h6" paddingTop={2}>{text.export}</Typography>
            <Divider/>
            <Box paddingTop={2} display= 'flex' alignItems='center' justifyContent= 'space-around' >
                <OutlinedButton  endIcon={<Download />} onClick={e => getGisFile('base')} >{text.baseFields}</OutlinedButton>
                <OutlinedButton endIcon={<Download />} onClick={e => getGisFile('plant')} >{text.plant}</OutlinedButton>
            </Box>

            <YesNoDialog open={deleteOpen}
                action={handleClose}
                title={text.deleteFormTitle}
                body={text.deleteFormBody}
                yesText={text.delete}
                noText={text.cancel} />

        </Box>
    )
}

export default GisSettings;



