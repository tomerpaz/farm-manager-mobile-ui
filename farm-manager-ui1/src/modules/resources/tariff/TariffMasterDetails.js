import React from 'react';
import TariffForm from './TariffForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";
import TariffTable from "./TariffTable";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const TariffMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <TariffTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedTariff && <TariffForm initialValues={props.selectedTariff} {...props}/>}
            </Paper>
        </div>
    )
}
export default TariffMasterDetails;

