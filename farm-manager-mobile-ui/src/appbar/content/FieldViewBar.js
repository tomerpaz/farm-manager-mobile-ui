import { AppBar, Toolbar, IconButton, Box } from '@mui/material'
import { Layers, Share } from '@mui/icons-material'
import AppBarMenu from '../components/AppBarMenu'
import ShareLocationMenu from '../components/ShareLocationMenu'
import { useParams } from 'react-router-dom'
import { selectCurrentYear } from '../../features/app/appSlice'
import { useFieldsById } from '../../features/fields/fieldsApiSlice'
import { useSelector } from 'react-redux'
import SelectYearMenu from '../components/SelectYearMenu'
import { useGetUserDataQuery } from '../../features/auth/authApiSlice'

const FieldViewBar = ({ layers, share, years }) => {

    const { fieldId, src } = useParams()


     const currentYear = useSelector(selectCurrentYear)
  

     const { data: user } = useGetUserDataQuery()


     const noFilter =  user && user.year === currentYear;
 

     const field = useFieldsById(currentYear, Number(fieldId))


    const lat = field ? field.lat : null;
    const lng = field ? field.lng : null;
    return (
        <AppBar position="static" elevation={0}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box display={'flex'} flexDirection={'row'}>
                   {share && lat && lng && <ShareLocationMenu lat={lat} lng={lng}/>}
                   {years &&  <SelectYearMenu />}

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

