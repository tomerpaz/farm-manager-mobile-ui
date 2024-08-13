import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { AppBar, Box, DialogContent, Fab, IconButton, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCurrentYear, selectLang } from '../../features/app/appSlice';
import { Close, Edit } from '@mui/icons-material';
import { isArrayEmpty, isMobile } from '../FarmUtil';
import ScoutingForm from './ScoutingForm';
import { parseISO } from 'date-fns';
import { newScouting, SCOUT_TYPES } from './ScoutingUtil';
import ScoutingCard from './ScoutingCard';
import { grey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import FieldPointDialog from '../point/FieldPointDialog';

const ScoutingFieldPoint = ({ open, point, scouts, handleClose, stages, setPoint }) => {

  const text = useSelector(selectLang)
  const [scout, setScout] = useState(null);
  const currentYear = useSelector(selectCurrentYear)
  const [editPoint, setEditPoint] = useState(false);

  const handleCloseEditPoint = (action, e) =>{
    setEditPoint(false);
    if(action === 'delete'){
      handleClose(null);
    } else if((action === 'save')) {
      setPoint(e);
    }

  }

  return (

    <Box >
      <Dialog fullScreen={isMobile()} fullWidth={!isMobile()} open={open}>
        <AppBar sx={{ position: 'relative' }} elevation={0}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {`${text.waypoint}: ${point.name}`}
            </Typography>
            <IconButton
              edge="start"
              onClick={() => setEditPoint(true)}
              color="inherit"
              aria-label="done"
            >
              <Edit />
            </IconButton>
            <Box margin={1}></Box>
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
        <DialogContent sx={{ padding: 0, bgcolor: grey[100],minHeight: 150 }}  >
          {scouts.map((e, index) => {
            return (
              <ScoutingCard key={e.id} scout={e} index={index} onEdit={() => setScout(e)} />
            )
          })}
        </DialogContent>
        {point.active  &&<Fab onClick={()=>setScout(newScouting(point, stages, currentYear))} sx={{ position: 'absolute', bottom: 30, left: 30, right: 30 }} color="primary" aria-label="add">
          <AddIcon />
        </Fab>}
      </Dialog>
      {scout && <ScoutingForm open={true} defaultValues={{ ...scout, date: scout.id ? parseISO(scout.date) : scout.date }} handleClose={() => setScout(null)} />}
      {editPoint &&  <FieldPointDialog open={editPoint} deletable={isArrayEmpty(scouts)} defaultValues={point} handleClose={handleCloseEditPoint} types={SCOUT_TYPES} />}
    </Box>
  );

}
export default ScoutingFieldPoint;
