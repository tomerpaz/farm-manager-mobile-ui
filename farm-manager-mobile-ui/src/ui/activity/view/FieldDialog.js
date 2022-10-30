import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLang } from '../../../features/app/appSlice';
import TextFieldBase from '../../../components/ui/TextField';
import { displayFieldName, HARVEST, SPRAY, SPRAY_PLAN, GENERAL, GENERAL_PLAN, IRRIGATION, IRRIGATION_PLAN } from '../../FarmUtil';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice';



const FieldDialog = ({ row, activity, onClose }) => {

  console.log('FieldDialog activity', activity.fields[row])
  const text = useSelector(selectLang)

  const { data: user } = useGetUserDataQuery()


  const [fieldNote, setFieldNote] = React.useState('');
  const [field, setField] = React.useState('');
  const [fieldName, setFieldName] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [actualExecution, setActualExecution] = React.useState('');
  const [qty, setQty] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [activityType, setActivityType] = React.useState('');
  const [activityArea, setActivityArea] = React.useState(0);


  React.useEffect(() => {
    setOpen(row !== null );
    if (row !== null) {
      const record = activity.fields[row];
      setFieldNote(record.fieldNote ? record.fieldNote : '');
      setActualExecution(record.actualExecution);

      setField(record.field);
      setFieldName(displayFieldName(record.field));
      setQty(record.qty);
      setWeight(record.weight);
      setActivityType(activity.type);
      setActivityArea(record.activityArea);

    }
  }, [row])


  const onAction = (save) =>{
    if(save){
      console.log('Save...')
      
      onClose()
    } else{
      onClose()
    }
  }


  return (

    <Dialog  open={open}>
      <DialogTitle>{`${text.field} ${fieldName}`}</DialogTitle>

      <DialogContent>
        {/* <DialogContentText>
          {`${text.field} ${fieldName}`}
        </DialogContentText> */}
        <TextFieldBase
          value={fieldNote}
          label={text.fieldNote}
          onChange={e => setFieldNote(e.target.value)}
          fullWidth
        />
        <MobileDatePicker
          label={text.executed}
          //     inputFormat="dd/MM/yyyy"
          value={actualExecution}
          onChange={setActualExecution}
          renderInput={(params) => <TextFieldBase fullWidth {...params} />}
        />
        {[HARVEST].includes(activityType) &&
          <TextFieldBase
            value={qty}
            label={text.qty}
            onChange={e => setQty(e.target.value)}
            fullWidth
            type="number"
          />}
        {[HARVEST].includes(activityType) &&
          <TextFieldBase
            value={weight}
            label={`${text[user.weightUnit]}`}
            onChange={e => setWeight(e.target.value)}
            fullWidth
            type="number"
          />}
        {[SPRAY, SPRAY_PLAN, GENERAL, GENERAL_PLAN, IRRIGATION, IRRIGATION_PLAN].includes(activityType) &&
          <TextFieldBase
            value={activityArea}
            label={`${text[user.areaUnit]}`}
            onChange={e => setActivityArea(e.target.value)}
            fullWidth
            type="number"
          />}
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>onAction(false)}>{text.cancel}</Button>
        <Button onClick={()=>onAction(true)}>{text.save}</Button>

      </DialogActions>

    </Dialog>
  );

}
export default FieldDialog;
