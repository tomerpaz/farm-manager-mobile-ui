import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { DataContainer, TabsBox } from "../../utils";
import { withRouter } from 'react-router-dom'
import {
    PARENT_FIELDS, FIELDS, SITES, UTILITIES_TABS, CUSTOMERS, QUALITIES, WAREHOUSES, PESTICIDE_LISTS,
    CONTAINERS, PRODUCTS, CROPS, TAGS, COMPOUNDS, ALERTS
} from "../../components/frame/Routes";
import FieldMasterDetails from './fields/FieldMasterDetails';
import ParentFieldMasterDetails from './parentFields/ParentFieldMasterDetails';
import SiteMasterDetails from './sites/SiteMasterDetails';
import CropMasterDetails from './crops/CropMasterDetails';
import CustomerSupplierMasterDetails from './customers/CustomerSupplierMasterDetails';
import WarehouseMasterDetails from './warehouses/WarehouseMasterDetails';
import ContainerMasterDetails from './containers/ContainerMasterDetails';
import ProductMasterDetails from './products/ProductMasterDetails';
import TagMasterDetails from './tags/TagMasterDetails';
import { CONTAINER, MARKET } from "./containers/ContainerTable";
import PesticideListMasterDetails from "../../admin/utilities/lists/PesticideListMasterDetails";
import CompoundMasterDetails from './compounds/CompoundMasterDetails';
import AlertMasterDetails from './alerts/AlertMasterDetails';



const UtilitiesTabs = (props) => {

    const { history, text, match: { params: { subTab } }, isInspector } = props;

    if (isInspector) {
        return (
            <TabsBox>
                <Tabs
                    value={subTab}
                    onChange={(event, value) => history.push(`${UTILITIES_TABS}${value}`)}
                    scrollButtons="auto">
                    <Tab value={PESTICIDE_LISTS} label={text.pesticideLists} />
                </Tabs>
                <DataContainer>
                    {subTab === PESTICIDE_LISTS && <PesticideListMasterDetails {...props} />}
                </DataContainer>
            </TabsBox>
        )
    }
    return (
        <TabsBox>
            <Tabs
                value={subTab}
                onChange={(event, value) => history.push(`${UTILITIES_TABS}${value}`)}
                scrollButtons="auto">

                <Tab value={FIELDS} label={text.fields} />
                <Tab value={PARENT_FIELDS} label={text.parentFields} />
                <Tab value={SITES} label={text.sites} />
                <Tab value={ALERTS} label={text.notifications} />
                <Tab value={CROPS} label={text.crops} />
                <Tab value={CUSTOMERS} label={text.customersSuppliers} />
                <Tab value={WAREHOUSES} label={text.warehouses} />
                <Tab value={PESTICIDE_LISTS} label={text.pesticideLists} />
                <Tab value={COMPOUNDS} label={text.compounds} />
                <Tab value={CONTAINERS} label={text.containers} />
                <Tab value={QUALITIES} label={text.marketingQualities} />
                <Tab value={PRODUCTS} label={text.cropSize} />
                <Tab value={TAGS} label={text.tags} />
            </Tabs>
            <DataContainer>

                {subTab === FIELDS && <FieldMasterDetails {...props} />}
                {subTab === PARENT_FIELDS && <ParentFieldMasterDetails {...props} />}
                {subTab === SITES && <SiteMasterDetails {...props} />}
                {subTab === CROPS && <CropMasterDetails {...props} />}
                {subTab === CUSTOMERS && <CustomerSupplierMasterDetails {...props} />}
                {subTab === WAREHOUSES && <WarehouseMasterDetails {...props} />}
                {subTab === PESTICIDE_LISTS && <PesticideListMasterDetails {...props} />}
                {subTab === COMPOUNDS && <CompoundMasterDetails {...props} />}
                {subTab === CONTAINERS && <ContainerMasterDetails containerType={CONTAINER} {...props} />}
                {subTab === QUALITIES && <ContainerMasterDetails containerType={MARKET} {...props} />}
                {subTab === PRODUCTS && <ProductMasterDetails {...props} />}
                {subTab === TAGS && <TagMasterDetails  {...props} />}
                {subTab === ALERTS && <AlertMasterDetails  {...props} />}

            </DataContainer>
        </TabsBox>
    );

}

export default withRouter(UtilitiesTabs);
