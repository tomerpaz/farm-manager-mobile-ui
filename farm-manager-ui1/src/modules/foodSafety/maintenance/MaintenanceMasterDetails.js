import React from 'react';
import MaintenanceForm from './MaintenanceForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";
import MaintenanceTable from "./MaintenanceTable";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const MaintenanceMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <MaintenanceTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedMaintenance &&
                <MaintenanceForm initialValues={props.selectedMaintenance} {...props}/>}
            </Paper>
        </div>
    )
}

export default MaintenanceMasterDetails;

