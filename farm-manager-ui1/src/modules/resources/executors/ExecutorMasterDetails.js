import React from 'react';
import ExecutorTable from './ExecutorTable';
import ExecutorForm from './ExecutorForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';

import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));


const ExecutorMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <ExecutorTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedExecutor && <ExecutorForm initialValues={props.selectedExecutor} {...props}/>}
            </Paper>
        </div>
    )
}
export default ExecutorMasterDetails;
