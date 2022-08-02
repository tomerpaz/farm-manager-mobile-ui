import React from 'react';
import WarehouseTable from './WarehouseTable';
import WarehouseForm from './WarehouseForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const WarehouseMasterDetails = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <WarehouseTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedWarehouse && <WarehouseForm  initialValues={props.selectedWarehouse} {...props}/> }
            </Paper>
        </div>
    )
}

export default WarehouseMasterDetails;

