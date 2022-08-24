import { Menu } from '@mui/icons-material'
import { Badge, Box, Divider, IconButton, TableRow, Table, TableBody, TableCell, TableContainer, TableHead, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLang } from '../../../features/auth/authSlice'
import { isArrayEmpty } from '../../FarmUtil'
import InfoLine from '../../field/InfoLine'



    

const FieldsView = ({ activity }) => {

    const TRASHHOLD = 3;
    const text = useSelector(selectLang)

    const [expendFields, setExpendFields] = useState(false);

    console.log('expendFields', expendFields)

    if (isArrayEmpty(activity.fields)) {
        return <Fragment />
    }


    const fields = (expendFields && activity.fields.length > TRASHHOLD) ? activity.fields : activity.fields.slice(0, TRASHHOLD);

    return (

        <Box>

            <Box marginLeft={1} marginRight={1} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Typography  variant='h6'>
                    {text.fields}
                </Typography >
                {activity.fields.length > TRASHHOLD &&
                    <IconButton sx={{marginLeft: 1, marginRight: 1}} onClick={() => setExpendFields(!expendFields)}>
                        <Badge badgeContent={activity.fields.length} color="primary">
                            <Menu color="action" />
                        </Badge>
                    </IconButton>
                }
            </Box>

            <TableContainer >
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell >{text.field}</TableCell>
                            <TableCell>{text.crop}</TableCell>
                            <TableCell>{'area'}</TableCell>

                            {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {fields.map((row, index) =>
                            <TableRow 
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell >{row.field.name}</TableCell>
                                <TableCell >{row.field.cropName}</TableCell>
                                <TableCell > 
                                {/* <Box sx={{fontSize: 40}}>{FRUITS['pineapple']}</Box> */}
                                </TableCell>

                                
                            </TableRow>
                        )
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        // <Box>

        //     {fields.map((e, index) =>
        //         <Box marginTop={1} display={'flex'} flexDirection={'row'} key={index}>
        //             <Typography variant="subtitle1" >
        //                 {e.field.name}
        //             </Typography>
        //             <Typography variant="subtitle1" >
        //                 {e.field.cropName}
        //             </Typography>
        //             <Divider/>
        //         </Box>
        //     )}

        // </Box>
    )
}

export default FieldsView