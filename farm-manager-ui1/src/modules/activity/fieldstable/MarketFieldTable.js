import React from 'react';
import {Table,} from '../../../components';
import {getSuggestionsNameElement, renderOptions} from "../../../components/core/optionsUtil";
import {sumBy} from 'lodash';


export const MARKET_METHOD_AMOUNT = 'amount'
export const MARKET_METHOD_WEIGHT = 'weight'
export const MARKET_METHOD_NONE = ''
export const MARKET_METHOD_AREA = 'area'
export const CALC_BY_ITEM_COUNT =  [MARKET_METHOD_AMOUNT , MARKET_METHOD_NONE]


export function getUnitCost(marketMethod, domainRow) {
    const totalRedemption = domainRow.totalRedemption;
    let value = 0;
    if (totalRedemption && totalRedemption !== 0) {
        if (marketMethod === MARKET_METHOD_AMOUNT) {
            value = domainRow.itemCount;
        } else if (marketMethod === MARKET_METHOD_WEIGHT) {
            value =domainRow.netWeight;
        } else if (marketMethod === MARKET_METHOD_AREA) {
            value = domainRow.plantArea;
        } else if (marketMethod === MARKET_METHOD_NONE) {
            value = domainRow.netWeight;
            if (!value || value === 0) {
                value =domainRow.itemCount;
            }
        }
    }
    const result = (!value || value === 0)  ? 0 : totalRedemption / value;
    return result.toFixed(2);
}

export function calcSingleRowIncome( marketMethod, activityDomains, d, totalIncome, activityArea){
    if(!totalIncome || isNaN(totalIncome) ||  totalIncome === 0){
        return 0;
    }
    let totalRedumption = d.totalRedemption ? d.totalRedemption :0;
    if (marketMethod === MARKET_METHOD_AREA) {
        totalRedumption = activityArea > 0 ? (totalIncome / activityArea) * d.plantArea : 0;
    } else if (marketMethod === MARKET_METHOD_AMOUNT) {
        const itemCount = sumBy(activityDomains, 'itemCount');
        totalRedumption = itemCount > 0 ? (totalIncome / itemCount) * d.itemCount : 0;
    } else if (marketMethod === MARKET_METHOD_WEIGHT) {
        const netWeight = sumBy(activityDomains, 'netWeight');
        totalRedumption = netWeight > 0 ? (totalIncome / netWeight) * d.netWeight : 0;
    } else {
        const itemCount = sumBy(activityDomains, 'itemCount');
        const netWeight = sumBy(activityDomains, 'netWeight');
        if(netWeight && netWeight !== 0 && d.unitCost){
            totalRedumption = Number(d.netWeight) * Number(d.unitCost);
        } else if(itemCount && itemCount !== 0 && d.unitCost){
            totalRedumption = Number(d.itemCount) * Number(d.unitCost);
        }
    }
    return isNaN(totalRedumption) ? 0 : Number(totalRedumption.toFixed()) ;
}

const MarketFieldTable = (props) => {



    const {
        activityDomains, expendFieldTable, text,
        changeDomainTableColumn,  productOptions, marketDestinations, marketMethod, focusCell,containerOptions,
        applyAll, weightUnit,
    } = props;


    const rows = expendFieldTable ? activityDomains : activityDomains.slice(0, 4);

    const autoIncome = marketMethod !== MARKET_METHOD_NONE

    const widthNumeric = 100;
    const columns = [

        {
            name: 'waybill', title: text.waybill, edit: true,
            width: 120,
            onChange: (value, rowData, rowIndex) => changeDomainTableColumn('waybill', value, rowData, rowIndex, applyAll),
        },
        {name: 'name', title: text.field, getCellValue: row => (row.field.name),},
        {name: 'alias', title: text.alias},

        {
            name: 'variety',
            title: text.variety+' / '+text.crop,
            getCellValue: row => (row.variety.name + '/' + row.variety.category),
        },
        {
            name: 'destination', title: text.destination,
            options: () => renderOptions(marketDestinations, text),
            width: 90,
            onChange: (value, rowData, rowIndex) => changeDomainTableColumn('destination', value, rowData, rowIndex, applyAll),
            getCellValue: row => (row.destination ? row.destination : '')
        },

        {
            name: 'product',
            autocomplete: true,
            title: text.size,
            width: 160,
            options: () => productOptions,
            placeholder: text.size,
            getCellValue: row => (row.product  ?  getSuggestionsNameElement(row.product,'resource'): ''),
            onChange: (value, rowData, rowIndex) => changeDomainTableColumn('product', value ? value.element : null, rowData, rowIndex, applyAll),
        },
        {
            name: 'container',
            autocomplete: true,
            title: text.quality,

            width: 160,
            options: ()=> containerOptions.filter(e => e.element.active && e.element.containerType === 'MARKET'),
            placeholder: text.container,
            getCellValue: row => (row.container  ?  getSuggestionsNameElement(row.container,'container'): ''),
            onChange: (value, rowData, rowIndex) => changeDomainTableColumn('container', value ? value.element : null, rowData, rowIndex, applyAll),

        },
        {
            name: 'itemCount', title: text.amount, edit: true, type: 'number', 
            width: widthNumeric,
            getCellValue: row => row.itemCount,
            onChange: (value, rowData, rowIndex) => changeDomainTableColumn('itemCount', value, rowData, rowIndex),
        },
        {
            name: 'netWeight', title: text[weightUnit], edit: true, type: 'number', 
            width: widthNumeric,
            getCellValue: row => row.netWeight,
            onChange: (value, rowData, rowIndex) =>  changeDomainTableColumn('netWeight', value, rowData, rowIndex),
        },
        {
            name: 'unitCost', title: text.unitCost, edit: autoIncome, type: 'number',
            width: widthNumeric,
            getCellValue: row => getUnitCost(marketMethod, row),
            onChange: (value, rowData, rowIndex) => changeDomainTableColumn('unitCost', value, rowData, rowIndex)
        },
        {
            name: 'totalRedemption', title: text.income, edit: !autoIncome, type: 'number',
            width: widthNumeric,
            onChange: (value, rowData, rowIndex) => changeDomainTableColumn('totalRedemption', value, rowData, rowIndex)
        },
        {
            name: 'delete',
            title: ' ',
            iconButton: true,
            onClick: (value, rowIndex) => changeDomainTableColumn('delete', null, value, rowIndex),
        },
        {
            name: 'duplicate',
            title: ' ',
            iconButton: true,
            onClick: (value, rowIndex) => changeDomainTableColumn('duplicate', null, value, rowIndex),
        },

    ];

    const iRedemption = Number(sumBy(activityDomains.filter(e => !isNaN(e.totalRedemption)), 'totalRedemption')).toFixed(0);
    const iCount = Number(sumBy(activityDomains, 'itemCount')).toFixed(2);
    const iNet = Number(sumBy(activityDomains, 'netWeight')).toFixed(2);


    const footer = [
        {colSpan: 7, value: text.total},
        {
            edit: true, value: iCount, type: 'number',
            width: widthNumeric,
            onChange: (value) => changeDomainTableColumn('itemCount', value, 'summary')
        },
        {
            edit: true, value: iNet, type: 'number',
            width: widthNumeric,
            onChange: (value) => changeDomainTableColumn('netWeight', value, 'summary')
        },
        {
            value: '',
        },
        {
            edit: autoIncome, value: iRedemption, type: 'number',
            width: widthNumeric,
            onChange: (value) => changeDomainTableColumn('totalRedemption', value, 'summary')
        },
    ]


    return (
        <Table
            rows={rows}
            columns={columns}
            footer={footer}
            indexKey={true}
            disableSort={true}
            focusCell={focusCell}
        />
    );
}
export default MarketFieldTable;
