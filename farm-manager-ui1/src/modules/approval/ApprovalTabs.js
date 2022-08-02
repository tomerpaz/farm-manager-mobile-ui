import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from '@mui/material';
import { DataContainer, TabsBox, APPROVER } from "../../utils";
import { withRouter } from 'react-router-dom'
import {
    QUEUE,
    APPROVAL_TABS,
    DONE,
    IN_PROCESS,
    INVENTORY
} from "../../components/frame/Routes";

import ApprovalForm from './ApprovalForm';
import ApprovalTable from './ApprovalTable';
import InventoryTable from '../cropManagement/inventory/InventoryTable';


const ApprovalTabs = (props) => {
    const { history, text, match: { params: { subTab } }, costing, isInspector, setActivityTableSorting, user: { role } } = props;

    useEffect(() => {
        const tableSort = { columnName: 'statusDate', direction: 'desc' };
        setActivityTableSorting(tableSort);
    }, []);


    return (
        <TabsBox>
            <Tabs
                value={subTab}
                onChange={(event, value) => history.push(`${APPROVAL_TABS}${value}`)}
                scrollButtons="auto">
                <Tab value={QUEUE} label={text.taskQueue} />
                <Tab value={IN_PROCESS} label={text.inProcessTasks} />
                <Tab value={DONE} label={text.approvedTasks} />
                {role === APPROVER && <Tab value={INVENTORY}
                    label={text.inventory} />}
            </Tabs>
            <DataContainer>
                {subTab !== INVENTORY && <ApprovalTable approvalView={subTab} {...props} />}
                {subTab === INVENTORY && <InventoryTable {...props} />}
            </DataContainer>
        </TabsBox>
    );

}

export default withRouter(ApprovalTabs);
