export const mimes = {
  txt: "text/plain",
  csv: "text/csv",
  html: "text/html",
  css: "text/css",
};

export const extSelect = (bufferType, decType) => {
  if (typeof bufferType !== "undefined") {
    return bufferType.ext;
  } else if (typeof bufferType === "undefined" && decType.fileType === "text") {
    return decType.ext;
  } else {
    return  "txt";
  }
};

export const decFormat = {
  show: true,
  severity: "error",
  message:
    "Looks like there is a format issue with your Encrypted text. We recommend using the original text file supplied!",
}

export const decGeneric = {
  show: true,
  severity: "error",
  message:
    "Something went wrong! Please try again.",
}

export const decPW = {
  show: true,
  severity: "error",
  message: "Passphrase is incorrect!",
}

export const decSuccess = {
      show: true,
      severity: "success",
      message: "Successfully decrypted!",
    }