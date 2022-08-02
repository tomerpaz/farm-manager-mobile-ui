export function loadData(loadArray, force) {
    if (loadArray) {
        loadArray.forEach(e => {
            if (force === true || e.data.length === 0) {
                e.getData();
            }
        })
    }
}

export const _compounds = 'compounds';
export const _ingredients = 'ingredients';
export const _composts = 'composts';
export const _baseCrops = 'baseCrops';
export const _businesses = 'businesses';
export const _pesticides = 'pesticides';
export const _pests = 'pests';
export const _risks = 'risks';
export const _warehouses = 'warehouses';
export const _products = 'products';
export const _parentFields = 'parentFields';
export const _fields = 'fields';
export const _sites = 'sites';
export const _waterSources = 'waterSources';
export const _customers = 'customers';
export const _crops = 'crops';
export const _containers = 'containers';
export const _activityDefTypes = 'activityDefTypes';
export const _activityDefs = 'activityDefs';
export const _accessories = 'accessories';
export const _pesticideLists = 'pesticideLists';
export const _fertilizers = 'fertilizers';
export const _executors = 'executors';
export const _varieties = 'varieties';
export const _equipment = 'equipment';
export const _disinfectants = 'disinfectants';
export const _alerts = 'alerts';
export const _tags = 'tags';
export const _resourceExternalCodes = '_resourceExternalCodes';



export function loadDataByName(props, names, force) {

    const allLoaders = [
        { name:  _fields, data: props.fields, getData: props.getFields },
        { name: _executors, data: props.executors, getData: props.getExecutors },
        { name: _pesticides, data: props.pesticides, getData: props.getPesticides },
        { name: _fertilizers, data: props.fertilizers, getData: props.getFertilizers },
        { name: _composts, data: props.composts, getData: props.getComposts },
        { name: _waterSources, data: props.waterSources, getData: props.getWaterSources },
        { name: _equipment, data: props.equipment, getData: props.getEquipments },
        { name: _varieties, data: props.varieties, getData: props.getVarieties },
        { name: _disinfectants, data: props.disinfectants, getData: props.getDisinfectants },
        { name: _accessories, data: props.accessories, getData: props.getAccessories },
        { name: _crops, data: props.crops, getData: props.getCrops },
        { name: _baseCrops, data: props.baseCrops, getData: props.getBaseCrops },
        { name: _warehouses, data: props.warehouses, getData: props.getWarehouses },
        { name: _products, data: props.products, getData: props.getProducts },
        { name: _activityDefs, data: props.activityDefs, getData: props.getActivityDefs },
        { name: _activityDefTypes, data: props.activityDefTypes, getData: props.getActivityDefTypes },
        { name: _parentFields, data: props.parentFields, getData: props.getParentFields },
        { name: _sites, data: props.sites, getData: props.getSites },
        { name: _customers, data: props.customers, getData: props.getCustomersAndSuppliers },
        { name: 'suppliers', data: props.suppliers, getData: props.getCustomersAndSuppliers },
        { name: _containers, data: props.containers, getData: props.getContainers },
        { name: 'fieldInPolygonOptions', data: props.fieldInPolygonOptions, getData: props.getFieldInPolygons },
        { name: 'reports', data: props.reports, getData: props.getReportMetaData },
        { name: _pests, data: props.pests, getData: props.getPests },
        { name: 'waterSysAccounts', data: props.waterSysAccounts, getData: props.listWaterSystemAccounts },
        { name: 'linkedGrowers', data: props.linkedGrowers, getData: props.getLinkedGrowers },
        { name: 'gisPolygons', data: props.gisPolygons, getData: props.getGisPolygons },
        { name: 'links', data: props.links, getData: props.getLinks },
        { name: _tags, data: props.tags, getData: props.getTags },
        { name: 'dataModules', data: props.dataModules, getData: props.listDataModules },

        { name: 'activeIngredients', data: props.activeIngredients, getData: props.getActiveIngredients },

        { name: 'cropGenuses', data: props.cropGenuses, getData: props.getCropGenuses },
        { name: 'productCategories', data: props.productCategories, getData: props.getProductCategories },

        { name: 'ggAdminAreas', data: props.ggAdminAreas, getData: props.getGGAdminAreas },

        { name: 'energies', data: props.energies, getData: props.getEnergies },
        { name: _ingredients, data: props.ingredients, getData: props.getIngredients },
        { name: _compounds, data: props.compounds, getData: props.getCompounds },
        { name: _businesses, data: props.businesses, getData: props.getBusinesses },
        { name: _risks, data: props.risks, getData: props.getRisks },
        { name: _pesticideLists, data: props.pesticideLists, getData: props.getPesticideLists },
        { name: _alerts, data: props.alerts, getData: props.getAlerts },
        { name: _resourceExternalCodes, data: props.resourceExternalCodes, getData: props.getResourceExternalCodes },

        

    ]

    loadData(allLoaders.filter(e => names.indexOf(e.name) > -1), force)
}