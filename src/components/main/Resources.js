import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import ReactPlayer from "react-player/youtube";

const useStyles = makeStyles((theme) => ({
  image: {
    verticalAlign: "bottom",
  },
  result: {
    height: "180px",
    width: "450px",
    overflowY: "scroll",
  },
  pre: {
    whiteSpace: "pre-wrap",
    wordBreak: "keep-all",
  },
  tryIt: {
    margin: 0,
    padding: 0,
    lineHeight : '20px'
  },
  main: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },

  reactPlayer: {
    paddingTop: "56.25%;", // Percentage ratio for 16:9
    position: "relative", // Set to relative
  },
}));

const Resources = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
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
          <Paper className={classes.result}>
            <pre>
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
          <Box pl={2}>
            <p>
              Head over to <b>Decrypt</b>.
            </p>
            <p>Select <b>Paste my gibberish</b>.</p>
            <p>Select .txt file type.</p>
            <p>
              Enter <b>bad!</b> into the password field.
            </p>
            <p>Hit Decrypt!</p>
            <p>See the result?</p>
          </Box>
          <br />
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
          <p>This gives a good idea without inviting Alice or Bob</p>
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
    </div>
  );
};

export default Resources;
