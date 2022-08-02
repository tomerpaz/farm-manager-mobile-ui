import React from 'react';
import amber from '@mui/material/colors/amber';
import folderColor from '@mui/material/colors/amber';
import { makeStyles } from '@mui/styles';

import List from '@mui/material/List'
import { TextField } from '../../../components';
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import MenuItem from '@mui/material/MenuItem'
import PdfIcon from '../../../icons/PdfIcon';
import ExcelIcon from '../../../icons/ExcelIcon';
import WordIcon from '../../../icons/WordIcon';
import PowerpoinIcon from '../../../icons/PowerpoinIcon';
import FileIcon from '../../../icons/FileIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import ListSubheader from '@mui/material/ListSubheader'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import IconButton from '@mui/material/IconButton';
import {BORDER_COLOR} from "../../../App";
import {asShortStringDate, getCurrentYear} from "../../../utils/DateUtil";
import SortNumeric from "../../../icons/SortNumeric";
import SortAlpha from "../../../icons/SortAlpha";

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
    innerSubHeader: {
        display: 'flex',
        // justifyContent: 'space-between',
    },

    imageIcon: {
        backgroundColor: amber[600]
        // justifyContent: 'space-between',
    },
    folderIcon: {
        fontSize: 20,
        color: folderColor[500]
    },

    textField: {
        width: 150
    }
  }));


const imageSuffix = ['png', 'gif', 'jpeg', 'jpg', 'png', 'tiff']

function getFileIcon(name) {
    if (name) {
        name = name.toLowerCase();
        if (name.indexOf('pdf') > -1) {
            return <PdfIcon/>
        }
        else if (name.indexOf('xls') > -1 || name.indexOf('csv') > -1) {
            return <ExcelIcon/>
        }
        else if (name.indexOf('doc') > -1) {
            return <WordIcon/>
        }
        else if (name.indexOf('ppt') > -1) {
            return <PowerpoinIcon/>
        }
        else if (imageSuffix.indexOf(name) > -1) {
            return <ImageIcon style={{backgroundColor: amber[600]}}/>
        }
    }
    return <FileIcon/>

}

//documentDate name deletable
const FileList = (props) => {
    const classes = useStyles();

    const { files, folders, deleteFile, downloadFile, handleFileSort, edit, standardFolders, email, moveFile, text} = props;
    return (
        <div className={classes.root}>
            <List
                style={{height: props.height, overflow: 'auto'}}
                component="nav"
                subheader={<ListSubheader className={classes.subHeader} component="div">
                    <div className={classes.innerSubHeader}>
                        <div>
                            {props.title}
                        </div>
                        <IconButton onClick={() => handleFileSort('name')}>
                            <SortAlpha/>
                        </IconButton>
                        <IconButton onClick={() => handleFileSort('time')}>
                            <SortNumeric/>
                        </IconButton>
                    </div>
                </ListSubheader>}
            >
                {files.map(f =>

                    <ListItem button key={f.id}
                              onClick={() => downloadFile(f.id)}
                    >
                        <Avatar sx={{ bgcolor: 'inherit'}}>
                            {getFileIcon(f.iconName)}
                        </Avatar>

                        <ListItemText primary={f.name.replace(new RegExp('.' + f.iconName + '$'), '')}
                                      secondary={`${f.creator} ${asShortStringDate(f.time)}`}/>
                        <ListItemSecondaryAction>
                            <div style={{display: 'flex', alignItems: 'center', flex: 1}}>
                                {email && email === f.folderName && edit && f.deletable && folders &&
                                <div style={{width: 200}}>
                                    <TextField
                                        select
                                        className={classes.textField}
                                        value={f.folderName}
                                        label={text.myDocuments}
                                        onChange={(event) => moveFile(f.id, event.target.value, -1)}
                                    >
                                        {folders.filter(fld => fld.value !== email).map(fld => (
                                            <MenuItem key={fld.value}
                                                      value={fld.value}
                                            >
                                                {fld.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                }

                                {email && email === f.folderName && edit && f.deletable && standardFolders &&
                                <TextField
                                    select
                                    className={classes.textField}
                                    value={f.folderName}
                                    label={text.standardDocuments}

                                    onChange={(event) => moveFile(f.id, event.target.value, getCurrentYear())}
                                >
                                    {standardFolders.map(fld => (
                                        <MenuItem key={fld.value}
                                                  value={fld.value}
                                        >
                                            {fld.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                }
                                {edit && f.deletable &&

                                <IconButton onClick={() => deleteFile(f.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                                }
                            </div>

                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
        </div>
    );
}

export default FileList;



