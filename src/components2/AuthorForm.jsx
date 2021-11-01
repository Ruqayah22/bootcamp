import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

const AuthorForm = (props) => {
  const [name, setName] = useState(props?.author?.name ?? "");
  const [age, setage] = useState(props?.author?.age ?? 1);

  const submitHandler = (e) => {
    e.preventDefault();

    props.submit({
      name,
      age,
    });
  };

  return (
    <Dialog fullWidth open={props.open} onClose={props.closeHandler}>
      <DialogTitle id="form-dialog-title">
        {props.author ? "edit author" : "add author"}
      </DialogTitle>

      <form onSubmit={submitHandler}>
        <DialogContent>
          <TextField
            autoFocus
            name="name"
            id="name"
            type="text"
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* ///////////// */}
          <TextField
            autoFocus
            name="age"
            id="age"
            type="number"
            value={age}
            label="age"
            margin="dense"
            onChange={(e) => setage(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={props.closeHandler} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AuthorForm;
