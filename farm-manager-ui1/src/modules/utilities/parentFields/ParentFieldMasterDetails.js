import React from 'react';
import ParentFieldTable from './ParentFieldTable';
import ParentFieldForm from './ParentFieldForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const ParentMasterDetails = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <ParentFieldTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedParentField && <ParentFieldForm  initialValues={props.selectedParentField} {...props}/> }
            </Paper>
        </div>
    )
}

export default ParentMasterDetails;

