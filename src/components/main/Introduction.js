import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import signal from "../imgs/signal.png";
import openpgpjs50 from "../imgs/openpgpjs50.png";
import whatsapp from "../imgs/whatsapp.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import Link from "@material-ui/core/Link";


const useStyles = makeStyles((theme) => ({

  image: {
    verticalAlign: "bottom",
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
        </Box>
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            Yeah, it's that easy.
          </Typography>
          <p>
            Pretty Easy Privacy (PEP) is a service for encrypting data. That's
            it.
          </p>
          <p>
            Have a file you want to securely store on you machine or Google
            Drive? PEP makes passphrase protecting files and text simple.
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
            At it's core, PEP offers three simple input forms: encryption, decryption, and key generation.
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
            PEP is a simple and very effective way to passphrase (or key)
            encrypt your information.
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
                <img src={signal} alt='Signal'/>
              </a>{" "}
              <a href={"https://www.whatsapp.com/"}>
                <img src={whatsapp} alt='Whatsapp'/>
              </a>
            </div>
          </Box>
          <br />
          <Typography variant="h6" gutterBottom>
            Wait, why should I trust you with my data?
          </Typography>
          <p>Please don't trust us.</p>
          <p>
            The site is statically hosted entirely on github.
            <b> No data is being transferred from your device to a server. </b>
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
          <p>So why not just use these to handle encryption?</p>
          <p>
            They are cumbersome and lack a user interface. However, they will
            decrypt your data for you should this site disappear.
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
              A few technical details.
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
            <p>Asymmetric encryption is also handled via openPGP.js</p>
            <p>
              Currently all asymmetric keys generated are RSA 4096 bits. If
              additional encryption algorithms or bit lengths are needed, drop a
              line in github. We can add them in real quick.
            </p>
            <p>
              And yes, we know there is no key signing. For messaging and
              communication we strongly encourage some of the apps noted above.
            </p>
            <br />
            <Typography variant="h6" gutterBottom>
              Encryption powered by
              <Link href="https://openpgpjs.org/">
                <img className={classes.image} src={openpgpjs50} alt='OpenPGP.JS'></img>
              </Link>
            </Typography>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Introduction;
