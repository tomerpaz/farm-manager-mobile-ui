import React from 'react';
import ContainerTable from './ContainerTable';
import ContainerForm from './ContainerForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";


const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const ContainerMasterDetails = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <ContainerTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedContainer && <ContainerForm initialValues={props.selectedContainer} {...props}/>}
            </Paper>
        </div>
    )
}
export default ContainerMasterDetails;
