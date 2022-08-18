import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { MapContainer, Polygon, TileLayer } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectFieldById } from '../../features/fields/fieldSlice'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import { CloseOutlined } from '@mui/icons-material'

const FieldInfo = () => {

    const navigate = useNavigate()

    const { fieldId } = useParams()

    console.log('FieldInfo', fieldId)

    const field = useSelector((state) => selectFieldById(state, Number(fieldId)));



    const height = (window.window.innerHeight - 120) / 2;

const src = 'map'
    return (
        <Box display={'flex'} flex={1} alignItems={'stretch'} justifyContent={'space-between'} flexDirection={'column'}>

                    {field.polygon && <Box flex={1} id="map" dir='ltr' >

                        <MapContainer style={{ height: height, width: '100%' }} center={[field.lat, field.lng]} zoom={field.zoom} scrollWheelZoom={false}>
                            <TileLayer
                                // attribution='&amp;copy <a href="http://www.esri.com/">Esri</a>'
                                url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                                maxZoom={18}
                            />
                            <Polygon
                                color={field.color}
                                fillColor={field.color}
                                positions={field.polygon}>
                            </Polygon>
                        </MapContainer>
                    </Box>}
                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                    </Typography>




        </Box>
    )
}

export default FieldInfo