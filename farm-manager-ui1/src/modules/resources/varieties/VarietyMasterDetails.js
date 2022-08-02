import React from 'react';
import VarietyTable from './VarietyTable';
import VarietyForm from './VarietyForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const VarietyMasterDetails = (props) => {  
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <VarietyTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedVariety && <VarietyForm initialValues={props.selectedVariety} {...props}/>}
            </Paper>
        </div>
    )
}
export default VarietyMasterDetails;
