import React, { useState, useEffect } from 'react';

import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import {
    filterWithPrefix,
} from "../../../components/filters/filterUtil";

import {
    Table,
} from '../../../components';
import { masterDetails } from "../../../utils/TabUtils";
import { DISINFECTANT } from "../../../reducers/ResourceReducer";
import { loadDataByName } from '../../../utils/LoadUtil';

const DisinfectantTable = (props) => {

    const { text, lang, getDisinfectant, createNewResource,
        disinfectants, getDisinfectants, disinfectantOptions, selectDisinfectant
    } = props;


    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDataByName(props, ['disinfectants']);
        selectDisinfectant({ type: DISINFECTANT, active: true, })

        return () => {
            selectDisinfectant(null);
            getDisinfectants();
        }
    }, []);


    useEffect(() => {
        if (createNewResource === true) {
            selectDisinfectant({ type: DISINFECTANT, active: true, });
        }
    }, [createNewResource]);


    const onRowClicked = (row) => {
        selectDisinfectant(null);
        getDisinfectant(row.id);

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

    const displayRows = filterWithPrefix(disinfectants, filter, 'resource');
    return (
        <div>
            <MasterDetailsTableTop options={disinfectantOptions} filter={filter}
                setFilter={setFilter}
                pdfReport={'disinfectants'}
                xlsReport={'disinfectants'}
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


export default DisinfectantTable;