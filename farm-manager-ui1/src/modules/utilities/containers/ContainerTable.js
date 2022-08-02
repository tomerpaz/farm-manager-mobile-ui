import React, { useState, useEffect } from 'react';
import { masterDetails, } from "../../../utils/TabUtils";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithPrefix } from "../../../components/filters/filterUtil";
import { Table, } from '../../../components';
import { loadDataByName, _containers } from '../../../utils/LoadUtil';

export const MARKET = 'MARKET';
export const CONTAINER = 'CONTAINER';

function getNew(containerType) {
    return { containerType: containerType, active: true };
}
const ContainerTable = (props) => {

    const { isAdmin, text, lang, getContainer, getContainers, createNewContainer,
        containers, selectContainer, containerType, containerOptions
    } = props;

    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDataByName(props, [_containers]);
        if (isAdmin) {
            selectContainer(getNew(containerType))
        }
        return () => {
            selectContainer(null);
            getContainers();
        }
    }, []);

    const onRowClicked = (row) => {
        selectContainer(null);
        if (row) {
            getContainer(row.id);
        }
    }

    useEffect(() => {
        if (isAdmin && createNewContainer === true) {
            selectContainer(getNew(containerType))
        }
    }, [createNewContainer]);

    let columns = [
        { name: 'name', title: text.name },
        { name: 'capacity', title: text.weight },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];
    const displayRows = filterWithPrefix(containers.filter(e => e.containerType === containerType), filter, 'container');

    const reportName = containerType === CONTAINER ? "containers" : "marketingQualities"
    return (
        <div>
            <MasterDetailsTableTop options={containerOptions.filter(e => e.element.containerType === containerType)}
                filter={filter}
                setFilter={setFilter}
                pdfReport={reportName}
                xlsReport={reportName}
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

export default ContainerTable;