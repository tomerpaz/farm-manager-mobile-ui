import React, { useState, useEffect } from 'react';
import { masterDetails, } from "../../../utils/TabUtils";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithPrefix } from "../../../components/filters/filterUtil";
import { Table, } from '../../../components';
import { loadDataByName, _crops, _baseCrops } from '../../../utils/LoadUtil';

function getNew() {
    return { active: true, plantation: false, cropRotation: 0 };
}
const CropTable = (props) => {

    const { isAdmin, text, lang, getCrop, getCrops, createNewCrop,
        crops, selectCrop, cropOptions
    } = props;

    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDataByName(props, [_crops, _baseCrops]);
        if (isAdmin) {
            selectCrop(getNew())
        }
        return () => {
            selectCrop(null);
            getCrops();
        }
    }, []);

    const onRowClicked = (row) => {
        selectCrop(null);
        if (row) {
            getCrop(row.id);
        }
    }

    useEffect(() => {
        if (isAdmin && createNewCrop === true) {
            selectCrop(getNew())
        }
    }, [createNewCrop]);

    let columns = [
        { name: 'alias', title: text.alias },
        {
            name: 'name',
            title: text.name,
            getCellValue: row => (row.substance ? row.substance.name : ''),
        },
        {
            name: 'list',
            title: text.pesticideList,
            getCellValue: row => (row.list ? row.list.name : ''),
        },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];

    const displayRows = filterWithPrefix(crops, filter, 'crop');
    return (
        <div>
            <MasterDetailsTableTop options={cropOptions}
                filter={filter}
                setFilter={setFilter}
                pdfReport={'crops'}
                xlsReport={'crops'}
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
export default CropTable;