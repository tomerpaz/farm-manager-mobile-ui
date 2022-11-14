import { Menu } from '@mui/icons-material'
import { Badge, Box, IconButton, TableRow, Table, TableBody, TableCell, TableContainer, TableHead, Typography, Collapse } from '@mui/material'
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice'
import { selectLang } from '../../../features/app/appSlice'
import { getResourceTypeText, getUnitText, isArrayEmpty } from '../../FarmUtil'
import { SECONDARY_LIGHT } from '../../../App'
import { cellSxLink, headerSx, cellSx } from './FieldsView'
import ResourceDialog from './ResourceDialog'

const TRASHHOLD = 6;

const ResourceView = ({ activity }) => {

    const text = useSelector(selectLang)
    const { data: user } = useGetUserDataQuery()
    const [expend, setExpend] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    if (isArrayEmpty(activity.resources)) {
        return <Fragment />
    }

    const resources = (expend && activity.resources.length > TRASHHOLD) ? activity.resources : activity.resources.slice(0, TRASHHOLD);

    const onResourceDialogClose = (data) => {
        console.log('data',data)
        setSelectedRow(null)

    }

    return (
        <Box marginTop={1}>
            <Box marginLeft={1} marginRight={1} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Typography variant='h6'>
                    {text.resources}
                </Typography >
                {activity.resources.length > TRASHHOLD &&
                    <IconButton sx={{ marginLeft: 1, marginRight: 1 }} onClick={() => setExpend(!expend)}>
                        <Badge badgeContent={activity.resources.length} color="primary">
                            <Menu color="action" />
                        </Badge>
                    </IconButton>
                }
            </Box>
            <TableContainer >
                <Table size="small" sx={{ margin: 0, padding: 0 }} aria-label="a dense table">
                    <TableHead>
                        <TableRow  >
                            <TableCell sx={headerSx} >{text.name}</TableCell>
                            <TableCell sx={headerSx} >{text.type}</TableCell>
                            <TableCell sx={headerSx}>{text.qty}</TableCell>
                            <TableCell sx={headerSx}>{text.unit}</TableCell>
                            <TableCell sx={headerSx}>{text.cost}</TableCell>

                            {/* <TableCell sx={headerSx}>{text.variety}</TableCell>
                            <TableCell sx={headerSx}>{text[user.areaUnit]}</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {resources.map((row, index) =>
                            <Row key={index} index={index} row={row} text={text} areaUnit={user.areaUnit} currency={user.currency} activityDef={activity.activityDef}
                            onClick={setSelectedRow} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <ResourceDialog row={selectedRow} activity={activity} areaUnit={user.areaUnit} onClose={onResourceDialogClose}/>

        </Box>
    )
}

function Row(props) {
    const { row, index, text, areaUnit, onClick, activityDef , currency} = props;
    return (
        <Fragment>
            <TableRow onClick={() => onClick(index)}
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={cellSxLink} >{row.resource.name}</TableCell>
                <TableCell sx={cellSx} >{getResourceTypeText(row.resource.type, text)}</TableCell>
                <TableCell sx={cellSx}>{row.qty}</TableCell>
                <TableCell sx={cellSx}>{getUnitText(row.resource.usageUnit, areaUnit, text)}</TableCell>
                <TableCell sx={cellSx}>{row.totalCost}</TableCell>
                {/* getUnitText = (unit, areaUnit, text) */}
            </TableRow>
        </Fragment>
    );
}
export default ResourceView