import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import signal from "../imgs/signal.png";
import openpgpjs50 from "../imgs/openpgpjs50.png";
import whatsapp from "../imgs/whatsapp.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import Link from "@material-ui/core/Link";
import ReactPlayer from "react-player/youtube";

const useStyles = makeStyles((theme) => ({
  pwMeter: {
    width: "225px",
  },
  image: {
    verticalAlign: "bottom",
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

const GetStarted = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Box pt={2}>
        <Box pl={2} pr={2} pb={2}>
          <Typography variant="h5" gutterBottom>
            <b>Getting Started</b>
          </Typography>
        </Box>
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            Just a couple things.
          </Typography>
          <p>
            The format of the encrypted result <b>matters</b>.
          </p>
          <p>
            In general,{" "}
            <b>
              we recommend downloading the encrypted file on the Result page.
            </b>
          </p>
          <p>
            Sure, change the silly name. We just encourage leaving the contents
            of the file alone. This will keep decryption seemless.
          </p>
          <p>
            <b>
              The top section refers to passphrase Encrypted files. We
              recommend starting here.
            </b>
          </p>
          <p>This just means that top green tab should be toggled to <b>Passphrase</b>, cause that's what we are encrypting with! </p>
          <br />
          <Typography variant="h6" gutterBottom>
            Let's Encrypt!
          </Typography>
          <p>
            Head on over the the Encrypt section. Once there simply type in some
            text or upload a file.
          </p>
          <p>
            Toss in a{" "}
            <Link
              href="https://www.youtube.com/watch?v=7U-RbOKanYs"
              color="primary"
            >
              really strong password
            </Link>
          </p>
          <p>Hit encrypt. Done.</p>
          <p>
            Either copy the output or download the file result and stash in your
            favorite place. Public free cloud? DOn't worry, Google wont be able
            to creep on this.
          </p>
          <br />
          <Typography variant="h6" gutterBottom>
            We can't forget about decryption.
          </Typography>
          <p>
            What goes in must come out! So with your file of encrypted gibberish
            head on over the <b>Decrypt</b>.
          </p>

          <p>
            Dealer's choice, paste in the contents of your file of directly
            upload it. Just remember, format does matter.
          </p>
          <p>One. Extra. Step.</p>
          <p>
            Select the file type you expect. We kept it simple, text, csv, or
            everything else.
          </p>
          <p>
            If you can't remember just select <b>Something Else</b>.
          </p>
          <p>Enter you passphrase. Done.</p>
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

export default GetStarted;
