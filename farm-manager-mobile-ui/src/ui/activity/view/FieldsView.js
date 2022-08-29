import { Menu } from '@mui/icons-material'
import { Badge, Box, IconButton, TableRow, Table, TableBody, TableCell, TableContainer, TableHead, Typography, Collapse } from '@mui/material'
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice'
import { selectLang } from '../../../features/app/appSlice'
import { isArrayEmpty } from '../../FarmUtil'
import { SECONDARY_LIGHT } from '../../../App'

const headerSx = { fontWeight: 'bold', padding: 1 };
const cellSx = { padding: 1 };
const TRASHHOLD = 3;

const FieldsView = ({ activity }) => {

    const text = useSelector(selectLang)
    const { data: user } = useGetUserDataQuery()
    const [expendFields, setExpendFields] = useState(false);

    if (isArrayEmpty(activity.fields)) {
        return <Fragment />
    }

    const fields = (expendFields && activity.fields.length > TRASHHOLD) ? activity.fields : activity.fields.slice(0, TRASHHOLD);

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
                            <Row key={index} index={index} row={row} text={text} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

function Row(props) {
    const { row, index, text } = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={cellSx} >{row.field.name}</TableCell>
                <TableCell sx={cellSx}>{row.field.alias}</TableCell>
                <TableCell sx={cellSx} >{row.field.cropName}</TableCell>
                <TableCell sx={cellSx}>{row.field.varietyName}</TableCell>
                <TableCell sx={cellSx}>{row.activityArea.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: SECONDARY_LIGHT }}>
                <TableCell style={{ padding: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table size="small" aria-label="extra">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{text.site}</TableCell>
                                    <TableCell>{text.note}</TableCell>
                                    <TableCell >{text.note}</TableCell>
                                    <TableCell >{text.note}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        {row.field.siteName}
                                    </TableCell>
                                    <TableCell>{row.fieldNote}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}
export default FieldsView