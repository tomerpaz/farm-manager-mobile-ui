import React, { useState, useEffect } from 'react';
import { masterDetails, } from "../../../utils/TabUtils";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithPrefix } from "../../../components/filters/filterUtil";
import { Table, } from '../../../components';
import { loadDataByName, _waterSources } from '../../../utils/LoadUtil';
import { WATER } from "../../../reducers/ResourceReducer";
import {PER_M3, getUnitText} from "../../../utils/Units";

function getNew() {
    return { type: WATER, active: true, usageUnit: PER_M3 };
}
const WaterSourceTable = (props) => {

    const { isAdmin, text, lang, getWaterSource, getWaterSources, createNewResource,
        waterSources, selectWaterSource, waterSourceOptions
    } = props;

    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDataByName(props, [_waterSources]);
        if (isAdmin) {
            selectWaterSource(getNew())
        }
        return () => {
            selectWaterSource(null);
            getWaterSources();
        }
    }, []);

    const onRowClicked = (row) => {
        selectWaterSource(null);
        if (row) {
            getWaterSource(row.id);
        }
    }

    useEffect(() => {
        if (isAdmin && createNewResource === true) {
            selectWaterSource(getNew())
        }
    }, [createNewResource]);


    let columns = [
        { name: 'name', title: text.name },
        {
            name: 'usageUnit', title: text.unit,
            getCellValue: row => getUnitText(row.usageUnit, text),
        },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];

    const displayRows = filterWithPrefix(waterSources, filter, 'resource');

    return (
        <div>
            <MasterDetailsTableTop options={waterSourceOptions}
                filter={filter}
                setFilter={setFilter}
                pdfReport={'watersources'}
                xlsReport={'watersources'}
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
export default WaterSourceTable;