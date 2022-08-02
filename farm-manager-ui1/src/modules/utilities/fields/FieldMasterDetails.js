import React from 'react';
import FieldTable from './FieldTable';
import FieldForm from './FieldForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme, 1,2));

const FieldMasterDetails = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <FieldTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedField && <FieldForm  initialValues={props.selectedField} {...props}/> }
            </Paper>
        </div>
    )
}

export default FieldMasterDetails;

