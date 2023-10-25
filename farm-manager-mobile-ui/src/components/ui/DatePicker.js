import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';

const DatePickerBase = (props) => {

  return (

    
    <DatePicker
    {...props}

        slotProps={{ textField: { size: 'small', sx: {width:props.width ? props.width : null} } }}
 

    />
  )
}
export default DatePickerBase;
