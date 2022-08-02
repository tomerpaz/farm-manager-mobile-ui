import {filter, uniqBy} from 'lodash';
import {isEmpty} from "../../utils/StringUtil";
import {ACTIVITY_PLAN_TYPES, ACTIVITY_TYPES} from "../../modules/activity/types";


export function getElementText(arr, text, prefix, lower) {
    return arr.map(e => {
        return (
            {
                value: prefix ? prefix + '_' + e : e,
                label: lower ? text[e.toLowerCase()] : text[e]
            })
    })
}


export function getActivityTypeFilter(isPlans, text) {

    if (isPlans) {
        return [
            {value: 'status_PLAN', label: text.plan},
            {value: 'status_EXECUTED', label: text.executed}
        ].concat(ACTIVITY_PLAN_TYPES.map(type => (
            {value: 'activityType_' + type, label: text[type.replace('_PLAN', '').toLowerCase()]}
        )));
    }

    else {
        return ACTIVITY_TYPES.map(type => (
            {value: 'activityType_' + type, label: text[type.toLowerCase()]}
        ));
    }
}
function addBusinessName(domain, txt){
        return txt + (domain.businessName ? domain.businessName : '')   
}

function getFieldName(domain){
    return domain.field.name + (isEmpty(domain.field.code) ? '' : ' ('+domain.field.code+')');   
}

export function buildDomainFilter(domains, cropID) {
    const filterDomains = cropID ? domains.filter(domain => domain.variety.cropID === cropID) : domains;

    let fieldFilter = filterDomains.map(domain => (
        {
            value: 'field_' + domain.field.id,
            label: addBusinessName(domain, getFieldName(domain)),
        }
    ));

    let sites = filterDomains.map(domain => {
        if (domain.field.site)
            return (
                {
                    value: 'site_' + domain.field.site.id,
                    label: domain.field.site.name
                }
            )
    });
    let parentField = filterDomains.map(domain => {
        if (domain.field.parentField)
            return (
                {
                    value: 'parentField_' + domain.field.parentField.id,
                    label: domain.field.parentField.name
                }
            )
    });
    let crops = filterDomains.filter(domain => !isEmpty(domain.variety.identification)).map(domain => (
        {
            value: 'crop_' + domain.variety.cropID,
            label: addBusinessName(domain, domain.variety.category),
        }
    ));
    let varieties = filterDomains.filter(domain => !isEmpty(domain.variety.name)).map(domain => {
        return (
            {
                value: 'variety_' + domain.variety.id,
                label: addBusinessName(domain, domain.variety.name),

            }
        )
    });

    let tag1 = filterDomains.map(domain => {
        if (domain.tag1)
            return (
                {
                    value: 'tag1_' + domain.tag1.id,
                    label: domain.tag1.name
                }
            )
    });

    let tag2 = filterDomains.map(domain => {
        if (domain.tag2)
            return (
                {
                    value: 'tag2_' + domain.tag2.id,
                    label: domain.tag2.name
                }
            )
    });

    let all = [];
    if (!cropID) {
        all = all.concat(uniqBy(crops, 'value'));
    }
    all = all.concat(uniqBy(varieties, 'value'));
    all = all.concat(uniqBy(sites, 'value'));
    all = all.concat(uniqBy(parentField, 'value'));
    all = all.concat(uniqBy(fieldFilter, 'value'));
    all = all.concat(uniqBy(tag1, 'value'));
    all = all.concat(uniqBy(tag2, 'value'));

    return all.filter((element) => element !== undefined);
}


export function filterDomainsFreeText(domains, filter) {
    if (isEmpty(filter)) {
        return domains;
    }
    return domains.filter(d =>
        d.field.name.includes(filter) ||
        d.variety.name.includes(filter) ||
        d.variety.category.includes(filter) ||
        (!isEmpty(''+d.year) && (''+d.year).includes(filter)) ||
        (!isEmpty(d.alias) && d.alias.includes(filter)) ||
        // (d.field.site !== null && d.field.site.name.includes(filter)) ||
        (d.field.parentField !== null && !isEmpty(d.field.parentField.code) && d.field.parentField.code.includes(filter))
    );
}

export function filterDomainsByStatus(domains, status) {
    if(domains && 'active' === status){
        return domains.filter(e => !e.root);
    } else if(domains && 'inactive' === status){
        return domains.filter(e => e.root);
    } else {
        return domains;
    }
}

export function filterFields(data, filterValue) {
    const fields = extractFilterId(filterValue, 'field_');
    const sites = extractFilterId(filterValue, 'site_');
    const parentFields = extractFilterId(filterValue, 'parentField_');
    if(fields.length > 0 || sites.length > 0 || parentFields.length > 0 ){
        return data.filter((f) => fields.includes( f.id ) || 
                                  (f.site && sites.includes(f.site.id)) ||
                                  (f.parentField && parentFields.includes(f.parentField.id))
        )
    }

    return data;

}
export function filterDomains(domains, filterValue, cropID) {

    //{value: "variety_24963", label: "אטינגר"}
    let data = cropID ? domains.filter(d => d.variety.cropID === cropID) : domains;
    const fields = extractFilterValue(filterValue, 'field_');
    const code = extractFilterValue(filterValue, 'code_');
    const sites = extractFilterValue(filterValue, 'site_');
    const parentFields = extractFilterValue(filterValue, 'parentField_');
    const crops = extractFilterValue(filterValue, 'crop_');
    const varieties = extractFilterValue(filterValue, 'variety_');
    const growers = extractFilterValue(filterValue, 'grower_');

    const tag1 = extractFilterValue(filterValue, 'tag1_');
    const tag2 = extractFilterValue(filterValue, 'tag2_');
 
    if(growers.length > 0){
        data = data.filter(e=> growers.includes(e.field.username))
    }
    if (sites.length > 0 || parentFields.length > 0 || fields.length > 0 || code.length > 0 || crops.length > 0 || varieties.length > 0  
        || tag1.length > 0 || tag2.length > 0 ) {
        return filter(data, (domain) => {
            if (crops.indexOf('' + domain.variety.cropID) > -1) {
                return true;
            }
            if (varieties.indexOf('' + domain.variety.id) > -1) {
                return true;
            }
            if (domain.field.parentField && parentFields.indexOf('' + domain.field.parentField.id) > -1) {
                return true;
            }
            if (domain.field.site && sites.indexOf('' + domain.field.site.id) > -1) {
                return true;
            }
            if (domain.field.parentField && parentFields.indexOf('' + domain.field.parentField.id) > -1) {
                return true;
            }
            if (fields.indexOf('' + domain.field.id) > -1) {
                return true;
            }
            if (!isEmpty(domain.field.code) && crops.indexOf(domain.field.code) > -1) {
                return true;
            }
            if (domain.tag1 && tag1.includes('' + domain.tag1.id)) {
                return true;
            }
            if (domain.tag2 && tag2.includes('' + domain.tag2.id)) {
                return true;
            }
            return false;

        });
    }
    return data;
}

export function extractFilterValue(filterArr, prefix) {
    return filter(filterArr, (o) => o && o.value && o.value.startsWith(prefix)).map((element, index) => (element.value.replace(prefix, '')));
}

export function extractFilterId(filterArr, prefix) {
    return filterArr.filter(e=> e.value.startsWith(prefix)).map((element, index) => element.id);
    //return filter(filterArr, (o) => o && o.value && o.value.startsWith(prefix)).map((element, index) => element.id);
}

export function filterWithPrefix(data, filterValue, idPrefix, prefix2) {

    if (filterValue && filterValue.length > 0) {

        const ids = filterValue.map(e => e.value);
        let result = data.filter(e => ids.includes(idPrefix + '_' + e.id) || ids.includes(prefix2 + '_' + e.id))
        return result;
    }
    return data;
}

/*

 */
export function filterWithPesticideList(data, filterValue, freeTextFilter) {
    let result = data;
    if (filterValue && filterValue.length > 0) {
        const filterValues = filterValue.map(e => e.value);
        result = data.filter(e =>
            filterValues.includes('resource_' + e.resource.id)
        );
    }

    if (!isEmpty(freeTextFilter)) {
        result = result.filter(e =>
            e.resource.name.toLowerCase().includes(freeTextFilter.toLowerCase()) ||
            e.pestText.toLowerCase().includes(freeTextFilter.toLowerCase()) ||
            e.genericName.toLowerCase().includes(freeTextFilter.toLowerCase())

        );
    }

    return result;
}


export function filterWithResources(data, filterValue) {
    if (filterValue && filterValue.length > 0) {
        const filterValues = filterValue.map(e => e.value);
        ;//extractFilterValue(filterValue, idPrefix +'_').map(e => Number(e));
        let result = data.filter(e =>
            filterValues.includes('resource_' + e.id) ||
            filterValues.includes('resourceType_' + e.type) ||
            filterValues.includes('category_' + e.category) ||
            filterValues.includes('crop_' + e.cropID)
        );
        return result;
    }
    return data;
}

export function filterData(data, filterValue) {
    let result = data;

    if (filterValue) {
        const resourceIds = filterValue.map(e => Number(e.value));// filter(filterArr, (o) => {return o.startsWith('name_')}).map((element, index) => (element.replace('name_', '')));

        const pestFilter = null;
        if (resourceIds.length > 0) {
            result = filter(data, (r) => {
                if (r.resource) {//for pesticides
                    return resourceIds.indexOf(r.resource.id) > -1;
                } else {
                    return resourceIds.indexOf(r.id) > -1;
                }
            });
        }
        if (pestFilter && pestFilter.length > 0) {
            result = filter(result, (r) => {
                if (r.resource) {//for pesticides
                    filter(r.resource.pest, (pest) => {
                        return pestFilter.indexOf('' + pest.pest.id) > -1;
                    });
                }
            });
        }
    }
    return result;
}

export function buildPesticideFilterOptions(resources) {
    const data = resources.filter(e => e && e.resource);
    let nameFilter = data.map(resource => {
        const code = getCodeSuffix(resource.resource.code);

        return (
            {
                value: 'resource_' + resource.resource.id,
                label: resource.resource.name + code
            }
        )
    });
    const pestFilter = [];
    data.forEach(resource => (
        resource.pest.forEach(pest => (
            pestFilter.push({
                value: 'pest_' + pest.pest.id,
                label: pest.pest.name
            })
        ))

    ));
    let all = uniqBy(nameFilter, 'value');
    all = all.concat(uniqBy(pestFilter, 'value'));
    return all.filter((element) => element !== undefined);
}

function getCodeSuffix(code) {
    return isEmpty(code) ? '' : ` (${code})`;
}

export function buildNameCodeFilterOptions(resources, prefix, text) {

    prefix = prefix ? prefix + '_' : '';
    let nameFilter = resources.map(resource => {
        const code = getCodeSuffix(resource.code);
        const label = text && text[resource.name] ? text[resource.name] : resource.name;
        return (
            {
                value: prefix + resource.id,
                label: label + code,
                element: resource,
                id: resource.id
            }
        )
    });
    let all = uniqBy(nameFilter, 'value');
    return all.filter((element) => element !== undefined);
}


export function buildCropFilterOptions(crops) {

    let nameFilter = crops.map(c => {
        return (
            {
                value: 'crop_' + c.id,
                label: c.alias
            }
        )
    });
    let all = uniqBy(nameFilter, 'value');
    return all.filter((element) => element !== undefined);
}

export function buildGenericFilterOptions(data, attribute1, attribute2) {

    let attribute1Filter = data.map(e => (
        {
            value: attribute1 + '_' + e.id,
            label: e[attribute1]
        }
    ));

    // let attribute2Filter = data
    //     .filter(resource => data.code && resource.code.length > 0)
    //     .map(resource => (
    //         {
    //             value: 'code_' + resource.id,
    //             label: resource.code
    //         }
    //     ));
    let all = uniqBy(attribute1Filter, 'value');
    //  all = all.concat(uniqBy(codeFilter, 'value'));

    return all.filter((element) => element !== undefined);
}

export function filterGenericData(data, filterValue, attribute1, attribute2) {
    let result = data;
    const attribute1Filters = extractFilterValue(filterValue, attribute1 + '_');// filter(filterArr, (o) => {return o.startsWith('name_')}).map((element, index) => (element.replace('name_', '')));
    // const codeFilters = extractFilterValue(filterValue, 'code_'); //filter(filterArr, (o) => {return o.startsWith('code_')}).map((element, index) => (element.replace('code_', '')));

    // const pestFilter = null;
    if (attribute1Filters.length > 0) {
        result = filter(data, (e) => {
            if (e) {//for pesticides
                return attribute1Filters.indexOf('' + e.id) > -1
            } else {
                // return nameFilters.indexOf('' + r.id) > -1 || codeFilters.indexOf('' + r.id) > -1
            }
        });
    }
    return result;
}

export function isArrayEmpty(filterValue, filterNulls){
    if(filterNulls){
        return  !filterValue || filterValue.filter(e => e !== null).length === 0;
    } else {
        return  !filterValue || filterValue.length === 0;
    }
}