import React, { useState, useEffect } from 'react';

import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import {
    filterWithPrefix,
} from "../../../components/filters/filterUtil";

import {
    Table,
} from '../../../components';
import { masterDetails } from "../../../utils/TabUtils";
import { FERTILIZER } from "../../../reducers/ResourceReducer";
import { loadDataByName, _compounds, _ingredients } from '../../../utils/LoadUtil';

function getNew(){
    return { type: FERTILIZER, active: true, elements: []};
}

const CompoundTable = (props) => {

    const { text, lang, getCompound, createNewCompound,
         compounds, getCompounds, selectCompound,compoundOptions
    } = props;


    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDataByName(props, [_compounds, _ingredients]);
        selectCompound(getNew())

        return () => {
            selectCompound(null);
            getCompounds();
        }
    }, []);


    useEffect(() => {
        if (createNewCompound === true) {
            selectCompound(getNew())
        }
    }, [createNewCompound]);


    const onRowClicked = (row) => {
        selectCompound(null);
        getCompound(row.id);

    }

    let columns = [
        { name: 'name', title: text.name },
        { name: 'engName', title: text.engName },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];

    const displayRows = filterWithPrefix(compounds, filter, 'compound');
    return (
        <div>
            <MasterDetailsTableTop options={compoundOptions} filter={filter}
                setFilter={setFilter}
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


export default CompoundTable;