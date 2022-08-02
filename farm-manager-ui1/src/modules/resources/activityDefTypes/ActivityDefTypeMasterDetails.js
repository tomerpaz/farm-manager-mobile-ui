import React from 'react';
import ActivityDefTypeTable from './ActivityDefTypeTable';
import ActivityDefTypeForm from './ActivityDefTypeForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));


const ActivityDefTypeMasterDetails = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <ActivityDefTypeTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedActivityDefType && <ActivityDefTypeForm  initialValues={props.selectedActivityDefType} {...props}/> }
            </Paper>
        </div>
    )
}

export default ActivityDefTypeMasterDetails;

