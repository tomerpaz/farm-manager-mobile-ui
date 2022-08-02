import React, { useState, useEffect } from 'react';

import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import {
    filterWithResources
} from "../../../components/filters/filterUtil";

import {
    Table,
} from '../../../components';
import { masterDetails } from "../../../utils/TabUtils";
import { WORKER } from "../../../reducers/ResourceReducer";
import { PER_HOUR, getUnitText } from "../../../utils/Units";
import { loadDataByName, _executors, _tags } from "../../../utils/LoadUtil";
import { tableSuggestionsNameIdPrefix } from '../../../components/core';

const ExecutorTable = (props) => {



    const { selectExecutor, isAdmin, selectedExecutor, text, executors, lang, executorTypeOptions, areaUnit, getExecutor, createNewResource, user } = props;

    const [filter, setFilter] = useState('');


    useEffect(() => {
        loadDataByName(props, [_executors, _tags]);

        if (isAdmin) {
            if (selectedExecutor) {
                selectExecutor(selectedExecutor)
            } else {
                selectExecutor({ type: WORKER, active: true, id: null, usageUnit: PER_HOUR })
            }
        }
        return () => {
            selectExecutor(null);
        }
    }, []);


    const onRowClicked = (row) => {
        selectExecutor(null);
        getExecutor(row.id);

    }

    useEffect(() => {

        if (isAdmin && createNewResource === true) {
            selectExecutor({ type: WORKER, active: true, id: null, usageUnit: PER_HOUR })
        }

    }, [createNewResource]);




    const executorOptions = tableSuggestionsNameIdPrefix(executors, 'resource')


    let columns = [
        { name: 'name', title: text.name },
        {
            name: 'type', title: text.type,
            getCellValue: row => (text[row.type.toLowerCase()])
        },
        {
            name: 'usageUnit', title: text.unit,
            getCellValue: row => getUnitText(row.usageUnit, text, areaUnit),
        },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];

    const displayRows = filterWithResources(executors, filter);

    return (
        <div>
            <MasterDetailsTableTop options={executorTypeOptions.concat(executorOptions)}
                filter={filter}
                setFilter={setFilter}
                pdfReport={'executors'}
                xlsReport={'executors'}
                label={text.typeToSearch}
                lang={lang} />
            <Table
                rows={displayRows}
                columns={columns}
                height={masterDetails}
                onRowClicked={onRowClicked}
            />
        </div>
    );
}
export default ExecutorTable;