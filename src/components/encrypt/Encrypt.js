import React, { useState } from "react";
import Result from "./EncResult";
import EncTypeTab from "../shared/EncTypeTab";
import EncryptForm from "./EncryptForm";
import Alert from "@material-ui/lab/Alert";
import { resetAlert, encSuccess, encError } from "../utils/utils";
import { snackLocation } from "../utils/config";
import { Box, Typography, Snackbar } from "@material-ui/core";
import { message as pgpMessage, encrypt } from "openpgp";
import { useCommonStyles } from "../commonStyles";

const Encrypt = () => {
  const commonClasses = useCommonStyles();

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

  const handleClose = (_, reason) => {
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

  const form = (
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
      <Box p={2}>
        <div className={commonClasses.header}>
          {!success && <EncTypeTab handleType={handleEncType} />}
          <Typography
            className={commonClasses.heading}
            variant="h1"
            gutterBottom
          >
            {encType === 0 ? "Passphrase Based Encryption" : "Key Encryption"}
          </Typography>
          <Typography
            className={commonClasses.subHeading}
            variant="h2"
            gutterBottom
          >
            {encType === 0 ? "Symmetric" : "Asymmetric"}
          </Typography>
        </div>
        {success ? <Result reset={reset} armorTxt={armorTxt} /> : form}
      </Box>
    </>
  );
};

export default Encrypt;
