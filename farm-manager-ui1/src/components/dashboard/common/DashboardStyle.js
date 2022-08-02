
import {BORDER_COLOR} from "../../../App";

export function labelRoot(theme) {
    return {
        display: 'flex',
        flex: 1,
        backgroundColor: theme.palette.common.white,
        margin: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        borderTop: '2px solid '+ BORDER_COLOR,
        flexDirection: 'column',
    }
}