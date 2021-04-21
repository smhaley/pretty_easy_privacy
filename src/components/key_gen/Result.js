import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Display from "../shared/BrowserResult";
import { Box, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
  button: {
    margin: "5px",
  },
}));

const Result = (props) => {
  const classes = useStyles();

  const [openPub, setOpenPub] = useState(false);
  const [openPriv, setOpenPriv] = useState(false);

  const dlKey = (key, name) => {
    const element = document.createElement("a");
    const file = new Blob([key], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = name + ".txt";
    element.click();
    element.remove();
  };

  let encKeys = props.encKeys;

  return (
    <div className={classes.main}>
      <Box>
        <Typography variant="h5" gutterBottom>
          <b> Key Results </b>
        </Typography>
        <br />
        <br />

        <Typography color="primary" variant="h6" gutterBottom>
          Private Key
        </Typography>

        <Box pb={2}>
          <Typography color="error">
            <b>The private key is private. NEVER SHARE YOUR PRIVATE KEY</b>
          </Typography>
          <p>
            Use the private key for decrypting data encrypted with your public
            key.
          </p>
        </Box>
        <Box pb={4}>
          <Button
            onClick={() => setOpenPriv(!openPriv)}
            variant="outlined"
            color={"primary"}
            data-testid="privateKey"
            className={classes.button}
          >
            {openPriv ? "Hide" : "In Browser"}
          </Button>
          <Button
            onClick={() => dlKey(encKeys.privateKeyArmored, "private_key")}
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
        <Typography color="secondary" variant="h6" gutterBottom>
          Public Key
        </Typography>

        <Box pb={2}>
          <p>The public key is public. You could share it with anyone.</p>
          <p>
            The public key encrypts files that only your private key can
            decrypt.
          </p>
        </Box>
        <Box mb={2}>
          <Button
            onClick={() => setOpenPub(!openPub)}
            variant="outlined"
            color={"secondary"}
            data-testid="publicKey"
            className={classes.button}
          >
            {openPub ? "Hide" : "In Browser"}
          </Button>
          <Button
            onClick={() => dlKey(encKeys.publicKeyArmored, "public_key")}
            variant="outlined"
            color={"secondary"}
            className={classes.button}
          >
            Download
          </Button>

          {openPub && <Display val={encKeys.publicKeyArmored} id="publicKey" />}
        </Box>
      </Box>
    </div>
  );
};
export default Result;
