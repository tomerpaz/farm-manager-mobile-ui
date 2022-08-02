import React from 'react';
import folderColor from '@mui/material/colors/amber';
import { makeStyles } from '@mui/styles';

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar';
import Upload from '@mui/icons-material/CloudUpload';
import Folder from '@mui/icons-material/Folder';
import ListSubheader from '@mui/material/ListSubheader'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import IconButton from '@mui/material/IconButton';
import SortAlpha from "../../../icons/SortAlpha";

import { BORDER_COLOR } from "../../../App";


const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        border: '1px solid ' + BORDER_COLOR,
        borderRadius: 6,
        backgroundColor: theme.palette.background.paper,
    },
    subHeader: {
        backgroundColor: theme.palette.background.paper,
        borderBottom: '1px solid ' + BORDER_COLOR,
    },
    innerSubHeader:{
        display: 'flex',
    },
    listItem: {
        selected: {
            backgroundColor: theme.palette.primary.main
        }
    },
  }));


  const FolderList = (props) => {
    const classes = useStyles();

    const { folders, selectedFolder, selectFolder, uploadFiles, height,handleFolderSort, edit} = props;
    return (
        <div className={classes.root}>
            <List
                style={{height: height, overflow: 'auto'}}
                component="nav"


                subheader={<ListSubheader className={classes.subHeader} component="div">
                    <div className={classes.innerSubHeader} >
                        <div>
                            {props.title}
                        </div>
                        <IconButton onClick={handleFolderSort}>
                            <SortAlpha/>
                        </IconButton>
                    </div>
                </ListSubheader>}
            >

                {folders.map(f =>

                    <ListItem button key={f.value}
                              selected={f.value === selectedFolder}
                              onClick={() => selectFolder(f.value !== selectedFolder ? f.value : null)}
                    >
                        <Avatar sx={{ bgcolor: 'inherit' , color: folderColor[500]}}>
                            <Folder />
                        </Avatar>

                        <ListItemText primary={f.label}/>
                        {edit &&  <ListItemSecondaryAction>
                            <IconButton onClick={()=> uploadFiles(f.value)}>
                                <Upload/>
                            </IconButton>
                        </ListItemSecondaryAction> }
                    </ListItem>

                )}
            </List>
        </div>
    );
}

export default FolderList;



