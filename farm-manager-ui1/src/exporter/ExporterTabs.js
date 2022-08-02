import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { DataContainer, TabsBox } from "../utils";
import { withRouter } from 'react-router-dom'
import {
    BUSINESS,
    USER_DOCS,
    EXPORT_DOCS,
    PESTICIDE_LISTS,
} from "../components/frame/Routes";
import Documents from "../modules/foodSafety/documents/Documents";
import { EXPORTER_TABS } from '../components/frame/Routes';
import PesticideListMasterDetails from '../admin/utilities/lists/PesticideListMasterDetails';
import GrowerTable from './growers/GrowerTable';

const ExporterTabs = (props) => {


    const { history, text, match: { params: { subTab } }, user, pesticides } = props;
    return (
        <TabsBox>
            <Tabs
                value={subTab}
                onChange={(event, value) => history.push(`${EXPORTER_TABS}${value}`)}
                scrollButtons="auto">

                <Tab  value={BUSINESS}
                    label={text.growers} />
                <Tab  value={EXPORT_DOCS}
                    label={text.exporterDocuments} />
                <Tab  value={PESTICIDE_LISTS}
                    label={text.pesticideLists} />

            </Tabs>
            <DataContainer>
                {subTab === BUSINESS && <GrowerTable {...props}/>}
                {subTab === EXPORT_DOCS && <Documents category={USER_DOCS} {...props} edit={true} />}
                {subTab === PESTICIDE_LISTS && <PesticideListMasterDetails {...props}/>}

            </DataContainer>
        </TabsBox>
    );

}

export default withRouter(ExporterTabs);
