import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { getJwtToken } from '../../actions/util/JwtUtil';
import { getBackendURL } from '../../config';
import { Document, Page, pdfjs } from "react-pdf";
import { width100 } from '../../utils';
import { Button, IconButton, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SubstructIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { Loading } from '../../components/core';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    fabs: {
        position: 'fixed',
        zIndex: 10000,
    },
    button: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)


    },
    document: {
        marginTop: theme.spacing(10),
        margin: theme.spacing(4)
    }
}));

export function PdfView({ url, setViewUrl }) {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    const classes = useStyles();

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const addDisabled = numPages === 0 || pageNumber >= numPages
    const substructDisabled = numPages === 0 || pageNumber <= 1

    return (
        <div className={classes.root}>
            <div className={classes.document}>
                <Document
                    file={{
                        url: `${getBackendURL()}/${url}`,
                        httpHeaders: {
                            'Cache-Control': 'no-cache',
                            'X-Authorization': 'Bearer ' + getJwtToken(),
                            'x-acting': sessionStorage.getItem('x-acting')
                        },
                        withCredentials: false
                    }}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<Loading/>}
                >
                    <Page  width={width100} pageNumber={pageNumber} />
                </Document>
            </div>
            <div className={classes.fabs}>
                <Fab disabled={addDisabled} sx={{margin: 1}} color="primary" aria-label="add" onClick={() => setPageNumber(pageNumber + 1)} >
                    <AddIcon />
                </Fab>
                <Fab disabled={substructDisabled} sx={{margin: 1}} color="primary" aria-label="edit" onClick={() => setPageNumber(pageNumber - 1)} >
                    <SubstructIcon />
                </Fab>
                <Fab sx={{margin: 1}} color="secondary" onClick={() => setViewUrl(null)}>
                    <CloseIcon />
                </Fab>
                {/* <Fab disabled aria-label="like">
                    <FavoriteIcon />
                </Fab> */}

            </div>
        </div>
    );
}