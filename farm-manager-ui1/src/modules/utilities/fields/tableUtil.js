import {extractFilterValue} from "../../../components/filters/filterUtil";
import {filter, uniqBy} from 'lodash';
import {isEmpty} from "../../../utils/StringUtil";

export function buildTableFilterOptions(fields) {
    let fieldOptions = fields.map(f => {

        const code = isEmpty(f.code) ? '' : ' (' + f.code + ')';
        return (
            {
                id: f.id,
                value: 'field_' + f.id,
                label: `${f.name}${code}`,
                element: f
            }
        )
    });

    let sites = fields.filter(f => f.site && f.site.id).map(f => {
        return (
            {
                value: 'site_' + f.site.id,
                label: f.site.name,
                id: f.site.id,
                element: f.site
            }
        )
    });
    let parentField = fields.filter(f => f.parentField && f.parentField.id).map(f => {
        return (
            {
                value: 'parentField_' + f.parentField.id,
                label: f.parentField.name,
                id: f.parentField.id,
                element: f.parentField
            }
        )
    });
    const all = fieldOptions.concat(uniqBy(sites, 'value')).concat(uniqBy(parentField, 'value'));
    return all.filter((element) => element !== undefined);
}

export function filterActiveTable(data, filterValue){

    if(! filterValue){
        return data;
    }
    console.log('filterValue',filterValue);
    const activeTrue = filterValue.find((e) =>e.value ==='active_true');
    const activeFalse = filterValue.find((e) =>e.value ==='active_false');

    console.log('activeTrue',activeTrue);
    console.log('activeFalse',activeFalse);
    if(activeTrue){
        return data.filter(e=>e.active === true)
    }
    else if(activeFalse){
        return data.filter(e=>e.active === false)
    }


    // if (activeFilters.length > 0 ) {
    //     return data.filter((e) => activeFilters.includes(e.active));
    // }
    return data;
}
export function filterTable(data, filterValue) {

    const fieldNameFilters = extractFilterValue(filterValue, 'field_');
    const codeFilters = extractFilterValue(filterValue, 'code_');
    const siteFilters = extractFilterValue(filterValue, 'site_');
    const parentFieldFilters = extractFilterValue(filterValue, 'parentField_');

    if (siteFilters.length > 0 || parentFieldFilters.length > 0 || fieldNameFilters.length > 0 || codeFilters.length > 0) {
        return filter(data, (field) => {
            if (field.site && siteFilters.indexOf('' + field.site.id) > -1) {
                return true;
            }
            if (field.parentField && parentFieldFilters.indexOf('' + field.parentField.id) > -1) {
                return true;
            }
            if (fieldNameFilters.indexOf('' + field.id) > -1) {
                return true;
            }

            if (!isEmpty(field.code) && codeFilters.indexOf(field.code) > -1) {
                return true;
            }

            return false;

        });
    }
    return data;


}