import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { AppBar, Box, DialogContent, IconButton, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLang } from '../../features/app/appSlice';
import { Close, EditLocationOutlined, History, PestControl } from '@mui/icons-material';
import { isArrayEmpty } from '../FarmUtil';

const ScoutOptionDialog = ({ open, point, handleClose, scouts }) => {

  const text = useSelector(selectLang)

  return (

    <Dialog fullWidth open={open}>
      <AppBar sx={{ position: 'relative' }} elevation={0}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {`${text.waypoint}: ${point.name}`}
          </Typography>
          <IconButton
            edge="start"
            onClick={() => handleClose(null)}
            color="inherit"
            aria-label="done"
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Button sx={{ padding: 2 }} fullWidth size={'large'} color='secondary' disabled={!point.active} variant="outlined" onClick={() => handleClose('scouting')} startIcon={<PestControl fontSize='large' />}>
          {text.scouting}
        </Button>
        <Box padding={1}></Box>
        <Button sx={{ padding: 2 }} fullWidth size={'large'} color='secondary' variant="outlined" disabled={isArrayEmpty(scouts)} onClick={() => handleClose('history')} startIcon={<History fontSize='large' />}>
          {text.history}
        </Button>
        <Box padding={1}></Box>
        <Button sx={{ padding: 2 }} fullWidth size={'large'} color='secondary' variant="outlined" onClick={() => handleClose('point')} startIcon={<EditLocationOutlined fontSize='large' />}>
          {text.edit}
        </Button>
      </DialogContent>
    </Dialog >
  );
}
export default ScoutOptionDialog;
