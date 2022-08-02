import React from 'react';
import CompostTable from './CompostTable';
import CompostForm from './CompostForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const CompostMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <CompostTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedCompost && <CompostForm initialValues={props.selectedCompost} {...props}/>}
            </Paper>
        </div>
    )
}
export default CompostMasterDetails;
