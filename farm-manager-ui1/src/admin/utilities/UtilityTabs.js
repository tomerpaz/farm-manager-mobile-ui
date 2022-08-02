import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { DataContainer, TabsBox } from "../../utils";
import { withRouter } from 'react-router-dom'
import RiskMasterDetails from './risks/RiskMasterDetails'
import PesticideListMasterDetails from './lists/PesticideListMasterDetails'

import {
    ADMIN_UTILITY_TABS,
    PESTICIDE_LISTS, PESTS,
    RISKS,
} from "../../components/frame/Routes";
import PestMasterDetails from "./pests/PestMasterDetails";

const FoodSafetyTabs = (props) => {
    const { history, text, match: { params: { subTab } }, user } = props;
    return (
        <TabsBox>
            <Tabs
                value={subTab}
                onChange={(event, value) => history.push(`${ADMIN_UTILITY_TABS}${value}`)}
                scrollButtons="auto">

                <Tab value={PESTICIDE_LISTS}
                    label={text.pesticideLists} />
                <Tab value={PESTS}
                    label={text.pests} />
                <Tab value={RISKS}
                    label={text.risks} />

            </Tabs>
            <DataContainer>
                {subTab === PESTICIDE_LISTS && <PesticideListMasterDetails {...props} />}
                {subTab === PESTS && <PestMasterDetails {...props} />}
                {subTab === RISKS && <RiskMasterDetails {...props} />}
            </DataContainer>
        </TabsBox>
    );

}

export default withRouter(FoodSafetyTabs);
