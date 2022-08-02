// Overview Tab
export const OVERVIEW_TABS = '/overview/';
export const MAP = 'map';
export const ROTATION = 'rotation';
export const DASHBOARD = 'dashboard';
export const FINANCIAL = 'financial';
export const GLOBALGAP = 'gg';


export const CARDS = 'cards';
export const LIST = 'list';
export const OVERVIEW_MAP = `${OVERVIEW_TABS}${MAP}`;
export const OVERVIEW_CARDS = `${OVERVIEW_TABS}${CARDS}`;
export const OVERVIEW_LIST = `${OVERVIEW_TABS}${LIST}`;
export const OVERVIEW_ALL = [CARDS, LIST, MAP, ROTATION,DASHBOARD, FINANCIAL ]

export const LINKS = '/links';


export const OVERVIEW_DEFAULT = OVERVIEW_CARDS;//default


//Crop Management Tab
export const CROP_MANAGEMENT_TABS = '/cmgnt/';
export const PLANS = 'plans';
export const ACTIVITIES = 'activities';
export const PROCUREMENT = 'procurement';
export const INVENTORY = 'inventory';
export const INVENTORY_UPDATE = 'inupdate';
export const BULK = 'bulk';
export const CROP_MANAGEMENT_ACTIVITIES = `${CROP_MANAGEMENT_TABS}${ACTIVITIES}`;
export const CROP_MANAGEMENT_PLANS = `${CROP_MANAGEMENT_TABS}${PLANS}`;
export const CROP_MANAGEMENT_PROCUREMENT = `${CROP_MANAGEMENT_TABS}${PROCUREMENT}`;
export const CROP_MANAGEMENT_DEFAULT = CROP_MANAGEMENT_ACTIVITIES;//default


// Approval tabs
export const APPROVAL_TABS = '/approvals/';
export const QUEUE = 'queue';
export const IN_PROCESS = 'inprocess';
export const DONE = 'done';
export const APPROVAL_QUEUE = `${APPROVAL_TABS}${QUEUE}`;
export const APPROVAL_IN_PROCESS = `${APPROVAL_TABS}${IN_PROCESS}`;
export const APPROVAL_DONE = `${APPROVAL_TABS}${DONE}`;
export const APPROVAL_DEFAULT = APPROVAL_QUEUE;//default

//food safety
export const FOOD_SAFETY_TABS = '/fsafety/';
export const RISKS = 'risks';
export const MAINTENANCE = 'maintenance';
export const STANDARD = 'standard';
export const USER_DOCS = 'userdocs';
export const SYSTEM_DOCS = 'sysdocs';
export const EXPORT_DOCS = 'exportdocs';

export const FOOD_SAFETY_RISKS = `${FOOD_SAFETY_TABS}${RISKS}`;
export const FOOD_SAFETY_MAINTENANCE = `${FOOD_SAFETY_TABS}${MAINTENANCE}`;
export const FOOD_SAFETY_DEFAULT = FOOD_SAFETY_RISKS;
export const RISK_ASSESSMENT_FORM = `/assessment/form/`;

//documents 
export const DOCUMENT_TABS = '/doc/';
export const APPROVER_DOCUMENT_DEFAULT = `${DOCUMENT_TABS}${EXPORT_DOCS}`;;


// analysis
export const ANALYSIS_TABS = '/analysis/';
export const MANAGEMENT = 'management';
export const FOOD_SAFETY = 'fsafety';
export const CUSTOM = 'custom';
export const HARVEST = 'harvest';
export const FERTILIZE_IRRIGATION = 'fertilize_irrigation';
export const MARKET = 'market';


//export const PLANS = 'plans';
export const COMPARE = 'compare';
export const ANALYSIS_TABS_MANAGEMENT = `${ANALYSIS_TABS}${MANAGEMENT}`;
export const ANALYSIS_TABS_FINANCIAL = `${ANALYSIS_TABS}${FINANCIAL}`;
export const ANALYSIS_TABS_STANDARDS = `${ANALYSIS_TABS}${FOOD_SAFETY}`;

export const ANALYSIS_DEFAULT = ANALYSIS_TABS_MANAGEMENT;

//resources
export const RESOURCES_TABS = '/resources/';
export const EXECUTORS = 'executors';
export const EQUIPMENT = 'equipment';
export const VARIETIES = 'varieties';
export const FERTILIZERS = 'fertilizers';
export const WATER_SOURCES = 'water';
export const ACCESSORIES = 'accessories';
export const ACTIVITY_DEFS = 'activityDefs';
export const ACTIVITY_DEF_TYPES = 'activityDefTypes';
export const TARIFF = 'tariff';
export const CODES = 'codes';
export const RESOURCES_TABS_VARIETIES = `${RESOURCES_TABS}${VARIETIES}`;
export const RESOURCES_TABS_EXECUTORS = `${RESOURCES_TABS}${EXECUTORS}`;
export const RESOURCES_TABS_EQUIPMENT = `${RESOURCES_TABS}${EQUIPMENT}`;

export const RESOURCES_TABS_DEFAULT = RESOURCES_TABS_EXECUTORS;
export const RESOURCE_TABS_ACTIVITY_DEFS = `${RESOURCES_TABS}${ACTIVITY_DEFS}`;

// export const QUICK_ADD = '/quick/';


// utilities
export const UTILITIES_TABS = '/utilities/';
export const FIELDS = 'fields';
export const PARENT_FIELDS = 'pfields';
export const SITES = 'sites';
export const CROPS = 'crops';
export const SUPPLIERS = 'suppliers';
export const CUSTOMERS = 'customers';
export const WAREHOUSES = 'warehouses';
export const PESTICIDE_LISTS = 'plists';
export const CONTAINERS = 'containers';
export const QUALITIES = 'qualities';
export const TAGS = 'tags';
export const COMPOUNDS = 'compounds';
export const ALERTS = 'alerts';

export const PRODUCTS = 'products';
export const UTILITIES_TABS_FIELDS = `${UTILITIES_TABS}${FIELDS}`;
export const UTILITIES_DEFAULT = UTILITIES_TABS_FIELDS;
export const INSPECTOR_UTILITIES_DEFAULT = `${UTILITIES_TABS}${PESTICIDE_LISTS}`;
export const GROUP_UTILITIES_DEFAULT = `${UTILITIES_TABS}${ACTIVITY_DEFS}`;


//upload
export const UPLOAD = '/upload/';

//domain
export const DOMAIN = '/domain/';
export const END = '/domain/';
export const ACTIVITY_FROM = '/activity/form/';
export const PLAN_FROM = '/plan/form/';
export const PROCUREMENT_FORM = '/procurement/form/';
export const DOMAIN_HISTORY = '/history/';
export const SPLIT = '/split/';
export const GPS = '/gps/';
export const APPROVAL_FROM = '/approval/form/';

//settings
export const SETTINGS_TABS = '/settings/';
export const USER = 'user';
export const PASSWORD = 'password';
export const ORGANIZATION = 'organization';
export const INTERFACES = 'interfaces';
export const USERS = 'users';
export const SETTINGS_USER = `${SETTINGS_TABS}${USER}`;
export const SETTINGS_USERS = `${SETTINGS_TABS}${USERS}`;
export const SETTINGS_ORGANIZATION = `${SETTINGS_TABS}${ORGANIZATION}`;
export const SETTINGS_INTERFACES = `${SETTINGS_TABS}${INTERFACES}`;
export const URLS = 'urls';

//notifications
export const NOTIFICATIONS = '/notifications';

export const WATERSYS = '/watersys/';
export const TALGIL = 'talgil';
export const ICC = 'icc';
export const ICCPRO = 'iccpro';
export const GALCON = 'galcon';
export const GENERIC = 'generic';
export const FERTILIZEHUB = '/fertilizehub';
export const GIS_SETTINGS = '/gis';
export const DATA_EXCHANGE = '/data';
export const WIALON = '/wialon';

export const GIS = 'gis';



export const WATERSYS_TALGIL = `${WATERSYS}${TALGIL}`;
export const WATERSYS_ICC = `${WATERSYS}${ICC}`;
export const WATERSYS_ICCPRO = `${WATERSYS}${ICCPRO}`;
export const WATERSYS_GALCON = `${WATERSYS}${GALCON}`;
export const WATERSYS_GENERIC = `${WATERSYS}${GENERIC}`;



// -------- admin start --------
export const ADMIN_TABS = '/admin/'
export const BUSINESS = 'business'
export const ADMIN_BUSINESS = `${ADMIN_TABS}${BUSINESS}`;
export const ADMIN_DOCUMENTS = `${ADMIN_TABS}${SYSTEM_DOCS}`;
export const ADMIN_TABS_DEFAULT = ADMIN_BUSINESS


export const ADMIN_RESOURCES_TABS = '/adminresources/';
export const PESTICIDES = 'pesticides';
export const COMPOST = 'compost';
export const DISINFECTANTS = 'disinfectants';
export const INGREDIENTS = 'ingredients';

export const ADMIN_PESTICIDES = `${ADMIN_RESOURCES_TABS}${PESTICIDES}`;
export const ADMIN_COMPOSRT = `${ADMIN_RESOURCES_TABS}${COMPOST}`;
export const ADMIN_DISINFECTANT = `${ADMIN_RESOURCES_TABS}${DISINFECTANTS}`;
export const ADMIN_FERTILIZERS = `${ADMIN_RESOURCES_TABS}${FERTILIZERS}`;
export const ADMIN_CROPS = `${ADMIN_RESOURCES_TABS}${CROPS}`;
export const ADMIN_RESOURCES_TABS_DEFAULT = ADMIN_CROPS;;


export const ADMIN_UTILITY_TABS = '/adminutilities/';
export const PESTS = 'pests';
export const ADMIN_RISKS = `${ADMIN_UTILITY_TABS}${RISKS}`;
export const ADMIN_PESTS = `${ADMIN_UTILITY_TABS}${PESTS}`;
export const ADMIN_PESTICIDE_LISTS = `${ADMIN_UTILITY_TABS}${PESTICIDE_LISTS}`;
export const ADMIN_UTILITY_TABS_DEFAULT = ADMIN_PESTICIDE_LISTS;

export const ADMIN_STANDARDS_TABS = '/adminstandards/';
export const PRODUCT_CATEGORIES = 'productcategories';
export const CROP_GENUS = 'cropgenus';
export const ACTIVE_INGREDIENT = 'activeingredient';
export const ADMIN_PRODUCT_CATEGORIES = `${ADMIN_STANDARDS_TABS}${PRODUCT_CATEGORIES}`;
export const ADMIN_CROP_GENUS = `${ADMIN_STANDARDS_TABS}${CROP_GENUS}`;
export const ADMIN_ACTIVE_INGREDIENT = `${ADMIN_STANDARDS_TABS}${ACTIVE_INGREDIENT}`;
export const ADMIN_STANDARDS_TABS_DEFAULT = ADMIN_ACTIVE_INGREDIENT;


// -------- admin end  --------

// -------- exporter start --------
export const EXPORTER_TABS = '/exporter/'
export const EXPORTER_GROWERS = `${EXPORTER_TABS}${BUSINESS}`;
export const EXPORTER_DOCUMENTS = `${EXPORTER_TABS}${EXPORT_DOCS}`;
export const EXPORTER_PESTICIDE_LISTS = `${EXPORTER_TABS}${PESTICIDE_LISTS}`;
export const EXPORTER_REPORTS = '/reports/'


// -------- exporter end  --------


// updates
export const UPDATES_TABS = '/updates/';
export const RESOURCES = 'resources';
export const EXPECTED_PRODUCE = 'exepectedProduce';
export const UPDATES_RESOUECES = `${UPDATES_TABS}${RESOURCES}`;
export const UPDATES_EXPECTED_PRODUCE = `${UPDATES_TABS}${EXPECTED_PRODUCE}`;

// tracker
export const TRACKER_TABS = '/tracker/';
export const UNITS = 'units';
export const TRACKER_UNITS = `${TRACKER_TABS}${UNITS}`;
export const TRACKER_ACTIVITES = `${TRACKER_TABS}${ACTIVITIES}`;
export const TRACKER_TABS_DEFAULT = TRACKER_UNITS

export const TRACKER = 'tracker';
