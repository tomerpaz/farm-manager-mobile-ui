import React from 'react';
import AccessoryTable from './AccessoryTable';
import AccessoryForm from './AccessoryForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const AccessoryMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <AccessoryTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedAccessory && <AccessoryForm initialValues={props.selectedAccessory} {...props}/>}
            </Paper>
        </div>
    )
}
export default AccessoryMasterDetails;
