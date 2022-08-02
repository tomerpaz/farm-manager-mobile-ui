import React, { useState, useEffect } from 'react';
import { PaginationTable, Table } from '../../components';
import { asShortStringDate, newDate } from "../../utils/DateUtil";
import { _fertilizers } from '../../utils/LoadUtil';
import { height160, height240, height500, PER_AREA_UNIT } from '../../utils';
import { isArrayEmpty } from '../../components/filters/filterUtil';
import { getTrack } from '../../actions';
import { Box } from '@mui/system';
import { isEmpty } from '../../utils/StringUtil';

export function getTrackDateStyle(row) {
    if (row.lastPositionIn) {
        return { textDecoration: 'overline' };
    } else if (row.firstPositionIn) {
        return { textDecoration: 'underline' };

    }

    return null;
}

const masterStyle = { backgroundColor: 'yellow' };

function getRowStyle(e) {
    if (e && e.master) {
        return masterStyle;
    }
    return null;
}

const TrackerActivityResourceTable = (props) => {
    const {
        
        text, resources, areaUnit, height
    } = props;


    const onRowClicked = (row, duplicate) => {
        // selectTariff(null);
        if (row) {
            if (duplicate && duplicate === true) {
                // duplicateTariff(row.id)
            } else {
                // getTariff(row.id);
            }
        }
    }


    const onSelectRow = (e) => {
        // const remove = selectedTracks.map(t => t.id).includes(e.id);
        // if (remove) {
        //     setSelectedTracks(selectedTracks.filter(t => t.id !== e.id));
        // } else {
        //     if (isArrayEmpty(e.points)) {
        //         console.log('empty points', e.points);
        //         getTrack(e.id).then(t => addSelectedTrack(t.data));
        //     } else {
        //         console.log('selected already cached');
        //         setSelectedTracks(selectedTracks.concat([e]));
        //     }
        // }
    }

    let columns = [
        // {
        //     name: 'trackDate', title: text.date, getCellValue: row => asShortStringDate(row.trackDate),
        //     getStyle: row => getTrackDateStyle(row),
        // },
        {
            name: 'resourceType', title: text.type,
            getCellValue: row => text[row.resourceType.toLowerCase()],
        },
        { name: 'resourceName', title: text.name, },
        { name: 'groupAmount', title: text.qty, },
        {
            name: 'unit', title: text.unit,
            getCellValue: row => {
                const unit = row.unit ? row.unit : '';
                const translate = unit === PER_AREA_UNIT ? areaUnit : unit.replace('PER_', '').toLowerCase()
                return text[translate]
            }
        }
        // { name: 'unitName', title: text.unit, },
        // { name: 'avgInFieldMovingSpeed', title: text.speed, frame: true },
        // // { name: 'resource', title: text.resource, getCellValue: row => row.resource ? row.resource.name : '' },

        //  { name: 'inFieldLength', title: text.distance, getCellValue: row => ((row.inFieldLength / 1000).toFixed(2)) },
        // {
        //     name: 'info',
        //     title: ' ',
        //     iconButton: true,
        //     onClick: (value, rowIndex) => console.log(value)
        // }
    ];

    return (
        <Table
        rows={resources}
        columns={columns}
        height={height}
        onRowClicked={onRowClicked}
    />
        // <PaginationTable
        //     rows={tracks}
        //     columns={columns}
        //     height={height160}
        //     onRowClicked={onRowClicked}
        //     onCurrentPageChange={setCurrentPage}
        //     onSortingChange={setSorting}
        //     sorting={sorting}
        //     currentPage={currentPage}
        //     pageSize={pageSize}
        //     totalCount={tracksCount}
        //     dir={dir}
        //     getRowStyle={getRowStyle}
        //     onChangeRowsPerPage={setTablePageSize}
        //     pageSizes={pageSizes}
        //     text={text}
        //     useSelection={false}
        //     showSelectAll={false}
        //     // selections={selectedTracks.map(e => e.id)}
        //     onRowClicked={onSelectRow}

        //     // selectAll={()=>setSelectedTracks(tracks)}
        // />

    );
}

export default TrackerActivityResourceTable;