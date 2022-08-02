import React from 'react';
import { MenuItem, Box } from '@mui/material';
import { YearPicker, Autocomplete, TextField } from '../../../components';

const FinancialDashboardFilter = ({ state, setState, dir,
    yearFilter, setYearFilter, yearFilter2, setYearFilter2, dual,
    setFilter, filter, setFilter2, filter2, options,
    text, fieldCrops, plantations, cropType, setCropType, fetchData, fetchData2,
    compareOptions
}) => {

    return (
        <Box display={'flex'} flexDirection={'row'} flex={1}>
            <YearPicker dir={dir} value={yearFilter} onChange={setYearFilter} />
            <Autocomplete
                noMargin={true}
                options={options}
                onChange={(e) => setFilter(e)}
                value={filter}
                placeholder={text.typeSearchTerm}
            />
            {dual &&
                <React.Fragment>
                    <YearPicker dir={dir} value={yearFilter2} onChange={setYearFilter2} />
                    <Autocomplete
                        noMargin={true}
                        options={options}
                        onChange={(e) => setFilter2(e)}
                        value={filter2}
                        placeholder={text.typeSearchTerm}
                    />
                </React.Fragment>
            }

            <TextField
                select
                width={120}

                value={state}
                label={text.compare}
                onChange={(e) => setState(e.target.value)}
            >
                <MenuItem value="">
                    <em>{text.compare}</em>
                </MenuItem>
                {
                    compareOptions.map(e => <MenuItem key={e} value={e}>{text[e]}</MenuItem>)
                }
            </TextField>
            {fieldCrops && plantations &&
                <React.Fragment>
                    <TextField
                        select
                        width={120}
                        value={cropType}
                        onChange={(e) => setCropType(e.target.value)}
                    >
                        <MenuItem value={'fieldCrops'}>{text.fieldCrops}</MenuItem>
                        <MenuItem value={'plantations'}>{text.plantations}</MenuItem>
                    </TextField>
                </React.Fragment>
            }
        </Box>
    )
}
export default FinancialDashboardFilter;



