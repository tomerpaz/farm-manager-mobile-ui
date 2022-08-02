import React, { useState, useEffect } from 'react';
 
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithPrefix, filterWithResources, isArrayEmpty } from "../../../components/filters/filterUtil";

import { Table, } from '../../../components';
import { masterDetails } from "../../../utils/TabUtils";
import { EQUIPMENT } from "../../../reducers/ResourceReducer";
import { PER_AREA_UNIT, getUnitText } from "../../../utils/Units";
import { loadDataByName } from "../../../utils/LoadUtil";
import { isWialonAdmin } from '../../wialon/WialonSettings';

function getNew(){
    return { type: EQUIPMENT, active: true, id: null, usageUnit: PER_AREA_UNIT, category: 'TRACTOR', engName: '', code: '', name: '', wialonId: '' }
}

const EquipmentTable = (props) => {

    const { selectEquipment, isAdmin, selectedEquipment, text, lang, areaUnit, getEquipment, createNewResource,
        equipment, equipmentOptions, equipmentCategoryOptions,wialonGetUnits,wialonUnits,user } = props;

    const [filter, setFilter] = useState('');


    useEffect(() => {
        loadDataByName(props, ['equipment']);

        if (isAdmin) {
            if(isArrayEmpty(wialonUnits) && isWialonAdmin(user)){
                wialonGetUnits();
            }
            if (selectedEquipment) {
                if(!selectEquipment.wialonId){
                    selectedEquipment.wialonId = '';
                }
                selectEquipment(selectedEquipment)
            } else {
                selectEquipment(getNew())
            }
        }
        return () => {
            selectEquipment(null);
        }
    }, []);



    const onRowClicked = (row) => {
        selectEquipment(null);
        getEquipment(row.id);

    }

    useEffect(() => {

        if (isAdmin && createNewResource === true) {
            selectEquipment(getNew())
        }

    }, [createNewResource]);



    let columns = [
        { name: 'name', title: text.name },
        {
            name: 'category', title: text.type,
            getCellValue: row => (row.category ? text[row.category.toLowerCase()] : '')
        },
        {
            name: 'usageUnit', title: text.unit,
            getCellValue: row => getUnitText(row.usageUnit, text, areaUnit),
        },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];

    const displayRows = filterWithResources(equipment, filter);

    return (
        <div>
            <MasterDetailsTableTop options={equipmentCategoryOptions.concat(equipmentOptions)}
                filter={filter}
                setFilter={setFilter}
                pdfReport={'equipment'}
                xlsReport={'equipment'}
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


export default EquipmentTable;