import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { DataContainer, TabsBox } from "../utils";
import { withRouter } from 'react-router-dom'
import { UTILITIES_TABS, ACTIVITY_DEF_TYPES, ACTIVITY_DEFS } from '../components/frame/Routes';
import ActivityDefMasterDetails from '../modules/resources/activityDefs/ActivityDefMasterDetails';
import ActivityDefTypeMasterDetails from '../modules/resources/activityDefTypes/ActivityDefTypeMasterDetails';

const GroupUtilityTabs = (props) => {
    const { history, text, match: { params: { subTab } }, user } = props;
    return (
        <TabsBox>
            <Tabs
                value={subTab}
                onChange={(event, value) => history.push(`${UTILITIES_TABS}${value}`)}
                scrollButtons="auto">

                <Tab value={ACTIVITY_DEFS} label={text.activities} />
                <Tab value={ACTIVITY_DEF_TYPES} label={text.activityDefTypes} />

            </Tabs>
            <DataContainer>
                {subTab === ACTIVITY_DEFS && <ActivityDefMasterDetails {...props} />}
                {subTab === ACTIVITY_DEF_TYPES && <ActivityDefTypeMasterDetails {...props} />}
            </DataContainer>
        </TabsBox>
    );

}

export default withRouter(GroupUtilityTabs);
