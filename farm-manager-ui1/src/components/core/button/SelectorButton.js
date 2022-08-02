import { BORDER_COLOR, BORDER_COLOR_DARK, PRIMARY_DARK, PRIMARY_MAIN } from '../../../App';
import ButtonBase from './Button';

const SelectorButton = (props) => {
    return (
        <ButtonBase 
            color={'secondary'}
            sx={{ margin: 1, padding: 3, backgroundColor:'white', minWidth: props.minWidth ?  props.minWidth : 110, borderColor: BORDER_COLOR_DARK,
            '&:hover': {
                backgroundColor: PRIMARY_DARK,
                border: '1px solid ' + BORDER_COLOR,
                color: 'white'
            }
        }} {...props} />
    )
}
export default SelectorButton;



