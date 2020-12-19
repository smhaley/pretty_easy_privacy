import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PassPhrase from "../utils/Passphrase";

import Display from "../utils/BrowserResult";

const openpgp = require("openpgp");

const useStyles = makeStyles((theme) => ({
  formField: {
    width: "350px",
  },
  pwInput: {
    width: "350px",
  },

  main: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },

  button: {
    margin: "5px",
  },
}));

const KeyGen = (props) => {
  const classes = useStyles();
  const [key, setKey] = useState(undefined);
  const [keyFields, setKeyFields] = useState({ name: "", email: "", pw: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    emailNull: false,
    emailFormat: false,
    emMessage: false,
  });

  const handleCreate = async (passKey) => {
    setLoading(true);
    const key = await openpgp.generateKey({
      userIds: [{ name: keyFields.name, email: keyFields.email }],
      rsaBits: 4096, // RSA key size
      passphrase: passKey,
    });
    setKey(key);
    setLoading(false);
  };

  let handleEmailValid = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      return false;
    } else {
      return true;
    }
  };

  const handleName = (e) => {
    setKeyFields({ ...keyFields, name: e.target.value });
  };
  const handleEmail = (e) => {
    setKeyFields({ ...keyFields, email: e.target.value });
  };

  const handleFormSubmit = () => {
    let nameNull,
      emailNull,
      validFormat,
      emMessage = false;
    if (keyFields.name === "") {
      nameNull = true;
    }
    if (keyFields.email === "") {
      emailNull = true;
      emMessage = "Email Required!";
    } else {
      validFormat = handleEmailValid(keyFields.email);
      emMessage = "Invalid Email Format!";
    }
    setErrors({
      ...errors,
      name: nameNull,
      emailNull: emailNull,
      emailFormat: validFormat,
      emMessage: emMessage,
    });
    if (validFormat || emailNull || nameNull) {
      return true;
    } else {
      return false;
    }
  };

  const handleConfirm = (key) => {
    handleCreate(key);
  };

  return (
    <Box p={2}>
      {typeof key == "undefined" ? (
        <>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <div className={classes.main}>
              <Typography className={classes.heading} variant="h5" gutterBottom>
                <b> RSA Key Generation</b>
              </Typography>
              <Box pb={4} pt={2}>
                Creating Keys is simple. Just fill out this form.
                <br />
                No worries if you don't want to use your name or email addres.
                Just make one up!
                <br />
                <b>Just don't lose you Private Key and Passphrase!</b>
              </Box>
              <Box pb={4}>
                <TextField
                  required
                  className={classes.formField}
                  id="outlined-required"
                  label="Name"
                  onChange={handleName}
                  error={errors.name}
                  helperText={errors.name && "Text Required!"}
                  variant="outlined"
                />
              </Box>

              <Box>
                {" "}
                <TextField
                  required
                  className={classes.formField}
                  id="outlined-disabled"
                  label="email"
                  onChange={handleEmail}
                  error={errors.emailNull || errors.emailFormat}
                  helperText={
                    (errors.emailNull || errors.emailFormat) && errors.emMessage
                  }
                  variant="outlined"
                />
              </Box>
            </div>
            <PassPhrase
              class={classes.pwInput}
              loading={loading}
              mainButtonText={"Generate"}
              modalButtonText={"Submit"}
              handleSubmit={handleFormSubmit}
              handleConfirm={handleConfirm}
            />
          </form>
        </>
      ) : (
        <Result encKeys={key} />
      )}
    </Box>
  );
};

const Result = (props) => {
  const classes = useStyles();

  const [openPub, setOpenPub] = useState(false);
  const [openPriv, setOpenPriv] = useState(false);

  const dlKey = (key, name) => {
    const element = document.createElement("a");
    const file = new Blob([key], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = name + ".txt";
    element.click();
    element.remove();
  };

  let encKeys = props.encKeys;

  return (
    <div className={classes.main}>
      <Box>
        <Typography className={classes.heading} variant="h5" gutterBottom>
          <b> Key Results </b>
        </Typography>
        <br />
        <br />

        <Typography
          className={classes.heading}
          color="primary"
          variant="h6"
          gutterBottom
        >
          Private Key
        </Typography>

        <Box pb={2}>
          <Typography color="error">
            <b>The private key is private. NEVER SHARE YOUR PRIVATE KEY</b>
          </Typography>
          <p>
            Use the private key for decrypting data encrypted with your public
            key.
          </p>
        </Box>
        <Box pb={4}>
          <Button
            onClick={() => setOpenPriv(!openPriv)}
            variant="outlined"
            color={"primary"}
            className={classes.button}
          >
            {openPriv ? "Hide" : "In Browser"}
          </Button>
          <Button
            onClick={() => dlKey(encKeys.privateKeyArmored, "private_key")}
            variant="outlined"
            color={"primary"}
            className={classes.button}
          >
            Download
          </Button>

          {openPriv && (
            <Display val={encKeys.privateKeyArmored} id="privateKey" />
          )}
        </Box>
        <Typography
          color="secondary"
          className={classes.heading}
          variant="h6"
          gutterBottom
        >
          Public Key
        </Typography>

        <Box pb={2}>
          <p>The public key is public. You could share it with anyone.</p>
          <p>
            The public key encrypts files that only your private key can
            decrypt.
          </p>
        </Box>
        <Box mb={2}>
          <Button
            onClick={() => setOpenPub(!openPub)}
            variant="outlined"
            color={"secondary"}
            className={classes.button}
          >
            {openPub ? "Hide" : "In Browser"}
          </Button>
          <Button
            onClick={() => dlKey(encKeys.publicKeyArmored, "public_key")}
            variant="outlined"
            color={"secondary"}
            className={classes.button}
          >
            Download
          </Button>

          {openPub && <Display val={encKeys.publicKeyArmored} id="publicKey" />}
        </Box>
      </Box>
    </div>
  );
};
export default KeyGen;
