import React from 'react';
import { makeStyles } from '@mui/styles';
import { Alert } from '@mui/material';
import { height400 } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {

    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.common.white,
    maxHeight: height400,
    overflow: 'auto'
    // height:400px
    // '& > * + *': {
    //   marginTop: theme.spacing(2),
    // },
  },
  item: {
    flex: 1,

    margin: theme.spacing(1)
  }
}));

const UploadResult = (props) => {

  const classes = useStyles();

  const {
    uploadResult

  } = props;

  return (
    <div className={classes.root}>
      {uploadResult.success.map((e, index) =>
        <Alert key={index} className={classes.item} severity="success">{e}</Alert>

      )}
      {uploadResult.info.map((e, index) =>
        <Alert key={index} className={classes.item} severity="info">{e}</Alert>

      )}
      {uploadResult.warnings.map((e, index) =>
        <Alert key={index} className={classes.item} severity="warning">{e}</Alert>

      )}
      {uploadResult.errors.map((e, index) =>
        <Alert key={index} className={classes.item} severity="error">{e}</Alert>

      )}

    </div>
  );
}

export default UploadResult;
