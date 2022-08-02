import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@mui/styles';


import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import { Typography } from '@mui/material';

import { BORDER_COLOR_DARK } from "../../App";

import { Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
       
        minWidth: 300,
        backgroundColor: theme.palette.background.paper,
       // height: '100%'
    },

    textField: {
        width: 200
    },

    itemWithCheck: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    addAccount: {
        width: 200
    },
    button: {
        borderColor: BORDER_COLOR_DARK,
        color: theme.palette.secondary.dark,
        backgroundColor: theme.palette.common.white,
        fontWeight: 700,
        textTransform: 'none',
    },
    title: {
        color: theme.palette.common.black,
        fontWeight: 700,
        padding: theme.spacing(2),
    },

    list:{
        
    }


}));


const ImportExportList = (props) => {
    const classes = useStyles();

    const {
         text, dataModules, selectMoldule, module
    } = props;


    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h6" gutterBottom>
                {`${text.importExport} ${module ? text[module] : ''}`}
            </Typography>
            <List className={classes.root}>
                <Divider />

                {dataModules.map((e, index, arr) =>
                    <Fragment key={index}>
                        <ListItem  button onClick={() => selectMoldule(e)}
                            selected={e === module}
                        >
                            <ListItemText primary={text[e]} />
                        </ListItem>
                        <Divider />
                    </Fragment>
                )}
            </List>
        </div>
    )
}
export default ImportExportList;



