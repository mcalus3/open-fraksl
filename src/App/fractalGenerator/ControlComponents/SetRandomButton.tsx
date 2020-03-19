import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useFractalReducer } from "../StateManagement/FractalContextProvider";
import CasinoIcon from "@material-ui/icons/Casino";
import { getFractalDefinition } from "../StateManagement/fractalReducer";
import {
  SetFractal,
  SetFractalAction
} from "../StateManagement/fractalActions";
import fractalModels, { ParameterDefinition } from "../FractalDefinitions";
import { fractalTextures } from "../FractalDefinitions/common/FractalTextures";
import { colorPalettes } from "../FractalDefinitions/common/ColorPalettes";

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
  const { state, dispatch } = useFractalReducer();

  const objectMap = (obj: object, fn: Function) =>
    Object.fromEntries(
      Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
    );

  const getRandomFractal = () => {
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
            const randValue =
              Math.random() * (param.max - param.min) + param.min;
            return param.step ? Math.round(randValue) : randValue;
          }
        )
      }
    };
  };

  return (
    <Button
      variant="contained"
      className={classes.button}
      onClick={() => {
        const action: SetFractalAction = {
          type: SetFractal,
          payload: getRandomFractal()
        };
        dispatch(action);
      }}
    >
      Randomize!
      <CasinoIcon className={classes.icon} />
    </Button>
  );
}
