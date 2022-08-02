import React from 'react';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";
import  CropTable from './CropTable';
import  CropForm from './CropForm1';

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));


const CropMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <CropTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedCrop && <CropForm initialValues={props.selectedCrop} {...props}/>}
            </Paper>
        </div>
    )
}
export default CropMasterDetails;
