import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { DataContainer, TabsBox } from "../../utils";
import { withRouter } from 'react-router-dom'
import {
    EXECUTORS, EQUIPMENT, VARIETIES, FERTILIZERS, WATER_SOURCES, ACCESSORIES,
    ACTIVITY_DEFS, TARIFF, RESOURCES_TABS, ACTIVITY_DEF_TYPES, PESTICIDES, CODES
} from "../../components/frame/Routes";
import ExecutorMasterDetails from './executors/ExecutorMasterDetails';
import EquipmentMasterDetails from './equipment/EquipmentMasterDetails';
import VarietyMasterDetails from './varieties/VarietyMasterDetails';
import WaterSourceMasterDetails from './waterSources/WaterSourceMasterDetails';
import FertilizerMasterDetails from './fertilizers/FertilizerMasterDetails';
import AccessoryMasterDetails from './accessories/AccessoryMasterDetails';
import ActivityDefMasterDetails from './activityDefs/ActivityDefMasterDetails';
import ActivityDefTypeMasterDetails from './activityDefTypes/ActivityDefTypeMasterDetails';
import TariffMasterDetails from './tariff/TariffMasterDetails';
import PesticideMasterDetails from '../../admin/resources/pesticides/PesticideMasterDetails';
import ResourceExternalCodeMasterDetails from './codes/ResourceExternalCodeMasterDetails';


const ResourcesTabs = (props) => {
    const { history, text, match: { params: { subTab } }, costing, user: { managePesticides, isAdmin } } = props;
    return (
        <TabsBox>
            <Tabs
                value={subTab}
                onChange={(event, value) => history.push(`${RESOURCES_TABS}${value}`)}
                scrollButtons="auto">
                <Tab value={EXECUTORS} label={text.executors} />
                <Tab value={EQUIPMENT} label={text.equipment} />
                <Tab value={VARIETIES} label={text.varieties} />
                <Tab value={FERTILIZERS} label={text.fertilizers} />
                {managePesticides && <Tab value={PESTICIDES} label={text.pesticides} />}
                <Tab value={WATER_SOURCES} label={text.watersources} />
                <Tab value={ACCESSORIES} label={text.accessories} />
                {isAdmin && <Tab value={CODES} label={text.codes} />}
                <Tab value={ACTIVITY_DEFS} label={text.activities} />
                <Tab value={ACTIVITY_DEF_TYPES} label={text.activityDefTypes} />
                {costing && <Tab value={TARIFF} label={text.tariff} />}
            </Tabs>
            <DataContainer>

                {subTab === EXECUTORS && <ExecutorMasterDetails {...props} />}
                {subTab === EQUIPMENT && <EquipmentMasterDetails {...props} />}
                {subTab === VARIETIES && <VarietyMasterDetails {...props} />}
                {subTab === FERTILIZERS && <FertilizerMasterDetails {...props} />}
                {subTab === PESTICIDES && managePesticides && <PesticideMasterDetails {...props} />}
                {subTab === WATER_SOURCES && <WaterSourceMasterDetails {...props} />}
                {subTab === ACCESSORIES && <AccessoryMasterDetails {...props} />}
                {isAdmin && subTab === CODES && <ResourceExternalCodeMasterDetails {...props} />}
                {subTab === ACTIVITY_DEFS && <ActivityDefMasterDetails {...props} />}
                {subTab === ACTIVITY_DEF_TYPES && <ActivityDefTypeMasterDetails {...props} />}
                {subTab === TARIFF && <TariffMasterDetails {...props} />}

            </DataContainer>
        </TabsBox>
    );

}

export default withRouter(ResourcesTabs);
