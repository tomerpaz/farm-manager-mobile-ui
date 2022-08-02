import React, { useState, useEffect } from 'react';
import { masterDetails, } from "../../../utils/TabUtils";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { getElementText } from "../../../components/filters/filterUtil";
import { Table,} from '../../../components';
import { loadDataByName, _risks } from '../../../utils/LoadUtil';

import { TIME_OUT_REDUX } from "../../../config";

function getNew() {
    return {};
}

const RiskTable = (props) => {

    const { text, lang, getRisk,
        risks, getRisks, selectRisk, riskLists
    } = props;


    const [filter, setFilter] = useState('');
    const [options, setOptions] = useState('');

    useEffect(() => {
        loadDataByName(props, [_risks]);
       // selectRisk(getNew())

        return () => {
            selectRisk(null);
            getRisks();
        }
    }, []);


    useEffect(() => {
        setOptions(getElementText(riskLists, text))
    }, [riskLists]);


    const onRowClicked = (row) => {
        selectRisk(null);
        getRisk(row.id);

    }

    const newRecord = () => {
        selectRisk(null);
        setTimeout(() => selectRisk(getNew()), TIME_OUT_REDUX);
    }

    let columns = [
        { name: 'type', title: text.type, getCellValue: row => text[row.type] },
        { name: 'list', title: text.list, getCellValue: row => text[row.list] },
        { name: 'category' + lang, title: text.category },
    ];

    const lists = filter ? filter.map(e => e.value) : [];
    const displayRows = lists.length === 0 ? risks : risks.filter(e => lists.indexOf(e.list) > -1);
    return (
        <div>
            <MasterDetailsTableTop options={options} filter={filter} setFilter={setFilter}
                label={text.typeToSearch} onClick={newRecord} actionText={text.add} />

            <Table
                rows={displayRows}
                columns={columns}
                height={masterDetails}
                onRowClicked={onRowClicked}
            />
        </div>
    );
}

export default RiskTable;