import React, { useState, useEffect } from 'react';
import { masterDetails, } from "../../../utils/TabUtils";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithPrefix } from "../../../components/filters/filterUtil";
import { Table, } from '../../../components';
import { loadDataByName, _customers } from '../../../utils/LoadUtil';
import { CUSTOMER } from "../../../reducers/ResourceReducer";

function getNew() {
    return { type: CUSTOMER, active: true, id: null };
}
const CustomerSupplierTable = (props) => {

    const { isAdmin, text, lang, selectCustomerOrSupplier,getCustomerOrSupplier, getCustomersAndSuppliers, createNewResource,
        customers, suppliers, customerAndSupplierOptions
    } = props;

    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDataByName(props, [_customers]);
        if (isAdmin) {
            selectCustomerOrSupplier(getNew())
        }
        return () => {
            selectCustomerOrSupplier(null);
            getCustomersAndSuppliers();
        }
    }, []);

    const onRowClicked = (row) => {
        selectCustomerOrSupplier(null);
        if (row) {
            getCustomerOrSupplier(row.id);
        }
    }

    useEffect(() => {
        if (isAdmin && createNewResource === true) {
            selectCustomerOrSupplier(getNew())
        }
    }, [createNewResource]);

    let columns = [
        { name: 'name', title: text.name },
        {
            name: 'type', title: text.type,
            getCellValue: row => (text[row.type.toLowerCase()])
        },
        { name: 'attribute1', title: text.phone },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];

    const displayRows = filterWithPrefix(customers.concat(suppliers), filter, 'resource');

    return (
        <div>
            <MasterDetailsTableTop options={customerAndSupplierOptions}
                filter={filter}
                setFilter={setFilter}
                pdfReport={'customersSuppliers'}
                xlsReport={'customersSuppliers'}
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

export default CustomerSupplierTable;