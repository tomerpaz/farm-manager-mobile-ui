import React, { useState } from 'react';
import BusinessTable from './BusinessTable';
import BusinessView from './BusinessView';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";
import BusinessUserForm from "./BusinessUserForm";

const flipper = {
    users: 'settings',
    settings: 'users'
}

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));


const BusinessMasterDetails = (props) => {

    const classes = useStyles();

    const {
        selectedBusiness, selectedBusinessUser
    } = props;

    const [view, setView] = useState('settings');
        return (
            <div className={classes.root}>
                <div className={classes.master}>
                    <BusinessTable {...props}/>
                </div>
                <Paper className={classes.details}>
                    {selectedBusinessUser && <BusinessUserForm initialValues={selectedBusinessUser} {...props}/>}
                    {selectedBusinessUser === null && selectedBusiness &&
                    <BusinessView flipButtonText={flipper[view]} view={view} initialValues={selectedBusiness} {...props}
                        onViewChange={() => setView(selectedBusiness.id ? flipper[view] : 'business')}
                    />}
                </Paper>
            </div>
        )

}
export default BusinessMasterDetails;
