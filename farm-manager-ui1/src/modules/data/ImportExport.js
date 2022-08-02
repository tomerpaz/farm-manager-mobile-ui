import React, { useState, useEffect, Fragment } from 'react';
import { ButtonBody} from '../../utils/StyleUtils';

import { Box } from '@mui/material';
import { bodyHeight, height160 } from '../../utils';
import { CloudUpload, CloudDownload } from '@mui/icons-material';
import { Dropzone, } from '../../components'
import { MAX_FILE_SIZE } from '../foodSafety/documents/Documents';
import { importDataModule } from '../../actions';
import UploadResult from './UploadResult';
import SelectorButton from '../../components/core/button/SelectorButton';

const ImportExport = (props) => {
    const {
        text, module,
        uploadDataModule, setErrorMessage, acceptUpload, uploading, clearUploadResult, uploadResult

    } = props;

    const [action, setAction] = useState(null);

    useEffect(() => {
        setAction(null);
        clearUploadResult();
    }, [module]);

    useEffect(() => {
        setAction(null);
    }, [uploadResult]);

    const onFileDropped = (accepted, rejected) => {
        const maxSize = MAX_FILE_SIZE;
        const largeFiles = accepted.filter(f => f.size > maxSize)

        if (rejected.length > 0) {
            setErrorMessage(`${text.illegalFile}: ${rejected[0].name}`);
        }
        else if (largeFiles.length > 0) {
            setErrorMessage(`${text.fileTooLarge}: ${largeFiles[0].name}`);
        }
        else {
            uploadDataModule(module, accepted[0]);
        }
    }

    const downlodClicked = () => {
        clearUploadResult();
        importDataModule('xlsx', module);
    }


    const showUpload = 'upload' === action;
    return (

        <Box marginTop={4} sx={{ height: bodyHeight }}>
            {module &&
                <Fragment>
                    {!showUpload &&
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-around'}>
                            <SelectorButton
                                onClick={downlodClicked}>
                                <ButtonBody>
                                    {text.download}
                                    <CloudDownload />
                                </ButtonBody>
                            </SelectorButton>

                            <SelectorButton
                                onClick={() => setAction('upload')}>
                                <ButtonBody>
                                    {text.upload}
                                    <CloudUpload />
                                </ButtonBody>
                            </SelectorButton>
                        </Box>}
                    {showUpload &&
                        <Box padding={2} >
                            <Dropzone multiple={false} accept={'.xlsx'}
                                height={height160} uploading={uploading} title={text.dropZoneMsg2MB}
                                onDrop={onFileDropped} />
                        </Box>

                    }
                    {uploadResult && !showUpload &&
                        <Box padding={2} style={{ paddingLeft: 200, paddingRight: 200 }}>
                            <UploadResult uploadResult={uploadResult} />
                        </Box>}

                </Fragment>}
        </Box>
    )
}
export default ImportExport;



