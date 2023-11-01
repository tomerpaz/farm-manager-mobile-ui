import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, InputAdornment } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLang } from '../../../features/app/appSlice';
import TextFieldBase from '../../../components/ui/TextField';
import { displayFieldName, HARVEST, SPRAY, SPRAY_PLAN, GENERAL, GENERAL_PLAN, IRRIGATION, IRRIGATION_PLAN, getResourceTypeText, getUnitText, isStringEmpty } from '../../FarmUtil';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice';

const ResourceDialog = ({ row, activity, onClose, areaUnit }) => {

  //console.log('ResourceDialog activity', activity.fields[row])
  const text = useSelector(selectLang)

  const { data: user } = useGetUserDataQuery()

  const [resourceName, setResourceName] = useState('');
  const [resourceType, setResourceType] = useState('');

  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState('');
  const [activityType, setActivityType] = useState('');
  const [resourceNote, setResourceNote] = useState(0);
  const [qty, setQty] = useState('');
  const [unit, setUnit] = useState('');
  const [tariff, setTariff] = useState(0);
  const [manualTariff, setManualTariff] = useState(false);

  useEffect(() => {
    setOpen(row !== null);
    if (row !== null) {
      const record = activity.resources[row];

      setResourceName(record.resource.name);
      setResourceType(record.resource.type);
      setQty(record.qty);
      setUnit(record.resource.usageUnit);
      setActivityType(activity.type);
      setResourceNote(isStringEmpty(record.note) ? '' : record.note);
      setTariff(record.tariff);
      setManualTariff(record.manualTariff);


      // setActualExecution(record.actualExecution);

      // setField(record.field);
      // setFieldName(displayFieldName(record.field));
      // setQty(record.qty);
      // setWeight(record.weight);
      // setActivityArea(record.activityArea);

    }
  }, [row])

  const onAction = (save) => {
    if (save) {
      onClose({ qty, resourceNote, tariff })
    } else {
      onClose(null)
    }
  }

  return (

    <Dialog open={open}>
      <DialogTitle>{`${getResourceTypeText(resourceType, text)}: ${resourceName}`}</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          {`${text.field} ${fieldName}`}
        </DialogContentText> */}



        <TextFieldBase
          value={qty}
          label={text.qty}
          onChange={e => setQty(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">{getUnitText(unit, areaUnit, text)}</InputAdornment>,
          }}
          type="number"
        />
        <TextFieldBase
          value={tariff}
          label={text.unitCost}
          onChange={e => setTariff(e.target.value)}
          fullWidth
          // InputProps={{
          //   endAdornment: <InputAdornment position="end">{getUnitText(unit, areaUnit, text)}</InputAdornment>,
          // }}
          type="number"
        />
        <TextFieldBase
          value={resourceNote}
          label={text.resourceNote}
          onChange={e => setResourceNote(e.target.value)}
          fullWidth
        />
        {[HARVEST].includes(activityType) &&
          <TextFieldBase
            value={weight}
            label={`${text[user.weightUnit]}`}
            onChange={e => setWeight(e.target.value)}
            fullWidth
            type="number"
          />}
        {/* {[SPRAY, SPRAY_PLAN, GENERAL, GENERAL_PLAN, IRRIGATION, IRRIGATION_PLAN].includes(activityType) &&
          <TextFieldBase
            value={activityArea}
            label={`${text[user.areaUnit]}`}
            onChange={e => setActivityArea(e.target.value)}
            fullWidth
            type="number"
          />} */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onAction(false)}>{text.cancel}</Button>
        <Button onClick={() => onAction(true)}>{text.save}</Button>
      </DialogActions>
    </Dialog>
  );

}
export default ResourceDialog;
