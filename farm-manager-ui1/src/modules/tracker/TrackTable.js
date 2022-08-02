import React, { useState, useEffect } from 'react';
import { ActionMenu, PaginationTable, YesNoDialog } from '../../components';
import { asShortStringDate, newDate } from "../../utils/DateUtil";
import { _fertilizers } from '../../utils/LoadUtil';
import { height160 } from '../../utils';
import { isArrayEmpty } from '../../components/filters/filterUtil';
import { getTrack } from '../../actions';
import { Box } from '@mui/system';
import { isEmpty } from '../../utils/StringUtil';
import { activeAction, inactiveAction } from '../../components/core/ActionMenu';

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
       // return masterStyle;
    }
    return null;
}

const TrackTable = (props) => {
    const {
        pageSize,
        text, pageSizes, dir, setTablePageSize, tracks, tracksCount, selectedTracks, setSelectedTracks, sorting, setSorting,
        currentPage, setCurrentPage, addSelectedTrack, getTrackerActivity, trackMaxAvgSpeed, trackMinLength,
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [deleteFileFlag, setDeleteFileFlag] = useState(false);

    const handleClick = (value, rowIndex, event) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(value);
    }

    const actionClick = (value, event) => {
        console.log(value)
        // if (value === uploadAction) {
        //     history.push(`${UPLOAD}${PROCUREMENT}/${selectedRow.id}`)
        // } else if (value === downloadAction && selectedRow && selectedRow.fileId) {
        //     getFile(selectedRow.fileId);
        // } else if (value === deleteAction && selectedRow && selectedRow.fileId) {
        //     setDeleteFileFlag(true);
        // }
        setAnchorEl(null);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    // const onRowClicked = (row, duplicate) => {
    //     // selectTariff(null);
    //     if (row) {
    //         if (duplicate && duplicate === true) {
    //             // duplicateTariff(row.id)
    //         } else {
    //             // getTariff(row.id);
    //         }
    //     }
    // }


    const onSelectRow = (e) => {
        const remove = selectedTracks.map(t => t.id).includes(e.id);
        if (remove) {
            setSelectedTracks(selectedTracks.filter(t => t.id !== e.id));
        } else {
            if (isArrayEmpty(e.points)) {
                console.log('empty points', e.points);
                getTrack(e.id).then(t => addSelectedTrack(t.data));
            } else {
                console.log('selected already cached');
                setSelectedTracks(selectedTracks.concat([e]));
            }
        }
    }

    let columns = [
        {
            name: 'trackDate', title: text.date, getCellValue: row => asShortStringDate(row.trackDate),
            getStyle: row => getTrackDateStyle(row),
        },
        {
            name: 'activityRef', title: text.reference,
            clickable: row => !isEmpty(row.activityRef),
            onClick: row => getTrackerActivity(row.id, trackMaxAvgSpeed, trackMinLength),
        },
        { name: 'domain', title: text.field, getCellValue: row => row.domain.field.name },
        { name: 'unitName', title: text.unit, },
        { name: 'avgInFieldMovingSpeed', title: text.speed, frame: true },
        { name: 'inFieldHours', title: text.hours, },
        // {
        //     name: 'moreVert',
        //     title: '',
        //     disableSort: true,
        //     iconButton: true,
        //     clickable: true,
        //     hasData: row => row.fileId,
        //     onClick: (value, rowIndex, e) => handleClick(value, rowIndex, e),
        // },
        // { name: 'resource', title: text.resource, getCellValue: row => row.resource ? row.resource.name : '' },

        // { name: 'inFieldLength', title: text.distance, getCellValue: row => ((row.inFieldLength / 1000).toFixed(2)) },
        // {
        //     name: 'info',
        //     title: ' ',
        //     iconButton: true,
        //     onClick: (value, rowIndex) => console.log(value)
        // }
    ];

    return (
        <Box>



            <PaginationTable
                rows={tracks}
                columns={columns}
                height={height160}
                // onRowClicked={onRowClicked}
                onCurrentPageChange={setCurrentPage}
                onSortingChange={setSorting}
                sorting={sorting}
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={tracksCount}
                dir={dir}
                getRowStyle={getRowStyle}
                onChangeRowsPerPage={setTablePageSize}
                pageSizes={pageSizes}
                text={text}
                useSelection={true}
                showSelectAll={false}
                selections={selectedTracks.map(e => e.id)}
                onRowClicked={onSelectRow}

            />
            {selectedRow && <ActionMenu onClick={actionClick} text={text}
                actions={selectedRow.activityRef ? [activeAction, inactiveAction] : [inactiveAction]}
                anchorEl={anchorEl} onClose={(handleClose)} />}

            {selectedRow && selectedRow.activityRef && <YesNoDialog open={deleteFileFlag}
                action={actionClick}
                title={text.deleteFormTitle}
                body={text.deleteFormBody}
                yesText={text.delete}
                noText={text.cancel}
                />}
        </Box>
    );
}

export default TrackTable;