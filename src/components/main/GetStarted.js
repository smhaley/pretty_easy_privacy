import React from "react";
import { Typography, Box, Link, Divider } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useCommonStyles } from "../commonStyles";

const GetStarted = () => {
  const commonClasses = useCommonStyles();
  return (
    <Box p={3}>
      <Box pl={2} pr={2} pb={2}>
        <Typography variant="h1" gutterBottom className={commonClasses.heading}>
          Getting Started
        </Typography>
      </Box>
      <Box p={2}>
        <Typography
          variant="h2"
          className={commonClasses.subHeadingBold}
          gutterBottom
        >
          Just a couple things...
        </Typography>
        <br />
        <Typography color="secondary">
          <b>
            If you're just starting out, we recommend that you stick with
            Passphrase Encryption.
          </b>
        </Typography>
        <p>
          The format of the encrypted result <b>matters</b> for decryption.
        </p>
        <p>
          In general,{" "}
          <b>we recommend downloading the encrypted file on the Result page.</b>
        </p>
        <p>
          Sure, change the silly name. We just encourage leaving the contents of
          the file alone. This will keep decryption seamless.
        </p>

        <br />
        <Typography
          variant="h2"
          className={commonClasses.subHeadingBold}
          gutterBottom
        >
          Passphrase Encryption
        </Typography>
        <Divider />
        <br />
        <Typography
          variant="h2"
          className={commonClasses.subHeadingBold}
          gutterBottom
        >
          Encrypting with a passphrase (Start here)
        </Typography>
        <p>
          Head on over the the{" "}
          <Link component={RouterLink} to={"/encrypt"}>
            <b>Encrypt</b>
          </Link>{" "}
          section. Once there simply type in some text or upload a file.
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
          Either copy the output or download the file result and stash it in
          your favorite place. Free public cloud? Don't worry, Google wont be
          able to creep on this.
        </p>
        <br />
        <Typography
          variant="h2"
          className={commonClasses.subHeadingBold}
          gutterBottom
        >
          We can't forget about decryption.
        </Typography>
        <p>
          What goes in must come out! So with your file of encrypted data head
          on over the{" "}
          <Link component={RouterLink} to={"/decrypt"}>
            <b>Decrypt</b>
          </Link>{" "}
          section.
        </p>

        <p>
          Dealer's choice, paste in the contents of your file or directly
          upload. Just remember, format does matter.
        </p>
        <p>One. Extra. Step.</p>
        <p>
          Select the file type you expect. We kept it simple: text, csv, or
          everything else.
        </p>
        <p>
          If you can't remember just select <b>Something Else</b>.
        </p>
        <p>Enter your passphrase. Done.</p>

        <Typography color="secondary">
          <b>That's everything you need to passphrase encrypt your data!</b> 🎉
        </Typography>
        <br />
        <br />
        <Typography
          variant="h2"
          className={commonClasses.subHeadingBold}
          gutterBottom
        >
          Key Based Encryption
        </Typography>
        <Divider />
        <br />
        <Typography
          variant="h2"
          className={commonClasses.subHeadingBold}
          gutterBottom
        >
          What's this thing about keys?
        </Typography>
        <p>
          Keys, or key pairs are just an alternative method to using a
          passphrase. Like we mentioned above, at first you should just stick
          with passphrase encryption.
        </p>
        <p>
          Check the{" "}
          <Link component={RouterLink} to={"/resources"}>
            <b>Resources</b>
          </Link>{" "}
          section for more info on how asymmetric encryption works.
        </p>
        <p>If you think it's right for you, check out below.</p>
        <br />
        <Typography
          variant="h2"
          className={commonClasses.subHeadingBold}
          gutterBottom
        >
          Getting Fancy with Asymmetry (this is definitely optional)
        </Typography>
        <p>We do offer asymmetric encryption decryption and key generation.</p>
        <p>
          First, head over to{" "}
          <Link component={RouterLink} to={"/resources"}>
            <b>Resources</b>
          </Link>{" "}
          and learn a bit about how this works.
        </p>
        <p>Alright, got it? Good.</p>
        <br />
        <Typography
          variant="h2"
          className={commonClasses.subHeadingBold}
          gutterBottom
        >
          Do I need to go the hardware store?
        </Typography>
        <p>
          Of course not! We will give you an RSA key for free! Visit{" "}
          <Link component={RouterLink} to={"/keygen"}>
            <b>Key Generation</b>
          </Link>{" "}
          and fill out the form. That's it!
        </p>
        <p>
          Use any name or email address you want (real or fake). Remember, this
          data doesn't come back to us, everything is in your browser.
        </p>
        <p>
          Select an RSA Key Size. We default the size to 2048 bits, but offer
          much larger options. The larger the stronger the encryption.
        </p>
        <p>
          The passphrase is how you can access your private key later for
          decryption.
        </p>
        <p>You will get two keys. One public and one private.</p>
        <p>
          You can give out the public key to your friends. It's sole purpose is
          to encrypt files that{" "}
          <b>only your private key and passphrase can decrypt</b>.
        </p>
        <Typography color="error">
          <b>NEVER GIVE OUT YOUR PRIVATE KEY!</b>
        </Typography>
        <br />
        <Typography
          variant="h2"
          className={commonClasses.subHeadingBold}
          gutterBottom
        >
          Encrypt with asymmetry
        </Typography>
        <p>
          Head to the{" "}
          <Link component={RouterLink} to={"/encrypt"}>
            <b>Encrypt</b>
          </Link>{" "}
          section. On the top, select Asymmetric.
        </p>
        <p>
          Now you should be good to go. The only difference from symmetric
          encryption is that you must input or upload a public key.
        </p>
        <p>Seriously. That's the only difference.</p>
        <br />
        <Typography
          variant="h2"
          className={commonClasses.subHeadingBold}
          gutterBottom
        >
          Decrypt the asymmetric way.
        </Typography>
        <p>
          Remember that top selector we mentioned for asymmetric encryption?
          Same deal for decryption.
        </p>
        <p>
          Just fill out the form, let us know what format you expect the output
          file to be (text, csv, or most anything else). Upload or enter your{" "}
          <b>private key</b> and affiliated passphrase.
        </p>
        <p>That's all there is to it.</p>
        <br />
      </Box>
    </Box>
  );
};

export default GetStarted;
