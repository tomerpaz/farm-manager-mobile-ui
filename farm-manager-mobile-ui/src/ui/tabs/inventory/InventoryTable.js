import React, { Fragment, useEffect, useState } from 'react'
import { useGetInventoryQuery } from '../../../features/inventory/inventoryApiSlice'
import { ROWS_PER_PAGE } from '../../dialog/FieldsSelectionDialog';
import { selectInventoryDateFilter, selectInventoryFreeTextFilter, selectInventoryWarehouseFilter, selectLang } from '../../../features/app/appSlice';
import { useSelector } from 'react-redux';
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { cellSx, cellSxColor, headerSx } from '../../Util';
import { isStringEmpty } from '../../FarmUtil';
import InventoryFilter from '../../../components/filters/InventoryFilter';
import ListPager from '../../../components/ui/ListPager';
import Loading from '../../../components/Loading';

const filterData = (data, freeText, warehouseFilter) =>{

  let result = isStringEmpty(freeText) ? data : data.filter(e => e.resource.name.includes(freeText));

  if(warehouseFilter){
    result = result.filter(e=>e.warehouse.id === warehouseFilter);
  }
  return result;

}

function InventoryTable() {

  const height = window.innerHeight - 115;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const text = useSelector(selectLang)

  const { data: user } = useGetUserDataQuery()
  const freeText = useSelector(selectInventoryFreeTextFilter);

  const inventoryDate = useSelector(selectInventoryDateFilter);
  const warehouseFilter = useSelector(selectInventoryWarehouseFilter);


  useEffect(() => {
    setPage(0)

  }, [freeText]);

  const {
    data,
    isLoading,
  } = useGetInventoryQuery({ date: inventoryDate })

  if (!data || isLoading) {
    return <Loading />
  }
  const visableData =filterData(data, freeText, warehouseFilter);

  const rowCount = visableData.length;
  const showPegination = rowCount > ROWS_PER_PAGE;


  return (
    <Box>
      <TableContainer sx={{ padding: 0, maxHeight: height }}>
        <Table stickyHeader size="small" sx={{ width: '100%', margin: 0, padding: 0 }} aria-label="a dense table">
          <TableHead >
            <TableRow
            // style={{
            //     height: 10,
            // }}
            >
              <TableCell sx={headerSx} >{text.name}</TableCell>
              <TableCell sx={headerSx} >{text.type}</TableCell>
              <TableCell sx={headerSx} >{text.warehouse}</TableCell>
              <TableCell sx={headerSx} >{text.qty}</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {visableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) =>
              <Row key={index} index={index} row={row} text={text}
                user={user} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {showPegination && <ListPager bottom={0} page={Number(page)}
        totalPages={Math.ceil(visableData.length / ROWS_PER_PAGE)} setPage={setPage} />}

      <InventoryFilter />
    </Box>

  )
}

function getColor(value) {
  if (!value || value === 0) {
    return 'black';
  } else if (value > 0) {
    return 'green'
  } else {
    return 'red'
  }
}

function Row(props) {
  const { row, index, text, onClick } = props;
  const resource = row.resource;
  return (
    <Fragment>
      <TableRow style={{
        height: 10,
      }} onClick={onClick}
        key={index}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell sx={cellSx} >{resource.name}</TableCell>
        <TableCell sx={cellSx} >{text[resource.type.toLowerCase()]}</TableCell>
        <TableCell sx={cellSx} >{row.warehouse.name}</TableCell>
        <TableCell sx={cellSxColor(getColor(row.qty))} >{row.qty}</TableCell>
      </TableRow>
    </Fragment>
  );
}
export default InventoryTable