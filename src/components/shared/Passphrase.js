import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  Grid,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pwInput: {
    maxWidth: "225px",
  },
  pw: {
    color: "#777fa7",
    marginTop: "18px",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const PassPhraseConfirm = (props) => {
  const [confirmPassPhrase, setConfirmPassPhrase] = useState();

  const passPhraseConfirmBuffer = (e) => {
    setConfirmPassPhrase(e.target.value);
  };

  const status = props.open;

  const label = props.confirmError
    ? "Please Try Again"
    : "Passphrase Confirmation";

  return (
    <div>
      <Dialog
        open={status}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Passphrase Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please re enter your passphrase below:
          </DialogContentText>
          <TextField
            required
            autoFocus
            error={props.confirmError}
            onChange={passPhraseConfirmBuffer}
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
          <Button
            type="submit"
            onClick={() => props.handleConfirm(confirmPassPhrase)}
            color="primary"
          >
            {props.buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const PassPhrase = (props) => {
  const classes = useStyles();

  const [passPhrase, passPhraseState] = useState("");
  const [errors, setErrors] = useState({
    confirmError: false,
    passPhraseMissingError: false,
  });
  const [open, setOpen] = useState(false);
  const [strength, setStrength] = useState({ score: null, resp: null });

  let strengthResp = {
    0: "Very Bad 👎",
    1: "Bad 👎",
    2: "Weak 😐",
    3: "Good 🙂",
    4: "Strong 🔥🔥🔥",
  };

  const handlePassPhrase = (e) => {
    passPhraseState(e.target.value);
    const result = zxcvbn(e.target.value);
    setStrength({
      score: result.score === 0 ? "1" : result.score,
      resp: strengthResp[result.score],
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ confirmError: false, passPhraseMissingError: false });
    const err = props.handleSubmit(e);

    if (!passPhrase) {
      setErrors({ ...errors, passPhraseMissingError: true });
    }
    if (!passPhrase || err) {
      return;
    } else {
      setOpen(true);
    }
  };

  const handleConfirm = (confirmPassPhrase) => {
    if (confirmPassPhrase === passPhrase) {
      setOpen(false);
      props.handleConfirm(passPhrase);
    } else {
      setErrors({ ...errors, confirmError: true });
    }
  };

  return (
    <>
      <Box>
        <Grid container spacing={1}>
          <Grid item>
            <TextField
              required
              helperText={
                errors.passPhraseMissingError && "PassPhrase Required!"
              }
              onChange={handlePassPhrase}
              className={props.class}
              error={errors.passPhraseMissingError}
              id="pw-in"
              type="password"
              label={"Passphrase"}
              variant="outlined"
            />
          </Grid>
          {passPhrase.length > 0 && (
            <Grid className={classes.pw} item>
              {strength.resp}
            </Grid>
          )}
        </Grid>
      </Box>

      <Box pt={3}>
        <Button
          type="submit"
          variant="contained"
          color={"primary"}
          disabled={props.loading}
          onClick={handleSubmit}
        >
          {props.mainButtonText}
          {props.loading && (
            <CircularProgress
              size={24}
              color="primary"
              className={classes.buttonProgress}
            />
          )}
        </Button>
      </Box>

      <PassPhraseConfirm
        open={open}
        buttonText={props.modalButtonText}
        handleClose={() => setOpen(false)}
        handleConfirm={handleConfirm}
        confirmError={errors.confirmError}
      />
    </>
  );
};

export default PassPhrase;
