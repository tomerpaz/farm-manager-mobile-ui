import React, { useState, useEffect } from 'react';

import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import {
    filterWithPrefix,
} from "../../../components/filters/filterUtil";

import {
    Table,
} from '../../../components';
import { masterDetails } from "../../../utils/TabUtils";
import { INGREDIENT } from "../../../reducers/ResourceReducer";
import { loadDataByName } from '../../../utils/LoadUtil';
import { PER_UNIT } from '../../../utils';


function getNew(){
    return { type: INGREDIENT, active: true, usageUnit: PER_UNIT};
}

//deleteIngredient,getIngredients,getIngredient,selectIngredient

const IngredientTable = (props) => {

    const { text, lang, getIngredient, createNewResource,
        ingredients, getIngredients, disinfectantOptions, selectIngredient
    } = props;


    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDataByName(props, ['ingredients']);
        selectIngredient(getNew())

        return () => {
            selectIngredient(null);
            getIngredients();
        }
    }, []);


    useEffect(() => {
        if (createNewResource === true) {
            selectIngredient(getNew())
        }
    }, [createNewResource]);


    const onRowClicked = (row) => {
        selectIngredient(null);
        getIngredient(row.id);

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

    const displayRows = filterWithPrefix(ingredients, filter, 'resource');
    return (
        <div>
            <MasterDetailsTableTop options={disinfectantOptions} filter={filter}
                setFilter={setFilter}
                // pdfReport={'ingredients'}
                // xlsReport={'ingredients'}
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


export default IngredientTable;