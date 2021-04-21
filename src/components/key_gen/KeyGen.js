import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PassPhrase from "../shared/Passphrase";
import HelpIcon from "@material-ui/icons/Help";
import Result from './Result'
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Grid,
} from "@material-ui/core";
import { generateKey } from "openpgp";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "350px",
    [theme.breakpoints.down(600 + theme.spacing(3) * 2)]: {
      maxWidth: "225px",
    },
  },
  formField: {
    width: "100%",
  },
  pwInput: {
    maxWidth: "225px",
  },
  dropSelect: {
    maxWidth: "241px",
    [theme.breakpoints.down(600 + theme.spacing(3) * 2)]: {
      maxWidth: "170px",
    },
  },
  formControl: { width: "100%" },
  
  main: {

    marginLeft: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },

}));

const KeyGen = () => {
  const classes = useStyles();
  const [key, setKey] = useState(undefined);
  const [bits, setBits] = useState(2048);
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
    const key = await generateKey({
      userIds: [{ name: keyFields.name, email: keyFields.email }],
      rsaBits: bits, // RSA key size
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
    <Box>
      {typeof key == "undefined" ? (
        <>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <div className={classes.main}>
              <Typography variant="h5" gutterBottom>
                <b> RSA Key Generation</b>
              </Typography>
              <Box pb={4} pt={2}>
                Creating Keys is simple. Just fill out this form.
                <br />
                No worries if you don't want to use your name or email address.
                Just make one up!
                <br />
                <br />
                <b>Just don't lose you Private Key and Passphrase!</b>
              </Box>
              <div className={classes.form}>
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

                <Box pb={4}>
                  {" "}
                  <TextField
                    required
                    className={classes.formField}
                    id="outlined-disabled"
                    label="email"
                    onChange={handleEmail}
                    error={errors.emailNull || errors.emailFormat}
                    helperText={
                      (errors.emailNull || errors.emailFormat) &&
                      errors.emMessage
                    }
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item container className={classes.dropSelect}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        error={errors.fileTypeErr ? true : false}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          RSA Key Size
                        </InputLabel>
                        <Select
                          required
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={bits}
                          onChange={(e) => setBits(e.target.value)}
                          label="Text FIle Type"
                        >
                          <MenuItem value={4096}>4096</MenuItem>
                          <MenuItem value={3072}>3072</MenuItem>
                          <MenuItem value={2048}>2048</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <div>
                        <Tooltip
                          title={`This controls key length. The larger the value, the stronger the encryption. The default is pretty good.`}
                        >
                          <IconButton
                            disableFocusRipple={true}
                            disableRipple={true}
                          >
                            <HelpIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={3}>
                  <PassPhrase
                    class={classes.pwInput}
                    loading={loading}
                    mainButtonText={"Generate"}
                    modalButtonText={"Submit"}
                    handleSubmit={handleFormSubmit}
                    handleConfirm={handleConfirm}
                  />
                </Box>
              </div>
            </div>
          </form>
        </>
      ) : (
        <Result encKeys={key} />
      )}
    </Box>
  );
};

export default KeyGen;
