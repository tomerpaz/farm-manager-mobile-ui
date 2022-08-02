import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { DataContainer, TabsBox } from "../../utils";
import { withRouter } from 'react-router-dom'
import {
    ADMIN_STANDARDS_TABS,
    CROP_GENUS, PRODUCT_CATEGORIES, ACTIVE_INGREDIENT
} from "../../components/frame/Routes";

import ActiveIngredientMasterDetails from './ingredients/ActiveIngredientMasterDetails';
import CropGenusMasterDetails from './cropgenus/CropGenusMasterDetails';
import ProductCategoryMasterDetails from './products/ProductCategoryMasterDetails';

const AdminStandardsTabs = (props) => {

    const { history, text, match: { params: { subTab } }, user } = props;
    return (
        <TabsBox>
            <Tabs
                value={subTab}
                onChange={(event, value) => history.push(`${ADMIN_STANDARDS_TABS}${value}`)}
                scrollButtons="auto">
                <Tab value={ACTIVE_INGREDIENT}
                    label={text.activeIngredients} />
                <Tab value={CROP_GENUS}
                    label={text.varieties} />
                <Tab value={PRODUCT_CATEGORIES}
                    label={text.productCategories} />


            </Tabs>
            <DataContainer>
                {subTab === ACTIVE_INGREDIENT && <ActiveIngredientMasterDetails {...props} />}
                {subTab === CROP_GENUS && <CropGenusMasterDetails {...props} />}
                {subTab === PRODUCT_CATEGORIES && <ProductCategoryMasterDetails {...props} />}
            </DataContainer>
        </TabsBox>
    );

}

export default withRouter(AdminStandardsTabs);
