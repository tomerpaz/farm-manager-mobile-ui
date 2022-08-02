import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    margin: theme.spacing(1),

  },
}));





const ButtonBase = (props) => {

    const classes = useStyles();
    return (
        <Button
          className={classes.root}
          variant= "outlined"
              {...props}
      />
    )
}
export default ButtonBase;



