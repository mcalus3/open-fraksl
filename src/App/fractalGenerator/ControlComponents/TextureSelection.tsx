import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import * as PIXI from "pixi.js";

import { useFractalReducer } from "../StateManagement/FractalContextProvider";
import {
  fractalTextures,
  FractalTexture
} from "../FractalDefinitions/common/FractalTextures";

type MyChangeEvent = React.ChangeEvent<{
  name?: string;
  value: unknown;
}>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: theme.spacing(3)
    },
    input: { width: "100px" },
    selector: { width: "100%", height: "100%" }
  })
);

function TextureSelection() {
  const classes = useStyles();
  const { state, dispatch } = useFractalReducer();
  const [selectedTextureName, setSelectedTextureName] = useState(
    state.texture.name
  );

  useEffect(() => {
    setSelectedTextureName(state.texture.name);
  }, [state.texture.name]);

  const fileSelector = useFileSelector();

  function handleChange(event: MyChangeEvent) {
    if (!event.target.value || event.target.value === "custom") {
      return;
    }
    dispatch({
      type: "SET_FRACTAL_TEXTURE",
      payload: event.target.value as FractalTexture
    });
  }

  const textureSelectors = fractalTextures.map(texture => (
    <MenuItem value={texture.name} key={texture.name}>
      <div
        className={classes.selector}
        onMouseOver={e => {
          handleChange({ target: { value: texture } } as MyChangeEvent);
        }}
      >
        {texture.name}
      </div>
    </MenuItem>
  ));

  return (
    <div className={classes.paper}>
      <InputLabel htmlFor="choose-texture"> choose texture</InputLabel>
      <Select
        value={selectedTextureName}
        onChange={e => {
          setSelectedTextureName(e.target.value as string);
          handleChange({
            target: {
              value: fractalTextures.find(t => t.name === e.target.value)
            }
          } as MyChangeEvent);
        }}
        onClose={() =>
          handleChange({
            target: {
              value: fractalTextures.find(t => t.name === selectedTextureName)
            }
          } as MyChangeEvent)
        }
        inputProps={{
          name: "choose texture",
          id: "choose-texture"
        }}
      >
        {textureSelectors}
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
      dispatch({
        type: "SET_FRACTAL_TEXTURE",
        payload: {
          name: "custom",
          texture: PIXI.Texture.from(event.target.result)
        }
      });
    };

    fileReader.readAsDataURL(file);
  };
}

function useFileSelector() {
  const onImageLoad = useImageLoad();
  const fileSelector = document.createElement("input");
  fileSelector.setAttribute("type", "file");
  fileSelector.setAttribute("accept", "image/*");
  fileSelector.onchange = onImageLoad;

  return fileSelector;
}

export default TextureSelection;
