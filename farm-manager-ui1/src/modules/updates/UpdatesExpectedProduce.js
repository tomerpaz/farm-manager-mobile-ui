import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.common.white,
      margin: theme.spacing(1),
    },
  }));

const UpdatesExpectedProduce = (props) => {
    const classes = useStyles();

    return (
        <div>
            <div>
                <h2>UpdatesExpectedProduce</h2>
            </div>
        </div>
    )
}
export default UpdatesExpectedProduce;



