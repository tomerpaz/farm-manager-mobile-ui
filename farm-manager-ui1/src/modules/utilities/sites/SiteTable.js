import React, { useState, useEffect } from 'react';

import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithPrefix } from "../../../components/filters/filterUtil";

import {
    Table,
} from '../../../components';
import { masterDetails } from "../../../utils/TabUtils";
import { loadDataByName } from "../../../utils/LoadUtil";


const SiteTable = (props) => {

    const { text, sites, siteOptions, lang, selectSite, getSite, createNewSite, isAdmin } = props;


    const [filter, setFilter] = useState('');


    useEffect(() => {
        loadDataByName(props, ['sites']); //, 'ggAdminAreas'
        selectSite({ active: true })
        return () => {
            selectSite(null);
        }
    }, []);



    const onRowClicked = (row) => {
        selectSite(null);
        getSite(row.id);

    }


    useEffect(() => {
        if (isAdmin && createNewSite === true) {
            selectSite({ active: true })
        }
    }, [createNewSite]);



    let columns = [
        { name: 'name', title: text.name },
        { name: 'size', title: text.size },
        { name: 'code', title: text.code },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];

    const displayRows = filterWithPrefix(sites, filter, 'site');
    return (
        <div>
            <MasterDetailsTableTop options={siteOptions}
                filter={filter}
                setFilter={(e) => setFilter(e)}
                pdfReport={'sites'}
                xlsReport={'sites'}
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

export default SiteTable;