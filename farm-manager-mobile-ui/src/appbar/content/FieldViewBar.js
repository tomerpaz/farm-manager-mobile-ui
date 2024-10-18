import { AppBar, Toolbar, IconButton, Box } from '@mui/material'
import { AddCommentOutlined, Close, Layers, Share } from '@mui/icons-material'
import ShareLocationMenu from '../components/ShareLocationMenu'
import { useNavigate, useParams } from 'react-router-dom'
import { selectCurrentYear, selectFieldDashboardYear, setOpenLayers } from '../../features/app/appSlice'
import { useFieldsById } from '../../features/fields/fieldsApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import SelectYearMenu from '../components/SelectYearMenu'
import { useGetUserDataQuery } from '../../features/auth/authApiSlice'
import SeasonData from '../../ui/forms/season/SeasonData'
import { useState } from 'react'

const FieldViewBar = ({ layers, share, years }) => {

    const { fieldId, src } = useParams()

    const [openSeason, setOpenSeason] = useState(false);

    const currentYear = useSelector(selectCurrentYear)

    const currentDashboardYear = useSelector(selectFieldDashboardYear)

    const { data: user } = useGetUserDataQuery()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const noFilter = user && user.year === currentYear;

    const field = useFieldsById(currentYear, Number(fieldId))

    const closeSeasonData = (data) => {
        setOpenSeason(false);
    }

    const lat = field ? field.lat : null;
    const lng = field ? field.lng : null;
    return (
        <AppBar position="static" elevation={0}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box display={'flex'} flexDirection={'row'}>
                    {share && lat && lng && <ShareLocationMenu lat={lat} lng={lng} />}
                    {years && <SelectYearMenu />}

                    {layers && <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => dispatch(setOpenLayers(true))}
                        sx={{ mr: 1 }}
                    >
                        <Layers />
                    </IconButton>}
                    {field && <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpenSeason(true)}
                        sx={{ mr: 1 }}
                    >
                        <AddCommentOutlined />
                    </IconButton>}
                </Box>
                {/* <AppBarMenu /> */}

                <IconButton color="inherit" onClick={() => navigate(`/tabs/${src}`)}>
                    <Close />
                </IconButton>

            </Toolbar>
            {openSeason && <SeasonData open={openSeason} handleClose={closeSeasonData} fieldId={fieldId} year={years ? currentDashboardYear : currentYear} />}
        </AppBar>
    )
}

export default FieldViewBar

