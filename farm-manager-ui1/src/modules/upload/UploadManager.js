import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { withRouter } from 'react-router-dom'
import { Dropzone, TopBackBar } from '../../components'
import { height200, height160 } from '../../utils';
import { PROCUREMENT, GIS } from '../../components/frame/Routes';
import { MAX_FILE_SIZE } from '../foodSafety/documents/Documents';
import { formRoot, formSection, formRow } from '../../utils/FormStyle';

const useStyles = makeStyles(theme => ({
    root: {display: 'flex',
    flex: 1,
    flexDirection: 'column',
},
    formSection: formSection(theme),
    formRow: formRow(theme),
}));


export const INVOICE_MAX_FILE_SIZE = 2000000; // 2MB

function getAccept(props){
    const { match: { params : {module, id,} },  acceptUpload} = props;

    if(module.startsWith(GIS)){
        return '.geojson'
    } else {
        return acceptUpload;
    }

}


const UploadManager = (props) => {
    const classes = useStyles();



    const { match: { params : {module, id,} }, text, uploadFile, setErrorMessage, acceptUpload, uploading, dir, history } = props;

    console.log(module)


    const onFileDropped = (accepted, rejected) => {
        const maxSize = PROCUREMENT === module ? module : MAX_FILE_SIZE;
        const largeFiles = accepted.filter(f => f.size > maxSize)

        if (rejected.length > 0) {
            setErrorMessage(`${text.illegalFile}: ${rejected[0].name}`);
        }
        else if (largeFiles.length > 0) {
            setErrorMessage(`${text.fileTooLarge}: ${largeFiles[0].name}`);
        }
        else {
            uploadFile(module, accepted[0], id);
            history.goBack();
        }
    }

   // console.log(module, id)
    return (
        <div style={{ width: '100%' }} className={classes.root}>
            <TopBackBar dir={dir} label={text.back} history={history} />
            <div className={classes.root} >
                <div className={classes.formRow} >
                    <Dropzone multiple={false} accept={getAccept(props)} 
                        height={height160} uploading={uploading} title={text.dropZoneMsg2MB}
                        onDrop={onFileDropped} />
                </div>
            </div>

        </div>
    )
}
export default withRouter(UploadManager);




