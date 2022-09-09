import { useSelector } from 'react-redux'
import { selectLang } from '../../../features/app/appSlice'
import { tableHeaderSx, tableCellSx, getUnitText, formatNumber, parseDate } from '../../FarmUtil';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const FieldFertilizerTable = ({ fertilizers }) => {
    const text = useSelector(selectLang)
    return (
        <TableContainer >
            <Table size="small" sx={{ margin: 0, padding: 0 }} aria-label="a dense table">
                <TableHead>
                    <TableRow  >
                        <TableCell sx={tableHeaderSx} >{text.name}</TableCell>
                        <TableCell sx={tableHeaderSx}>{text.unit}</TableCell>
                        <TableCell sx={tableHeaderSx}>{text.qty}</TableCell>
                        <TableCell sx={tableHeaderSx}>{text.date}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fertilizers.map((row, index) =>
                        <TableRow key={index}>
                            <TableCell sx={tableCellSx} >{row.resource.name}</TableCell>
                            <TableCell sx={tableCellSx}>{getUnitText(row.resource.usageUnit, null, text)}</TableCell>
                            <TableCell sx={tableCellSx}>{formatNumber(row.qty)}</TableCell>
                            <TableCell sx={tableCellSx}>{parseDate(row.date)}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default FieldFertilizerTable