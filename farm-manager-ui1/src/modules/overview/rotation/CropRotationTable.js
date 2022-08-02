import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableRow, TableHead, Badge, Box, TableContainer } from '@mui/material';
import { NotificationsNone as Alert } from '@mui/icons-material';
import { Loading } from '../../../components/core';
import { BORDER_COLOR } from '../../../App';
import { getCurrentYear, bodyHeight } from '../../../utils';
import { MasterDetailsTableTop } from '../../../components';
import { buildTableFilterOptions } from '../../utilities/fields/tableUtil';
import { loadDataByName } from '../../../utils/LoadUtil';

const emptyField = {
    border: '2px solid ' + 'lightGray',
    borderRadius: 3,
    color: 'white',
}

function renderAlerts(alerts) {
    if (alerts && alerts > 0) {
        return (
            <Badge badgeContent={alerts} color="error">
                <Alert sx={{ color: 'black' }} />
            </Badge>
        )
    }
}

function renderCrops(year, row, setSelected, currentYear) {
    const crops = row.yearCrops[year];
    const alertCount = row.alerts[year];
    const showAlarts = (year >= currentYear) && alertCount > 0;
    if (crops.length > 0) {
        return (
            crops.map(crop => <div onClick={() => setSelected({ year, crop, row })}
                style={{ display: 'flex', flex: 1, backgroundColor: crop.substance.description, padding: 2, borderRadius: 3, margin: 2, alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }} key={crop.id}>

                <div>
                    {crop.alias}
                    {showAlarts && renderAlerts(alertCount)}
                </div>
            </div>)
        )
    }
    else {
        return (
            <div onClick={() => setSelected({ year, row })}
                style={emptyField}>
                <div>
                    -
                    {showAlarts && renderAlerts(alertCount)}
                </div>
            </div>
        )
    }
}

const CropRotationTable = (props) => {

    const [filter, setFilter] = useState(null);

    useEffect(() => {
        loadDataByName(props, ['sites']);

    }, [])


    const { text, cropRotations, setSelected, areaUnit, lang, siteOptions } = props;
    if (!cropRotations) {
        return (
            <Loading />
        )
    }

    const currentYear = getCurrentYear();
    const years = cropRotations.years;
    const fieldOptions = buildTableFilterOptions(cropRotations.fields.map(e => e.field));

    let visableFields = cropRotations.fields;
    if (filter && filter.length > 0) {
        const fieldIds = filter.filter(e => e.value.includes('field')).map(e => e.id);
        const siteIds = filter.filter(e => e.value.includes('site')).map(e => e.id);
        visableFields = visableFields.filter(e => siteIds.includes(e.field.site.id) || fieldIds.includes(e.field.id));
    }

    return (
        <Box flex={1}>
            <MasterDetailsTableTop options={fieldOptions.concat(siteOptions)}
                filter={filter}
                setFilter={(filter) => setFilter(filter)}
                label={text.typeToSearch}
                lang={lang} />
            <TableContainer sx={{ height: bodyHeight, backgroundColor: 'white', borderTop: `2px solid ${BORDER_COLOR}` }} >

                <Table stickyHeader >
                    <TableHead  >
                        <TableRow >
                            <TableCell sx={{ fontWeight: 'bold', }}>{text.field}</TableCell>
                            <TableCell sx={{ maxWidth: 20, fontWeight: 'bold' }} >{text[areaUnit]}</TableCell>
                            {
                                years.map(e => (
                                    <TableCell sx={{ fontWeight: 'bold', }} key={e}>{e}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visableFields.map(row => (
                            <TableRow key={row.field.id}>
                                <TableCell component="th" scope="row">
                                    {row.field.name}
                                </TableCell>
                                <TableCell sx={{ maxWidth: 20, }} component="th" scope="row">
                                    {row.field.size}
                                </TableCell>
                                {
                                    years.map(e => (
                                        <TableCell key={e + '_' + row.field.id}>{renderCrops(e, row, setSelected, currentYear)}</TableCell>
                                    ))

                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default CropRotationTable;