import React, { useState, useEffect } from 'react';

import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import {
    Table,
} from '../../../components';
import { loadDataByName } from "../../../utils/LoadUtil";
import { height200 } from '../../../utils';
import { filterWithPrefix, buildNameCodeFilterOptions, isArrayEmpty } from '../../../components/filters/filterUtil';

const CropGenusTable = (props) => {

    const { text, cropGenuses, lang, selectCropGenus, getCropGenus, getCropGenuses, createNewCropGenus,
        baseCrops } = props;


    const [filter, setFilter] = useState([]);


    useEffect(() => {
        loadDataByName(props, ['cropGenuses', 'baseCrops']);
        selectCropGenus({  });
        return () => {
            selectCropGenus(null);
            getCropGenuses();
        }
    }, []);




    useEffect(() => {
        selectCropGenus({  });
    }, [createNewCropGenus]);


    const onRowClicked = (row) => {
        selectCropGenus(null);
        getCropGenus(row.id);

    }
    let columns = [
        { name: 'crop', title: text.crop, getCellValue: row => row.crop.name },
        {
            name: 'name', title: text.name,
        },
        {
            name: 'externalId', title: 'GG Crop Genus',
        },
    ];

    const filterIds = filter.map( y => y.id);

    const displayRows =  isArrayEmpty(filterIds)  ? cropGenuses : cropGenuses.filter(e =>filterIds.includes(e.crop.id));

    return (
        <div>
            <MasterDetailsTableTop options={buildNameCodeFilterOptions(baseCrops, 'resource')}
                filter={filter}
                setFilter={(filter) => setFilter(filter)}
                label={text.typeToSearch}
                lang={lang}
                pdfReport={'ggcropgenus'}
                xlsReport={'ggcropgenus'}
                
                />
            <Table
                rows={displayRows}
                columns={columns}
                height={height200}
                onRowClicked={onRowClicked}
            />
        </div>
    );
}


export default CropGenusTable;