import React from 'react';
import DisinfectantTable from './DisinfectantTable';
import DisinfectantForm from './DisinfectantForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const DisinfectantMasterDetails = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <DisinfectantTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedDisinfectant && <DisinfectantForm initialValues={props.selectedDisinfectant} {...props}/>}
            </Paper>
        </div>
    )
}
export default DisinfectantMasterDetails;
