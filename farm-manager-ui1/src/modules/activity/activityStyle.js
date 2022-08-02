export function sectionTitle(theme){
    return {
        justifyContent: 'space-between',

            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            flex: 1,
            display: 'flex',
            alignItems: 'center'
    }
}

export function tableError(theme){
    return {
        color: theme.palette.error.main,
        paddingBottom: theme.spacing(1) -2,
        fontWeight: 700,
    }
}

export function tableTitle(theme){
    return {
        paddingBottom: theme.spacing(1) -2,
        fontWeight: 700,
    }
}

export function controlsStyle(theme){
    return {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}

export function controlsNoMarginStyle(theme){
    return {

        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}