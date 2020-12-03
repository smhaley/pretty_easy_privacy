import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Result from "./Result";
import EncTypeTab from "../utils/EncTypeTab";
import DecryptForm from "./DecryptForm";
import Alert from "@material-ui/lab/Alert";
import Expire from "../utils/Expire";

const openpgp = require("openpgp");
const FileType = require('file-type');
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

const Decrypt= (props) => {
  let NullAlert = {
    show: 0,
    message: null,
    severity: null,

  };

  const classes = useStyles();
  // const [outputTag, setOutputTag] = useState();
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);
  const [encType, setEncType] = useState(0);
  const [alert, setAlert] = useState(NullAlert);
  const [armorTxt, setArmorTxt] = useState()
  const [outBuffer, setOutBuffer] = useState()

  const byteEncrypt = async (
    passPhrase,
    pubKey,
    uploadedFile,
    fileMetaData
  ) => {
    setLoader(true);
    let encIn = {
      message: openpgp.message.fromBinary(uploadedFile), // input as Message object
      armor: false, // don't ASCII armor (for Uint8Array output)
    };

    pubKey
      ? (encIn.publicKeys = pubKey) //(await openpgp.key.readArmored(pubKey)).keys)
      : (encIn.passwords = [passPhrase]);

    const { message } = await openpgp.encrypt(encIn);
    const encrypted = message.packets.write();
    setArmorTxt({armorTxt: message.armor(), ext:fileMetaData.type})
    outputHandler();
  };
  

  const byteDecrypt = async (
    passPhrase,
    privateKey,
    textInput,
    // fileMetaData
  ) => {
    setLoader(true);
    let encIn = {
      message: await openpgp.message.readArmored(textInput),
      // armor: false,
      format: 'binary'
    };

    // try {
      privateKey
        ? (encIn.privateKeys = privateKey) //(await openpgp.key.readArmored(privateKey)).keys)
        : (encIn.passwords = [passPhrase]);
// console.log('DEC IN ', encIn)
        const { data: decrypted } = await openpgp.decrypt(encIn);

// console.log('done')
      console.log(await FileType.fromBuffer(decrypted));
      console.log(decrypted)
      setOutBuffer(decrypted)
      setSuccess(true)
  };

  const textEncrypt = async (passPhrase, pubKey, textInput) => {
    setLoader(true);

    let encIn = {
      message: openpgp.message.fromText(textInput),
      armor: false,
    };

    try {
      pubKey
        ? (encIn.publicKeys = pubKey) //(await openpgp.key.readArmored(pubKey)).keys)
        : (encIn.passwords = [passPhrase]);

        const { data: decrypted } = await openpgp.decrypt(encIn);
        console.log(decrypted)


    } catch (e) {
      let wrongKey =
        "Error encrypting message: No keys, passwords, or session key provided.";
      if (e.message === wrongKey && pubKey) {
        setAlert({
          show: true,
          message: "Something went wrong! Please try again.",
          severity: "error",
        });
      }
    }
  };



  const textDecrypt = async (passPhrase, privateKey, textInput) => {
    setLoader(true);

    let encIn = {
      message: await openpgp.message.readArmored(textInput),
      // armor: false,
      format: 'binary'
    };

    try {
      privateKey
        ? (encIn.privateKeys = privateKey) //(await openpgp.key.readArmored(privateKey)).keys)
        : (encIn.passwords = [passPhrase]);
// console.log('DEC IN ', encIn)
        const { data: decrypted } = await openpgp.decrypt(encIn);

// console.log('done')
      console.log(await FileType.fromBuffer(decrypted));
      console.log(decrypted)
      // console.log(decrypted)

    } catch (e) {
      let wrongKey =
        "Error encrypting message: No keys, passwords, or session key provided.";
      if (e.message === wrongKey && privateKey) {
        setAlert({
          show: true,
          message: "Something went wrong! Please try again.",
          severity: "error",
        });
      }
    }
  };

  const outputHandler = () => {
      setAlert({
        show: true,
        message: "Encryption Complete",
        severity: "success",
      });
    setSuccess(true);
    setLoader(false);
  };

  const reset = () => {
    setSuccess(false);
    setAlert(NullAlert);
  };

  const handleEncType = (type) => {
    setEncType(type);
  };

  let form = (
    <DecryptForm
      textEncrypt={textDecrypt}
      byteEncrypt={byteDecrypt}
      encType={encType}
      loader = {loader}
    />
  );

  return (
    <>
      <div className={classes.alert}>
        {/* {success ? ( //&& <Alert severity={alert.severity}>{alert.message}</Alert> }
          <Expire>
            <Alert severity={alert.severity}>{alert.message}</Alert>
          </Expire>
        ) : null} */}
      </div>
      {!success && <EncTypeTab handleEncType={handleEncType} />}
      <Grid container wrap="nowrap" spacing={0}>
        <Grid item></Grid>
        <Grid item xs>
          <Typography className={classes.heading} variant="h5" gutterBottom>
            {encType === 0 ? "AES 256 Decryption" : "RSA  Decryption"}
          </Typography>
          {success ? <Result // outputTag={outputTag} 
          reset={reset} armorTxt={outBuffer}/> : form}
        </Grid>
      </Grid>
    </>
  );
};

export default Decrypt;
