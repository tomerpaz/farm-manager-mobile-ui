import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { withRouter } from 'react-router-dom'
import { DataContainer, TabsBox } from "../../utils";
import {
    ACTIVITIES,
    BULK,
    CROP_MANAGEMENT_TABS,
    INVENTORY,
    INVENTORY_UPDATE,
    PLANS,
    PROCUREMENT
} from "../../components/frame/Routes";

import ActivityTable from './activities/ActivityTable';
import ActivityPlanTable from './activities/ActivityPlanTable';
import ProcurementTable from './procurement/ProcurementTable'
import InventoryTable from './inventory/InventoryTable';
import BulkUpdate from './bulkUpdate/BulkUpdate';
import InventoryUpdateMasterDetails from './inventoryUpdates/InventoryUpdateMasterDetails';
import { isBaseUser } from '../../utils/FarmUtil';

const CropManagementTabs = (props) => {
    const { history, text, match: { params: { subTab } }, costing, isInspector, user, user: { externalInventory } } = props;
    const nonBasic = !isBaseUser(user)
    const isInventory = !isBaseUser(user) && !isInspector;
    const isInventoryUpdate = !isBaseUser(user) && !isInspector && !externalInventory;
    return (
        <TabsBox >
            <Tabs
                value={subTab}
                onChange={(event, value) => history.push(`${CROP_MANAGEMENT_TABS}${value}`)}
                scrollButtons="auto">
                {nonBasic && <Tab value={PLANS} label={text.plans} />}
                <Tab value={ACTIVITIES}
                    label={text.activities} />
                {costing && <Tab value={PROCUREMENT}
                    label={text.procurement} />}
                {isInventory && <Tab value={INVENTORY}
                    label={text.inventory} />}
                {isInventoryUpdate && <Tab value={INVENTORY_UPDATE}
                    label={text.inventoryUpdate} />}
            </Tabs>
            <DataContainer>
                {subTab === PLANS && <ActivityPlanTable isPlans={true} {...props} />}
                {subTab === ACTIVITIES && <ActivityTable isPlans={false} {...props} />}
                {subTab === PROCUREMENT && <ProcurementTable {...props} />}
                {subTab === INVENTORY && <InventoryTable {...props} />}
                {subTab === INVENTORY_UPDATE && !externalInventory && <InventoryUpdateMasterDetails {...props} />}
                {subTab === BULK && <BulkUpdate {...props} />}
            </DataContainer>
        </TabsBox>
    );

}

export default withRouter(CropManagementTabs);
