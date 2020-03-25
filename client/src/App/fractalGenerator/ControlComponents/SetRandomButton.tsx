import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useFractalReducer } from "../StateManagement/FractalContextProvider";
import CasinoIcon from "@material-ui/icons/Casino";
import fractalModels, { ParameterDefinition } from "../FractalDefinitions";
import { fractalTextures } from "../FractalDefinitions/common/FractalTextures";
import { colorPalettes } from "../FractalDefinitions/common/ColorPalettes";

const objectMap: (obj: object, fn: Function) => Record<string, number> = (
  obj,
  fn
) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

export const getRandomFractal = () => {
  const fractalModel =
    fractalModels[Math.floor(Math.random() * fractalModels.length)];
  return {
    data: {
      texture:
        fractalTextures[Math.floor(Math.random() * fractalTextures.length)],
      color: colorPalettes[Math.floor(Math.random() * colorPalettes.length)],
      name: fractalModel.name,
      parameters: objectMap(
        fractalModel.parameters,
        (param: ParameterDefinition) => {
          const randValue = Math.random() * (param.max - param.min) + param.min;
          return param.step ? Math.round(randValue) : randValue;
        }
      )
    }
  };
};

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

export default function SetRandomButton() {
  const classes = useStyles();
  const { dispatch } = useFractalReducer();

  return (
    <Button
      variant="contained"
      className={classes.button}
      onClick={() => {
        dispatch({
          type: "SET_PARAMETER",
          payload: { name: "zoom", value: 0 }
        });
        setTimeout(
          () =>
            dispatch({
              type: "SET_FRACTAL",
              payload: getRandomFractal()
            }),
          1000
        );
      }}
    >
      Randomize!
      <CasinoIcon className={classes.icon} />
    </Button>
  );
}
