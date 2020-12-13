import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Result from "./EncResult";
import EncTypeTab from "../utils/EncTypeTab";
import EncryptForm from "./EncryptForm";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { resetAlert, encSuccess, encError } from "../utils/utils";
import { snackLocation } from "../utils/config";

const openpgp = require("openpgp");

const useStyles = makeStyles((theme) => ({
  // heading: {
  //   marginBottom: theme.spacing(2),
  //   textAlign: "left",
  // },
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
  header: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
  },
}));

const Encrypt = () => {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);
  const [encType, setEncType] = useState(0);
  const [alert, setAlert] = useState(resetAlert);
  const [armorTxt, setArmorTxt] = useState();

  const byteEncrypt = async (passPhrase, pubKey, uploadedFile, ext, binInd) => {
    try {
      setLoader(true);

      let inputMessage = binInd
        ? openpgp.message.fromBinary(uploadedFile)
        : openpgp.message.fromText(uploadedFile);

      let encIn = {
        message: inputMessage,
        armor: false,
      };

      pubKey ? (encIn.publicKeys = pubKey) : (encIn.passwords = [passPhrase]);

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
    <div>
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
      <div>
        <div className={classes.header}>
          {!success && <EncTypeTab handleType={handleEncType} />}
          
          <Typography className={classes.heading} variant="h5" gutterBottom>
            {encType === 0 ? "AES 256 Encryption" : "RSA  Encryption"}
          </Typography>

          <Box pt={2} pb={2}>
            <p>To Encrypt, simply fill out this form.</p>
            {encType === 0 && <b>Just don't lose your Passphrase!</b>}
          

          </Box> 
        </div>
        {success ? <Result reset={reset} armorTxt={armorTxt} /> : form}
      </div>
    </div>
  );
};

export default Encrypt;
