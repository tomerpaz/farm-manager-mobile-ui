import React from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, DatePicker } from '../../components';
import EditTextCell from './EditTextCell';
import { IconButton, Button, Checkbox, InputAdornment, Tooltip } from '@mui/material';
import {
    BorderStyle as Split, Opacity as Irrigation, Delete, Visibility, MoreHoriz, InfoOutlined as Info, MoreVert, History
} from '@mui/icons-material/';

import { blue } from '@mui/material/colors';
import { Autocomplete } from '../';
import { getFruitIcon } from "../../icons/FruitIconUtil";
import GpsTrack from '../../icons/GpsTrack';
import FileIcon from '../../icons/FileIcon';
import Duplicate from '../../icons/Duplicate';
import { SECONDARY_MAIN } from '../../App';

const hasData = '#1976d2';

const useStyles = makeStyles(theme => ({


    frame: {
        margin: 0,
        padding: 4,
        paddingTop: 3,
        paddingBottom: 3,
        border: '2px solid ' + theme.palette.primary.dark,
        borderRadius: 4,
        width: 70,
        color: theme.palette.primary.dark,
        fontWeight: 700
    },


}));

const clickableSX={
    padding: 0,
    margin: 0,
    color: blue[800],
    '&:disabled': {
        color: 'gray',
    },
    '&:hover': {
        backgroundColor: 'inherit',
    },
    zIndex: 1,
}


const inputRef = input => {
    if (input && input !== null) {
        input.focus();
    }
};

function fixYear(date){
    if(date &&  date.getYear() && date.getYear() < 1900){
        date.setYear(new Date().getFullYear())
    }
    return date;
}
const Cell = (props) => {
    const classes = useStyles();

    const { column, rowData, rowIndex, dateFormat, text, focusCell } = props;
    const value = column.getCellValue ? column.getCellValue(rowData) : rowData[column.name];

    const InputProps = {};

    if (column.hide && column.hide(rowData)) {
        return <div></div>
    }

    const endAdornment = column.endAdornment ? column.endAdornment(rowData) : null;

    if (endAdornment) {
        InputProps.endAdornment = <InputAdornment style={{ paddingLeft: 5, paddingRight: 5 }} position="start">{endAdornment}</InputAdornment>;
    }

    const focus = focusCell && focusCell.index === rowIndex && column.name === focusCell.column;

    function renderIconButton() {
        return <IconButton onClick={(e) => column.onClick(rowData, rowIndex, e)} disabled={column.disabled}>
            {(column.name === 'duplicate' || (column.getIcon && column.getIcon(rowData) === 'duplicate')) && <Duplicate />}
            {(column.name === 'delete' || (column.getIcon && column.getIcon(rowData) === 'delete')) && <Delete />}
            {column.name === 'split' && <Split />}
            {column.name === 'view' && <Visibility />}
            {column.name === 'moreHoriz' && <MoreHoriz />}
            {column.name === 'moreVert' && <MoreVert />}
            {column.name === 'gps' && <GpsTrack />}
            {column.name === 'file' && <FileIcon style={{ color: column.hasData && column.hasData(rowData) ? hasData : 'gray' }} />}
            {column.name === 'valves' && <Irrigation style={{ color: 'gray' }} />}
            {column.name === 'info' && <Info />}
            {column.name ==='history' &&<History/>}

            {column.getCellValue && getFruitIcon(column.getCellValue(rowData))}
        </IconButton>
    }

    if (column.edit) {

        if (column.type === 'date') {
            return (
                <div style={{ width: 110}}>
                    <DatePicker
                        simple={true}
                        value={value}
                        text={text}
                        margin={0}
                        onChange={(dave) => column.onChange(fixYear(dave), rowData, rowIndex)}
                        autoOk={true}
                    />
                </div>
            )
        }
        return (
            <EditTextCell width={column.width} column={column} value={value}
                rowData={rowData} rowIndex={rowIndex} inputRef={focus ? inputRef : null}
            />
        )
    } else if (column.options) {
        const options = column.options(rowData);

        if (column.autocomplete === true) {
            return (
                <div style={{ maxWidth: column.width ? column.width : 200 }}>
                    <Autocomplete
                        customermargin={0}
                        width={column.width}
                        options={options && options.length > 0 ? options : []}
                        onChange={(e) => column.onChange(e, rowData, rowIndex)}
                        value={value}
                        isMulti={false}
                        placeholder={column.placeholder}
                    />
                </div>
            )
        }
        else if (options && options.length > 0) {
            return (
                <TextField
                    select
                    customermargin={0}
                    width={column.width}
                    value={value}
                    onChange={(e) => column.onChange(e.target.value, rowData, rowIndex)}
                >
                    {options}
                </TextField>
            )
        }
    }
    else if (column.iconButton) {
        if (column.clickableCheck && column.clickableCheck(rowData) === false) {
            return (<div></div>);
        }
        if (column.tooltip) {
            return <Tooltip title={column.tooltip}>
                {renderIconButton()}
            </Tooltip>
        }
        return renderIconButton();

    }
    else if (column.icon) {
        return (
            <IconButton disabled={true} onClick={null}>
                {getFruitIcon(column.icon(rowData))}
            </IconButton>
        )
    }
    else if (column.clickable) {
        return (
            <Button sx={clickableSX}  disabled={!column.clickable(rowData)} onClick={() => column.onClick(rowData, rowIndex)}>
                {value ? value : ''}
            </Button>
        )
    }
    else if (column.checkbox) {
        return (
            <Checkbox
                checked={value}
                onChange={(e) => column.onChange(rowData, rowIndex, !value)}
            />)
    }
    const className = column.frame ? classes.frame : null;
    return (
        <div style={column.getStyle ? column.getStyle(rowData) : column.style} className={className}>{value}</div>
    )

}

export default Cell;

