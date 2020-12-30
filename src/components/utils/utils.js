const FileType = require("file-type");

export const mimes = {
  txt: "text/plain",
  csv: "text/csv",
  html: "text/html",
  css: "text/css",
};

export const copy = (inputId) => {
  let copyText = document.getElementById(inputId).textContent;
  const textArea = document.createElement("textarea");
  textArea.setAttribute("id", "copy");
  textArea.textContent = copyText;
  document.body.append(textArea);
  textArea.select();
  textArea.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
  textArea.remove();
};

export const extSelect = async (decrypted, decType) => {
  let bufferType;
  if (decType.fileType === "byte") {
    bufferType = await FileType.fromBuffer(decrypted);
  }

  if (bufferType) {
    return bufferType.ext;
  } else if (decType.fileType === "text") {
    return decType.ext;
  } else {
    return "txt";
  }
};

export const decFormat = {
  show: true,
  severity: "error",
  message:
    "Looks like there is a format issue with your Encrypted text. We recommend using the original text file supplied!",
};

export const decGeneric = {
  show: true,
  severity: "error",
  message: "Something went wrong! Please try again.",
};

export const decPW = {
  show: true,
  severity: "error",
  message: "Passphrase is incorrect!",
};

export const decSuccess = {
  show: true,
  severity: "success",
  message: "Successfully decrypted!",
};

export const encSuccess = {
  show: true,
  message: "Encryption Complete",
  severity: "success",
};

export const encError = {
  show: true,
  message: "Something went wrong! Please try again.",
  severity: "error",
};

export const resetAlert = {
  show: false,
  message: "",
  severity: "",
};

export const keyError = {
  show: true,
  message: "Invalid RSA Key! Please try again.",
  severity: "error",
};

export const privKeyPassError = {
  show: true,
  message: "Incorrect Passphrase! Please try again.",
  severity: "error",
};

export const pubKeyDecError = {
  show: true,
  message: "A Public Key has been supplied. Please provide your Private Key!",
  severity: "error",
};
