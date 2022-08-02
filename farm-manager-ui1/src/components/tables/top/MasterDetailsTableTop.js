import { debounce, isEmpty } from 'lodash';
import React, { useState, useEffect } from 'react';

import { DatePicker } from '../../'

import { Autocomplete, TextField } from '../../'
import PdfIcon from "../../../icons/PdfIcon";
import ExcelIcon from "../../../icons/ExcelIcon";
import { getReport } from "../../../actions/FileActions";
import { AddButton } from '../../../components'

import { Checkbox, MenuItem, IconButton, FormControlLabel, Tooltip, Box } from '@mui/material';
import CheckboxBase from '../../core/checkbox/CheckBox';
import { FactCheck, FactCheckOutlined } from '@mui/icons-material';
import { isArrayEmpty } from '../../filters/filterUtil';

const addActive = (filter, onActiveChange, active) =>{
    if(onActiveChange){

        const activeFilter = [{value: 'active_'+active}];
        if(isArrayEmpty(filter)){
            return activeFilter;
        } else {
            return filter.concat(activeFilter);
        }
    }
    return filter;

}

const MasterDetailsTableTop = (props) => {
    const { options, filter, setFilter, label, onClick, actionText,
        pdfReport, xlsReport, lang, start, end, onStartChange, onEndChange, text,
        clearableDates, sorting, to, freeTextTitle, freeText, onFreeTextChange, active, onActiveChange, view, viewOptions, setView
        , onDeepSearchChange, deepSearch } = props;


    const onFreeTextChangeDebounced = debounce((freeText) => { onFreeTextChange(freeText) }, 20);
    const [generate, setGenerate] = useState(null)

    useEffect(() => {
        if (generate) {
            getReport(pdfReport, lang, generate, start, end, addActive(filter, onActiveChange, active), sorting, freeText, () => setGenerate(null))
        }
    }, [generate]);
    return (
        <Box flex={1} display={'flex'} alignItems={'center'}>
            {(onClick || to) &&
                <AddButton onClick={onClick} to={to} label={actionText} />

            }

            <Autocomplete
                noMargin={true}
                options={options}
                onChange={setFilter}
                value={filter}
                placeholder={label}
                isMulti={true}
            />

            {onFreeTextChange &&
                <TextField
                    width={250}
                    onFocus={(e) => e.target.select()}
                    value={freeText}
                    placeholder={freeTextTitle}
                    onChange={(e) => onFreeTextChangeDebounced(e.target.value)}
                />
            }

            {onDeepSearchChange &&
                <CheckboxBase
                    checked={deepSearch}
                    disabled={isEmpty(freeTextTitle)}
                    onChange={(e) => onDeepSearchChange(e.target.checked)}
                    icon={<FactCheckOutlined />}
                    checkedIcon={<FactCheck />}
                />
            }
            {onStartChange &&
                <DatePicker clearable={clearableDates} value={start} text={text} onChange={onStartChange} placeholder={onEndChange ? text.fromDate : text.date} />
            }
            {onEndChange &&
                <DatePicker clearable={clearableDates} value={end} text={text} onChange={onEndChange} placeholder={text.toDate} noMargin={true} />
            }
            {onActiveChange &&
                <FormControlLabel
                    control={<Checkbox color="primary" checked={active} onChange={() => onActiveChange(!active)} />}
                    label={text.active} />

            }


            {viewOptions && <TextField
                select
                width={200}
                value={view}
                onChange={(e) => setView(e.target.value)}
                label={text.view}
            >
                {
                    viewOptions.map(e =>
                        <MenuItem key={e} value={e}>
                            {text[e]}
                        </MenuItem>

                    )
                }
            </TextField>
            }

            {pdfReport && //name, lang, format, filter
                <IconButton onClick={() => !generate ? setGenerate('pdf') : null} variant="outlined">
                    <PdfIcon />
                </IconButton>
            }
            {xlsReport &&
                <IconButton onClick={() => !generate ? setGenerate('xls') : null} variant="outlined">
                    <ExcelIcon />
                </IconButton>
            }
        </Box>
    )
}
export default MasterDetailsTableTop;

