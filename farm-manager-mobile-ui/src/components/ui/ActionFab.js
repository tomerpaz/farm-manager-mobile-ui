import { Box, Button, Fab, IconButton, Snackbar, Typography, Zoom } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { selectActivityType, selectLang, setActivityType } from "../../features/app/appSlice";
import { SCOUT } from "../../ui/FarmUtil";
import ActionSpeedDial from "./ActionSpeedDial"
import { HighlightOffRounded } from '@mui/icons-material';

const ActionFab = (props) => {
    const { map } = props;
    const activityType = useSelector(selectActivityType)
    const dispatch = useDispatch()
    const text = useSelector(selectLang)

    if (map === true && SCOUT === activityType) {
//        console.log('activityType', activityType, map)

        return <Snackbar
            open
            autoHideDuration={6000}
            message={<Typography variant='h6'> {`${text.scouting} - ${text.tapInFieldPosition}`}</Typography>}
            action={

                <IconButton flex={1} aria-label="settings" onClick={() => dispatch(setActivityType(''))}>
                    <HighlightOffRounded sx={{ color: 'white' }} fontSize='large' />
                </IconButton>
            }

        //     <Button onClick={() => dispatch(setActivityType(''))} color="inherit" size="small">
        //     Exit
        //   </Button>

        // sx={{ bottom: { xs: 90, sm: 0 } }}
        />
        // return <Box sx={{ '& > :not(style)': { m: 1 } }}>
        //     <Zoom 
        //     in={true}
        //               timeout={200}
        //               unmountOnExit

        //     style={{

        //         transitionDelay: `${200}ms`,

        //     }}>
        //         <Fab sx={{ position: 'absolute', bottom: 16, borderRadius: 2 }} color="primary" variant="extended">
        //             <Close onClick={() => dispatch(setActivityType(''))} />
        //             Scout mode - click on map
        //         </Fab>
        //     </Zoom>

        // </Box>;



    } else {
        return <ActionSpeedDial {...props} />
    }
}

export default ActionFab