import { Box, Button, Fab, IconButton, Snackbar, Typography, Zoom } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { selectActivityType, selectLang, setActivityType } from "../../features/app/appSlice";
import { SCOUT } from "../../ui/FarmUtil";
import ActionSpeedDial from "./ActionSpeedDial"
import { HighlightOffRounded } from '@mui/icons-material';

const ActionFab = (props) => {

    return <ActionSpeedDial {...props} />

}

export default ActionFab