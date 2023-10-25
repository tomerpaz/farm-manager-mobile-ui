import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLang } from '../../../features/app/appSlice';
import TextFieldBase from '../../../components/ui/TextField';
import { displayFieldName, HARVEST, SPRAY, SPRAY_PLAN, GENERAL, GENERAL_PLAN, IRRIGATION, IRRIGATION_PLAN } from '../../FarmUtil';
//import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useGetUserDataQuery } from '../../../features/auth/authApiSlice';

const FieldDialog = ({ row, activity, onClose }) => {

  console.log('FieldDialog activity', activity.fields[row])
  const text = useSelector(selectLang)

  const { data: user } = useGetUserDataQuery()

  const [fieldNote, setFieldNote] = useState('');
  const [field, setField] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [open, setOpen] = useState(false);
  const [actualExecution, setActualExecution] = useState('');
  const [qty, setQty] = useState('');
  const [weight, setWeight] = useState('');
  const [activityType, setActivityType] = useState('');
  const [activityArea, setActivityArea] = useState(0);


  useEffect(() => {
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
      
      onClose({fieldNote,actualExecution,qty,weight,activityArea})
    } else{
      onClose(null)
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
        <DatePicker
          label={text.executed}
          //     inputFormat="dd/MM/yyyy"
          value={actualExecution}
          onChange={setActualExecution}
          slotProps={{ textField: {  size: 'small', fullWidth: true, variant: 'outlined', margin: "dense"  } }}
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
