import { ChevronLeft, ChevronLeftOutlined, ChevronRight, ChevronRightOutlined, Cloud, CloudOutlined, MoreVert, Streetview, WbSunnyOutlined } from '@mui/icons-material'
import { Box, Button, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFieldsById } from '../../features/fields/fieldsApiSlice'
import ColorPalette from './ColorPalette'
import FieldMap from './FieldMap'
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { useSelector } from 'react-redux'
import { selectLang } from '../../features/auth/authSlice'
import { asShortStringDate, isArrayEmpty, newDate, subtractDays, toUTCDate } from '../FarmUtil'
import Loading from '../../components/Loading'


const BASE_URL = 'https://api.agromonitoring.com/agro/1.0/';
const IMAGE_SEARCH_URL = `${BASE_URL}image/search`;
const S2 = 's2';


const FieldImagery = ({ field }) => {

    const [data, setData] = useState([]);
    const [viewDate, setViewDate] = useState(null);
    const [viewClouds, setViewClouds] = useState(0);
    const [map, setMap] = useState(null);
    const [selectedView, setSelectedView] = useState(0);
    const [tile, setTile] = useState(null);
    const [view, setView] = useState('ndvi');
    const [palette, setPalette] = useState(3);
    const [reload, setRealod] = useState(false);
    const [days, setDays] = useState(30);
    const [message, setMessage] = useState(null);
    const text = useSelector(selectLang)
    const { fieldId } = useParams()
    const { data: user } = useGetUserDataQuery()
    const { imageryKey } = user;
    const type = S2;

    useEffect(() => {
        const end = toUTCDate(newDate());
        const start = toUTCDate(subtractDays(newDate(), days));
        const url = `${IMAGE_SEARCH_URL}?start=${start}&end=${end}&polyid=${field.imageryId}&appid=${imageryKey}&type=${type}`;
        setData([])
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    setMessage(data.message)
                } else {
                    setMessage(null)
                    setData(data.sort(function (x, y) { return y.dt - x.dt; }))
                }
            }
            );
    }, [days])

    useEffect(() => {

        setRealod(true)
        console.log('selectedViewdata: ', selectedView, data)
        if (selectedView !== null && data && data.length > selectedView) {
            console.log(' data.length: ', data.length)

            console.log('useEffect.selectedView');

            setTile(data[selectedView].tile[view].replace("http:", "https:") + '&paletteid=' + palette);
            setViewDate(asShortStringDate(new Date(data[selectedView].dt * 1000)));
            setViewClouds(data[selectedView].cl);
        } else {
            setTile(null);
            setSelectedView(0);
        }
    }, [selectedView, palette, view, data])

    useEffect(() => {
        setRealod(false)
    }, [reload])

    // console.log('tile', tile)

    const height = (window.window.innerHeight - 350);
    const dir = text.dir

    return (
        <Box display={'flex'} flex={1} alignItems={'stretch'} justifyContent={'space-between'} flexDirection={'column'}>
            {field.polygon && <FieldMap field={field} height={height} tile={reload ? null : tile} setMap={setMap} />}
            <ColorPalette type={palette}></ColorPalette>
            {isArrayEmpty(data) && message &&
                <Box marginTop={2}
                    display={'flex'} flex={1} alignItems={'center'} justifyContent={'center'}>
                    <Typography>{message}</Typography>
                </Box>}
            {isArrayEmpty(data) && !message && <Loading marginTop={3} />}
            {!isArrayEmpty(data) &&
                <Box>
                    <Box marginTop={1}
                        display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'}
                    >
                        <Button disabled={isArrayEmpty(data) || selectedView === 0} onClick={() => setSelectedView(selectedView - 1)} color='secondary' variant="outlined" disableElevation>
                            {dir === 'rtl' ? <ChevronRightOutlined /> : <ChevronLeftOutlined />}
                        </Button>
                        <Typography>
                            {viewDate}
                        </Typography>
                        <Box display={'flex'} flexDirection={'row'}>
                            <Typography marginLeft={1} marginRight={1}>
                                {`${viewClouds.toFixed(1)}%`}
                            </Typography>

                            {(viewClouds <= 10) && <WbSunnyOutlined color='secondary' />}
                            {(viewClouds > 10) && (viewClouds <= 30) &&
                                <CloudOutlined color='secondary' />}
                            {(viewClouds > 30) && <Cloud color='secondary' />}
                        </Box>
                        <Button
                            disabled={isArrayEmpty(data) || selectedView === data.length - 1} onClick={() => setSelectedView(selectedView + 1)}
                            color='secondary' variant="outlined" disableElevation>
                            {dir === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
                        </Button>
                    </Box>
                    <Box marginTop={3}
                        display={'flex'} flex={1} alignItems={'stretch'} justifyContent={'space-between'}>

                        {/* <FormControl sx={{  minWidth: 120 }} size="small"> */}

                        <Select
                            size="small"
                            sx={{ flex: 1 }}
                            value={view}
                            onChange={(e) => setView(e.target.value)}
                        >
                            <MenuItem value={'ndvi'}>NDVI</MenuItem>
                            <MenuItem value={'evi'}>EVI</MenuItem>
                            <MenuItem value={'evi2'}>EVI 2</MenuItem>
                        </Select>
                        <Select
                            size="small"
                            sx={{ marginLeft: 2, marginRight: 2, flex: 1 }}
                            value={days}
                            placeholder={text.days}
                            onChange={(e) => setDays(Number(e.target.value))}
                        >
                            <MenuItem value={30}>{`30 ${text.days}`}</MenuItem>
                            <MenuItem value={60}>{`60 ${text.days}`}</MenuItem>
                            <MenuItem value={90}>{`90 ${text.days}`}</MenuItem>
                            <MenuItem value={365}>{`1 ${text.year}`}</MenuItem>

                        </Select>
                        <Select
                            size="small"
                            sx={{ flex: 1 }}

                            value={palette}

                            onChange={(e) => setPalette(e.target.value)}>
                            <MenuItem value={1}>#1</MenuItem>
                            <MenuItem value={2}>#2</MenuItem>
                            <MenuItem value={3}>#3</MenuItem>
                            <MenuItem value={4}>#4</MenuItem>
                            <MenuItem value={5}>#5</MenuItem>

                        </Select>
                    </Box>
                </Box>}
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
