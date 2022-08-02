import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { withRouter } from 'react-router-dom'
import { DataContainer, isBusinessAdminFunc, TabsBox } from "../../utils";
import Documents from './documents/Documents';
import MaintenanceMasterDetails from './maintenance/MaintenanceMasterDetails';
import RiskAssessmentTable from './riskAssessment/RiskAssessmentTable';

import {
     EXPORT_DOCS,
     FOOD_SAFETY_TABS,
     MAINTENANCE,
     RISKS,
     STANDARD,
     SYSTEM_DOCS,
     USER_DOCS,
} from "../../components/frame/Routes";

const FoodSafetyTabs = (props) => {
     const { history, text, match: { params: { subTab } }, user: { role, business: { country } } } = props;
     const showSystemDocs = country === 'israel'
     return (
          <TabsBox >
               <Tabs
                    value={subTab}
                    onChange={(event, value) => history.push(`${FOOD_SAFETY_TABS}${value}`)}
                    scrollButtons="auto">
                    <Tab value={RISKS}
                         label={text.riskManagement} />
                    <Tab value={MAINTENANCE}
                         label={text.maintenance} />
                    <Tab value={STANDARD}
                         label={text.standardDocuments} />
                    <Tab value={USER_DOCS}
                         label={text.myDocuments} />
                    {showSystemDocs && <Tab value={SYSTEM_DOCS}
                         label={text.systemDocuments} />}
                    <Tab value={EXPORT_DOCS}
                         label={text.exporterDocuments} />
               </Tabs>
               <DataContainer>
                    {subTab === RISKS && <RiskAssessmentTable {...props} />}
                    {subTab === MAINTENANCE && <MaintenanceMasterDetails {...props} />}
                    {subTab === STANDARD && <Documents category={STANDARD} {...props} edit={true} />}
                    {subTab === USER_DOCS && <Documents category={USER_DOCS} {...props} edit={true} />}
                    {showSystemDocs && subTab === SYSTEM_DOCS && <Documents category={SYSTEM_DOCS} {...props} edit={false} />}
                    {subTab === EXPORT_DOCS && <Documents category={EXPORT_DOCS} {...props} edit={isBusinessAdminFunc(role)} />}
               </DataContainer>
          </TabsBox>
     );

}

export default withRouter(FoodSafetyTabs);
