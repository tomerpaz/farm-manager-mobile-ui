import React, { useState, useEffect } from 'react';
import { masterDetails, } from "../../../utils/TabUtils";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithPrefix } from "../../../components/filters/filterUtil";
import { Table,} from '../../../components';
import { loadDataByName, _warehouses } from '../../../utils/LoadUtil';

function getNew() {
    return { active: true };
}
const WarehouseTable = (props) => {
   
    const { isAdmin, text, lang, getWarehouse,getWarehouses, createNewWarehouse,
        warehouses, selectWarehouse, warehouseOptions
    } = props;

    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDataByName(props, [_warehouses]);
        if (isAdmin) {
            selectWarehouse(getNew())
        }
        return () => {
            selectWarehouse(null);
            getWarehouses();
        }
    }, []);

    const onRowClicked = (row) => {
        selectWarehouse(null);
        if (row) {
            getWarehouse(row.id);
        }
    }

    useEffect(() => {
        if (isAdmin && createNewWarehouse === true) {
            selectWarehouse(getNew())
        }
    }, [createNewWarehouse]);

    let columns = [
        { name: 'name', title: text.name },
        { name: 'code', title: text.code },
        { name: 'note', title: text.note },
    ];

    const displayRows = filterWithPrefix(warehouses, filter, 'warehouse');
    return (
        <div>
            <MasterDetailsTableTop options={warehouseOptions}
                filter={filter}
                setFilter={setFilter}
                pdfReport={'warehouses'}
                xlsReport={'warehouses'}
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

export default WarehouseTable;