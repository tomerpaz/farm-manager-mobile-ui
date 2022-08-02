import { Fab, } from '@mui/material';
import { styled } from '@mui/material/styles';

const SettingsFab = styled(Fab)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(13),
    right: 0,
    // left: theme.direction === 'ltr' ? 0 : 100,

    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#1769aa',
    color: theme.palette.background.paper,
    zIndex: 2000

}));

export default SettingsFab;



