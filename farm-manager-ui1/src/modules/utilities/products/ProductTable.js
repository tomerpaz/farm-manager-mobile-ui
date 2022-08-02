import React, { useState, useEffect } from 'react';
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithPrefix } from "../../../components/filters/filterUtil";
import { Table,} from '../../../components';
import { masterDetails } from "../../../utils/TabUtils";
import { PRODUCT } from "../../../reducers/ResourceReducer";
import { loadDataByName, _products } from "../../../utils/LoadUtil";

function getNew() {
    return { type: PRODUCT, active: true, };
}

const ProductTable = (props) => {

    const { isAdmin, text, lang, getProduct, getProducts, createNewResource,
        products, selectProduct, productOptions
    } = props;

    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDataByName(props, [_products]);
        if (isAdmin) {
            selectProduct(getNew())
        }
        return () => {
            selectProduct(null);
            getProducts();
        }
    }, []);

    const onRowClicked = (row) => {
        selectProduct(null);
        if (row) {
            getProduct(row.id);
        }
    }

    useEffect(() => {
        if (isAdmin && createNewResource === true) {
            selectProduct(getNew())
        }
    }, [createNewResource]);


    let columns = [
        { name: 'name', title: text.name },
        { name: 'code', title: text.code },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];

    const displayRows = filterWithPrefix(products, filter, 'resource');
    return (
        <div>
            <MasterDetailsTableTop options={productOptions}
                filter={filter}
                setFilter={setFilter}
                pdfReport={'products'}
                xlsReport={'products'}
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

export default ProductTable;