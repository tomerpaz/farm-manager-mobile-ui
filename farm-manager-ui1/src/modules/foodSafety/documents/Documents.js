import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import { orderBy, uniqBy } from 'lodash';

import IconButton from '@mui/material/IconButton';


import FolderList from './FolderList'
import FileList from './FileList'
import { TextField, YearPicker, Dropzone } from '../../../components'
import { STANDARD, USER_DOCS } from "../../../components/frame/Routes";
import CreateNewFolder from '@mui/icons-material/CreateNewFolder';
import { height200 } from "../../../utils/TabUtils";
import { getFile, } from "../../../actions/FileActions";

import YesNoDialog from "../../../components/dialog/YesNoDialog";
import { BORDER_COLOR_DARK } from "../../../App";
import { getCurrentYear } from '../../../utils';


export const MAX_FILE_SIZE = 5000000; // 10MB

const STANDARD_DIRECTORIES = ['plantProtection', 'fertilization', 'irrigation', 'seedAndSeedlings', 'trainingAndCertificate', 'certificates',
    'recall', 'traceability', 'subcontractors', 'environment', 'audits', 'packingHouse', 'grasp', 'massBalance', 'generalTerm'];

function getStandardFolders(text) {

    return STANDARD_DIRECTORIES.map(e => {
        return { value: e, label: text[e] }
    }
    )
}

function getFileFolders(files) {

    const folders = files.map(e => {
        return { value: e.folderName, label: e.folderName }
    }
    )
    return folders;
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    body: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.spacing(0.5),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)

    },

    space: {
        width: theme.spacing(2),
    },
    folderIcon: {
        fontSize: 36,

    },
    folderIconButton: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        color: theme.palette.primary.dark,
        '&:disabled': {
            color: BORDER_COLOR_DARK,
        }
    },
    textField: {
        flex: 1,
        backgroundColor: theme.palette.common.white,


    },
    newFolder: {
        width: 200,
        backgroundColor: theme.palette.common.white,

    }

}));

const Documents = (props) => {

    const classes = useStyles();
    const { category, dir, text, files, uploading, edit, acceptUpload,
        user, moveFile, getFiles, setErrorMessage, uploadFiles, deleteFile, fetchFiles } = props

    const [uploadFilesState, setUploadFilesState] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [filter, setFilter] = useState('');
    const [yearFilter, setYearFilter] = useState(category === STANDARD ? getCurrentYear() : null);
    const [deleteFileState, setDeleteFileState] = useState(null);
    const [newFolder, setNewFolder] = useState('');
    const [newFolders, setNewFolders] = useState([]);

    const [fileOrderColumn, setFileOrderColumn] = useState('name');

    const [fileOrder, setFileOrder] = useState('asc');
    const [folderOrder, setFolderOrder] = useState('asc');


    useEffect(() => {
        getFiles(category, yearFilter);
    }, [])


    const onYearChanged = (year) => {
        setYearFilter(year);
        getFiles(category, year);
    }

    const onFileDropped = (accepted, rejected) => {
        const folder = selectedFolder;

        const largeFiles = accepted.filter(f => f.size > MAX_FILE_SIZE)

        if (rejected.length > 0) {
            setErrorMessage(`${text.illegalFile}: ${rejected[0].name}`);
        }
        else if (largeFiles.length > 0) {
            setErrorMessage(`${text.fileTooLarge}: ${largeFiles[0].name}`);
        }
        else {
            uploadFiles('document', category, folder, accepted, yearFilter);
            setUploadFilesState(false);
        }
    }


    useEffect(() => {
        if (fetchFiles) {
            getFiles(category, yearFilter);
        }
    }, [fetchFiles])

    const handleClose = (value) => {
        if (value) {
            deleteFile(deleteFileState);
        }
        setDeleteFileState(null)
    };

    const handleFileSort = (column) => {
        if (fileOrderColumn === column) {
            setFileOrder(fileOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setFileOrder('asc')
            setFileOrderColumn(column)
        }
    }

    const onSelectFolder = (folder, doUpload) => {
        setSelectedFolder(folder);
        setUploadFilesState(doUpload);
    }

    const handleFolderSort = () => {
        setFolderOrder(folderOrder === 'asc' ? 'desc' : 'asc');
    }

    const handleNewFolder = () => {
        newFolders.push({ value: newFolder, label: newFolder })
        setNewFolder('');
        setNewFolders(newFolders);
    }


    const placeholder = text.typeToSearch

    const folders = category === STANDARD ? getStandardFolders(text) : getFileFolders(files);

    let displayFolders = newFolders.concat(folders);
    let displayFiles = files

    if (filter.length > 0) {
        displayFolders = folders.filter(f => f.label.indexOf(filter) > -1);
        displayFiles = files.filter(f => f.name.indexOf(filter) > -1);
    }

    if (selectedFolder) {
        displayFiles = files.filter(f => f.folderName === selectedFolder);
    }

    displayFolders = uniqBy(displayFolders, function (e) { return e.label; }
    );

    displayFolders = orderBy(displayFolders, 'label', folderOrder);

    displayFiles = orderBy(displayFiles, fileOrderColumn, fileOrder);

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                {category === STANDARD &&
                    <YearPicker dir={dir} value={yearFilter}
                        onChange={onYearChanged} />}
                {edit && category !== STANDARD && <TextField

                    className={classes.newFolder}
                    onChange={(e) => setNewFolder(e.target.value.replace(/[\/|\\]/g, ''))}
                    value={newFolder}
                    placeholder={text.newFolderName}
                />}
                {edit && category !== STANDARD &&
                    <IconButton disabled={newFolder.length === 0} className={classes.folderIconButton} onClick={handleNewFolder}>
                        <CreateNewFolder className={classes.folderIcon} />
                    </IconButton>


                }
                <TextField

                    className={classes.textField}
                    onChange={(e) => setFilter(e.target.value)}
                    value={filter}
                    placeholder={placeholder}
                />
            </div>
            <div className={classes.body}>
                <div style={{ flex: 2 }}>
                    <FolderList folders={displayFolders} height={height200}
                        selectFolder={folder => onSelectFolder(folder, false)}
                        uploadFiles={folder => onSelectFolder(folder, true)}
                        selectedFolder={selectedFolder}
                        title={text.folders}
                        edit={edit}
                        handleFolderSort={handleFolderSort}
                    />
                </div>
                <div className={classes.space} />
                <div style={{ flex: 4, }}>
                    {!(uploadFilesState || uploading) &&
                        <FileList downloadFile={getFile} deleteFile={(id) => setDeleteFileState(id)}
                            files={displayFiles} title={text.files}
                            handleFileSort={handleFileSort}
                            edit={edit}
                            folders={category === USER_DOCS ? displayFolders : null}
                            standardFolders={category === USER_DOCS ? getStandardFolders(text) : null}
                            height={height200}
                            email={user ? user.email : null}
                            moveFile={moveFile}
                            text={text}
                        />}
                    {(uploadFilesState || uploading) &&
                        <Dropzone accept={acceptUpload}
                            height={height200 - 10} uploading={uploading} title={text.dropZoneMsg}
                            onDrop={onFileDropped} />}


                </div>
            </div>
            <YesNoDialog open={deleteFileState !== null}
                action={handleClose}
                title={text.deleteFormTitle}
                body={text.deleteFormBody}
                yesText={text.delete}
                noText={text.cancel}
            />
        </div>
    )

}


export default Documents;


