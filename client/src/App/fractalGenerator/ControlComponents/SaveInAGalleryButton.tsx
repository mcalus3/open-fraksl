import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useFractalReducer } from "../StateManagement/FractalContextProvider";
import SaveIcon from "@material-ui/icons/Save";
import { getFractalDefinition } from "../StateManagement/fractalReducer";
import { ColorDefinition } from "../FractalDefinitions/common/ColorPalettes";
import { FractalTexture } from "../FractalDefinitions/common/FractalTextures";

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

export type FractalLoadData = {
  color: ColorDefinition;
  parameters: Record<string, number>;
  name: string;
  texture: FractalTexture;
};

const uploadFractal = (data: FractalLoadData) => {
  const dataToSave = {
    color: data.color.name,
    texture: data.texture.name,
    name: data.name,
    parameters: data.parameters
  };
  console.log("uploading fractal data...", JSON.stringify(dataToSave));
};

export default function SaveInAGalleryButton() {
  const classes = useStyles();
  const { state } = useFractalReducer();
  return (
    <Button
      variant="contained"
      className={classes.button}
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
