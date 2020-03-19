import * as React from "react";
import { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { useFractalReducer } from "../StateManagement/FractalContextProvider";
import {
  SetFractalTypeAction,
  SetParameterAction,
  SetParameter,
  SetFractalType
} from "../StateManagement/fractalActions";
import fractalModels from "../FractalDefinitions";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { transformParametersProportionally } from "../StateManagement/fractalReducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: theme.spacing(3)
    }
  })
);

function FractalSelection() {
  const classes = useStyles();
  const { state, dispatch } = useFractalReducer();
  const [selectedName, setSelectedName] = useState<string>(state.name);

  function handleChange(
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    const action: SetParameterAction = {
      type: SetParameter,
      payload: { name: "zoom", value: 0 }
    };
    dispatch(action);
    setSelectedName(event.target.value as string);

    setTimeout(() => {
      const changeFractalAction: SetFractalTypeAction = {
        type: SetFractalType,
        payload: { name: event.target.value as string }
      };
      dispatch(changeFractalAction);
      const changeParamsAction: SetParameterAction = {
        type: SetParameter,
        payload: {
          name: "zoom",
          value: transformParametersProportionally(
            state.parameters,
            selectedName,
            event.target.value as string
          ).zoom
        }
      };
      dispatch(changeParamsAction);
    }, 1000);
  }

  const fractalSelectors = fractalModels.map(model => (
    <MenuItem value={model.name} key={model.name}>
      {model.name}
    </MenuItem>
  ));

  return (
    <div className={classes.paper}>
      <InputLabel htmlFor="choose-fractal">choose fractal</InputLabel>
      <Select
        value={selectedName}
        onChange={handleChange}
        inputProps={{
          name: "choose fractal",
          id: "choose-fractal"
        }}
      >
        {fractalSelectors}{" "}
      </Select>
    </div>
  );
}

export default FractalSelection;
