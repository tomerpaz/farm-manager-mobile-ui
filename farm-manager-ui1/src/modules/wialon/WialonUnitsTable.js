import { Typography } from '@mui/material';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import { loadDataByName, _equipment } from '../../utils/LoadUtil';

const WialonUnitsTable = (props) => {

    const { text, wialonUnits, equipmentOptions } = props;


    const [filter, setFilter] = useState('');


    useEffect(() => {
        loadDataByName(props, [_equipment]);
        // selectTag({ active: true, deletable: false });
        return () => {
            // selectTag(null);
            // getTags();
        }
    }, []);





    // console.log('equipmentOptions',equipmentOptions)


    const onRowClicked = (row) => {
        // selectTag(null);
        // getTag(row.id);

    }
    let columns = [
        { name: 'nm', title: 'Wialon' },
        // { name: 'position', title: text.location },
        // {
        //     name: 'active', title: text.active,
        //     getCellValue: row => (row.active ? text.yes : text.no)
        // },
        {
            name: 'equipment', title: 'Farm Manager',
            disableSort: true,
            options: () => equipmentOptions,
            autocomplete: true,
            placeholder: text.equipment + '...',
            width: 300,
            getCellValue: row => row.selectedDomainOption,
            onChange: (e, rowData, rowIndex) => {
                console.log(e, rowData, rowIndex)
                // rowData.domain = null;
                // if (value && value.element) {
                //     rowData.domain = value.element;
                // }
                // saveValve(rowData);
            }
        },
    ];


    const displayRows = wialonUnits;
    console.log('wialonUnits', wialonUnits)
    return (
        <div>
            {wialonUnits.map((e, i, arr) => {
                return (
                    <div key={i} style={{display: 'flex',  alignItems: 'center'}}>
                        <Typography variant="h6">{e.nm}</Typography>
                    </div>
                )
            }
            )}
            {/* <Table
                rows={displayRows}
                columns={columns}
                height={height200}
                onRowClicked={onRowClicked}
            /> */}
        </div>
    );
}


export default WialonUnitsTable;