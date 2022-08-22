import { ChevronLeft, ChevronLeftOutlined, ChevronRight, ChevronRightOutlined, CloudOutlined, MoreVert, Streetview } from '@mui/icons-material'
import { Box, Button, MenuItem, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFieldsById } from '../../features/fields/fieldsApiSlice'
import ColorPalette from './ColorPalette'
import FieldMap from './FieldMap'
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';

const FieldImagery = () => {


    const [view, setView] = useState('ndvi');
    const [palette, setPalette] = useState(3);


    const { fieldId } = useParams()

    const { data: user } = useGetUserDataQuery()


    const  {imageryKey} = user;

    console.log('imageryKey',imageryKey);

    const field = useFieldsById(user.year, Number(fieldId))
   
    const height = (window.window.innerHeight - 350);

    const dir = 'ltr'
    const selectedDate = new Date().toLocaleDateString('en-GB', { day: "2-digit", month: "2-digit", year: "2-digit" })

    return (
        <Box display={'flex'} flex={1} alignItems={'stretch'} justifyContent={'space-between'} flexDirection={'column'}>
            {field.polygon && <FieldMap field={field} height={height} />}

            <ColorPalette type={palette}></ColorPalette>



                <Box marginTop={1}
                    display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'} 
                >
                    <Button color='secondary' variant="outlined" disableElevation>
                        {dir === 'rtl' ? <ChevronRightOutlined /> : <ChevronLeftOutlined />}
                    </Button>
                    <Typography>
                        {selectedDate}
                    </Typography>
                    <CloudOutlined />
                    <Typography>
                        89%
                    </Typography>
                    <Button color='secondary' variant="outlined" disableElevation>
                        {dir === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
                    </Button>
                </Box>
                <Box marginTop={3}
                    display={'flex'} flex={1} alignItems={'stretch'} justifyContent={'space-between'}>

                    {/* <FormControl sx={{  minWidth: 120 }} size="small"> */}

                    <Select
                        size="small"
                        sx={{ minWidth: 120 }}
                        value={view}
                        label="View"
                        onChange={(e) => setView(e.target.value)}
                    >
                        <MenuItem value={'ndvi'}>NDVI</MenuItem>
                        <MenuItem value={'evi'}>EVI</MenuItem>
                        <MenuItem value={'evi2'}>EVI 2</MenuItem>
                    </Select>
                    {/* </FormControl> */}
                    <Select
                        size="small"
                        sx={{ minWidth: 120 }}

                        value={palette}
                        label="Colors"
                        onChange={(e) => setPalette(e.target.value)}>
                        <MenuItem value={1}>#1</MenuItem>
                        <MenuItem value={2}>#2</MenuItem>
                        <MenuItem value={3}>#3</MenuItem>
                        <MenuItem value={4}>#4</MenuItem>
                        <MenuItem value={5}>#5</MenuItem>

                    </Select>
                </Box>
        </Box>
    )
}


export default FieldImagery

/*

    const { dir, value, onChange } = props;
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => onChange(Number(value) - 1)}>
                {dir === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
            <Button
                variant="text"
                sx={{ color: 'black' }}

            >
                {value}
            </Button>
            <IconButton onClick={() => onChange(Number(value) + 1)}>
                {dir === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
        </div>
    )*/
