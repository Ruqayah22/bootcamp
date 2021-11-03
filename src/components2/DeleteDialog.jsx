import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const DeleteDialog = (props) =>{
    return(
        <Dialog  open={props.open} onClose={props.onCancel}>
            <DialogTitle>Delete Author</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this Author
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>Cancel</Button>
                <Button color="secondary" variant="contained" onClick={props.onDelete}>
                Delete
                </Button>
            </DialogActions>
        </Dialog>
        
    );
};

export default DeleteDialog;