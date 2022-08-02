import React from 'react';
import RiskTable from './RiskTable';
import RiskForm from './RiskForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const RiskMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <RiskTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedRisk && <RiskForm  initialValues={props.selectedRisk} {...props}/> }
            </Paper>
        </div>
    )
}

export default RiskMasterDetails;

