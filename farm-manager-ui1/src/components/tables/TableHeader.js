import React from 'react';
import { getIcon } from "../../icons/IconUtil";
import { TableCell, TableRow, TableHead, TableSortLabel, Checkbox, Tooltip, } from '@mui/material';

const flip = {
    desc: 'asc',
    asc: 'desc'
}

const BaseTableHeader = (props) => {

    const { onSelectAllClick, order, orderBy, numSelected, rowCount, columns, useSelection, onRequestSort, showSelectAll, disableSort, pagination } = props;

    return (
        <TableHead  >
            <TableRow  >
                {useSelection &&
                    <TableCell padding="checkbox">
                        {showSelectAll && <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />}
                    </TableCell>
                }
                {columns.map(row => {

                    return (
                        <TableCell
                            style={row.style}
                            key={row.name}
                            padding={row.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === row.name ? order : false}
                        >
                            {!disableSort && row.disableSort !== true && <Tooltip
                                title="Sort"
                                placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                enterDelay={300}
                            >
                                <TableSortLabel

                                    active={orderBy === row.name}
                                    direction={order}
                                    onClick={(event) => pagination ? onRequestSort({ direction: flip[order], columnName: row.name }) : onRequestSort(event, row.name)}
                                >
                                    {row.title}
                                </TableSortLabel>
                            </Tooltip>}
                            {!disableSort && row.disableSort === true && <div > {row.title}</div>}
                            {disableSort && !row.iconTitle && <div > {row.title}</div>}
                            {disableSort && row.iconTitle && <div > {getIcon(row.iconTitle)}</div>}

                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
}

export default BaseTableHeader;

