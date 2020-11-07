import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const openpgp = require("openpgp");

const FileInput = (props) => {
  const [fileLoader, setFilerLoader] = useState(false);
  const [uploadedFile, setUploadedFile] = useState();

  // function openFile() {
  //   document.getElementById("inp").click();
  // }
  const readFile = (e) => {
    setFilerLoader(true);
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = function () {
      // console.log(typeof reader.result);
      // console.log(reader.result);
      setUploadedFile(new Uint8Array(reader.result));
    };

    reader.onerror = function () {
      // console.log(reader.error);
    };
    setFilerLoader(false);
    // reader.readAsText(file);
  };

  const byteEncrypt = async () => {
    const { message } = await openpgp.encrypt({
      message: openpgp.message.fromBinary(uploadedFile), // input as Message object
      passwords: ["test"], // multiple passwords possible
      armor: false, // don't ASCII armor (for Uint8Array output)
    });
    const encrypted = message.packets.write();
    console.log(message.armor());
  };


  
  return (
    <>
      {fileLoader && <CircularProgress />}
      {/* <button onclick={openFile}>click me</button> */}


      <Button
        // onClick={test2}
        onClick={()=>document.getElementById('inp').click()}
        variant="contained"
      >
       browse
      </Button>

      <input
        id="inp"
        type="file"
        style={{visibility:'hidden'}}
        onChange={readFile}
      />


      <Button
        // onClick={test2}
        onClick={byteEncrypt}
        variant="contained"
      >
        Encrypt
      </Button>

      <input
        id="inp"
        type="file"
        style={{visibility:'hidden'}}
        onChange={readFile}
      />

    </>
  );
};

export default FileInput;
