import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useSelector } from "react-redux"
import { selectLang } from "../../../features/app/appSlice"
import { cellSx, cellSxLink, headerSx } from "../view/FieldsView"
import { Fragment } from "react"
import { getResourceTypeText, getUnitText } from "../../FarmUtil"
import { useGetUserDataQuery } from "../../../features/auth/authApiSlice"


const ActivityResources = ({ activity }) => {
    const text = useSelector(selectLang)
    const { data: user } = useGetUserDataQuery()

    return (
        <Box margin={1} display={'flex'} flexDirection={'column'}>
            <Box>
                <Button size='large' disableElevation={true} variant="contained">{text.resources}</Button>
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
                        {activity.resources.map((row, index) =>
                            <Row key={index} index={index} row={row} text={text} areaUnit={user.areaUnit} currency={user.currency} activityDef={activity.activityDef}
                            /*onClick={setSelectedRow} *//>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
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
export default ActivityResources