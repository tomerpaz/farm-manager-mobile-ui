import React from 'react';
import { height140 } from "./TabUtils";
import { BORDER_COLOR, BORDER_COLOR_DARK, PRIMARY_DARK, SECOND_TOP_LINE } from "../App";
import { tableError, tableTitle } from "../modules/activity/activityStyle";
import { formRow2 } from './FormStyle';
import { Box } from '@mui/material';


export const okStyle = { color: 'green', fontWeight: 'bold' };
export const errorStyle = { color: 'red', fontWeight: 'bold' };

export function getCellStyle(e) {
    if (e) {
        return okStyle;
    } else return errorStyle;
}

export function headerTextColor() {
    return '#676a6c';
}

export function buttonSecondary(theme) {
    return {
        margin: theme.spacing(1),
        borderRadius: '.25rem',
        color: '#5c6370',
        border: '1px solid #c7cad1',
        backgroundColor: '#f9fafa',
        whiteSpace: 'nowrap',
    }
    /*
    color: #5c6370;
    font-weight: 500;
    font-size: 1rem;
    border: 1px solid #c7cad1;
    border-radius: .25rem;
    background-color: #f9fafa;
    */
}

export function buttonPrime(theme) {
    return {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:disabled': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.common.white,
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    }
}

export function buttonPrimeSmall(theme) {
    return {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:disabled': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.common.white,
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
        size: 'small'
    }
}

export function textField(theme, width) {
    return {

        margin: theme.spacing(1),
        width: width !== undefined ? width : 200,
    }
}

export function getMasterDetailsStyle(theme, flexMaster, flexDetails) {
    return {
        root: {
            flex: 1,
            display: 'flex',
            backgroundColor: theme.palette.secondary.light,
        },
        backRoot: backRoot(theme),
        master: {
            flex: flexMaster ? flexMaster : 1,
            padding: theme.spacing(2),
            paddingBottom: 0,
            paddingTop: 0,
        },
        details: {
            flex: flexDetails ? flexDetails : 1,
        },
    }
}

export function backRoot(theme) {
    return {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.secondary.light,
    }
}


export function addButton(theme) {
    return {
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1),
        borderColor: BORDER_COLOR_DARK,
        color: theme.palette.secondary.dark,
        backgroundColor: theme.palette.common.white,
        fontWeight: 700,
        textTransform: 'none',
    }
}

export function addIcon(theme) {
    return {
        fontSize: 20,
        color: theme.palette.primary.dark,
    }
}

export function iconButton(theme) {
    return {
        fontSize: 20,
        backgroundColor: 'inherit',
        color: 'white'
    }
}

export function topBarStyle(theme) {
    return {
        root: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            // marginBottom: theme.spacing(1),
            //marginTop: theme.spacing(1),
        },
        button: addButton(theme),
        iconSmall: addIcon(theme),
        iconButton: iconButton(theme),
        simpleIcon: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        datePicker: {
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),

        },
        textField: {
            margin: theme.spacing(1),
        },
        viewSize: {
            width: 70,
        },

    }
}



export function formStyle(theme) {

    return {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            flexDirection: 'column',
            flex: 1,
        },
        formRow: {
            flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20
        }
        ,
        formRow2: formRow2(theme),
        textField: {
            margin: theme.spacing(1),
            // width: '100%'
        },
        checkboxLabel: {
            padding: theme.spacing(1),
            fontWeight: 600,
            flex: 1, display: 'flex', alignItems: 'center',
        },
        textFieldTopBottom: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),

            // width: '100%'
        },
        autoSuggestWrap: {
            marginTop: theme.spacing(0.5),
            // width: '100%'
        },
        datePicker: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),

            // width: '100%'
        },

        formFrame: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.secondary.light,
            // margin: theme.spacing(2)
        },
        button: {
            margin: theme.spacing(1),
            color: theme.palette.primary.dark,
        },
        submitButton: buttonPrime(theme),
        tableTitle: tableTitle(theme),
        tableError: tableError(theme),
        formTitleStyle: formTitleStyle(theme),
        formRowSpaceBetween: { flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }
    }
}





export function simpleTable(theme) {
    return {
        backgroundColor: theme.palette.common.white,
        margin: theme.spacing(2),
        flexDirection: 'column',
        display: 'flex',
        border: '1px solid ' + BORDER_COLOR,
    };
}


export function dataLine(theme) {
    return {
        display: 'flex',
        margin: theme.spacing(1),
    };
}

export function formTitleStyle(theme) {
    return {
        color: theme.palette.common.black,
        fontWeight: 700
    }
}

export function drawerFab(theme) {

    return {
        position: 'absolute',
        top: theme.spacing(13),
        right: 0,
        // left: theme.direction === 'ltr' ? 0 : 100,

        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#1769aa',
        color: theme.palette.background.paper,
        zIndex: 2000
    }
}
export function drawerTitle(theme) {
    return {
        minWidth: 250,
        flex: 1,
        // border: '1px solid ' + BORDER_COLOR,
        // borderRadius: 6,
        backgroundColor: theme.palette.background.paper,
        flexDirection: 'row',
        height: window.innerHeight,
        position: 'relative',
        overflow: 'auto',
        margin: theme.spacing(1),
    }
}

export function getTextAlight(dir) {
    return dir === 'ltr' ? 'left' : 'right';
}

export function getDirectionStyle(dir) {
    if (dir) {
        return { direction: dir, textAlign: getTextAlight(dir) }
    }
    return null;
}

export const mapTextStyle = {
    color: 'white',
    textShadow: '-1px 1px 0 #000,1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000'
}


export const SB =  'space-between';

export const FormRow = (props) => (
    <Box display={'flex'} flex={1} flexDirection={'row'} alignItems={props.alignItems ?  props.alignItems : 'center'} justifyContent={props.js}>
        {props.children}
    </Box>
)

export const FormRoot = (props) => (
    <Box display={'flex'} flex={1} flexWrap={'wrap'} margin={2} flexDirection={'column'} >
        {props.children}
    </Box>
)

export const ButtonBody = (props) => (
    <Box display={'flex'} flex={1} flexWrap={'wrap'}  alignItems={'center'} flexDirection={'column'} >
        {props.children}
    </Box>
)

export const DecoratedLableSx =  () =>({
    marginLeft: 1,
    marginRight: 1,
    padding: 0.5,
    // paddingTop: 3,
    // paddingBottom: 3,
    border : '2px solid ' +PRIMARY_DARK,
    borderRadius: 1,
    display: 'flex',
    alignItems: 'center',
    color: PRIMARY_DARK,
    fontWeight: 700,
})