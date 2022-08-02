import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { DataContainer, TabsBox } from "../../utils";
import { withRouter } from 'react-router-dom'
import Documents from './documents/Documents';
import {
     EXPORT_DOCS,
     SYSTEM_DOCS,
     USER_DOCS,
     DOCUMENT_TABS,
} from "../../components/frame/Routes";

const DocumenttTabs = (props) => {

     const { history, text, match: { params: { subTab } }, user } = props;
     return (
          <TabsBox>
               <Tabs
                    value={subTab}
                    onChange={(event, value) => history.push(`${DOCUMENT_TABS}${value}`)}
                    scrollButtons="auto">

                    <Tab value={EXPORT_DOCS}
                         label={text.exporterDocuments} />
                    <Tab value={SYSTEM_DOCS}
                         label={text.systemDocuments} />
               </Tabs>
               <DataContainer>
                    {subTab === SYSTEM_DOCS && <Documents category={SYSTEM_DOCS} {...props} edit={false} />}
                    {subTab === EXPORT_DOCS && <Documents category={props.isExporter ? USER_DOCS : EXPORT_DOCS} {...props} edit={props.isExporter} />}
               </DataContainer>
          </TabsBox>
     );

}

export default withRouter(DocumenttTabs);
