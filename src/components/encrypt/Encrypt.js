import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Result from "./EncResult";
import EncTypeTab from "../shared/EncTypeTab";
import EncryptForm from "./EncryptForm";
import Alert from "@material-ui/lab/Alert";
import { resetAlert, encSuccess, encError } from "../utils/utils";
import { snackLocation } from "../utils/config";
import { Box, Typography, Snackbar } from "@material-ui/core";
import { message as pgpMessage, encrypt } from "openpgp";

const useStyles = makeStyles((theme) => ({
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
        ? pgpMessage.fromBinary(uploadedFile)
        : pgpMessage.fromText(uploadedFile);

      let encIn = {
        message: inputMessage,
        armor: false,
      };

      pubKey ? (encIn.publicKeys = pubKey) : (encIn.passwords = [passPhrase]);

      const { message } = await encrypt(encIn);
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
      <Box p={2}>
        <div className={classes.header}>
          {!success && <EncTypeTab handleType={handleEncType} />}

          <Typography className={classes.heading} variant="h5" gutterBottom>
            {encType === 0 ? (
              <b>Passphrase Encryption</b>
            ) : (
              <b>Key Encryption</b>
            )}
          </Typography>
        </div>
        {success ? <Result reset={reset} armorTxt={armorTxt} /> : form}
      </Box>
    </div>
  );
};

export default Encrypt;
