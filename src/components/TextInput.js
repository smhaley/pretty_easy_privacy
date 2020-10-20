import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PassPhraseConfirm from "./PassPhraseConfirm"


const openpgp = require("openpgp");

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: "15px",
    marginBottom: "30px",
    textAlign: "left",
  },
}));

const TextInput = (props) => {
  const classes = useStyles();

  const [aesInput, aesInputState] = useState();
  const [passPhrase, passPhraseState] = useState();
  const [output, outputState] = useState();
  const [open, setOpen] = useState(false);
  const [passPhrase, setPassPhrase] = React.useState();

  const handleInput = (e) => {
    aesInputState(e.target.value);
  };

  const handlePassPhrase = (e) => {
    passPhraseState(e.target.value);
  };

  let inLineAesSubmit = () => {


    (async () => {
      const { message } = await openpgp.encrypt({
        message: openpgp.message.fromText(aesInput),
        passwords: [passPhrase],
        armor: false,
      });

      outputState(message.armor());
      console.log(output);
    })();
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true)

  }

  const downloadHandler = () => {
    const element = document.createElement("a");
    const file = new Blob([output], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "test.txt.gpg";//make random name
    document.body.appendChild(element);
    element.click();
  };

  let handleClose = () =>{setOpen(false)}

  const handleConfirm = (passPhraseConfirm) => {
    if (passPhraseConfirm===passPhrase){
      inLineAesSubmit()
      setOpen(false)
    }
  }

  const passPhraseConfirmBuffer = (e) => {
    setPassPhrase(e.target.value)
    console.log(e.target.value)
}



  console.log(passPhrase)
  
  return (
    <Grid container wrap="nowrap" spacing={0}>
      <Grid item></Grid>
      <Grid item xs>
        <Typography className={classes.heading} variant="h5" gutterBottom>
          In-Line Pass Phrase
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              onChange={handlePassPhrase}
              className={classes.pwText}
              id="pw-in"
              label="Pass Phrase"
              variant="outlined"
            />
          </Box>
          <Box mb={2} mr={2}>
            <TextField
              className={classes.textBox}
              fullWidth={true}
              id="outlined-multiline-static"
              label="AES 256"
              multiline
              rows={10}
              onChange={handleInput}
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <Button
              type="submit"
              variant="contained"
            >
              Encrypt
            </Button>
          </Box>
          <Box>
            <Button
              onClick={downloadHandler}
              variant="contained"
            >
              Download
            </Button>
          </Box>
          <PassPhraseConfirm
          open = {open}
          handleClose = {handleClose}
          handleConfirm = {handleConfirm}
          passPhraseConfirmBuffer = {passPhraseConfirmBuffer}
          />
        </form>
        
      </Grid>
    </Grid>
  );
};

export default TextInput;


// working
  // (async () => {
  //   const { message } = await openpgp.encrypt({
  //     message: openpgp.message.fromBinary(new Uint8Array([0x01, 0x01, 0x01])), // input as Message object
  //     passwords: ["secret stuff"], // multiple passwords possible
  //     armor: false, // don't ASCII armor (for Uint8Array output)
  //   });

  //   console.log(message.armor());
  // })();
  // working end

  // console.log(new TextDecoder().decode(unitEight));
  // console.log(new TextDecoder("utf-8").decode(message.packets['1'].encrypted));
  // const encrypted = message.packets.write(); // get raw encrypted packets as Uint8Array
  // console.log(encrypted)
  // const { data: decrypted } = await openpgp.decrypt({
  //     message: await openpgp.message.read(encrypted), // parse encrypted bytes
  //     passwords: ['secret stuff'],                    // decrypt with password
  //     format: 'utf8'                                // output as Uint8Array
  // });
  // console.log(decrypted); // Uint8Array([0x01, 0x01, 0x01])

  // dddddddddddddd

  // let handleSubmit = () => {console.log('submit')}
  // console.log(passPhrase);
  // output

  // var fileName = "myfile.txt";
  // var fileContent = "My file content...";
  // var myFile = new Blob([fileContent], { type: "text/plain" });

  // console.log(myFile);
  // console.log("myFile");
  // console.log(output)