import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import PesticideListTable from './PesticideListTable';
import PesticideListView from './PesticideListView';
import {Paper} from '@mui/material';

import { getMasterDetailsStyle } from "../../../utils/StyleUtils";
import PesticideListPesticideForm from "./PesticideListPesticideForm";

const flipper = {
    settings: 'substances',
    substances: 'settings'
}

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme, 1, 3));

const PesticideListMasterDetails = (props) => {

    const [view, setView] = useState('settings');
    const classes = useStyles();


    const { selectedPesticideListPesticide, selectedPesticideList } = props;

    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <PesticideListTable {...props}/>
                </div>
            <Paper className={classes.details}>
                {selectedPesticideListPesticide && <PesticideListPesticideForm initialValues={selectedPesticideListPesticide} {...props} />}
                {selectedPesticideListPesticide === null && selectedPesticideList &&
                    <PesticideListView flipButtonText={flipper[view]} view={view} initialValues={selectedPesticideList} {...props}
                        onViewChange={() => setView(selectedPesticideList.id ? flipper[view] : 'settings')}
                    />}
            </Paper>
        </div>
    )
}
export default PesticideListMasterDetails;
