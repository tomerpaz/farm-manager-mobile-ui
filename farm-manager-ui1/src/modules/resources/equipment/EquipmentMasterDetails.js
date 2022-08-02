import React from 'react';
import { makeStyles } from '@mui/styles';
import EquipmentTable from './EquipmentTable';
import EquipmentForm from './EquipmentForm';
import {Paper} from '@mui/material';
import { getMasterDetailsStyle } from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const EquipmentMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <EquipmentTable {...props} />
            </div>
            <Paper className={classes.details}>
                {props.selectedEquipment && <EquipmentForm initialValues={props.selectedEquipment} {...props} />}
            </Paper>
        </div>
    )
}
export default EquipmentMasterDetails;
