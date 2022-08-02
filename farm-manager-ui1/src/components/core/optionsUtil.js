import React from 'react';
import MenuItem from '@mui/material/MenuItem'
import { getDomainName } from "../../utils/FieldUtil";
import { PER_AREA_UNIT } from "../../utils/Units";
import {
    PER_AREA_UNIT_PER_DAY,
    PER_AREA_UNIT_PER_IRREGATION_DAY,
    PER_WATER_UNIT,
    TOTAL_IN_FIELDS,
    TOTAL_PER_AREA_UNIT,
    TOTAL_PER_FIELD
} from "../../utils/FarmCalculator";
import { isEmpty } from "../../utils/StringUtil";
import { CUSTOMER, SUPPLIER } from '../../reducers/ResourceReducer';

export const CROP_COLORS = [
    { name: "Red", value: "#F44336" },
    { name: "Pink", value: "#E91E63" },
    { name: "Purple", value: "#9C27B0" },
    { name: "Deep Purple", value: "#673AB7" },
    { name: "Indigo", value: "#3F51B5" },
    { name: "Blue", value: "#2196F3" },
    { name: "Light Blue", value: "#00BCD4" },
    { name: "Teal", value: "#009688" },
    { name: "Green", value: "#4CAF50" },
    { name: "Light Green", value: "#8BC34A" },
    { name: "Lime", value: "#CDDC39" },
    { name: "Yellow", value: "#FFEB3B" },
    { name: "Amber", value: "#FFC107" },
    { name: "Orange", value: "#FF9800" },
    { name: "Deep Orange", value: "#FF5722" },
    { name: "Brown", value: "#795548" },
    { name: "Grey", value: "#9E9E9E" },
    { name: "Blue Grey", value: "#607D8B" },
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },

]

export function getCodeLabel(code){
    if(isEmpty(code)){
        return ''
    } else {
        return ` (${code})`
    }
}

export function renderDomainIdOptions(data) {
    if (data) {
        return (
            data.filter((element => element ? true : false)).map(element => (
                <MenuItem key={element.id} value={element.id}>{element.field.name} {element.alias}</MenuItem>
            )))
    }
}

export function renderNameIdOptions(data, addEm, emptyText) {
    if (data) {
        const result = data.filter((element => element ? true : false)).map(element => (
            <MenuItem key={element.id} value={element.id}>{element.name ? element.name : element.label}</MenuItem>
        ));
        if (addEm === true) {
            result.unshift(
                <MenuItem style={{ minHeight: 30 }} key='' value="">
                    <em>
                        {emptyText ? emptyText : ''}
                    </em>
                </MenuItem>
            );
        }
        return result;
    }
}

export function renderVaraietyOptions(data) {
    if (data) {
        return (
            data.filter((element => element ? true : false)).map(element => (
                <MenuItem key={element.id} value={element.id}>{element.name} ({element.category})</MenuItem>
            )))
    }
}

export function renderNameIdOptionsTranslate(data, text) {
    if (data) {
        return (
            data.filter((element => element ? true : false)).map(element => (
                <MenuItem key={element.id}
                    value={element.id}>{text[element.name] ? text[element.name] : element.name}</MenuItem>
            )))
    }
}

export function renderOptions(data, text, toLowerCase) {
    if (data) {
        return (
            data.map(element => (
                <MenuItem key={element}
                    value={element}>{text[toLowerCase === true ? element.toLowerCase() : element]}</MenuItem>//.replace(/_/g,'')
            )))
    }
}

export function renderTypeOptions(data, text, addEm, emptyText) {

    if (data) {
        const result = data.map(element => (
            <MenuItem key={element} value={element}>{text[element.toLowerCase()]}</MenuItem>//.replace(/_/g,'')
        ));
        if (addEm === true) {
            result.unshift(
                <MenuItem key='' value="">
                    <em>{emptyText ? text[emptyText] : ''}</em>
                </MenuItem>
            );
        }

        return result;
    }
}

export function renderPerUnitOptions(data, text, areaUnit, addEm) {
    if (data) {
        const result =
            data.map(element => (
                <MenuItem key={element}
                    value={element}>{areaUnit && element === PER_AREA_UNIT ? text[areaUnit] : text[element.replace('PER_', '').toLowerCase()]}</MenuItem>//.replace(/_/g,'')
            ));
        if (addEm === true) {
            result.unshift(
                <MenuItem key='' value="">
                    <em></em>
                </MenuItem>
            );
        }
        return result;
    }
}

export function renderIrrigationOptions(data, text, areaUnit) {
    if (data) {
        return (
            data.map(element => {
                let token = ''
                if (element === PER_WATER_UNIT) {
                    token = 'perM3Water';
                } else if (element === PER_AREA_UNIT_PER_DAY) {
                    token = 'perAreaUnitPerDay'.replace('AreaUnit', areaUnit);
                } else if (element === PER_AREA_UNIT_PER_IRREGATION_DAY) {
                    token = 'perAreaUnitPerIrrigationDay'.replace('AreaUnit', areaUnit);
                } else if (element === TOTAL_PER_AREA_UNIT) {
                    token = 'totalPerAreaUnit'.replace('AreaUnit', areaUnit);
                } else if (element === TOTAL_PER_FIELD) {
                    token = 'totalPerField';
                } else if (element === TOTAL_IN_FIELDS) {
                    token = 'totalInField';
                }
                return (
                    <MenuItem key={element}
                        value={element}>{text[token]}</MenuItem>
                )
            }));

    }
}


export function renderNamValueOptions(data, text, addEm) {
    if (data) {
        const result =
            data.map(element => (
                <MenuItem key={element.value}
                    value={element.value}>{text ? text[element.name] : element.name}</MenuItem>
            ));
        if (addEm === true) {
            result.unshift(
                <MenuItem style={{ minHeight: 30 }} key='' value="">
                    <em></em>
                </MenuItem>
            );
            
        }
        return result;
    }
}


export function renderDateFormats() {
    const data = ['DD/MM/YY', 'MM/DD/YY', 'YYYY']
    if (data) {
        return (
            data.map(element => (
                <MenuItem key={element} value={element}>{element}</MenuItem>
            )))
    }
}

export function renderTranslatableOptions(options, text) {
    const data = options.map(e => ({ value: e, name: text[e] }));
    return renderNamValueOptions(data);
}


export function renderAliasIdOptions(data) {
    if (data) {
        return (
            data.map(element => (
                <MenuItem key={element.id} value={element.id}>{element.alias}</MenuItem>
            )))
    }
}


export function getSuggestionsNameId(data) {
    if (data) {
        return (
            data.map(element => (
                {
                    id: element.id,
                    key: element.id,
                    value: element.id,
                    label: element.name,
                    name: element.name,
                    element: element,
                }
            )))
    }
}

export function getSuggestionsNameElement(element, prefix) {
    if (element) {
        if (!isEmpty(element.alias) && !isEmpty(element.name)) {
            element.name = element.name + ' (' + element.alias + ')';

        }
        else if (!isEmpty(element.alias)) {
            element.name = element.alias;
        }
        return (
            {
                id: element.id,
                key: `${prefix}_${element.id}`,
                value: `${prefix}_${element.id}`,
                label: element.name,
                name: element.name,
                element: element,
            }
        )
    }
}

export function getCustomerOptions(customerAndSupplierOptions) {
    const customers = customerAndSupplierOptions.filter(e => CUSTOMER === e.element.type && e.element.active === true);
    return tableSuggestionsNameIdPrefix(customers.map(e => e.element), 'customer');
}

export function getSupplierOptions(customerAndSupplierOptions) {
    const customers = customerAndSupplierOptions.filter(e => SUPPLIER === e.element.type && e.element.active === true);
    return tableSuggestionsNameIdPrefix(customers.map(e => e.element), 'supplier');
}

export function tableSuggestionsNameIdPrefix(data, prefix, codes) {
    if (data) {
        return (
            data.map(element => (
                {
                    id: element.id,
                    key: `${prefix}_${element.id}`,
                    value: `${prefix}_${element.id}`,
                    label:  `${element.name}${codes ? getCodeLabel( element.code) : '' }`,
                    element: element,
                }
            )))
    }
}

export function tableSuggestionsResourceNameTypeIdPrefix(data, prefix, text) {
    // console.log(options)
    if (data) {
        return (
            data.map(element => (
                {
                    id: element.id,
                    key: `${prefix}_${element.id}`,
                    value: `${prefix}_${element.id}`,
                    label: `${element.name}/${text[element.type.toLowerCase()]}`,
                    element: element,
                }
            )))
    }
}

export function tableSuggestionsVarieties(data, prefix) {
    if (data) {
        return (
            data.map(element => (
                {
                    id: element.id,
                    key: `${prefix}_${element.id}`,
                    value: `${prefix}_${element.id}`,
                    label: `${element.category}/${element.name}`,
                    element: element,
                }
            )))
    }
}

export function tableSuggestionsAliasIdPrefix(data, prefix) {
    if (data) {
        return (
            data.map(element => (
                {
                    id: element.id,
                    key: `${prefix}_${element.id}`,
                    value: `${prefix}_${element.id}`,
                    label: element.alias,
                    element: element,
                }
            )))
    }
}

export function getSuggestionsAliasId(data) {
    if (data) {
        return (
            data.map(element => (
                {
                    id: element.id,
                    key: element.id,
                    value: element.id,
                    label: element.alias,
                    name: element.alias,
                    element: element,
                }
            )))
    }
}

export function getDestinationNameValue(text) {
    return [
        { value: 'export', name: text.export },
        { value: 'localMarket', name: text.localMarket },
        { value: 'industry', name: text.industry },
    ]
}


export function getDomainSuggestions(data, parenthesis) {
    if (data) {
        return (
            data.map(element => (

                {
                    key: element.id,
                    value: element.id,
                    label: getDomainName(element, parenthesis),
                    name: getDomainName(element, parenthesis),
                    element: element,
                }
            )))
    }
}
