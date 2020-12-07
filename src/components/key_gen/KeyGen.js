import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PassPhrase from "../utils/Passphrase";


import Display from '../utils/BrowserResult'

const openpgp = require("openpgp");

const useStyles = makeStyles((theme) => ({
  formField: {
    width: "350px",
  },
  pwInput: {
    width: "350px",
  },

  main: {
    marginTop: "50px",
  },

  heading: {
    marginTop: "15px",
    marginBottom: "30px",
    textAlign: "left",
  },
  button: {
    margin: "5px",
  },
  // copy: {
  //   marginLeft: "318px",
  // },
  alert: {
    // marginRight: "310px",
    width: "200px",
    height: "10px",
  },
}));

const KeyGen = (props) => {
  const classes = useStyles();
  const [confirmPassPhrase, setConfirmPassPhrase] = useState();
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
      passphrase: passKey, // protects the private key
    });
    setKey(key);
    console.log(Object.keys(key));
    setLoading(false);
  };

  let handleEmailValid = (email) => {
    // don't remember from where i copied this code, but this works.
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      // this is a valid email address
      // call setState({email: email}) to update the email
      // or update the data in redux store.
      return false;
      // setKeyFields({... keyFields, email:email.target.value})
    } else {
      return true;

      // invalid email, maybe show an error to the user.
    }
  };

  const handleName = (e) => {
    setKeyFields({ ...keyFields, name: e.target.value });
  };
  const handleEmail = (e) => {
    setKeyFields({ ...keyFields, email: e.target.value });
  };
  const handlePw = (e) => {
    setKeyFields({ ...keyFields, pw: e.target.value });
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
    console.log(key);
    handleCreate(key);
  };

  const passPhraseConfirmBuffer = (e) => {
    // console.log(e.target.value);
    setConfirmPassPhrase(e.target.value);
  };

  console.log(key);
  return (
    <>
      {typeof key == "undefined" ? (
        <>
          <Typography className={classes.heading} variant="h5" gutterBottom>
            RSA Key Generation
          </Typography>
          <div className={classes.main}>
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <Box mb={3}>
                <TextField
                  required
                  className={classes.formField}
                  id="outlined-required"
                  label="Name"
                  onChange={handleName}
                  error={errors.name}
                  helperText={errors.name && "Text Required!"}
                  // defaultValue="Hello World"
                  variant="outlined"
                />
              </Box>

              <Box mb={3}>
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
                  // defaultValue="Hello World"
                  variant="outlined"
                />
              </Box>
              <Box mb={3}></Box>
              <PassPhrase
                class={classes.pwInput}
                loading={loading}
                mainButtonText={"Generate"}
                modalButtonText={"Submit"}
                handleSubmit={handleFormSubmit}
                handleConfirm={handleConfirm}
              />
            </form>
          </div>
          {/* {typeof key != "undefined" && (
        <div className={classes.result}>
          <pre>{key.privateKeyArmored}</pre>
        </div>
      )} */}
        </>
      ) : (
        <Result encKeys={key} />
      )}
    </>
  );
};


const Result = (props) => {
  const classes = useStyles();

  const [openPub, setOpenPub] = useState(false);
  const [openPriv, setOpenPriv] = useState(false);

  const dlKey = (key,name) => {
    const element = document.createElement("a");
    const file = new Blob([key], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = name+'.txt'
    element.click()
    element.remove()
  };

  let encKeys = props.encKeys;

  return (
    <>
      <Grid container wrap="nowrap" spacing={0}>
        <Grid item></Grid>
        <Grid item xs>
          <Typography className={classes.heading} variant="h5" gutterBottom>
            Key Result
          </Typography>

          <Typography className={classes.heading} variant="h6" gutterBottom>
            Private Key
          </Typography>
          <Box mb={2}>
            <Button
              onClick={() => setOpenPriv(!openPriv)}
              variant="outlined"
              color={"primary"}
              className={classes.button}
            >
              {openPriv ? "Hide" : "In Browser"}
            </Button>
            <Button
              onClick={() => dlKey(encKeys.privateKeyArmored, 'private_key')}
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
          <Typography className={classes.heading} variant="h6" gutterBottom>
            Public Key
          </Typography>
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
              onClick={() => dlKey(encKeys.publicKeyArmored, 'public_key')}
              variant="outlined"
              color={"secondary"}
              className={classes.button}
            >
              Download
            </Button>

            {openPub && (
              <Display val={encKeys.publicKeyArmored} id="publicKey" />
            )}
          </Box>
          <Box></Box>
        </Grid>
      </Grid>
    </>
  );
};
export default KeyGen;