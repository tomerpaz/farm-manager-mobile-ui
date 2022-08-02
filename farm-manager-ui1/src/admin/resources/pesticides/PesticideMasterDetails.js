import React from 'react';
import PesticideTable from './PesticideTable';
import PesticideForm from './PesticideForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const PesticideMasterDetails = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <PesticideTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedPesticide && <PesticideForm initialValues={props.selectedPesticide} {...props}/>}
            </Paper>
        </div>
    )
}
export default PesticideMasterDetails;
