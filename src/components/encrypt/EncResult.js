import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography } from "@material-ui/core";
import Display from "../shared/BrowserResult";
import { useCommonStyles } from "../commonStyles";

const useStyles = makeStyles((theme) => ({
  main: {
    padding: theme.spacing(2),

    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(2),
    },
  },

  result: {
    maxHeight: "100px",
    maxWidth: "350px",
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
  const commonClasses = useCommonStyles();

  const [openEnc, setOpenEnc] = useState(false);

  let armorTxt = props.armorTxt;
  let disableCopy = armorTxt.armorTxt.length > 10000;

  const outputHandler = (textVal) => {
    const element = document.createElement("a");
    const file = new Blob([textVal.armorTxt], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${element.href.split("/")[3]}.asc`;
    element.click();
    element.remove();
  };

  return (
    <div className={classes.main}>
      <Box pt={2}>
        <Typography
          className={commonClasses.resultH3}
          variant="h3"
          gutterBottom
        >
          Encrypted Data:
        </Typography>
        <Box m={1}>
          Your encrypted data is below
          <br />
          It is recommended to download the file.
          <br />
        </Box>
        <Box mb={2} mt={5} pr={4}>
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
            onClick={() => outputHandler(armorTxt)}
            variant="outlined"
            color={"secondary"}
            className={classes.button}
          >
            Download
          </Button>
          {openEnc && <Display val={armorTxt.armorTxt} id="encryptedResult" />}
        </Box>
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
      </Box>
    </div>
  );
};

export default Result;
