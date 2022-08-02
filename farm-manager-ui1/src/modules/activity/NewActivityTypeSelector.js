import React from 'react';
import Action from '@mui/icons-material/Adjust';
import Harvest from '@mui/icons-material/NaturePeople';
import Irrigation from '@mui/icons-material/Opacity';
import Spray from '@mui/icons-material/BugReport';
import Market from '@mui/icons-material/AttachMoney';
import {
    FERTILIZE_IRRIGATION, FERTILIZE_IRRIGATION_PLAN, GENERAL, GENERAL_PLAN, HARVEST, MARKET, PEST_MONITOR,
    SPRAY, SPRAY_PLAN
} from './types'

import { Loading } from '../../components/core';
import SelectorButton from '../../components/core/button/SelectorButton';
import { Box } from '@mui/material';
import { ButtonBody } from '../../utils/StyleUtils';


function newActivityForm(type, props) {
    props.getNewActivity(type);
}


function getDefaulActivityType(role, plan) {
    if (role === 'inspector') {
        if (plan) {
            return SPRAY_PLAN;
        } else {
            return PEST_MONITOR;
        }
    }
    return null;
}

const NewActivityTypeSelector = (props) => {
    const { text, history, user } = props;

    const plans = history.location.pathname.indexOf('plan') > -1;

    const singleActivity = getDefaulActivityType(user.role, plans);
    if (singleActivity) {
        newActivityForm(singleActivity, props);
        return <Loading />
    }

    return (
        <Box display={'flex'} flex={1}>
            {plans &&
                <Box margin={5} display={'flex'} flex={1} justifyContent={'space-around'}> 
                    <SelectorButton onClick={() => newActivityForm(GENERAL_PLAN, props)}>
                        <ButtonBody >
                            {text.general}
                            <Action />
                        </ButtonBody>
                    </SelectorButton>
                    <SelectorButton onClick={() => newActivityForm(FERTILIZE_IRRIGATION_PLAN, props)}>
                        <ButtonBody >
                            {text.fertilize_irrigation}
                            <Irrigation />
                        </ButtonBody >
                    </SelectorButton>
                    <SelectorButton onClick={() => newActivityForm(SPRAY_PLAN, props)}>
                        <ButtonBody >
                            {text.spray}
                            <Spray />
                        </ButtonBody >
                    </SelectorButton>
                </Box>
            }
            {!plans &&
                <Box margin={5} display={'flex'} flex={1} justifyContent={'space-around'}> 

                    <SelectorButton 
                        onClick={() => newActivityForm(GENERAL, props)}>
                        <ButtonBody >
                            {text.general}
                            <Action />
                        </ButtonBody>
                    </SelectorButton>
                    <SelectorButton 
                        onClick={() => newActivityForm(FERTILIZE_IRRIGATION, props)}>
                        <ButtonBody >
                            {text.fertilize_irrigation}
                            <Irrigation />
                        </ButtonBody>
                    </SelectorButton>
                    <SelectorButton 
                        onClick={() => newActivityForm(SPRAY, props)}>
                        <ButtonBody >
                            {text.spray}
                            <Spray />
                        </ButtonBody>
                    </SelectorButton>
                    <SelectorButton
                        onClick={() => newActivityForm(PEST_MONITOR, props)}>
                        <ButtonBody >
                            {text.pestMonitor}
                            <Spray />
                        </ButtonBody>
                    </SelectorButton>
                    <SelectorButton 
                        onClick={() => newActivityForm(HARVEST, props)}>
                        <ButtonBody >
                            {text.harvest}
                            <Harvest />
                        </ButtonBody>
                    </SelectorButton>
                    <SelectorButton
                        onClick={() => newActivityForm(MARKET, props)}>
                        <ButtonBody >
                            {text.market}
                            <Market />
                        </ButtonBody>
                    </SelectorButton>
                </Box>
            }
        </Box>
    )
}


export default NewActivityTypeSelector;