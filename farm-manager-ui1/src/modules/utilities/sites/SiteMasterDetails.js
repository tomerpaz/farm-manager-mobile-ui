import React from 'react';
import SiteTable from './SiteTable';
import SiteForm from './SiteForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));


const SiteMasterDetails = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <SiteTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedSite && <SiteForm initialValues={props.selectedSite} {...props}/>}
            </Paper>
        </div>
    )
}
export default SiteMasterDetails;
