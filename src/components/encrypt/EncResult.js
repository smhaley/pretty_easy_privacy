import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Display from "../utils/BrowserResult";

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

  const [openEnc, setOpenEnc] = useState(false);

  let armorTxt = props.armorTxt;
  let disableCopy = armorTxt.armorTxt.length > 10000;

  const outputHandler = (textVal) => {
    const element = document.createElement("a");
    const file = new Blob([textVal.armorTxt], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${element.href.split("/")[3]}_${textVal.ext}_.aes"`;
    element.click();
    element.remove();
  };

  return (
    <div className={classes.main}>
      <Box pt={2}>
        <Typography variant="h6" gutterBottom>
          Encrypted Data:
        </Typography>
        <Box>
          Here are your results.<br/>
           We recommend downloading the file.<br/>
          
            Don't worry, if you prefer working with text yourself, we provide
            that too.{" "}
          <br/>
          <br />
        </Box>
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
