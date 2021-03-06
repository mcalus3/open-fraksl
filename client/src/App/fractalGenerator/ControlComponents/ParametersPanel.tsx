import * as React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { InputLabel, Switch, FormControlLabel } from "@material-ui/core";

import ParameterControl from "./ParameterSlider";
import { getFractalDefinition } from "../StateManagement/fractalReducer";
import { useFractalReducer } from "../StateManagement/FractalContextProvider";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: theme.spacing(3),
    },
  })
);

function ParametersPanel() {
  const classes = useStyles();
  const { state } = useFractalReducer();
  const parameterDefinitions = getFractalDefinition(state.name).parameters;
  const parameterValues = state.parameters;
  const [showNumeric, setShowNumeric] = useState(false);

  const renderSliders = () => {
    const sliders = Object.keys(parameterDefinitions).map((key) => {
      const def = parameterDefinitions[key];
      const val: number = parameterValues[key];
      return (
        <ParameterControl
          parameter={def}
          key={def.name}
          value={val}
          variableName={key}
          showNumeric={showNumeric}
        />
      );
    });
    return sliders;
  };

  return (
    <div className={classes.paper}>
      <InputLabel> Transformation parameters</InputLabel>
      <FormControlLabel
        control={
          <Switch
            checked={showNumeric}
            onChange={() => setShowNumeric(!showNumeric)}
          />
        }
        label="Show numeric values"
      />
      {renderSliders()}
    </div>
  );
}

export default ParametersPanel;
