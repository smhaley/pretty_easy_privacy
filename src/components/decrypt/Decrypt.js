import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Snackbar } from "@material-ui/core";
import Result from "./DecResult";
import EncTypeTab from "../utils/EncTypeTab";
import DecryptForm from "./DecryptForm";
import Alert from "@material-ui/lab/Alert";
import * as utils from "../utils/utils";
import { snackLocation } from "../utils/config";
import { decrypt, message } from "openpgp";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
  },
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
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
        message: await message.readArmored(textInput),
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
      const { data: decrypted } = await decrypt(encIn);

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
          {!success && <EncTypeTab handleType={handleDecType} />}
          <Typography variant="h5" gutterBottom>
            {encType === 0 ? (
              <b>Passphrase Decryption</b>
            ) : (
              <b>Key Decryption</b>
            )}
          </Typography>
        </div>
        {success ? <Result reset={reset} outbound={outbound} /> : form}
      </Box>
    </div>
  );
};

export default Decrypt;
