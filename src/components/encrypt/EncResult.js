import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Display from "../utils/BrowserResult";
import FormHelperText from "@material-ui/core/FormHelperText";

//todo disbale in browser if 'larger'

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: "15px",
    marginBottom: "30px",
    textAlign: "left",
  },
  result: {
    // marginTop: '200px',
    height: "100px",
    width: "350px",
    overflowY: "scroll",
  },
  paper: {
    height: "100px",
    width: "350px",
  },
  button: {
    margin: "5px",
  },
}));

//id, armorTxt

const Result = (props) => {
  const classes = useStyles();

  const [openEnc, setOpenEnc] = useState(false);

  let armorTxt = props.armorTxt;
  let disableCopy = armorTxt.armorTxt.length > 10000;

  const outputHandler = (textVal) => {
    const element = document.createElement("a");
    const file = new Blob([textVal.armorTxt], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download =
      `${element.href.split("/")[3]}_${textVal.ext}_.aes"`;
    element.click();
    element.remove();
  };

  return (
    <Grid container wrap="nowrap" spacing={0}>
      <Grid item></Grid>
      <Grid item xs>
        <Typography className={classes.heading} variant="h6" gutterBottom>
          Retrieve Encrypted Data
        </Typography>
        <Box mb={2}>
          <Button
            disabled={disableCopy}
            onClick={() => setOpenEnc(!openEnc)}
            variant="outlined"
            color={"secondary"}
            className={classes.button}
          >
            In Browser
          </Button>

          <Button
            onClick={() => outputHandler(armorTxt)}
            variant="outlined"
            color={"secondary"}
            className={classes.button}
          >
            Download
          </Button>
          {disableCopy && (
            <FormHelperText style={{ paddingLeft: "8px" }}>
              Result too Large
            </FormHelperText>
          )}
          {openEnc && <Display val={armorTxt.armorTxt} id="encryptedResult" />}
        </Box>
        {/* <Paper className={classes.paper}>
        <div className={classes.result}>
          <pre id={'test'}>{props.armorTxt}</pre>
        </div>
      </Paper> */}
        <Box>
          <Button
            onClick={props.reset}
            variant="contained"
            className={classes.button}
            color={"primary"}
          >
            {" "}
            New Encryption{" "}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Result;
