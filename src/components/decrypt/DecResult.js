import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Display from "../utils/BrowserResult";
import { mimes } from "../utils/utils";
import FormHelperText from "@material-ui/core/FormHelperText";
import Tooltip from "@material-ui/core/Tooltip";

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

const Result = (props) => {
  const classes = useStyles();

  let outbound = props.outbound;

  const [openEnc, setOpenEnc] = useState(false);

  let disableCopy =
    outbound.outbound.length > 10000 || outbound.type === "byte";

  const outputHandler = (decryptedVal) => {
    const element = document.createElement("a");
    let file;
    if (outbound.type === "byte") {
      file = new Blob([decryptedVal.outbound]);
    } else {
      file = new Blob([decryptedVal.outbound], {
        type: mimes[decryptedVal.ext],
      });
    }
    element.href = URL.createObjectURL(file);
    element.download =
      "pep_output_" +
      element.href.split("/")[3].split("-")[0] +
      "." +
      decryptedVal.ext; //make random name
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
          {disableCopy && (
            <FormHelperText style={{ paddingLeft: "8px" }}>
              Result too Large
            </FormHelperText>
          )}
          <Button
            // onClick={() => props.outputTag.click()}
            onClick={() => outputHandler(outbound)}
            variant="outlined"
            color={"secondary"}
            className={classes.button}
          >
            Download
          </Button>
          {openEnc && <Display val={outbound.outbound} id="encryptedResult" />}
        </Box>
        <Box>
          <Button
            onClick={props.reset}
            variant="contained"
            className={classes.button}
            color={"primary"}
          >
            {" "}
            New Decryption{" "}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Result;
