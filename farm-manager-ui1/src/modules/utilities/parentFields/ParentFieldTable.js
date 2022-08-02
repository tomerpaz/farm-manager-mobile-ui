import React, { useState, useEffect } from 'react';
import { masterDetails, } from "../../../utils/TabUtils";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithPrefix } from "../../../components/filters/filterUtil";
import { Table, } from '../../../components';
import { loadDataByName, _parentFields } from '../../../utils/LoadUtil';

function getNew() {
    return { active: true };
}

const ParentFieldTable = (props) => {

    const { isAdmin, text, lang, getParentField, getParentFields, createNewParentField,
        parentFields, selectParentField, parentFieldOptions
    } = props;

    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDataByName(props, [_parentFields]);
        if (isAdmin) {
            selectParentField(getNew())
        }
        return () => {
            selectParentField(null);
            getParentFields();
        }
    }, []);

    const onRowClicked = (row) => {
        selectParentField(null);
        if (row) {
            getParentField(row.id);
        }
    }

    useEffect(() => {
        if (isAdmin && createNewParentField === true) {
            selectParentField(getNew())
        }
    }, [createNewParentField]);


    let columns = [
        { name: 'name', title: text.name },
        { name: 'size', title: text.size },
        { name: 'code', title: text.code },
        { name: 'description', title: text.description },
    ];

    const displayRows = filterWithPrefix(parentFields, filter, 'parentField');

    return (
        <div>
            <MasterDetailsTableTop options={parentFieldOptions}
                filter={filter}
                setFilter={setFilter}
                pdfReport={'parentFields'}
                xlsReport={'parentFields'}
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

export default ParentFieldTable;