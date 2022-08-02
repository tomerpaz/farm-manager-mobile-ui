import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';

import { YesNoDialog } from '../dialog'


// const useStyles = makeStyles(theme => ({
//     button: {
//         margin: theme.spacing(1),
//     },

//     saveButton: buttonPrime(theme),
//   }));


const FormActions = (props) => {
    const { text, deletable, editable, cancelAction, pristine, submitting, onSubmit, deleteAction } = props;
    const [deleteOpen, setDeleteOpen] = useState(false);






    const handleClose = (value) => {
        if (value) {
            deleteAction();
        }
        setDeleteOpen(false);
    };


    const showSave = editable === false ? false : true;

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {showSave && <Button type="submit"
                size='large'
                variant={'contained'}
                disableElevation
                sx={{ margin: 1 }}
                onClick={onSubmit}
                disabled={pristine || submitting}>
                {text.save}
            </Button>}
            {cancelAction &&
                <Button type='button'
                    variant="outlined"
                    color='secondary'
                    sx={{ margin: 1 }}
                    onClick={cancelAction}
                    size='large'

                >
                    {text.cancel}
                </Button>}
            {deletable &&
                <Button type='button'
                    variant="outlined"
                    color='secondary'
                    sx={{ margin: 1 }}
                    size='large'
                    onClick={() => setDeleteOpen(true)}
                >
                    <Delete />
                </Button>
            }

            <YesNoDialog open={deleteOpen}
                action={handleClose}
                title={text.deleteFormTitle}
                body={text.deleteFormBody}
                yesText={text.delete}
                noText={text.cancel}
            />
        </div>
    )
}


export default FormActions;

