import React, { useState } from "react";
import { Box, Typography, Snackbar } from "@material-ui/core";
import Result from "./DecResult";
import EncTypeTab from "../shared/EncTypeTab";
import DecryptForm from "./DecryptForm";
import Alert from "@material-ui/lab/Alert";
import * as utils from "../utils/utils";
import { snackLocation } from "../utils/config";
import { decrypt, message } from "openpgp";
import { useCommonStyles } from "../commonStyles";

const Decrypt = () => {
  const commonClasses = useCommonStyles();

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
      e.message.includes("Error decrypting message") && setAlert(utils.decPW);
      setLoader(false);
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
      <Box p={2}>
        <div className={commonClasses.header}>
          {!success && <EncTypeTab handleType={handleDecType} />}

          <Typography
            className={commonClasses.heading}
            variant="h1"
            gutterBottom
          >
            {encType === 0
              ? "Passphrase Based Decryption"
              : "Key Based Decryption"}
          </Typography>
          <Typography
            className={commonClasses.subHeading}
            variant="h2"
            gutterBottom
          >
            {encType === 0 ? "Symmetric" : "Asymmetric"}
          </Typography>
        </div>
        {success ? <Result reset={reset} outbound={outbound} /> : form}
      </Box>
    </>
  );
};

export default Decrypt;
