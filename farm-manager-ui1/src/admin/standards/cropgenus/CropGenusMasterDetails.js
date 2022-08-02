import React from 'react';
import CropGenusForm from './CropGenusForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";
import CropGenusTable from './CropGenusTable';

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const TagMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <CropGenusTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedCropGenus && <CropGenusForm initialValues={props.selectedCropGenus} {...props}/>}
            </Paper>
        </div>
    )
}
export default TagMasterDetails;
