import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PassPhraseConfirm = (props) => {
    const status = props.open
  const [passPhrase, setPassPhrase] = React.useState();

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

const passPhraseConfirmBuffer = (e) => {
    setPassPhrase(e.target.value)
    console.log(e.target.value)
}
const label = props.confirmError ? "Please Try Again" : "PassPhrase Confirmation";

  return (
    <div>
      <Dialog open={status} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">PassPhrase Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please re enter your passphrase below:
          </DialogContentText>
          <TextField
            autoFocus
            error = {props.confirmError}
            onChange = {props.passPhraseConfirmBuffer}
            margin="dense"
            id="name"
            label={label}
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick= {() => props.handleConfirm(1)} color="primary">
            Encrypt
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PassPhraseConfirm;