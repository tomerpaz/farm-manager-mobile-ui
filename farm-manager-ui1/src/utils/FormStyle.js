import { tableError } from "../modules/activity/activityStyle";
import { BORDER_COLOR_DARK } from "../App";


export function formStyle(theme){
    return {
        root: formRoot(theme),
        section: formSection(theme),
        singleSection: formSection(theme, true),
        formRowSpaceBetween: formRowSpaceBetween(theme),
        formRow: formRow(theme),
        table: formTable(theme),
        error: tableError(theme),
        formRow2: formRow2(theme),
        spacer: {
            width: theme.spacing(1)
        },
        buttonOutlined: {
            margin: theme.spacing(1),
            color: theme.palette.primary.dark,
            borderColor: theme.palette.primary.dark,
        },
    }
}
export function formRoot(theme){
    return {
        root: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            backgroundColor: theme.palette.secondary.light,
        },
    }
}

export function formRow(theme){
    return {
        flex: 1, display: 'flex', flexDirection: 'row', 
        padding: theme.spacing(1),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2), 
    }
}

export function formRowSide(theme){
    return {
        display: 'flex', alignItems: 'center', flexDirection: 'row'
    }
}


export function formRow2(theme){
    return {
        flex: 1, display: 'flex', flexDirection: 'row', 
        padding: theme.spacing(2),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2), 
    }
}

export function formRowSpaceBetween(theme){
    return {
        flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        padding: theme.spacing(1),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    }
}

export function formSection(theme, single){
    return     {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: theme.palette.common.white,
        borderTop: single ?  null : '2px solid ' + BORDER_COLOR_DARK,
        margin: theme.spacing(2),
    }
}

export function formTable(theme){
    return {
        flex: 1,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1), 
        marginBottom: theme.spacing(2), 
        display: 'flex',
        flexDirection: 'column',

    }
}

export function errorPlaceHolder(theme){
    return {
        height: 30,
        display: 'flex',
        alignItems: 'center',
    }
}