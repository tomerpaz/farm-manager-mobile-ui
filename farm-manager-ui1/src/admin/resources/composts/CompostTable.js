import React, { useState, useEffect } from 'react';

import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import {
    filterWithPrefix,
} from "../../../components/filters/filterUtil";

import {
    Table,
} from '../../../components';
import { masterDetails } from "../../../utils/TabUtils";
import { COMPOST } from "../../../reducers/ResourceReducer";
import { loadDataByName, _composts } from '../../../utils/LoadUtil';



function getNew() {
    return { type: COMPOST, active: true, };
}

const CompostTable = (props) => {

    const { composts, getComposts, getCompost, selectCompost, createNewResource, text, lang, compostOptions } = props

    const [filter, setFilter] = useState('');


    useEffect(() => {
        loadDataByName(props, [_composts]);
        selectCompost(getNew())

        return () => {
            selectCompost(null);
            getComposts();
        }
    }, []);

    useEffect(() => {
        if (createNewResource === true) {
            selectCompost(getNew())
        }
    }, [createNewResource]);

    const onRowClicked = (row) => {
        selectCompost(null);
        getCompost(row.id);

    }

    let columns = [
        { name: 'name', title: text.name },
        { name: 'engName', title: text.engName },
        { name: 'locale', title: text.language, getCellValue: row => text[row.locale] },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];

    const displayRows = filterWithPrefix(composts, filter, 'resource');
    return (
        <div>
            <MasterDetailsTableTop options={compostOptions} filter={filter}
                setFilter={setFilter}
                pdfReport={'compost'}
                xlsReport={'compost'}
                label={text.typeToSearch}
                lang={lang}
            />
            <Table
                rows={displayRows}
                columns={columns}
                height={masterDetails}
                onRowClicked={onRowClicked}
            />
        </div>
    );
}


export default CompostTable;