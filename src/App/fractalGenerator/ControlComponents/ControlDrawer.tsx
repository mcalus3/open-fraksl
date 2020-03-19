import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import ParametersPanel from "./ParametersPanel";
import FractalSelection from "./FractalSelection";
import { Paper } from "@material-ui/core";
import TextureSelection from "./TextureSelection";
import ColorSelection from "./ColorSelection";
import PhotoCaptureButton from "./PhotoCaptureButton";
import ElementsCounter from "./ElementsCounter";
import SaveInAGalleryButton from "./SaveInAGalleryButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters(),
      anchor: "right",
      float: "right",
      maxWidth: "50%",
      overflowY: "auto",
      overflowX: "hidden",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
  })
);

function ControlDrawer() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <ElementsCounter />
      <ParametersPanel />
      <FractalSelection />
      <ColorSelection />
      <TextureSelection />
      <PhotoCaptureButton />
      <SaveInAGalleryButton />
    </Paper>
  );
}

export default ControlDrawer;
