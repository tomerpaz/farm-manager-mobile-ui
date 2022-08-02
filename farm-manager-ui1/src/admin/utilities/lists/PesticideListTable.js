import React, { useState, useEffect } from 'react';
import { masterDetails, } from "../../../utils/TabUtils";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithPrefix, buildNameCodeFilterOptions } from "../../../components/filters/filterUtil";
import { Table, } from '../../../components';
import { loadDataByName, _pesticideLists, _baseCrops, _pesticides, _pests } from '../../../utils/LoadUtil';

function getNew() {
    return { active: true, pesticides: [] };
}
const PesticideListTable = (props) => {

    const { isAdmin, text, lang, getPesticideList, getPesticideLists, createNewPesticideList,
        pesticideLists, selectPesticideList, 
    } = props;

    const [filter, setFilter] = useState('');

    const [active, setActive] = useState(true);


    useEffect(() => {
        loadDataByName(props, [_pesticideLists, _baseCrops, _pesticides, _pests]);
        if (isAdmin) {
            selectPesticideList(getNew())
        }
        return () => {
            selectPesticideList(null);
            getPesticideLists();
        }
    }, []);

    const onRowClicked = (row) => {
        selectPesticideList(null);
        if (row) {
            getPesticideList(row.id);
        }
    }

    useEffect(() => {
        if (isAdmin && createNewPesticideList === true) {
            selectPesticideList(getNew())
        }
    }, [createNewPesticideList]);

    let options = buildNameCodeFilterOptions(pesticideLists, 'list');

    let columns = [
        { name: 'name', title: text.name },
        { name: 'businessName', title: text.businessName, },
        { name: 'crop.name', title: text.crop, getCellValue: row => row.crop.name },
        // {
        //     name: 'active', title: text.active,
        //     getCellValue: row => (row.active ? text.yes : text.no)
        // },
    ];

    const displayRows = filterWithPrefix(pesticideLists.filter(e=>e.active === active), filter, 'list');
    return (
        <div>
            <MasterDetailsTableTop options={options.filter(e=>e.element.active === active)} filter={filter}
                setFilter={setFilter}
                label={text.typeToSearch}
                lang={lang}
                pdfReport={'pesticideLists'}
                xlsReport={'pesticideLists'}
                active={active}
                onActiveChange={setActive}
                text={text}
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
export default PesticideListTable;