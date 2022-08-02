import React from 'react';
import CompoundTable from './CompoundTable';
import CompoundForm from './CompoundForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const CompoundMasterDetails = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <CompoundTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedCompound && <CompoundForm initialValues={props.selectedCompound} {...props}/>}
            </Paper>
        </div>
    )
}
export default CompoundMasterDetails;
