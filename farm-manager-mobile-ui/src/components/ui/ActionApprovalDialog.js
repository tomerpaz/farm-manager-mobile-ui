import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import DialogAppBar from "../../ui/dialog/DialogAppBar";

const ActionApprovalDialog = ({ open, handleClose, title, body, okText }) => {

    return (
        <Dialog
            open={open}
            fullWidth={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogAppBar onClose={() => handleClose(false)}
                title={title}
            />
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button size='large' variant='contained' disableElevation onClick={() => handleClose(true)} autoFocus>
                    {okText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default ActionApprovalDialog;


