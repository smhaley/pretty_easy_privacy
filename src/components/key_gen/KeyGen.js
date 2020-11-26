import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const openpgp = require("openpgp");

const useStyles = makeStyles((theme) => ({
  formField: {
    width: "350px",

  },

}));


const KeyGen = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [key, setKey] = useState();
  const [confirmPassPhrase, setConfirmPassPhrase] = useState();
  const [keyFields, setKeyFields] = useState({name:'', email:'', pw:''})
  const [errors, setErrors] = useState({name:false, emailNull:false, emailFormat:false, pwNull:false})
  const [strength, setStrength] = useState({ score: null, resp: null });

  let strengthResp = {
    0: "Very Bad 👎",
    1: "Bad 👎",
    2: "Weak 😐",
    3: "Good 🙂",
    4: "Strong 🔥🔥🔥",
  };



  const handleCreate = async () => {
    // (async () => {
    const key = await openpgp.generateKey({
      userIds: [{ name: keyFields.name, email: keyFields.email }],
      rsaBits: 4096, // RSA key size
      passphrase: "super long and hard to guess secret", // protects the private key
    });
    setKey(key);
    console.log(Object.keys(key));
  };

  let handleOnChange = (email) => {
    // don't remember from where i copied this code, but this works.
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email.target.value)) {
      // this is a valid email address
      // call setState({email: email}) to update the email
      // or update the data in redux store.
      console.log('valid')
    } else {
      console.log('invalid')
      // invalid email, maybe show an error to the user.
    }
  };
  
  const handleName = (e) => {setKeyFields({... keyFields, name:e.target.value})}
  const handleEmail = (e) => {setKeyFields({... keyFields, email:e.target.value})}
  const handlePw = (e) => {setKeyFields({... keyFields, pw:e.target.value})}

  const handleSubmit = () => {
    let nameNull, emailNull, pwNull = false 
    if (keyFields.name===''){
      nameNull=true
    }
    if (keyFields.email===''){
      emailNull=true
    }
    if (keyFields.pw===''){
      pwNull=true
    }
    setErrors({...errors, name:nameNull, emailNull:emailNull, pwNull:pwNull})
  }



  const passPhraseConfirmBuffer = (e) => {
    // console.log(e.target.value);
    setConfirmPassPhrase(e.target.value);
  };

  // const handleConfirm = () => {
  //   // console.log(inputTypeSelect);
  //   console.log(confirmPassPhrase, passPhrase);
  //   if (confirmPassPhrase === passPhrase) {
  //     console.log("confirmed");

  //     setOpen(false);
  //     props.handleEncrypt(passPhrase);
  //   } else {
  //     setConfirmError(true);
  //   }
  // };
  //     let output;
  //  if  (key.privateKeyArmored !== 'undefined'){
  //         output  =  <div>
  //           <pre>
  //            {key.privateKeyArmored}
  //           </pre>
  //         </div>}
  // }

  //   <div>
  //   <pre>
  //     {key.publicKeyArmored}
  //   </pre>
  // </div>
  return (
    <>
      <div>
        <Box mb={3}>
          <TextField
            required
            className={classes.formField}
            id="outlined-required"
            label="Name"
            onChange={handleName}
            error = {errors.name}
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
            error={errors.emailNull}
            helperText={errors.emailNull && "Text Required!"}
            // defaultValue="Hello World"
            variant="outlined"
          />
        </Box>
        <Box mb={3}>
        <TextField
          className={classes.formField}
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={handlePw}
          error={errors.pwNull}
          helperText={errors.pwNull && "PassPhrase Required!"}
          autoComplete="current-password"
          variant="outlined"
        />
        </Box>
      </div>

      <Box>
        <Button variant="contained" color={"primary"} onClick={handleSubmit}>
          Generate
        </Button>
      </Box>

      {/* <PassPhraseConfirm
        open={open}
        buttonText={'Encrypt'}
        handleClose={() => setOpen(false)}
        handleConfirm={handleConfirm}
        passPhraseConfirmBuffer={passPhraseConfirmBuffer}
        confirmError={confirmError}
      /> */}
      {/* {output} */}
      {/* "key", "privateKeyArmored", "publicKeyArmored", "revocationCertificate" ] */}
      {
        typeof key != "undefined" && (
          <div>
            <pre>{key.privateKeyArmored}</pre>
          </div>
        )
        //   <div>
        //   <pre>
        //     {key.publicKeyArmored}
        //   </pre>
        // </div>
      }
    </>
  );
};

export default KeyGen;
