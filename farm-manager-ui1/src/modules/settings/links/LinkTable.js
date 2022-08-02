import React, { useState, useEffect } from 'react';

import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import {
    getSuggestionsNameId, tableSuggestionsNameIdPrefix
} from "../../../components/core/optionsUtil";

import {
    Table,
} from '../../../components';
import { loadDataByName } from "../../../utils/LoadUtil";
import { height200 } from '../../../utils';
import { filterWithPrefix } from '../../../components/filters/filterUtil';

const LinkTable = (props) => {

    const { text, links, lang, selectLink, getLink, getLinks, createNewLink } = props;


    const [filter, setFilter] = useState('');


    useEffect(() => {
        loadDataByName(props, ['links']);
        selectLink({ active: true, tab: true });
        return () => {
            selectLink(null);
            getLinks();
        }
    }, []);




    useEffect(() => {
        selectLink({ active: true, tab: true });
    }, [createNewLink]);


    const onRowClicked = (row) => {
        selectLink(null);
        getLink(row.id);

    }
    let columns = [
        { name: 'name', title: text.name },
        { name: 'position', title: text.location },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];


    const displayRows = filterWithPrefix(links, filter, 'link');;
    return (
        <div>
            <MasterDetailsTableTop options={tableSuggestionsNameIdPrefix(links, 'link')}
                filter={filter}
                setFilter={(filter) => setFilter(filter)}
                label={text.typeToSearch}
                lang={lang} />
            <Table
                rows={displayRows}
                columns={columns}
                height={height200}
                onRowClicked={onRowClicked}
            />
        </div>
    );
}


export default LinkTable;