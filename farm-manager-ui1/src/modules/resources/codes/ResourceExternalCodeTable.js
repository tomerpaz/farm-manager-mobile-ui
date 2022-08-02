import React, { useState, useEffect } from 'react';

import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import {
    getSuggestionsNameId, tableSuggestionsNameIdPrefix
} from "../../../components/core/optionsUtil";

import {
    Table,
} from '../../../components';
import { loadDataByName, _pesticides, _resourceExternalCodes } from "../../../utils/LoadUtil";
import { height200 } from '../../../utils';
import { filterWithPrefix } from '../../../components/filters/filterUtil';


function getNew(){
    return { code: '' }
}

const ResourceExternalCodeTable = (props) => {

    const { text, resourceExternalCodes, lang, selectResourceExternalCode, 
        getResourceExternalCode, getResourceExternalCodes, createNewResourceExternalCode } = props;


    const [filter, setFilter] = useState('');


    useEffect(() => {
        loadDataByName(props, [_resourceExternalCodes,_pesticides]);
        selectResourceExternalCode(getNew());
        return () => {
            selectResourceExternalCode(null);
            getResourceExternalCodes();
        }
    }, []);




    useEffect(() => {
        selectResourceExternalCode(getNew());
    }, [createNewResourceExternalCode]);


    const onRowClicked = (row) => {
        selectResourceExternalCode(null);
        getResourceExternalCode(row.id);

    }
    let columns = [
        {
            name: 'resource', title: text.resource,
             getCellValue: row => row.resource.name
        },
        { name: 'code', title: text.code },

    ];


    const displayRows = filterWithPrefix(resourceExternalCodes, filter, 'rec');
    return (
        <div>
            <MasterDetailsTableTop options={tableSuggestionsNameIdPrefix(resourceExternalCodes, 'rec')}
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


export default ResourceExternalCodeTable;