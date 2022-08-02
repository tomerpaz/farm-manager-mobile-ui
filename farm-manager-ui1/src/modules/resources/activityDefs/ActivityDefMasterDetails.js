import React from 'react';
import ActivityDefTable from './ActivityDefTable';
import ActivityDefForm from './ActivityDefForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const ActivityDefMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <ActivityDefTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedActivityDef && <ActivityDefForm  initialValues={props.selectedActivityDef} {...props}/> }
            </Paper>
        </div>
    )
}

export default ActivityDefMasterDetails;

