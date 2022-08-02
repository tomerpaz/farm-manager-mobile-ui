import React, { useState, useEffect } from 'react';

import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'


import {
    Table,
} from '../../../components';
import { loadDataByName } from "../../../utils/LoadUtil";
import { height200 } from '../../../utils';
import {  isArrayEmpty } from '../../../components/filters/filterUtil';

const ActiveIngredientTable = (props) => {

    const { text, activeIngredients, lang, selectActiveIngredient, getActiveIngredient, getActiveIngredients, createNewActiveIngredient, pesticideOptions } = props;


    console.log('activeIngredients',activeIngredients);
    const [filter, setFilter] = useState([]);


    useEffect(() => {
        loadDataByName(props, ['pesticides', 'activeIngredients']);
        selectActiveIngredient({deletable: false  });
        return () => {
            selectActiveIngredient(null);
            getActiveIngredients();
        }
    }, []);




    useEffect(() => {
        selectActiveIngredient({deletable: false});
    }, [createNewActiveIngredient]);


    const onRowClicked = (row) => {
        selectActiveIngredient(null);
        getActiveIngredient(row.id);

    }
    let columns = [
        { name: 'name', title: text.name, getCellValue: row => row.resource.name },
        {
            name: 'cas', title: 'CAS',
        },
        {
            name: 'kg', title: text.kg,
        },
    ];

    const filterIds = filter.map( y => y.id);
    const displayRows =  isArrayEmpty(filterIds)  ? activeIngredients : activeIngredients.filter(e =>filterIds.includes(e.resource.id));
        
    return (
        <div>
            <MasterDetailsTableTop options={pesticideOptions}
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


export default ActiveIngredientTable;