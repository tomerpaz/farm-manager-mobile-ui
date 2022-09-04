import { AppBar, Toolbar, IconButton, Box } from '@mui/material'
import { Layers, Share } from '@mui/icons-material'
import AppBarMenu from '../components/AppBarMenu'
import ShareLocationMenu from '../components/ShareLocationMenu'
import { useParams } from 'react-router-dom'
import { selectCurrentYear } from '../../features/app/appSlice'
import { useFieldsById } from '../../features/fields/fieldsApiSlice'
import { useSelector } from 'react-redux'

const FieldViewBar = ({ layers }) => {

    const { fieldId, src } = useParams()


     const year = useSelector(selectCurrentYear)
  
     console.log('year',year)
     const field = useFieldsById(year, Number(fieldId))


    const lat = field ? field.lat : null;
    const lng = field ? field.lng : null;
    return (
        <AppBar position="static" elevation={0}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box display={'flex'} flexDirection={'row'}>
                   {lat && lng && <ShareLocationMenu lat={lat} lng={lng}/>}
                    {layers && <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => console.log('click')}
                        sx={{ mr: 1 }}
                    >
                        <Layers />
                    </IconButton>}
                </Box>
                <AppBarMenu />

            </Toolbar>
        </AppBar>
    )
}

export default FieldViewBar

