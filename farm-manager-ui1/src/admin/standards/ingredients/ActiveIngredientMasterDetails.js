import React from 'react';
import ActiveIngredientForm from './ActiveIngredientForm';
import ActiveIngredientTable from './ActiveIngredientTable';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const ActiveIngredientMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <ActiveIngredientTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedActiveIngredient && <ActiveIngredientForm initialValues={props.selectedActiveIngredient} {...props}/>}
            </Paper>
        </div>
    )
}
export default ActiveIngredientMasterDetails;