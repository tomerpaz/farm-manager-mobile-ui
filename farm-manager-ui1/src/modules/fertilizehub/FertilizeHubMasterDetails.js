import React, { useState, useEffect } from 'react';
import FertilizeHubTable from './FertilizeHubTable';
import FertilizeHubForm from './FertilizeHubForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getMasterDetailsStyle } from "../../utils/StyleUtils";
import { TopBackBar } from '../../components';
import FertilizeHubValveForm from './FertilizeHubValveForm';

const useStyles = makeStyles(
    theme => getMasterDetailsStyle(theme));



const FertilizeHubMasterDetails = (props) => {
    const classes = useStyles();
    const { text, dir, history , selectedFertilizerHub, clearFertilizerHub,
        setTablePageSize,pageSizes,pageSize
    } = props;

    const [view, setView] = useState( 'fertilizers');
    function cancelAction() {
        setView('fertilizers')
        clearFertilizerHub();
        
    }

    const hasValves = selectedFertilizerHub && selectedFertilizerHub.valves && selectedFertilizerHub.valves.length > 0 ? true : false
    return (
        <div className={classes.backRoot}>
            <TopBackBar dir={dir} label={text.back} history={history} />
            <div className={classes.root}>

                <div className={classes.master}>
                    <FertilizeHubTable setView={(value) => setView(value)} {...props}  />
                </div>
                <Paper className={classes.details}>
                    {selectedFertilizerHub && view == 'fertilizers' &&  
                        <FertilizeHubForm initialValues={selectedFertilizerHub} hasValves={hasValves} cancelAction={cancelAction} {...props}
                         />}
                        {selectedFertilizerHub && view == 'valves' &&  
                        <FertilizeHubValveForm initialValues={selectedFertilizerHub} cancelAction={cancelAction} text={text}

                        pageSize={pageSize} pageSizes ={pageSizes} setTablePageSize={setTablePageSize}
                        />}
                </Paper>
            </div>
        </div>
    )

}
export default FertilizeHubMasterDetails;
