import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import { colors } from "@material-ui/core";

const openpgp = require("openpgp");

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: "15px",
    marginBottom: "30px",

    textAlign: "left",
  },
  button: {
    width: "100px",
  },
}));

const TextInput = (props) => {
  const classes = useStyles();

  const [aesInput, aesInputState] = useState();
  const [passPhrase, passPhraseState] = useState();
  const [output, outputState] = useState();

  const handleInput = (e) => {
    aesInputState(e.target.value);
  };

  const handlePassPhrase = (e) => {
    passPhraseState(e.target.value);
  };

  let inLineAesSubmit = (e) => {
    e.preventDefault();
    console.log("text");

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

  const downloadHandler = () => {
    console.log('insdie')
    console.log(output)
    const element = document.createElement("a");
    const file = new Blob([output], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "test.txt.gpg";
    document.body.appendChild(element);
    element.click();
  };

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
  return (
    <Grid container wrap="nowrap" spacing={0}>
      <Grid item></Grid>
      <Grid item xs>
        <Typography className={classes.heading} variant="h5" gutterBottom>
          In-Line Pass Phrase
        </Typography>

        <form onSubmit={inLineAesSubmit}>
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
          <Button className={classes.button} type="submit" variant="contained">
            Default
          </Button>
          <Button className={classes.button} onClick = {downloadHandler} variant="contained">
            download
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default TextInput;
