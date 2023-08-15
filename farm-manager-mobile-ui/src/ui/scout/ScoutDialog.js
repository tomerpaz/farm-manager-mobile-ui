import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, InputAdornment } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLang } from '../../features/app/appSlice';
import TextFieldBase from '../../components/ui/TextField';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';

const ScoutDialog = ({open, scout,  onClose  }) => {

  const text = useSelector(selectLang)

  const { data: user } = useGetUserDataQuery()



//  useEffect(() => {
//    setOpen(row !== null);
//    if (row !== null) {
      // const record = activity.resources[row];
      // console.log('record', record)

      // setResourceName(record.resource.name);
      // setResourceType(record.resource.type);
      // setQty(record.qty);
      // setUnit(record.resource.usageUnit);
      // setActivityType(activity.type);
      // setResourceNote(isStringEmpty(record.note) ? '' : record.note);
      // setTariff(record.tariff);
      // setManualTariff(record.manualTariff);

      
      // setActualExecution(record.actualExecution);

      // setField(record.field);
      // setFieldName(displayFieldName(record.field));
      // setQty(record.qty);
      // setWeight(record.weight);
      // setActivityArea(record.activityArea);

  //  }
//  }, [row])


  const onAction = (save) => {
    if (save) {
      console.log('Save...')

     // onClose({ qty, resourceNote, tariff })
    } else {
      //onClose(null)
    }
  //  setOpen(false)
  }


  return (

    <Dialog open={open}>
      <DialogTitle>{`${'hi'}: ${'bye'}`}</DialogTitle>

      <DialogContent>
        {/* <DialogContentText>
          {`${text.field} ${fieldName}`}
        </DialogContentText> */}



        <TextFieldBase
          value={'qty'}
          label={text.qty}
          onChange={e => console.log(e.target.value)}
          fullWidth
          // InputProps={{
          //   endAdornment: <InputAdornment position="end">{getUnitText(unit, areaUnit, text)}</InputAdornment>,
          // }}
          type="number"
        />



      </DialogContent>
      <DialogActions>
        <Button onClick={() => onAction(false)}>{text.cancel}</Button>
        <Button onClick={() => onAction(true)}>{text.save}</Button>
      </DialogActions>
    </Dialog>
  );

}
export default ScoutDialog;
