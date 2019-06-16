import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import * as PIXI from 'pixi.js';

import { useFractalReducer } from '../FractalContext';
import { SetFractalTextureAction, SetFractalTexture } from '../fractalReducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: theme.spacing(3)
    },
    input: { width: '100px' }
  })
);

function TextureUploader() {
  const classes = useStyles();
  const { state, dispatch } = useFractalReducer();
  const fileSelector = useFileSelector();

  return (
    <div className={classes.paper}>
      <InputLabel htmlFor="choose-texture"> choose texture</InputLabel>
      <Select
        value={state.texture.name}
        inputProps={{
          name: 'choose texture',
          id: 'choose-texture'
        }}
      >
        <MenuItem value={'rectangle'}>
          <div
            onClick={() => {
              const action: SetFractalTextureAction = {
                type: SetFractalTexture,
                payload: { name: 'rectangle', texture: PIXI.Texture.WHITE }
              };
              dispatch(action);
            }}
          >
            rectangle
          </div>
        </MenuItem>
        <MenuItem value="custom">
          <div
            onClick={() => {
              fileSelector.click();
            }}
          >
            upload own image
          </div>
        </MenuItem>
      </Select>
    </div>
  );
}

function useImageLoad() {
  const { dispatch } = useFractalReducer();
  return (e: any) => {
    e.preventDefault();
    var file = e.target.files[0];
    var fileReader = new FileReader();

    fileReader.onload = function(event: any) {
      console.log('4');
      const action: SetFractalTextureAction = {
        type: SetFractalTexture,
        payload: {
          name: 'custom',
          texture: PIXI.Texture.from(event.target.result)
        }
      };
      dispatch(action);
    };

    fileReader.readAsDataURL(file);
  };
}

function useFileSelector() {
  const onImageLoad = useImageLoad();
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('accept', 'image/*');
  fileSelector.onchange = onImageLoad;

  return fileSelector;
}

export default TextureUploader;
