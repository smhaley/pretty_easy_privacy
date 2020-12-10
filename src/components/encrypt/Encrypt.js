import React, { useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Result from "./EncResult";
import EncTypeTab from "../utils/EncTypeTab";
import EncryptForm from "./EncryptForm";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { resetAlert, encSuccess, encError } from "../utils/utils";
import {snackLocation} from '../utils/config';


const openpgp = require("openpgp");

const useStyles = makeStyles((theme) => ({
  heading: {
    // marginTop: "15px",
    marginBottom: "30px",
    textAlign: "left",
  },
  pre: {
    fontSize: "inherit",
    color: "inherit",
    border: "initial",
    padding: "initial",
    fontFamily: "inherit",
  },
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  alert: {
    width: "95%",
    // paddingTop: "5px",
    margin: "auto",
  },
}));

const Encrypt = (props) => {

  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);
  const [encType, setEncType] = useState(0);
  const [alert, setAlert] = useState(resetAlert);
  const [armorTxt, setArmorTxt] = useState();

  const byteEncrypt = async (
    passPhrase,
    pubKey,
    uploadedFile,
    ext,
    binInd
  ) => {

    try {
    setLoader(true);

    let inputMessage =
    binInd
        ? openpgp.message.fromBinary(uploadedFile)
        : openpgp.message.fromText(uploadedFile);

    let encIn = {
      message: inputMessage,
      armor: false,
    };

    pubKey
      ? (encIn.publicKeys = pubKey)
      : (encIn.passwords = [passPhrase]);

    const { message } = await openpgp.encrypt(encIn);
    binInd && message.packets.write();


    setArmorTxt({ armorTxt: message.armor(), ext: ext });
    outputHandler();
  } catch (e) {
    setAlert(encError);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(resetAlert);
  };

  const outputHandler = () => {
    setAlert(encSuccess);
    setSuccess(true);
    setLoader(false);
  };

  const reset = () => {
    setSuccess(false);
    setAlert(resetAlert);
  };

  const handleEncType = (type) => {
    setEncType(type);
  };

  let form = (
    <EncryptForm
      handleEncrypt={byteEncrypt}
      encType={encType}
      loader={loader}
    />
  );

  return (
    <>
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

      {!success && <EncTypeTab handleType={handleEncType} />}
      <Grid container wrap="nowrap" spacing={0}>
        <Grid item></Grid>
        <Grid item xs>
          <Typography className={classes.heading} variant="h5" gutterBottom>
            {encType === 0 ? "AES 256 Encryption" : "RSA  Encryption"}
          </Typography>
          {success ? (
            <Result
              reset={reset}
              armorTxt={armorTxt}
            />
          ) : (
            form
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Encrypt;
