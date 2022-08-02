import React from 'react';
import AdminCropTable from './AdminCropTable';
import AdminCropForm from './AdminCropForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));
const AdminCropMasterDetails = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <AdminCropTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedBaseCrop && <AdminCropForm initialValues={props.selectedBaseCrop} {...props}/>}
            </Paper>
        </div>
    )
}
export default AdminCropMasterDetails;
