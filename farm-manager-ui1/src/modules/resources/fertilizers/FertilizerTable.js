import React, { useState, useEffect } from 'react';

import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithPrefix } from "../../../components/filters/filterUtil";

import { Table, } from '../../../components';
import { masterDetails } from "../../../utils/TabUtils";
import { FERTILIZER } from "../../../reducers/ResourceReducer";
import { loadDataByName, _compounds } from "../../../utils/LoadUtil";
import { getUnitText } from '../../../utils';


const FertilizerTable = (props) => {

    const { text, lang, selectFertilizer, getFertilizer, getFertilizers, createNewResource, isAdmin,
         fertilizers, fertilizerOptions,compounds
    } = props;


    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDataByName(props, ['fertilizers', _compounds]);
        if (isAdmin) {
            selectFertilizer({ type: FERTILIZER, category: 'LIQUID', active: true, })
        }
        return () => {
            selectFertilizer(null);
            getFertilizers();
        }
    }, []);


    const onRowClicked = (row) => {
        selectFertilizer(null);
        getFertilizer(row.id);

    }


    useEffect(() => {
        if (isAdmin && createNewResource === true) {
            selectFertilizer({ type: FERTILIZER, category: 'LIQUID', active: true, });
        }
    }, [createNewResource]);



        let columns = [
            { name: 'name', title: text.name },
            {
                name: 'usageUnit', title: text.unit,
                getCellValue: row => getUnitText(row.usageUnit, text),
            }, {
                name: 'active', title: text.active,
                getCellValue: row => (row.active ? text.yes : text.no)
            },
        ];

        const displayRows = filterWithPrefix(fertilizers, filter, 'resource');

        return (
            <div>
                <MasterDetailsTableTop options={fertilizerOptions}
                    filter={filter}
                    setFilter={setFilter}
                    pdfReport={'fertilizers'}
                    xlsReport={'fertilizers'}
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


export default FertilizerTable;