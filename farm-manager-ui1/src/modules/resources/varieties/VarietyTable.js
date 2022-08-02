import React, { useState, useEffect } from 'react';

import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithResources } from "../../../components/filters/filterUtil";

import {
    Table,
} from '../../../components';
import { masterDetails } from "../../../utils/TabUtils";
import { VARIETY } from "../../../reducers/ResourceReducer";
import { loadDataByName } from "../../../utils/LoadUtil";
import { getUnitText } from '../../../utils';

const VarietyTable = (props) => {

    const { text, 
        varieties, lang, varietyResourceOptions, cropOptions,
        selectVariety, getVariety, isAdmin, createNewResource,
    } = props;

    const [filter, setFilter] = useState('');


  

    useEffect(() => {
        loadDataByName(props, ['varieties', 'crops', 'cropGenuses']);
        if (isAdmin) {
            selectVariety({ type: VARIETY, active: true, id: null, deletable: false })
        }

        return () => {
            selectVariety(null);
            //getTags();
        }
    }, []);


    useEffect(() => {
        if (isAdmin && createNewResource === true) {
            selectVariety({ type: VARIETY, active: true, id: null, deletable: false })
        }
    }, [createNewResource]);

    const onRowClicked = (row) => {
        selectVariety(null);
        getVariety(row.id);

    }



    let columns = [
        { name: 'name', title: text.name },
        { name: 'category', title: text.crop },
        {
            name: 'usageUnit', title: text.unit,
            getCellValue: row => getUnitText(row.usageUnit, text),
        },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];


    const displayRows = filterWithResources(varieties, filter);


    return (
        <div>
            <MasterDetailsTableTop options={cropOptions.concat(varietyResourceOptions)}
                filter={filter}
                setFilter={(e) => setFilter(e)}
                pdfReport={'varieties'}
                xlsReport={'varieties'}
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


export default VarietyTable;