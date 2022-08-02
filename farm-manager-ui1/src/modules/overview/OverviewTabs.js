import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { List, Map, Apps, AttachMoney as FinancialDashboardIcon, PieChart as DashboardIcon, Repeat as CroprotationIcon } from '@mui/icons-material/'
import { withRouter } from 'react-router-dom'
import DomainTable from './list/DomainTable';
import FieldCards from './cards/FieldCards';
import FieldsMap from './map/FieldsMap';
import FinancialDashboard from './financial/FinanchialDashboard';
import QuantitativeDashboard from './quantitative/QuantitativeDashboard';
import CropRotation from './rotation/CropRotation';

import { DataContainer, TabsBox } from "../../utils";
import { CARDS, LIST, MAP, OVERVIEW_TABS, ROTATION, DASHBOARD, FINANCIAL, GLOBALGAP } from "../../components/frame/Routes";
import GlobalGapSvg from '../../icons/GlobalGapSvg';
import Benchmark from './globalgap/Benchmark';
import { isBaseUser } from '../../utils/FarmUtil';

const OverviewTabs = (props) => {
    const { history, match: { params: { subTab } }, costing, fieldCrops, plantations, isInspector, user, user: { business: { ggBearer } } } = props;
    localStorage.setItem('lastOverview', subTab);

    const isDashboard = !isBaseUser(user) && !isInspector
    const isCropRotation = !isBaseUser(user) && fieldCrops

    return (
        <TabsBox >
            <Tabs
                value={subTab} onChange={(event, value) => history.push(`${OVERVIEW_TABS}${value}`)}
            >
                <Tab value={MAP} icon={<Map />} />
                <Tab value={CARDS} icon={<Apps />} />
                <Tab value={LIST} icon={<List />} />
                {isDashboard && <Tab value={DASHBOARD} icon={<DashboardIcon />} />}
                {costing && <Tab value={FINANCIAL} icon={<FinancialDashboardIcon />} />}
                {isCropRotation && <Tab value={ROTATION} icon={<CroprotationIcon />} />}
                {ggBearer && <Tab value={GLOBALGAP} sx={{ padding: 0, alignItems: 'center' }} icon={<GlobalGapSvg width={40} />} />}

            </Tabs>
            <DataContainer>
                <div >
                    {subTab === LIST && <DomainTable {...props}
                        onEdit={(tableRow) => history.push('/fields/base/plant/' + tableRow.row.id)} />}
                    {subTab === CARDS && <FieldCards {...props} />}
                    {subTab === MAP && <FieldsMap {...props} />}
                    {subTab === DASHBOARD && <QuantitativeDashboard {...props} />}
                    {subTab === ROTATION && <CropRotation {...props} />}
                    {subTab === FINANCIAL && <FinancialDashboard {...props} />}
                    {subTab === GLOBALGAP && <Benchmark {...props} />}

                </div>
            </DataContainer>
        </TabsBox>
    );

}

export default withRouter(OverviewTabs);
