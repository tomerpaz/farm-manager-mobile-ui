import React from 'react';
import ProductCategoryTable from './ProductCategoryTable';
import ProductCategoryForm from './ProductCategoryForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const ProductCategoryMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <ProductCategoryTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedProduceCategory && <ProductCategoryForm initialValues={props.selectedProduceCategory} {...props}/>}
            </Paper>
        </div>
    )
}
export default ProductCategoryMasterDetails;
