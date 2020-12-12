import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Result from "./DecResult";
import EncTypeTab from "../utils/EncTypeTab";
import DecryptForm from "./DecryptForm";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import * as utils from "../utils/utils";
import { snackLocation } from "../utils/config";

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
  main: {
    width: "80%",
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

const Decrypt = (props) => {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);
  const [encType, setEncType] = useState(0);
  const [alert, setAlert] = useState(utils.resetAlert);
  const [outbound, setOutBound] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(utils.resetAlert);
  };

  const byteDecrypt = async (passPhrase, privateKey, textInput, decType) => {
    setLoader(true);
    setAlert(utils.resetAlert);

    let encIn;
    try {
      encIn = {
        message: await openpgp.message.readArmored(textInput),
      };
    } catch (e) {
      let format =
        e.message === "Misformed armored text" ||
        e.message === "String contains an invalid character";
      format === true ? setAlert(utils.decFormat) : setAlert(utils.decGeneric);
      return;
    }
    privateKey
      ? (encIn.privateKeys = privateKey)
      : (encIn.passwords = [passPhrase]);

    decType.fileType === "byte" && (encIn.format = "binary");

    try {
      const { data: decrypted } = await openpgp.decrypt(encIn);

      let outFileType = await utils.extSelect(decrypted, decType);

      setOutBound({
        outbound: decrypted,
        ext: outFileType,
        type: decType.fileType,
      });
      outputHandler();
    } catch (e) {
      e.message ===
        "Error decrypting message: Session key decryption failed." &&
        setAlert(utils.decPW);
      return;
    }
  };

  const outputHandler = () => {
    setSuccess(true);
    setLoader(false);
    setAlert(utils.decSuccess);
  };

  const reset = () => {
    setSuccess(false);
    setAlert(utils.resetAlert);
  };

  const handleDecType = (type) => {
    setEncType(type);
  };

  let form = (
    <DecryptForm byteDecrypt={byteDecrypt} encType={encType} loader={loader} />
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

      {!success && <EncTypeTab handleType={handleDecType} />}

      <Grid container wrap="nowrap" spacing={0}>
        <Grid item xs>
          <Typography className={classes.heading} variant="h5" gutterBottom>
            {encType === 0 ? "AES 256 Decryption" : "RSA  Decryption"}
          </Typography>
          {success ? <Result reset={reset} outbound={outbound} /> : form}
        </Grid>
      </Grid>
    </>
  );
};

export default Decrypt;
