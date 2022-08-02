import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import authReducer from './AuthReducer';
import languageReducer from './LanguageReducer';
import fieldsStateReducer from './FieldsStateReducer';
import accountReducer from './AccountReducer';
import activityReducer from './ActivityReducer';
import messageReducer from './MessageReducer';
import drawPolygonReducer from './DrawPolygonReducer';
import siteReducer from './SiteReducer';
import fieldReducer from './FieldReducer';
import domainReducer from './DomainReducer';
import parentFieldReducer from './ParentFieldReducer';
import varietyReducer from './VarietyReducer';
import dataFilterReducer from './DataFilterReducer';
import activityDefReducer from './ActivityDefReducer';
import cropReducer from './CropReducer';
import resourceReducer from './ResourceReducer';
import pesticideListReducer from './PesticideListReducer';
import warehouseReducer from './WarehouseReducer';
import containerReducer from './ContainerReducer';
import procurementReducer from './ProcurementReducer';
import dashboardReducer from './DashboardReducer';
import selectionReducer from './SelectionReducer';

import mapReducer from './MapReducer';
import adminReducer from './AdminReducer';

import activityDefTypeReducer from './ActivityDefTypeReducer'
import fileReducer from './FileReducer'
import inventoryReducer from './InventoryReducer'
import waterSystemReducer from './WaterSystemReducer'
import reportReducer from './ReportReducer'
import tariffReducer from './TariffReducer'
import maintenanceReducer from './MaintenanceReducer'
import riskAssessmentReducer from './RiskAssessmentReducer';
import pestReducer from './PestReducer';
import businessReducer from './BusinessReducer';
import filterOptionReducer from './FilterOptionReducer';
import agromonitoringReducer from './AgromonitoringReducer';
import gisReducer from './GISReducer';
import linkReducer from './LinkReducer';
import tagReducer from './TagReducer';

import importExportReducer from './ImportExportReducer';
import activeIngredientReducer from './ActiveIngredientReducer';
import cropGenusReducer from './CropGenusReducer';
import productCategoryReducer from './ProductCategoryReducer';
import notificationsReducer from './NotificationsReducer';
import compoundReducer from './CompoundReducer';
import alertReducer from './AlertReducer';
import trackerReducer from './TrackerReducer';
import updatesReducer from './UpdatesReducer';
import resourceExternalCodeReducer from './ResourceExternalCodeReducer'

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    lang: languageReducer,
    fieldsState: fieldsStateReducer,
    account: accountReducer,
    map: mapReducer,
    activity: activityReducer,
    message: messageReducer,
    drawPolygon: drawPolygonReducer,
    site: siteReducer,
    field: fieldReducer,
    domain: domainReducer,
    parentField: parentFieldReducer,
    variety: varietyReducer,
    dataFilter: dataFilterReducer,
    activityDef: activityDefReducer,
    crop: cropReducer,
    resource: resourceReducer,
    pesticideList: pesticideListReducer,
    warehouse: warehouseReducer,
    container: containerReducer,
    procurement: procurementReducer,
    dashboard: dashboardReducer,
    admin: adminReducer,
    selection: selectionReducer,
    activityDefType: activityDefTypeReducer,
    file: fileReducer,
    inventory: inventoryReducer,
    waterSystem: waterSystemReducer,
    report: reportReducer,
    tariff: tariffReducer,
    maintenance: maintenanceReducer,
    riskAssessment: riskAssessmentReducer,
    pest: pestReducer,
    business: businessReducer,
    filterOption: filterOptionReducer,
    agromonitoring: agromonitoringReducer,
    gis: gisReducer,
    link: linkReducer,
    tag: tagReducer,
    importExport: importExportReducer,
    activeIngredient: activeIngredientReducer,
    productCategory: productCategoryReducer,
    cropGenus: cropGenusReducer,
    notifications: notificationsReducer,
    compounds: compoundReducer,
    alert: alertReducer,
    tracker: trackerReducer,
    updates: updatesReducer,
    resourceExternalCode: resourceExternalCodeReducer,
});


export default rootReducer;
