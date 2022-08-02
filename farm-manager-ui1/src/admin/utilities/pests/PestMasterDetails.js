import React from 'react';
import PestTable from './PestTable';
import PestForm from './PestForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const PestMasterDetails = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <PestTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedPest && <PestForm initialValues={props.selectedPest} {...props}/>}
            </Paper>
        </div>
    )
}
export default PestMasterDetails;
