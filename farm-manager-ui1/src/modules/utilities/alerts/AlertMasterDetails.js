import React from 'react';
import AlertTable from './AlertTable';
import AlertForm from './AlertForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const AlertMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <AlertTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedAlert && <AlertForm initialValues={props.selectedAlert} {...props}/>}
            </Paper>
        </div>
    )
}
export default AlertMasterDetails;
