import React from 'react';
import WaterSourceTable from './WaterSourceTable';
import WaterSourceForm from './WaterSourceForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const WaterSourceMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <WaterSourceTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedWaterSource && <WaterSourceForm initialValues={props.selectedWaterSource} {...props}/>}
            </Paper>
        </div>
    )
}
export default WaterSourceMasterDetails;
