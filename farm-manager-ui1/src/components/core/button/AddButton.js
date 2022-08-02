import React from 'react';
import { Add as AddIcon } from '@mui/icons-material/'
import Button from './Button';
import { BORDER_COLOR_DARK } from '../../../App';
const AddButtonBase = (props) => {
    return (
        <Button sx={{
            backgroundColor: 'white',
            color: 'black',
            margin: 1,
            fontWeight: '700',
            borderColor: BORDER_COLOR_DARK,
        }} size={props.size? props.size : 'large'} variant='outlined' {...props}><AddIcon color={'primary'} />{props.label}</Button>
    )
}
export default AddButtonBase;



