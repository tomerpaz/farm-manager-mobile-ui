import React, { useState, useEffect } from 'react';
import { masterDetails, } from "../../../utils/TabUtils";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithPrefix } from "../../../components/filters/filterUtil";
import { Table, } from '../../../components';
import { loadDataByName, _accessories } from '../../../utils/LoadUtil';
import { ACCESSORY } from "../../../reducers/ResourceReducer";
import { PER_UNIT, getUnitText } from "../../../utils/Units";

function getNew() {
    return { type: ACCESSORY, active: true, usageUnit: PER_UNIT };
}
const AccessoryTable = (props) => {

    const { isAdmin, text, lang, getAccessory, getAccessories, createNewResource,
        accessories, selectAccessory, accessoryOptions
    } = props;

    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDataByName(props, [_accessories]);
        if (isAdmin) {
            selectAccessory(getNew())
        }
        return () => {
            selectAccessory(null);
            getAccessories();
        }
    }, []);

    const onRowClicked = (row) => {
        selectAccessory(null);
        if (row) {
            getAccessory(row.id);
        }
    }

    useEffect(() => {
        if (isAdmin && createNewResource === true) {
            selectAccessory(getNew())
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

    const displayRows = filterWithPrefix(accessories, filter, 'resource');
    return (
        <div>
            <MasterDetailsTableTop options={accessoryOptions}
                filter={filter}
                setFilter={setFilter}
                pdfReport={'accessories'}
                xlsReport={'accessories'}
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

export default AccessoryTable;