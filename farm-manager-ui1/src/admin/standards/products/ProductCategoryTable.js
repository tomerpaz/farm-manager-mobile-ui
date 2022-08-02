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
import { filterWithPrefix, buildNameCodeFilterOptions, isArrayEmpty } from '../../../components/filters/filterUtil';

const ProductCategoryTable = (props) => {

    const { text, productCategories, lang, selectProductCategory, getProductCategory, getProductCategories, createNewProductCategory, baseCrops } = props;


    const [filter, setFilter] = useState([]);


    useEffect(() => {
        loadDataByName(props, ['productCategories', 'baseCrops']);
        selectProductCategory({ deletable: false });
        return () => {
            selectProductCategory(null);
            getProductCategories();
        }
    }, []);




    useEffect(() => {
        selectProductCategory({ deletable: false });
    }, [createNewProductCategory]);


    const onRowClicked = (row) => {
        selectProductCategory(null);
        getProductCategory(row.id);

    }
    let columns = [
        { name: 'crop', title: text.crop, getCellValue: row => row.crop.name },
        {
            name: 'name', title: text.name,
        },
        {
            name: 'externalId', title: 'GG ID',
        },
    ];

    const filterIds = filter.map( y => y.id);
    const displayRows =  isArrayEmpty(filterIds)  ? productCategories : productCategories.filter(e =>filterIds.includes(e.crop.id));
 
    return (
        <div>
            <MasterDetailsTableTop options={buildNameCodeFilterOptions(baseCrops, 'resource')}
                filter={filter}
                setFilter={(filter) => setFilter(filter)}
                label={text.typeToSearch}
                pdfReport={'ggproductcategory'}
                xlsReport={'ggproductcategory'}
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


export default ProductCategoryTable;