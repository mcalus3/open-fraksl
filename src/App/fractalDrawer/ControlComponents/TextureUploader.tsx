import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import * as PIXI from 'pixi.js';

import { useFractalReducer } from '../FractalContext';
import { SetFractalTextureAction, SetFractalTexture } from '../fractalReducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    },
    input: { width: '100px' }
  })
);

function TextureUploader() {
  const classes = useStyles();
  const onImageLoad = useImageLoad();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" component="h4">
        Upload own image:
      </Typography>
      <input
        type="file"
        name="pic"
        accept="image/*"
        onChange={onImageLoad}
        className={classes.input}
      />
    </Paper>
  );
}

function useImageLoad() {
  const { dispatch } = useFractalReducer();
  return (e: any) => {
    var f = e.target.files[0];
    var fr = new FileReader();

    fr.onload = function(ev2: any) {
      console.dir(ev2);
      const action: SetFractalTextureAction = {
        type: SetFractalTexture,
        payload: { texture: PIXI.Texture.from(ev2.target.result) }
      };
      dispatch(action);
    };

    fr.readAsDataURL(f);
  };
}

export default TextureUploader;
