import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'

const ButtonBase = (props) => {

  const { to, variant, size} = props;

  if (to) {
    return <Button size={size ? size : 'large'} variant={variant ? variant : 'outlined'} component={Link} {...props} />
  } else {
    return <Button size={size ? size : 'large'} variant={variant ? variant : 'outlined'} {...props} />
  }

}
export default ButtonBase;



