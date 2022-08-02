import { masterDetails } from "../../../utils";
import { BORDER_COLOR } from "../../../App";

export function rootElement(theme){
    return {
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        backgroundColor: theme.palette.common.white,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        height: masterDetails,
        borderTop: '2px solid ' + BORDER_COLOR,
    }
}