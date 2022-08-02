import React from 'react';
import ResourceExternalCodeTable from './ResourceExternalCodeTable';
import ResourceExternalCodeForm from './ResourceExternalCodeForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const ResourceExternalCodeMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <ResourceExternalCodeTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedResourceExternalCode && <ResourceExternalCodeForm defaultValues={props.selectedResourceExternalCode} {...props}/>}
            </Paper>
        </div>
    )
}
export default ResourceExternalCodeMasterDetails;
