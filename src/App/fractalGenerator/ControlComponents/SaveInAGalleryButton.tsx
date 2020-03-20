import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useFractalReducer } from "../StateManagement/FractalContextProvider";
import SaveIcon from "@material-ui/icons/Save";
import { getFractalDefinition } from "../StateManagement/fractalReducer";
import { uploadFractal } from "../StateManagement/fractalLoader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: "flex",
      marginBottom: theme.spacing(3),
      textTransform: "none",
      lineHeight: 1,
      fontSize: "1rem"
    },
    icon: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1)
    }
  })
);

export default function SaveInAGalleryButton() {
  const classes = useStyles();
  const { state } = useFractalReducer();
  return (
    <Button
      variant="contained"
      className={classes.button}
      disabled
      onClick={() => {
        const relevantParamNames = Object.keys(
          getFractalDefinition(state.name).parameters
        );
        const relevantParams = Object.fromEntries(
          Object.entries(state.parameters).filter(e =>
            relevantParamNames.includes(e[0])
          )
        );
        uploadFractal({
          color: state.color,
          parameters: relevantParams,
          name: state.name,
          texture: state.texture
        });
      }}
    >
      Save fractal to gallery
      <SaveIcon className={classes.icon} />
    </Button>
  );
}