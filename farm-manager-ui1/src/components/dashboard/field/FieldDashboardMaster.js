import React from 'react';
import Market from '@mui/icons-material/AttachMoney';
import CropCycle from '@mui/icons-material/Repeat';
import ChartBar from '../../../icons/ChartBar'
import ShowChart from '@mui/icons-material/ShowChart';
import { TopBackBar } from "../../../components";
import PlantationDetails from './plantation/PlantationDetails';
import DomainDetails from './domain/DomainDetails';
import { ButtonBody } from "../../../utils/StyleUtils";

import SelectorButton from '../../core/button/SelectorButton';
import { Box } from '@mui/material';

const FieldDashboardMaster = ({ dashboard, year, text, dir, onYearChange, exitRoute, history, handleTabChange, tab, areaUnit, weightUnit, setEstimateProduce,
    setSeasonDataParam, saveSeasonData }) => {


    return (
        <Box display={'flex'} flexDirection={'column'}>
            <TopBackBar dir={dir} label={`${text.back}`} history={history} exitRoute={exitRoute} />

            <Box display={'flex'} flexDirection={'row'}>
                <SelectorButton minWidth={30} selected={tab === 0}
                    onClick={(e) => handleTabChange(e, 0)}>
                    <ButtonBody>
                        <ShowChart />
                        {text.qtySummaries}
                    </ButtonBody>
                </SelectorButton>
                <SelectorButton minWidth={30} selected={tab === 1}

                    onClick={(e) => handleTabChange(e, 1)}>
                    <ButtonBody>
                        <Market />
                        {text.financialSummaries}
                    </ButtonBody>
                </SelectorButton>
                <SelectorButton minWidth={30} selected={tab === 2}
                    onClick={(e) => handleTabChange(e, 2)}>
                    <ButtonBody>
                        {dashboard.plantation === true && <ChartBar />}
                        {dashboard.plantation === false && <CropCycle />}
                        {dashboard.plantation === true ? text.comparativeGraphs : text.cropCycle}
                    </ButtonBody>
                </SelectorButton>
            </Box>

            {dashboard.plantation === true && <PlantationDetails
                text={text}
                dashboard={dashboard}
                dir={dir}
                areaUnit={areaUnit}
                weightUnit={weightUnit}
                onYearChange={onYearChange}
                setEstimateProduce={setEstimateProduce}
                setSeasonDataParam={setSeasonDataParam}
                saveSeasonData={saveSeasonData}
            />}
            {dashboard.plantation === false && <DomainDetails text={text} areaUnit={areaUnit}
                // setEstimateProduce={setEstimateProduce}
                weightUnit={weightUnit}
                dashboard={dashboard}
                setSeasonDataParam={setSeasonDataParam}
                saveSeasonData={saveSeasonData}
            />}
        </Box>
    )
}

export default FieldDashboardMaster;
