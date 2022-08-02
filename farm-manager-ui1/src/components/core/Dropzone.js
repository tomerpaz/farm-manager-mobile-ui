import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Dropzone from 'react-dropzone';
import Loading from "./util/Loading";

const useStyles = makeStyles(theme => ({
    root: {
        border: "solid",
        display: 'flex',
        borderWidth: 3,
        borderColor: theme.palette.primary.dark,
        borderRadius: 4,
        flex: 1,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    },
    title: {
        display: 'flex',
        color: theme.palette.secondary.main,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flex: {
        flex: 1, display: 'flex',
    }
  }));

const BaseDropzone = (props) => {
    const {  title, onDrop, uploading, height, accept, multiple } = props;
    const classes = useStyles();

    if (uploading) {
        return (
            <div style={{ height,  }} className={classes.root}>
                <Loading />
            </div>
        )
    }
    return (
        <Dropzone multiple={multiple} className={classes.flex} onDrop={onDrop} 
            accept={accept}
        >
            {({ getRootProps, getInputProps }) => (
                <section className={classes.flex} >
                    <div className={classes.root} style={{ height: height,  }} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Typography className={classes.title} variant='subtitle1'>
                            {title}
                        </Typography>
                    </div>
                </section>
            )}
        </Dropzone>
    )
}
export default BaseDropzone;



