import React from 'react';

import { Checkbox } from '@mui/material'

// export default createComponent(Checkbox, ({
//     input: { onChange, value, ...inputProps },
//     meta,
//     onChange: ignoredOnChange,
//     defaultChecked,
//     ...props
// }) => ({
//     ...inputProps,
//     ...props,
//     checked: value ? true : false,
//     onChange: (event, isInputChecked) => {
//         onChange(isInputChecked)
//     }
// }))

const  renderCheckbox = ({ input, label, ...custom }) => (
    <Checkbox
        checked={input.value ? true : false}
        onChange={input.onChange}
        {...custom}
    />
)

export default renderCheckbox;

/*
const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
)*/