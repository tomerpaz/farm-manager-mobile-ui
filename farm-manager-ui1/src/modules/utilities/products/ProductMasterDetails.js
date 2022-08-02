import React from 'react';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));


const ProductMasterDetails = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <ProductTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedProduct && <ProductForm initialValues={props.selectedProduct} {...props}/>}
            </Paper>
        </div>
    )
}
export default ProductMasterDetails;
