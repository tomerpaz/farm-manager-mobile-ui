import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'

import {
    getTablePageRows,
    PaginationTable,
} from '../../../components';
import DomainViewTop from '../DomainViewTop'
import { filterDomains, filterDomainsFreeText, filterDomainsByStatus } from "../../../components/filters/filterUtil";
import { pageableModuleTable } from "../../../utils/TabUtils";
import { asShortStringDate } from "../../../utils/DateUtil";
import { DOMAIN, END, LIST } from "../../../components/frame/Routes";
import { isEmpty } from "../../../utils/StringUtil";
import { safeParse } from '../../../components/maps/draw/JsonUtil';
import InfoSnackbar from '../../../components/core/util/InfoSnackBar';
import { sumBy } from 'lodash';
import { numberFormatter } from '../../../utils/NunberUtil';
import { getCellStyle } from '../../../utils/StyleUtils';



const DomainTable = (props) => {

    const { domains, getDomainsByYear, yearFilter, setYearFilter, history, user,
        text, fieldFilter, setFieldFilter, selectDomain, domainFilterOption, viewSize, viewSizeOptions, setDomainViewSize,
        setFieldFilterFreeText, fieldFreeText, domainStatusFilter, setDomainStatusFilter, isInspector, growerOptions, user: { manageDomains },
        areaUnit, pageSize, setTablePageSize, pageSizes, dir,
    } = props;

    const [currentPage, setCurrentPage] = useState(0);
    const [sorting, setSorting] = useState({ direction: 'asc', columnName: 'fieldName' });
    const [showTotalArea, setShowTotalArea] = useState(true);

    useEffect(() => {
        if (domains.length === 0) {
            getDomainsByYear(yearFilter);
        }
    }, []);

    function onYearFilterChange(year) {
        setYearFilter(year);
        getDomainsByYear(year);
    }

    function onRowClicked(row) {
        selectDomain(null);
        history.push(`${DOMAIN}${LIST}/${row.id}`)
    }




    const tag1 = user.business.tag1;
    const tag2 = user.business.tag2;

    let columns = [

        {
            name: 'fieldName', title: text.field,
            getStyle: (row) => safeParse(row.polygon) === null ? { color: 'blue' } : null
        },
        { name: 'alias', title: text.alias },
        {
            name: 'cropName',
            title: text.crop,
        },

        { name: 'plantArea', title: text.size, },
        {
            name: 'varietyName',
            title: text.variety,
        }];

    if (!isEmpty(tag1)) {
        columns.push({
            disableSort: true,
            name: 'tag1.name',
            title: tag1, getCellValue: row => row.tag1 ? row.tag1.name : "",
        });
    }
    if (!isEmpty(tag2)) {
        columns.push({
            disableSort: true,
            name: 'tag2.name',
            title: tag2, getCellValue: row => row.tag2 ? row.tag2.name : "",
        });
    }
    columns.push({
        name: 'plant',
        title: text.startCrop, frame: true,
        getCellValue: row => asShortStringDate(row.plant),
    });
    columns.push({
        name: 'root',
        title: text.endCrop,
        getCellValue: row => asShortStringDate(row.root),
    });

    if (user.business.fieldinId) {
        columns.push({
            name: 'fieldinId',
            title: 'Field-in',
            getStyle: row => getCellStyle(row.fieldinId),

            getCellValue: row => (row.fieldinId ? text.yes : text.no)
        });
    }


    const FORM_URL = manageDomains ? `${DOMAIN}${LIST}/0` : null;
    const END_CROP_URL = manageDomains ? `${END}${LIST}` : null;

    let displayRows = filterDomainsByStatus(filterDomains(domains, fieldFilter), domainStatusFilter);
    if (!isEmpty(fieldFreeText)) {
        displayRows = filterDomainsFreeText(displayRows, fieldFreeText)
    }
    const totalArea = sumBy(displayRows, 'plantArea');

    const totalCount = displayRows.length;

    displayRows = getTablePageRows(displayRows, sorting, currentPage, pageSize);

    return (
        <div>
            <DomainViewTop options={domainFilterOption} filter={fieldFilter} setFilter={setFieldFilter}
                label={text.typeToSearchField} actionUrl={FORM_URL} actionText={text.newField}
                dir={text.dir} yearFilter={yearFilter} setYearFilter={onYearFilterChange} text={text}
                endCropUrl={END_CROP_URL} selectDomain={selectDomain}
                viewSize={viewSize}
                viewSizeOptions={viewSizeOptions}
                setDomainViewSize={setDomainViewSize}
                setFieldFilterFreeText={setFieldFilterFreeText}
                fieldFreeText={fieldFreeText}
                domainStatusFilter={domainStatusFilter}
                setDomainStatusFilter={setDomainStatusFilter}
                isInspector={isInspector}
                growerOptions={growerOptions}

            />
            <PaginationTable
                rows={displayRows}
                columns={columns}
                height={pageableModuleTable}
                sorting={sorting}
                onSort
                currentPage={currentPage}
                onCurrentPageChange={setCurrentPage}
                pageSize={pageSize}
                totalCount={totalCount}
                onChangeRowsPerPage={setTablePageSize}
                pageSizes={pageSizes}
                dir={dir}
                onRowClicked={onRowClicked}
                text={text}
                onSortingChange={setSorting}

            />
            {showTotalArea &&
                <InfoSnackbar
                    align='center'
                    onAction={e => setShowTotalArea(false)}
                    open={(totalArea && totalArea > 0) ? true : false}
                    dir={dir}
                    message={`${numberFormatter(totalArea, 2)} ${text[areaUnit]}`}
                />}
        </div>
    );
}

export default withRouter(DomainTable);