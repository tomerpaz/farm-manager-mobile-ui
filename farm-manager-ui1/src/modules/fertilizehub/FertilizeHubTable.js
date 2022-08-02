import React, { useState, useEffect } from 'react';
import {MasterDetailsTableTop, PaginationTable, Table} from '../../components'
import { masterDetails} from "../../utils/TabUtils";

import { INVENTORY_TYPES } from '../../reducers/InventoryReducer';
import {loadDataByName} from "../../utils/LoadUtil";
import { tableSuggestionsNameIdPrefix } from '../../components/core';

import { filterWithPrefix } from '../../components/filters/filterUtil';


export function buildFilterOptions(text, warehouses, fertilizers, pesticides, varieties, accessories) {
    return INVENTORY_TYPES.map(type => (
        {value: 'resourceType_' + type, label: text[type.toLowerCase()]}
    )).concat(warehouses).concat(fertilizers).concat(pesticides).concat(varieties).concat(accessories);
}

const FertilizeHubTable = (props) => {

    const {text, dir, lang,
        fertilizerHubs,createNewFertilizerHub, createFertilizerHub, getFertilizerHubs,selectFertilizerHub,
        getFertilizerHub, setView, selectedFertilizerHub

    } = props;


    const [filter, setFilter] = useState( null);


    useEffect(() => {
        loadDataByName(props, ['fertilizers','waterSysAccounts']);
        getFertilizerHubs();
        selectFertilizerHub(selectedFertilizerHub ? selectedFertilizerHub : {deletable: false, active: true});

        return () => {
            selectFertilizerHub(null);
        }
    }, []);


    useEffect(() => {
        if(createNewFertilizerHub){
            selectFertilizerHub({deletable: false, active: true});
        }
     }, [createNewFertilizerHub]);



    function onRowClicked(row) {
        setView('fertilizers');
        selectFertilizerHub(null);
        getFertilizerHub(row.id);

    }


        let columns = [
            {name: 'name', title: text.name},
            {
                name: 'account', title: text.source,
                getCellValue: row => row.account.value
            },
            {name: 'active', title: text.active, 
                getCellValue: row => (row.active ? text.yes : text.no)
            },
            {
                name: 'valves',
                title: text.valves,
                disableSort: true,
                iconButton: true,
                clickable: true,
                onClick: (value, rowIndex) => {
                    setView('valves');
                    selectFertilizerHub(null);
                    getFertilizerHub(value.id);
                },
            },

        ];



      const displayRows = filterWithPrefix(fertilizerHubs, filter, 'hub');
        return (
            <div>
                <MasterDetailsTableTop options={tableSuggestionsNameIdPrefix(fertilizerHubs, 'hub')}
                                       filter={filter}
                                       setFilter={(e) => setFilter(e)}
                                       label={text.typeToSearch}
                                       lang={lang}/>
                <Table
                    rows={displayRows}
                    columns={columns}
                    height={masterDetails}
                    onRowClicked={onRowClicked}
                />
            </div>
        );
    }


export default FertilizeHubTable;