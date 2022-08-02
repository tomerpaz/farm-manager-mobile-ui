import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { TableContainer, Table, TableBody, TableCell, TableRow, Checkbox, Box } from '@mui/material';

import TableFooter from './TableFooter';
import Cell from './Cell';

import TableHedaer from './TableHeader'
import { BORDER_COLOR } from "../../App";

const flip = {
    asc: 'desc',
    desc: 'asc'
}

function get(value, numeric) {
    if (!value || !numeric) {
        return value;
    }
    value = value.replace ? value.replace(',', '') : value;
    if (isNaN(value)) {
        return value
    }
    return Number(value);
}

function desc(a, b, orderBy, getCellValueFunc, numeric) {
    if (getCellValueFunc) {
        if (get(getCellValueFunc(b), numeric) < get(getCellValueFunc(a), numeric)) {
            return -1;
        }
        if (get(getCellValueFunc(b), numeric) > get(getCellValueFunc(a), numeric)) {
            return 1;
        }
        return 0;
    } else {
        if (get(b[orderBy], numeric) < get(a[orderBy], numeric)) {
            return -1;
        }
        if (get(b[orderBy], numeric) > get(a[orderBy], numeric)) {
            return 1;
        }
        return 0;
    }
}

function tableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy, columns) {
    const column = columns.filter(e => e.name === orderBy);
    const getCellValueFunc = column && column.length > 0 ? column[0].getCellValue : null;
    const numeric = column && column.length > 0 ? column[0].numeric : false;

    return order === 'desc' ? (a, b) => desc(a, b, orderBy, getCellValueFunc, numeric) : (a, b) => -desc(a, b, orderBy, getCellValueFunc, numeric);
}

const useStyles = makeStyles(theme => ({



    iconCell: {
        padding: 0,
        width: 40,
    },
    editText: {
        padding: theme.spacing(0.5),
    },
}));

const EnhancedTable = (props) => {
    const classes = useStyles();

    const { rows, columns, height, onRowClicked, selectAll, useSelection, selections, showSelectAll,
        disableSort, footer, indexKey, getKey, dateFormat, text, focusCell, overflowX, tableLayout, initialOrderBy, getRowStyle } = props;


    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(initialOrderBy ? initialOrderBy : '');




    const handleRequestSort = (event, property) => {
        if (orderBy === property) {
            setOrder(flip[order])
        }
        setOrderBy(property)
    };


    const data = disableSort ? rows : tableSort(rows, getSorting(order, orderBy, columns));
    return (
        <Box display={'flex'} flex={1} flexDirection={'column'} backgroundColor='white' borderTop={`2px solid ${BORDER_COLOR}`}>
            <TableContainer style={{ height: height, overflowX: overflowX ? overflowX : 'auto' }}>

                <Table stickyHeader size='small'>
                    <TableHedaer className={classes.tableHeader}
                        showSelectAll={showSelectAll}
                        columns={columns}
                        numSelected={selections ? selections.length : null}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={e => selectAll ? selectAll(e.target.checked) : null}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        useSelection={useSelection}
                        disableSort={disableSort}
                    />
                    <TableBody>
                        {data
                            .map((n, index, arr) => {
                                let key = n.id ? n.id : n.uuid;
                                if (getKey) {
                                    key = getKey(n);
                                }
                                else if (indexKey) {
                                    key = index;
                                }
                                const isSelected = selections ? selections.indexOf(key) > -1 : false;
                                return (
                                    <TableRow
                                        hover
                                        style={getRowStyle ? getRowStyle(n) : null}
                                        // onClick={onRowClicked ? (event) => onRowClicked(n) : null}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={key}
                                        selected={isSelected}
                                    >
                                        {useSelection &&
                                            <TableCell onClick={onRowClicked ? (event) => onRowClicked(n) : null} padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                        }
                                        {columns.map(c => {
                                            const className = c.edit ? classes.editText : (c.iconButton ? classes.iconCell : null)

                                            const colKey = c.name;

                                            return (
                                                <TableCell key={colKey}
                                                    padding="normal"
                                                    onClick={event => c.onClick ? c.onClick : (onRowClicked ? onRowClicked(n) : null)}
                                                    colSpan={c.colSpan} >
                                                    <Cell column={c} rowData={n} rowIndex={index}
                                                        focusCell={focusCell}
                                                        dateFormat={dateFormat} text={text} />
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                );
                            })}
                        {!height && rows.length === 0 && (
                            <TableRow style={{ height: 49 * 1 }}>
                                <TableCell padding="normal" colSpan={columns.length} />
                            </TableRow>
                        )}
                    </TableBody>
                    {footer &&
                        <TableFooter footer={footer} />
                    }
                </Table>
            </TableContainer>
        </Box>
    );

}

export default EnhancedTable;