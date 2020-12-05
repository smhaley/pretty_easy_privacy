import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Result from "./Result";
import EncTypeTab from "../utils/EncTypeTab";
import DecryptForm from "./DecryptForm";
import Alert from "@material-ui/lab/Alert";
import Expire from "../utils/Expire";
import Snackbar from "@material-ui/core/Snackbar";
import * as utils from "../utils/utils";



const openpgp = require("openpgp");
const FileType = require("file-type");
// const readChunk = require('read-chunk');

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

const Decrypt = (props) => {
  let NullAlert = {
    show: 0,
    message: null,
    severity: null,
  };

  let resetAlert = {
    show: false,
    message: "",
    severity: "",
  };

  const classes = useStyles();
  // const [outputTag, setOutputTag] = useState();
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);
  const [encType, setEncType] = useState(0);
  const [alert, setAlert] = useState(NullAlert);
  const [armorTxt, setArmorTxt] = useState();
  const [outbound, setOutBound] = useState();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(resetAlert);
    // setOpen(false);
  };

  const byteDecrypt = async (
    passPhrase,
    privateKey,
    textInput,
    decType
    // fileMetaData
  ) => {
    setLoader(true);
    setAlert(resetAlert);
    console.log("byte dec meth");
    let encIn;
    try {
      encIn = {
        message: await openpgp.message.readArmored(textInput),
        format: "binary",
      };
    } catch (e) {
      let format =
        e.message === "Misformed armored text" ||
        e.message === "String contains an invalid character";
      console.log("format", format);
      format === true ?
        setAlert(utils.decFormat) :
        setAlert(utils.decGeneric)
      return;
    }

    privateKey
      ? (encIn.privateKeys = privateKey)
      : (encIn.passwords = [passPhrase]);

    try {
      const { data: decrypted } = await openpgp.decrypt(encIn);
      let bufferType = await FileType.fromBuffer(decrypted);

      let outFileType = utils.extSelect(bufferType, decType);

      setOutBound({
        outbound: decrypted,
        ext: outFileType,
        type: decType.fileType,
      }); 
      outputHandler()
    } catch (e) {
      e.message ===
        "Error decrypting message: Session key decryption failed." &&
        setAlert(utils.decPW);
      // setOpen(true);
      return;
    }  
  };

  const outputHandler = () => {
    setSuccess(true);
    setAlert(utils.decSuccess);
  };

  const reset = () => {
    setSuccess(false);
    setAlert(resetAlert);
  };

  const handleDecType = (type) => {
    setEncType(type);
  };

  let form = (
    <DecryptForm
      byteEncrypt={byteDecrypt}
      encType={encType}
      loader={loader}
    />
  );

  return (
    <>
{  alert.show &&    <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={alert.show}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>}

      {!success && <EncTypeTab handleType={handleDecType} />}
      <Grid container wrap="nowrap" spacing={0}>
        <Grid item></Grid>
        <Grid item xs>
          <Typography className={classes.heading} variant="h5" gutterBottom>
            {encType === 0 ? "AES 256 Decryption" : "RSA  Decryption"}
          </Typography>
          {success ? (
            <Result // outputTag={outputTag}
              reset={reset}
              outbound={outbound}
            />
          ) : (
            form
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Decrypt;
