import React, { useState, useEffect } from 'react';
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithPrefix } from "../../../components/filters/filterUtil";
import {
    Table,
} from '../../../components';
import { masterDetails } from "../../../utils/TabUtils";
import { CROP } from "../../../reducers/ResourceReducer";
import { loadDataByName, _baseCrops } from '../../../utils/LoadUtil';

function getNew() {
    return { type: CROP, active: true, id: null, deletable: false };
}

const AdminCropTable = (props) => {

    const { selectBaseCrop, getBaseCrops, baseCrops, getBaseCrop, createNewResource, text, lang, baseCropOptions } = props;
    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDataByName(props, [_baseCrops]);
        selectBaseCrop(getNew())

        return () => {
            selectBaseCrop(null);
            getBaseCrops();
        }
    }, []);

    const onRowClicked = (row) => {
        selectBaseCrop(null);
        getBaseCrop(row.id);

    }

    useEffect(() => {
        if (createNewResource === true) {
            selectBaseCrop(getNew())
        }
    }, [createNewResource]);

    let columns = [
        { name: 'name', title: text.name },
        { name: 'engName', title: text.engName },
        { name: 'locale', title: text.language, getCellValue: row => text[row.locale] },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];

    const displayRows = filterWithPrefix(baseCrops, filter, 'resource');
    return (
        <div>
            <MasterDetailsTableTop options={baseCropOptions} filter={filter} setFilter={setFilter}
                label={text.typeToSearch}
                pdfReport={'BaseCrops'}
                xlsReport={'BaseCrops'}
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


export default AdminCropTable;