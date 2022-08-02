import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { DataContainer, TabsBox } from "../../utils";
import { withRouter } from 'react-router-dom'
import {
    ADMIN_RESOURCES_TABS,
    COMPOST,
    DISINFECTANTS,
    FERTILIZERS,
    PESTICIDES,
    CROPS,
    INGREDIENTS,
} from "../../components/frame/Routes";
import AdminCropMasterDetails from "./crops/AdminCropMasterDetails";
import FertilizerMasterDetails from "../../modules/resources/fertilizers/FertilizerMasterDetails";
import CompostMasterDetails from "./composts/CompostMasterDetails";
import DisinfectantMasterDetails from "./disinfectants/DisinfectantMasterDetails";
import PesticideMasterDetails from "./pesticides/PesticideMasterDetails";
import IngredientMasterDetails from "./ingredient/IngredientMasterDetails";

const FoodSafetyTabs = (props) => {

    const { history, text, match: { params: { subTab } }, user } = props;

    return (
        <TabsBox >
            <Tabs
                value={subTab}
                onChange={(event, value) => history.push(`${ADMIN_RESOURCES_TABS}${value}`)}
                scrollButtons="auto">
                <Tab value={CROPS}
                    label={text.crops} />
                <Tab value={PESTICIDES}
                    label={text.pesticides} />
                <Tab value={COMPOST}
                    label={text.compost} />
                <Tab value={DISINFECTANTS}
                    label={text.disinfectants} />
                <Tab value={FERTILIZERS}
                    label={text.fertilizers} />
                <Tab value={INGREDIENTS}
                    label={text.ingredients} />
            </Tabs>
            <DataContainer>
                {subTab === CROPS && <AdminCropMasterDetails {...props} />}
                {subTab === PESTICIDES && <PesticideMasterDetails {...props} />}
                {subTab === COMPOST && <CompostMasterDetails {...props} />}
                {subTab === DISINFECTANTS && <DisinfectantMasterDetails {...props} />}
                {subTab === FERTILIZERS && <FertilizerMasterDetails selectLocale={true} {...props} />}
                {subTab === INGREDIENTS && <IngredientMasterDetails {...props} />}
            </DataContainer>
        </TabsBox>
    );

}

export default withRouter(FoodSafetyTabs);
