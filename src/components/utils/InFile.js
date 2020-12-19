import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import DeleteOutlineSharpIcon from "@material-ui/icons/DeleteOutlineSharp";
import IconButton from "@material-ui/core/IconButton";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  hidden: {
    visibility: "hidden",
    width: "1px",
  },
  helpText: {
    marginLeft: theme.spacing(2),
  },
}));

const InFile = (props) => {
  const classes = useStyles();

  const selectedFile = props.fileMetaData && (
    <div>
      <FormLabel>{`Selected: ${props.fileMetaData.name}`}</FormLabel>
      <IconButton onClick={props.handleDelete}>
        <DeleteOutlineSharpIcon />
      </IconButton>
    </div>
  );
  return (
    <Box>
      <Button
        onClick={() => document.getElementById("inp").click()}
        variant="outlined"
        color="secondary"
      >
        {props.label}
      </Button>

      <input
        id="inp"
        type="file"
        className={classes.hidden}
        onChange={props.readFile}
      />
      {selectedFile}
      {props.formByteInputError && (
        <div className={classes.helpText}>
          <FormHelperText error={true}>
            {props.errMessage ? props.errMessage : "File Required"}
          </FormHelperText>
        </div>
      )}
    </Box>
  );
};

export default InFile;
