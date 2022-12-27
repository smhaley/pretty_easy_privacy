import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Link,
  Tooltip,
  Paper,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import ReactPlayer from "react-player/youtube";
import { Link as RouterLink } from "react-router-dom";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { copy } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
  image: {
    verticalAlign: "bottom",
  },
  result: {
    padding: "10px",
  },
  pre: {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  tryIt: {
    margin: 0,
    padding: 0,
    lineHeight: "20px",
  },
  reactPlayer: {
    paddingTop: "56.25%;", // Percentage ratio for 16:9
    position: "relative", // Set to relative
  },
  copy: {
    textAlign: "right",
  },
}));

const Resources = () => {
  const classes = useStyles();
  const [openSnack, setOpenSnack] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "left",
  });
  const { vertical, horizontal, open } = openSnack;
  let inputId = "sampleEnc";

  const handleClose = () => {
    setOpenSnack({ ...openSnack, open: false });
  };
  const handleCopy = () => {
    setOpenSnack({ ...openSnack, open: true });
    copy(inputId);
  };

  return (
    <>
      <Box pt={2}>
        <Box pl={2} pr={2} pb={2}>
          <Typography variant="h5" gutterBottom>
            <b>Just a few resources</b>
          </Typography>
        </Box>
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            So what does encrypted data look like?
          </Typography>
          <p>Here is an example:</p>
          <div className={classes.copy}>
            <Tooltip title="Copy">
              <IconButton aria-label="Copy" onClick={handleCopy}>
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
          </div>
          <Paper className={classes.result}>
            <pre className={classes.pre} id={inputId}>
              {`-----BEGIN PGP MESSAGE-----
Version: OpenPGP.js v4.10.8
Comment: https://openpgpjs.org

wy4ECQMIO1ERG1WRJ1Tgkrf8eCpDp2FqVLCZJ3rFO7Th6uZHVDM0POrulLas
h8WB0ksBI6AFxdv/TcM9MIY6YNMzTjYUO/+OPnrVC14DihZxnbp75lwWvAQW
zKsgySAxAIcWhmRG6/EY3wg63MOluAIgqxNn27Y0+nOeHdY=
=Id/5
-----END PGP MESSAGE-----`}
            </pre>
          </Paper>
          <br />
          <Typography>Try it out!</Typography>

          <ol>
            <li>Copy the above text block.</li>
            <li>
              Head over to
              <Link component={RouterLink} to={"/decrypt"}>
                <b>Decrypt</b>
              </Link>
            </li>
            <li>
              Select <b>Paste my data</b>.
            </li>
            <li>
              Select <b>.txt</b> file type.
            </li>
            <li>
              Enter <b>bad!</b> into the password field.
            </li>
            <li>Hit Decrypt!</li>
            <li>See the result?</li>
          </ol>

          <Typography variant="h6" gutterBottom>
            How does AES 256 work exactly?
          </Typography>
          <p>There are tons of resources. Here is a nice place to start.</p>
          <div className={classes.playerWrapper}>
            <ReactPlayer
              className="react-player"
              url="https://www.youtube.com/watch?v=O4xNJsjtN6E"
              width="100%"
            />
          </div>
          <br />
          <br />
          <Typography variant="h6" gutterBottom>
            How about that Asymmetric thing?
          </Typography>
          <p>This gives a good idea without inviting Alice or Bob.</p>
          <div className={classes.playerWrapper}>
            <ReactPlayer
              className="react-player"
              url="https://www.youtube.com/watch?v=GSIDS_lvRv4"
              width="100%"
            />
          </div>
          <br />
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Copied to clipboard"
        key={vertical + horizontal}
      />
    </>
  );
};

export default Resources;
