import React from 'react';

import {TextField} from '../../../'

const renderTextField = ({
    
    input,
   
    meta: { touched, invalid, error,   },
    ...custom
  }) => (
    <TextField
      error={touched && invalid }
      {...input}
      {...custom}
    />
  )

  export default renderTextField;