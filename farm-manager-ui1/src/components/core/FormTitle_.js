import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { amber } from '@mui/material/colors';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
    },
    warning: {
        backgroundColor: amber[500],
        margin: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        borderRadius: 4,
    },
    title: {
        color: theme.palette.common.black,
        fontWeight: 700,
        whiteSpace: 'nowrap',
    }
}));

const FormTitle = ({ title, variant }) => {
    const classes = useStyles();
    return (
        <div className={variant && classes[variant] ? classes[variant] : classes.root} >
            <Typography className={classes.title} variant="h6" gutterBottom>
                {title}
            </Typography>
        </div>
    )
}
export default FormTitle;
