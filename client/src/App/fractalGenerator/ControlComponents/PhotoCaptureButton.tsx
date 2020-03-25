import PhotoCamera from "@material-ui/icons/PhotoCamera";

import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { usePixiApp } from "../StateManagement/FractalContextProvider";

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

export default function PhotoCaptureButton() {
  const classes = useStyles();
  const { pixiApp } = usePixiApp();
  return (
    <Button
      variant="contained"
      className={classes.button}
      onClick={() => saveFractalImage(pixiApp)}
    >
      Download fractal image
      <PhotoCamera className={classes.icon} />
    </Button>
  );
}

function saveFractalImage(pixiApp: PIXI.Application) {
  const img = pixiApp.renderer.extract.base64(pixiApp.stage, "image/png");
  const a = document.createElement("a");
  document.body.append(a);
  a.download = "fractal.png";
  a.href = img;
  a.click();
  a.remove();
}
