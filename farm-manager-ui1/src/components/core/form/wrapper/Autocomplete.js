import Autocomplete from "../../autocomplete/Autocomplete_";

const renderCompnent = ({
    
    label,
    input,
   
    meta: { touched, invalid, error,   },
    ...custom
  }) => (
    <Autocomplete


      label={label}
      placeholder={label}
      error={touched && invalid}
    //  helperText={touched && error}
      {...input}
      {...custom}
    />
  )

  export default renderCompnent;
