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

const Introduction = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Box pt={2}>
        <Box pl={2} pr={2} pb={2}>
          <Typography variant="h5" gutterBottom>
            <b>Pretty Easy Privacy</b>
          </Typography>

          <Typography variant="h6" gutterBottom>
            Encrytion powered by
            <Link href="https://openpgpjs.org/">
                <img className={classes.image} src={openpgpjs50}></img>
            </Link>
          </Typography>
        </Box>
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            Yeah, it's that easy.
          </Typography>
          <p>
            Pretty Easy Privacy (PEP) is a simple service for encrypting data.
            That's it.
          </p>
          <p>
            Have a file you want to securly store on you machine or Google
            Drive? PEP make passphrase protecting files and text simple.
          </p>
          <br />

          <Typography variant="h6" gutterBottom>
            But, how?
          </Typography>
          <p>
            PEP gives you the power of{" "}
            <Link href="https://www.openpgp.org/" color="primary">
              OpenPGP
            </Link>{" "}
            without the headache. Don't know what that means? Trust us, it's a
            headache.
          </p>
          <p>
            At it's core, PEP offers three simple input forms: Passphrase file
            encryption, Asymetric file encryption, and Key Generation.
          </p>
          <br />
          <Typography variant="h6" gutterBottom>
            No, we aren't a messaging service.
          </Typography>
          <p>
            The focus of PEP is file and object security. We take the strength
            of PGP encryption, but leave out the flaws of the{" "}
            <Link
              href="https://inversegravity.net/2019/web-of-trust-dead/"
              color="primary"
            >
              web of trust
            </Link>
            .
          </p>
          <p>
            PEP is a simple and very effective way to passphrase (or key
            protect) your information.{" "}
          </p>

          <p>
            PEP doesn't try to be a messaging service. For messaging we
            recommend sticking to applications using the{" "}
            <Link href="https://signal.org/docs/" color="primary">
              signal protocal
            </Link>{" "}
            like:
          </p>
          <Box ml={2}>
            <div>
              <a href={"https://www.signal.org/"}>
                <img src={signal} />
              </a>{" "}
              <a href={"https://www.whatsapp.com/"}>
                <img src={whatsapp} />
              </a>
            </div>
          </Box>
          <br />
          <Typography variant="h6" gutterBottom>
            Wait, why should I trust you with my data?
          </Typography>
          <p>Please don't trust us.</p>
          <p>
            The site is staticly hosted entirly on github.
            <b> No data is being transfered from your device to a server. </b>
          </p>
          <p>More simply, the ✨ happens right in your browser!</p>
          <p>
            <Link
              href="https://github.com/shawnh87/pretty_easy_privacy"
              color="primary"
            >
              <GitHubIcon style={{ fontSize: 18 }} color="disabled" /> Check the
              source!
            </Link>
          </p>
          <br />

          <Typography variant="h6" gutterBottom>
            Can I recover my data if this site goes away?
          </Typography>
          <p>Yes.</p>
          <p>
            Since PEP uses OpenPGPJS, most OpenPGP derivatives should be able to
            decrypt your files.
          </p>
          <p>
            A few examples are: <b>Gpg4win</b> for windows, <b>Mac GPG</b> for
            mac, or just plain <b>GnuPG</b> for linux distros.
          </p>
          <p>
            So why not just use these to handle encryption? They are cumbersome
            and lack a user interface. However, the will get your data for you
            if this site were to disapear.
          </p>

          <p>
            For more information you can check out:{" "}
            <Link href="https://gnupg.org/download/" color="primary">
              gnupg.org
            </Link>
          </p>
          <br />
        </Box>
        <div className={classes.technical}>
          <Box p={2}>
            <Typography variant="h6" gutterBottom>
              A little technical mumbo Jumbo.
            </Typography>
            <p>
              At the moment all symmetric passphrase encryption with PEP uses
              AES 256 encryption via{" "}
              <Link href="https://openpgpjs.org/" color="primary">
                {" "}
                <b>openPGP.JS</b>
              </Link>
              .
            </p>
            <p>Assymetric encryption is also handled via openPGP.js</p>
            <p>
              Currently all asymetric keys generated are RSA 4096 bits. If
              additional encryption algoritms or bit lengths are needed, drop a
              line in github. We can add them in real quick.
            </p>
            <p>
              And yes, we know there is no key signing. For messaging and
              communication we strongly encourage some of the app noted above.
            </p>
            <br />
            <Typography variant="h6" gutterBottom>
              AES 256, how strong is that?
            </Typography>
            <p>
              Really strong. Really, really strong. Unless your passphrase isn't
              very good.
            </p>
            <div className={classes.playerWrapper}>
              <ReactPlayer
                className="react-player"
                url="https://www.youtube.com/watch?v=S9JGmA5_unY"
                width="100%"
              />
              <p></p>
            </div>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Introduction;
