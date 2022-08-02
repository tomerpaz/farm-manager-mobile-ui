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
import { GENETRIC_TAGS } from '../../../reducers/TagReducer';


function getNew(){
    return { active: true, deletable: false, type: GENETRIC_TAGS, name: '' }
}

const TagTable = (props) => {

    const { text, tags, lang, selectTag, getTag, getTags, createNewTag } = props;


    const [filter, setFilter] = useState('');


    useEffect(() => {
        loadDataByName(props, ['tags']);
        selectTag(getNew());
        return () => {
            selectTag(null);
            getTags();
        }
    }, []);




    useEffect(() => {
        selectTag(getNew());
    }, [createNewTag]);


    const onRowClicked = (row) => {
        selectTag(null);
        getTag(row.id);

    }
    let columns = [
        { name: 'name', title: text.name },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];


    const displayRows = filterWithPrefix(tags, filter, 'tag');;
    return (
        <div>
            <MasterDetailsTableTop options={tableSuggestionsNameIdPrefix(tags, 'tag')}
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


export default TagTable;