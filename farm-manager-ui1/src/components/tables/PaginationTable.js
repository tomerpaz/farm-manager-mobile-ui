import React from 'react';
import { TableContainer, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox, Box } from '@mui/material';
import { BORDER_COLOR } from "../../App";
import TableHeader from './TableHeader';
import Cell from './Cell';

export function getOnClick(c, onRowClicked, n) {
    if (c.checkbox) {
        return null;
    } else {
        return c.onClick ? c.onClick : (onRowClicked ? onRowClicked(n) : null)
    }
}

const PaginationTable = (props) => {

    const {
        rows, columns, onCurrentPageChange, height, onRowClicked, onSortingChange, sorting,
        selectAll, useSelection, selections, showSelectAll, disableSort,
        currentPage, pageSize, totalCount, dir, pageSizes, onChangeRowsPerPage, getRowStyle, getKey, indexKey, text
    } = props;


    return (
        <Box display={'flex'} flex={1} flexDirection={'column'} backgroundColor='white' borderTop={`2px solid ${BORDER_COLOR}`}>
            <TableContainer style={{ height: height }} >
                <Table stickyHeader size='small'>
                    <TableHeader
                        pagination={true}
                        columns={columns}
                        order={sorting.direction}
                        orderBy={sorting.columnName}
                        onRequestSort={onSortingChange}

                        showSelectAll={showSelectAll}
                        numSelected={selections ? selections.length : null}
                        onSelectAllClick={e => selectAll ? selectAll(e.target.checked) : null}
                        rowCount={rows.length}
                        useSelection={useSelection}
                        disableSort={disableSort}
                    />
                    <TableBody>
                        {rows.map((n, index, arr) => {
                            let key = n.id ? n.id : n.uuid;
                            if (getKey) {
                                key = getKey(n);
                            }
                            else if (indexKey) {
                                key = index;
                            }

                            const isSelected = selections ? selections.indexOf(key) > -1 : false;
                            // console.log(key, isSelected, selections)
                            return (
                                <TableRow
                                    hover
                                    // onClick={onRowClicked ? (event) => onRowClicked(n) : null}
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex={-1}
                                    key={key}
                                    selected={isSelected}
                                    style={getRowStyle ? getRowStyle(n) : null}

                                >
                                    {useSelection &&
                                        <TableCell onClick={onRowClicked ? (event) => onRowClicked(n) : null} padding="checkbox">
                                            <Checkbox checked={isSelected} />
                                        </TableCell>
                                    }
                                    {columns.map(c => {

                                        const value = c.getCellValue ? c.getCellValue(n) : n[c.name];
                                        return (

                                            <TableCell
                                                //onClick={event =>  c.clickable ? null : onRowClicked(n)} /*numeric={c.type === 'number'}*/
                                                padding="normal"
                                                onClick={event => getOnClick(c, onRowClicked, n)}
                                                key={c.name}>
                                                <Cell column={c} rowData={n} rowIndex={index} />
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination 
                rowsPerPageOptions={pageSizes}
                // labelRowsPerPage={text.count}
                component="div"
                count={totalCount}
                rowsPerPage={pageSize}
                page={currentPage}
                SelectProps={{
                    sx: {marginTop: 1.2 },
                }}
                onPageChange={(event, page) => onCurrentPageChange(page)}
                onRowsPerPageChange={(event) => onChangeRowsPerPage ? onChangeRowsPerPage(event.target.value) : console.log('onChangeRowsPerPage', event.target.value)}
            />
        </Box>
    );
}

export default PaginationTable;