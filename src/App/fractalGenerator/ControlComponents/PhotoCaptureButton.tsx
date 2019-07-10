import PhotoCamera from '@material-ui/icons/PhotoCamera';

import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { usePixiApp } from '../StateManagement/FractalContextProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginBottom: theme.spacing(3),
      textTransform: 'none',
      lineHeight: 1,
      fontSize: '1rem'
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
      color="default"
      className={classes.button}
      onClick={() => saveFractalImage(pixiApp)}
    >
      Save fractal image
      <PhotoCamera className={classes.icon} />
    </Button>
  );
}

function saveFractalImage(pixiApp: PIXI.Application) {
  //   var element = document.getElementById('fractal-canvas');
  //   if (element) {
  //     let canvas = element as HTMLCanvasElement;
  //     var img = canvas.toDataURL('image/png');
  //     const a = document.createElement('a');
  //     a.href = img;
  //     a.download = 'fractal.png';
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);

  //   pixiApp.renderer.extract.canvas(pixiApp.stage).toBlob(function(b) {
  //     var a = document.createElement('a');
  //     document.body.append(a);
  //     a.download = 'fractal.png';
  //     a.href = URL.createObjectURL(b);
  //     a.click();
  //     a.remove();
  //   }, 'image/png');

  //   const canvas = pixiApp.renderer.extract.canvas(pixiApp.stage);
  //   document.body.append(canvas);

  const img = pixiApp.renderer.extract.base64(pixiApp.stage, 'image/png');
  const a = document.createElement('a');
  document.body.append(a);
  a.download = 'fractal.png';
  a.href = img;
  a.click();
  a.remove();
}
