import React from 'react';
import LinkTable from './LinkTable';
import LinkForm from './LinkForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const FieldMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <LinkTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedLink && <LinkForm initialValues={props.selectedLink} {...props}/>}
            </Paper>
        </div>
    )
}
export default FieldMasterDetails;
