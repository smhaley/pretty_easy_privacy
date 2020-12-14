import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import ReactPlayer from "react-player/youtube";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "200px",
    width: "350px",
  },
  image: {
    verticalAlign: "bottom",
  },
  result: {
    height: "200px",
    width: "350px",
    overflowY: "scroll",
  },
  pre: {
    // fontSize: "inherit",
    // color: "inherit",
    // border: "initial",
    // padding: "initial",
    // fontFamily: "inherit",
    whiteSpace: "pre-wrap",
    wordBreak: "keep-all",
  },

  pw: {
    color: "#777fa7",
    marginTop: "18px",
  },
  textBox: {
    maxWidth: "700px",
  },
  technical: {
    backgroundColor: "#FAFAFA",
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
          <Paper className={classes.paper}>
            <div className={classes.result}>
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
            </div>
          </Paper>

          <p>Try it out!</p>
          <p>
            Head over to <b>Decrypt</b> Select text input. Select .txt file
            type. Enter 'bad!' into the password field.
          </p>
          <p>See the result?</p>
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
        <div className={classes.technical}>
          <Box p={2}>
            <Typography variant="h6" gutterBottom>
              Getting Fancy with Asymmetry (this is definitely optional)
            </Typography>
            <p>
              We do offer asymmetric encryption decryption and key generation.
            </p>
            <p>
              First, head over to <b>Help</b> and learn a bit about how this
              works.
            </p>
            <p>Alright, got it? Good.</p>
            <br />
            <Typography variant="h6" gutterBottom>
              Do I need to go the hardware store for a key?
            </Typography>
            <p>
              Of course not! We will give you 4096 bit RSA key for free! Just
              head over to <b>Key Generation</b> and fill out that simple form.
              That's it!
            </p>
            <p>
              Use any name or email address you want. Remember, this data
              doesn't come back to us, everything is in your browser.
            </p>
            <p>
              The passphrase is how you can access your private key later for
              decryption.
            </p>
            <p>You will get two keys. One public and one private.</p>
            <p>
              You can give out the public key to your friends. It can be used to
              encrypt files{" "}
              <b>only your private key and passphrase can decrypt</b>.
            </p>
            <span style={{ color: "red" }}>
              <b>NEVER GIVE OUT YOUR PRIVATE KEY!</b>
            </span>
            <p>
              This is used only by you to decrypt files encrypted with your
              public key.
            </p>
            <br />
            <Typography variant="h6" gutterBottom>
              Encrypt (version 2)
            </Typography>
            <p>
              Head to the <b>Encrypt</b> section. On the top, select Asymmetric.
            </p>
            <p>
              Now you should be good to go. THe only difference from symmetric
              encryption is you simply input or upload a public key.
            </p>
            <p>Seriously. That's the only difference.</p>
            <br />
            <Typography variant="h6" gutterBottom>
              Decrypt the asymmetric variant.
            </Typography>
            <p>
              Remember that top selector we mentioned for asymmetric encrytion?
              Same deal of decrytpion.
            </p>
            <p>
              Just fill out the form, let us know what format you expect the
              file is (text, csv, or literally anyting else). Upload or enter
              your <b>private key</b> and affiliated passphrase.
            </p>
            <p>That's all there is to it.</p>
            <br />
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Resources;
