import React from 'react';
import IngredientTable from './IngredientTable';
import IngredientForm from './IngredientForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const IngredientMasterDetails = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <IngredientTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedIngredient && <IngredientForm initialValues={props.selectedIngredient} {...props}/>}
            </Paper>
        </div>
    )
}
export default IngredientMasterDetails;
