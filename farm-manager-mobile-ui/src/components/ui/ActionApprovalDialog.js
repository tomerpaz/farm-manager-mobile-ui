import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

//title={text.deleteFormTitle} body={text.deleteFormBody} okText={text.delete} cancelText={text.cancel}
const ActionApprovalDialog = ({ open, handleClose, title, body, okText, cancelText }) => {

    return (
        <Dialog
            open={open}
            //maxWidth='lg'
            fullWidth={true}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button size='large' variant='outlined' onClick={() => handleClose(false)}>{cancelText}</Button>
                <Button size='large' variant='contained' disableElevation onClick={() => handleClose(true)} autoFocus>
                    {okText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default ActionApprovalDialog;


