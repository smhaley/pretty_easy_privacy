import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { snackLocation } from "../utils/config";
import InFile from "./InFile";
import { resetAlert, keyError, privKeyPassError, pubKeyDecError } from "../utils/utils";
import { key } from "openpgp";
import {
  TextField,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Snackbar,
  CircularProgress,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },

  main: {
    backgroundColor: "#FAFAFA",
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(2),
    },
  },
}));

const KeyInput = (props) => {
  const classes = useStyles();

  let privateKey = props.privateKey;
  let encrypt = props.encrypt;

  let resetErr = { err: false, key: false, message: false };

  const [alert, setAlert] = useState(resetAlert);
  const [byteKey, setByteKey] = useState();
  const [inputTypeSelect, setInputTypeSelect] = useState("byte");
  const [formTextInputError, setFormTextInputError] = useState(resetErr);
  const [formByteInputError, setFormByteInputError] = useState(resetErr);
  const [fileMetaData, setFileMetaData] = useState();
  const [passPhraseError, setPassPhraseError] = useState(false);
  const [passPhrase, setPassPhrase] = useState("");
  const [uploading, setUploading] = useState(false);

  const handlePassPhrase = (e) => setPassPhrase(e.target.value);

  const handleDelete = () => {
    setByteKey(undefined);
    setFileMetaData(undefined);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(resetAlert);
  };

  const handleTextInput = (e) => {
    setByteKey(e.target.value);
  };

  const handleInputType = (e) => {
    setInputTypeSelect(e.target.value);
  };

  const readKey = (e) => {
    console.log("FIRE");
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    setUploading(true);

    reader.readAsText(file);

    reader.onloadend = () => {
      setFileMetaData({ name: file.name, type: file.type.replace("/", "_") });
      setByteKey(reader.result);
      setUploading(false);
    };
    reader.onerror = () => {
      setByteKey(undefined);
      setUploading(false);
    };
  };

  let inputType;
  if (inputTypeSelect === "text") {
    inputType = (
      <TextField
        helperText={formTextInputError.err && formTextInputError.message}
        className={classes.textBox}
        fullWidth={true}
        error={formTextInputError.err}
        id="outlined-multiline-static-rsa-key"
        label={"RSA Key Input"}
        multiline
        rows={10}
        onChange={handleTextInput}
        variant="outlined"
      />
    );
  } else {
    inputType = (
      <InFile
        formByteInputError={formByteInputError.err}
        errMessage={formByteInputError.err.message}
        fileMetaData={fileMetaData}
        label="Key Browse"
        buttonLabel={"key browse"}
        handleDelete={handleDelete}
        readFile={readKey}
        uploading={uploading}
        inId="keyIn"
      />
    );
  }

  const removeErrors = () => {
    setAlert(resetAlert);
    setFormTextInputError(resetErr);
    setFormByteInputError(resetErr);
    setPassPhraseError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    removeErrors();

    let err = false,
      outkey;

    if (passPhrase === "") {
      setPassPhraseError(true);
      err = true;
    }

    if (!byteKey || byteKey === "") {
      if (inputTypeSelect === "text") {
        setFormTextInputError({
          ...formTextInputError,
          err: true,
          message: "Key Text Required",
        });
      } else {
        setFormByteInputError({
          ...formByteInputError,
          err: true,
          message: "Key File Required",
        });
      }
      err = true;
    } else {
      privateKey
        ? ({ key: outkey, error: err } = await handlePrivateKey(
            byteKey,
            passPhrase
          ))
        : ({ key: outkey, error: err } = await handlePublicKey(byteKey));
    }

    //continue to snag error in other input

    props.handleKeyEncrypt(outkey, err);
  };

  const handlePublicKey = async (byteKey) => {
    let rsaKey = (await key.readArmored(byteKey)).keys[0];
    if (!rsaKey) {
      setAlert(keyError);
      return { key: undefined, error: true };
    } else {
      return { key: rsaKey, error: false };
    }
  };

  const handlePrivateKey = async (byteKey, passPhrase) => {
    let output;
    try {
      const {
        keys: [privateKey],
      } = await key.readArmored(byteKey);
      await privateKey.decrypt(passPhrase);
      output = [privateKey];
      return { key: output, error: false };
    } catch (e) {
      e.message === "Nothing to decrypt in a public key" &&
        setAlert(pubKeyDecError);
      e.message === "Incorrect key passphrase" && setAlert(privKeyPassError);
      e.message === "privateKey is undefined" && setAlert(keyError);
      e.message === "Cannot read property 'decrypt' of undefined" &&
        setAlert(keyError);
      return { key: undefined, error: true };
    }
  };

  return (
    <div className={classes.main}>
      {alert.show && (
        <Snackbar
          anchorOrigin={snackLocation}
          open={alert.show}
          autoHideDuration={10000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={alert.severity}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}
      <Box>
        <Box>
          <Typography color="textPrimary" variant="h6" gutterBottom>
            <b>Key Input</b>
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="position"
              name="position"
              value={inputTypeSelect}
              defaultValue="top"
              onChange={handleInputType}
            >
              <FormControlLabel
                value="byte"
                control={<Radio color="secondary" />}
                label="Import from file"
                labelPlacement="end"
              />
              <FormControlLabel
                value="text"
                control={<Radio color="primary" />}
                label="Paste in text"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box>
          <FormLabel component="legend"></FormLabel>
          <Box mt={2}>{inputType}</Box>
        </Box>
        {privateKey && (
          <Box pt={3}>
            <TextField
              required
              helperText={passPhraseError && "Passphrase Required!"}
              onChange={handlePassPhrase}
              error={passPhraseError}
              id="pw-in private key"
              type="password"
              label={"Private Key Passphrase"}
              variant="outlined"
            />
          </Box>
        )}
        <Box pt={3}>
          <Button
            variant="contained"
            color={"primary"}
            onClick={handleSubmit}
            disabled={props.loading}
          >
            {encrypt ? "Encrypt" : "Decrypt"}
            {props.loading && (
              <CircularProgress
                size={24}
                color="primary"
                className={classes.buttonProgress}
              />
            )}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default KeyInput;
