import React from 'react';
import CustomerSupplierTable from './CustomerSupplierTable';
import CustomerSupplierForm from './CustomerSupplierForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));


const CustomerSupplierMasterDetails = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <CustomerSupplierTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedCustomerOrSupplier && <CustomerSupplierForm initialValues={props.selectedCustomerOrSupplier} {...props}/>}
            </Paper>
        </div>
    )
}
export default CustomerSupplierMasterDetails;
