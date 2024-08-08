import { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { AppBar, Box, DialogActions, DialogContent, Divider, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLang } from '../../features/app/appSlice';
import { Close, EditLocationOutlined, History, PestControl } from '@mui/icons-material';
import { newDate, parseDate } from '../FarmUtil';
import ScoutingForm from './ScoutingForm';
import { parseISO } from 'date-fns';
import { getInfectionLevelColor, getPestMonitorInfectionLevelColor } from './ScoutingUtil';
import ScoutingCard from './ScoutingCard';
import { grey } from '@mui/material/colors';

const ScoutFieldHistoryDialog = ({ open, point, scouts, handleClose }) => {

  const text = useSelector(selectLang)
  const [scout, setScout] = useState(null);

  return (

    <Box >
      <Dialog fullScreen open={open}>
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
        <DialogContent sx={{ padding: 0, bgcolor: grey[100] }}  >
            {scouts.map((e, index) => {
              return (

                <ScoutingCard  key={e.id} scout={e} index={index} onEdit={() => setScout(e)} />
                // <Fragment key={e.id}>
                //   <ListItem disablePadding onClick={() => setScout(e)}>
                //     <ListItemButton>
                //       <ListItemIcon >
                //         <PestControl sx={{ color: getInfectionLevelColor(e.infectionLevel) }} fontSize='large' />
                //       </ListItemIcon>
                //       <ListItemText primary={e.finding.name} secondary={parseDate(e.date)} />
                //     </ListItemButton>
                //   </ListItem>
                //   <Divider />
                // </Fragment>
              )
            })}

            {/* <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon >
                <History fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={text.history} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={()=>handleClose('point')}>
              <ListItemIcon >
                <EditLocationOutlined fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={text.edit} />
            </ListItemButton>
          </ListItem>
          <Divider /> */}


        </DialogContent>
      </Dialog>
      {scout && <ScoutingForm open={true} defaultValues={{ ...scout, date: parseISO(scout.date) }} handleClose={() => setScout(null)} />}

    </Box>
  );

}
export default ScoutFieldHistoryDialog;
