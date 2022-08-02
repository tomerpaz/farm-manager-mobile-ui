import React from 'react';
import InventoryUpdateTable from './InventoryUpdateTable';
import InventoryUpdateForm from './InventoryUpdateForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const InventoryUpdateMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <InventoryUpdateTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedInventoryUpdate && <InventoryUpdateForm initialValues={props.selectedInventoryUpdate} defaultValues={props.selectedInventoryUpdate} {...props}/>}
            </Paper>
        </div>
    )
}
export default InventoryUpdateMasterDetails;
