import React from 'react'; import EditTextCell from './EditTextCell';
import { TableFooter, TableCell, TableRow } from '@mui/material';

const BaseTableFooter = (props) => {
    const { footer, } = props;

    return (
        <TableFooter>
            <TableRow>
                {footer.map((f, i, arr) => {
                    if (f.edit) {
                        return (
                            <TableCell  key={i} colSpan={f.colSpan} >
                                <EditTextCell width={f.width}
                                    column={f} value={f.value} rowData={null} rowIndex={null} />
                            </TableCell>
                        )
                    }
                    return (
                        <TableCell sx={{ fontWeight: 'bold', color: 'black' }} key={i} colSpan={f.colSpan}>
                            {f.value}
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableFooter>
    )
}
export default BaseTableFooter;

