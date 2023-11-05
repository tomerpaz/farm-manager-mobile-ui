import { TextField } from '@mui/material';

const backgroundColor = 'white';

const TextFieldBase = (props) => {
//   const margin = props.customermargin || props.customermargin === 0 ? props.customermargin : 1;
//   let sx = props.width ? { margin: margin, width: props.width, backgroundColor: backgroundColor } : { margin: margin, flex: 1, backgroundColor: backgroundColor };

//const sx = {backgroundColor, color: "inherit"}
  return (
    <TextField
      //sx={sx}
      size={props.size ? props.size : "medium"}
      margin="dense"
      color={props.error ? 'error' : null }
      onWheel={(e) => e.target.blur()}
      error={props.error}
      {...props}
      onFocus={(e) => (e.target.select ? e.target.select() : null) &&
        (props.onFocus ? props.onFocus(e) : null)}

    />
  )
}
export default TextFieldBase;
