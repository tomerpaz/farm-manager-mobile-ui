import { Menu } from '@mui/icons-material'
import { Badge, Box, IconButton, TableRow, Table, TableBody, TableCell, TableContainer, TableHead, Typography } from '@mui/material'
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice'
import { selectLang } from '../../../features/app/appSlice'
import { isArrayEmpty, parseDate } from '../../FarmUtil'
import FieldDialog from './FieldDialog'

export const headerSx = { fontWeight: 'bold', padding: 1 };
export const cellSx = { padding: 1 };
export const cellSxLink = { padding: 1, color: 'blue' };

const TRASHHOLD = 3;

const FieldsView = ({ activity }) => {

    const text = useSelector(selectLang)
    const { data: user } = useGetUserDataQuery()
    const [expendFields, setExpendFields] = useState(false);

    const [selectedRow, setSelectedRow] = useState(null);
 

    console.log('selectedRow',selectedRow)

    if (isArrayEmpty(activity.fields)) {
        return <Fragment />
    }

    const fields = (expendFields && activity.fields.length > TRASHHOLD) ? activity.fields : activity.fields.slice(0, TRASHHOLD);

    const onFieldsDialogClose = (data) => {
        console.log('data',data)
        setSelectedRow(null)

    }

    return (
        <Box>
            <Box marginLeft={1} marginRight={1} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Typography variant='h6'>
                    {text.fields}
                </Typography >
                {activity.fields.length > TRASHHOLD &&
                    <IconButton sx={{ marginLeft: 1, marginRight: 1 }} onClick={() => setExpendFields(!expendFields)}>
                        <Badge badgeContent={activity.fields.length} color="primary">
                            <Menu color="action" />
                        </Badge>
                    </IconButton>
                }
            </Box>
            <TableContainer >
                <Table size="small" sx={{ margin: 0, padding: 0 }} aria-label="a dense table">
                    <TableHead>
                        <TableRow  >
                            <TableCell sx={headerSx} >{text.field}</TableCell>
                            <TableCell sx={headerSx}>{text.alias}</TableCell>
                            <TableCell sx={headerSx}>{text.crop}</TableCell>
                            <TableCell sx={headerSx}>{text.variety}</TableCell>
                            <TableCell sx={headerSx}>{text[user.areaUnit]}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fields.map((row, index) =>
                            <Row key={index} index={index} row={row} text={text} onClick={setSelectedRow} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <FieldDialog row={selectedRow} activity={activity} onClose={onFieldsDialogClose}/>

        </Box>
    )
}

function Row(props) {
    const { row, index, text , onClick} = props;
    return (
        <Fragment>
            <TableRow onClick={() => onClick(index)}
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={cellSxLink} >{row.field.name}</TableCell>
                <TableCell sx={cellSx}>{row.field.alias}</TableCell>
                <TableCell sx={cellSx} >{row.field.cropName}</TableCell>
                <TableCell sx={cellSx}>{row.field.varietyName}</TableCell>
                <TableCell sx={cellSx}>{row.activityArea.toFixed(2)}</TableCell>
            </TableRow>
        </Fragment>
    );
}
export default FieldsView