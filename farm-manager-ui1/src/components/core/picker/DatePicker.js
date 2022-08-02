import { DesktopDatePicker } from '@mui/x-date-pickers';
import TextFieldBase from '../textfield/TextFIeld';

const DatePickerBase = ({ text, value, label,
  clearable, onChange, minDate, minDateMessage, maxDate,
  maxDateMessage, placeholder, simple, error, disabled, views, format, style, margin }) => {

  const isDisabled = disabled == true ? true : false;

  const inputFormat = 'dd/MM/yy';

  const width = simple ? 140 : 160;
  const mask = '__/__/__'

  return (
    <DesktopDatePicker
      style={style}
      inputVariant="outlined"
      margin="dense"
      okText={text.ok}
      cancelText={text.cancel}
      clearText={text.clear}
      autoOk={true}
      inputFormat={inputFormat}
      disabled={isDisabled}
      clearable={clearable}
      onChange={(date) => {
        onChange(date);
      }}
      onFocus={(e) => e.target.select()}
      minDate={minDate}
      minDateMessage={minDateMessage}
      maxDate={maxDate}
      maxDateMessage={maxDateMessage}
      value={value}
      label={label}
      placeholder={placeholder}
      helperText={null}
      error={error}
      views={views}
      renderInput={(props) => (
        <TextFieldBase customermargin={margin} error={error} width={width} {...props} />
      )}
      mask={mask}
    />
  )
}
export default DatePickerBase;

