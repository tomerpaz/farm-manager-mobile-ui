// import { styled } from '@mui/material/styles';
import ButtonBase from './Button';

// const OutlinedButton = styled(ButtonBase)(({ theme }) => ({
//     textTransform: 'none',
//     whiteSpace: 'nowrap',

//     borderColor: theme.palette.secondary.main,

//     margin: theme.spacing(1),
//     color: theme.palette.secondary.main,
//     // borderColor: theme.palette.primary.dark,

//     backgroundColor: theme.palette.background.paper,
//     '&:hover': {
//         borderColor: theme.palette.secondary.dark,
//         color: theme.palette.secondary.dark,
//     }

// }));

const OutlinedButton = (props) => {
    return (
        <ButtonBase 
            color={'secondary'}
            sx={{ margin: 1 }} {...props} />
    )
}

export default OutlinedButton;



