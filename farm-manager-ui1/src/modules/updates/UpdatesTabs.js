import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { DataContainer, TabsBox } from "../../utils";
import { withRouter } from 'react-router-dom'
import {
    UPDATES_TABS,
    RESOURCES,
    EXPECTED_PRODUCE,
    UPDATES_RESOUECES,
    UPDATES_EXPECTED_PRODUCE,
} from "../../components/frame/Routes";
import UpdatesResource from './UpdatesResource';
import UpdatesExpectedProduce from './UpdatesExpectedProduce';



export function isUpdates(user) {
    return user.business.updates && user.isAdmin;
}

export function isProUpdates(user) {
    return user.business.updates && user.isAdmin && user.business.updates === 2;
}

export function getUpdatesDefault(user) {
    if (isProUpdates(user)) {
        return UPDATES_RESOUECES;
    } else {
        return UPDATES_EXPECTED_PRODUCE;
    }
}

const UpdatesTabs = (props) => {
    const { history, text, match: { params: { subTab } }, user, wialonGetUnits } = props;

    return (
        <TabsBox>
            <Tabs 
                value={subTab}
                onChange={(event, value) => history.push(`${UPDATES_TABS}${value}`)}
                scrollButtons="auto">
                {isProUpdates(user) && <Tab  value={RESOURCES} label={text.resource} />}
                {/* <Tab  value={EXPECTED_PRODUCE} label={text.expectedProduce} /> */}
            </Tabs>
            <DataContainer>
                <div >
                    {isProUpdates(user) && subTab === RESOURCES && <UpdatesResource  {...props} />}
                    {subTab === EXPECTED_PRODUCE && <UpdatesExpectedProduce {...props} />}
                </div>
            </DataContainer>
        </TabsBox>
    );

}

export default withRouter(UpdatesTabs);
