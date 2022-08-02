import React from 'react';
import FertilizerTable from './FertilizerTable';
import FertilizerForm from './FertilizerForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));


const FertilizerMasterDetails = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <FertilizerTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedFertilizer && <FertilizerForm initialValues={props.selectedFertilizer} {...props}/>}
            </Paper>
        </div>
    )
}
export default FertilizerMasterDetails;
