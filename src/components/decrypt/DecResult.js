import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography } from "@material-ui/core";
import Display from "../shared/BrowserResult";
import { mimes } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
  main: {
    padding: theme.spacing(2),

    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(2),
    },
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
      decryptedVal.ext;
    element.click();
    element.remove();
  };

  return (
    <div className={classes.main}>
      <Box pt={2}>
        <Typography variant="h6" gutterBottom>
          Decrypted Data:
        </Typography>

        <Box mb={2} pr={4}>
          <Button
            disabled={disableCopy}
            onClick={() => setOpenEnc(!openEnc)}
            variant="outlined"
            color={"secondary"}
            className={classes.button}
          >
            {!openEnc ? "In Browser" : "Hide"}
          </Button>
          <Button
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
      </Box>
    </div>
  );
};

export default Result;
