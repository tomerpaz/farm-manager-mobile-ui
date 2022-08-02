import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { DataContainer, TabsBox } from "../../utils";
import { withRouter } from 'react-router-dom'
import {
    ADMIN_TABS, BUSINESS, SYSTEM_DOCS,
    USER_DOCS,
} from "../../components/frame/Routes";
import Documents from "../../modules/foodSafety/documents/Documents";
import BusinessMasterDetails from "./business/BusinessMasterDetails";

const AdminTabs = (props) => {
    const { history, text, match: { params: { subTab } }, user } = props;
    return (
        <TabsBox>
            <Tabs
                value={subTab}
                onChange={(event, value) => history.push(`${ADMIN_TABS}${value}`)}
                scrollButtons="auto">

                <Tab value={BUSINESS}
                    label={text.businesses} />
                <Tab value={SYSTEM_DOCS}
                    label={text.systemDocuments} />
            </Tabs>
            <DataContainer>
                {subTab === BUSINESS && <BusinessMasterDetails {...props} />}
                {subTab === SYSTEM_DOCS && <Documents category={USER_DOCS} {...props} edit={true} />}

            </DataContainer>
        </TabsBox>
    );

}

export default withRouter(AdminTabs);
