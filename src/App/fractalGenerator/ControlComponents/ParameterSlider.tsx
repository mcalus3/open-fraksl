import * as React from "react";
import { Typography, Slider } from "@material-ui/core";
import { ParameterDefinition } from "../FractalDefinitions";
import {
  SetParameter,
  SetParameterAction
} from "../StateManagement/fractalActions";
import { useFractalReducer } from "../StateManagement/FractalContextProvider";
import { useState } from "react";

type Props = {
  parameter: ParameterDefinition;
  value: number;
  variableName: string;
};

function ParameterControl({ parameter, value, variableName }: Props) {
  const { dispatch } = useFractalReducer();
  const [startTime, setStartTime] = useState(performance.now());

  const cp: (event: React.ChangeEvent<{}>, value: number | number[]) => void = (
    event,
    value
  ) => {
    // throttle the state setting to 50 ms
    if (performance.now() - startTime > 50) {
      setStartTime(performance.now());
      const action: SetParameterAction = {
        type: SetParameter,
        payload: {
          name: variableName,
          value: Array.isArray(value) ? value[0] : value
        }
      };
      dispatch(action);
    }
  };

  return (
    <div>
      <Typography component="p" style={{ marginBottom: -8 }}>
        {parameter.name}
      </Typography>
      <Slider
        style={{ marginBottom: -8 }}
        value={value}
        onChange={cp}
        aria-labelledby={parameter.name}
        placeholder={parameter.name}
        max={parameter.max}
        min={parameter.min}
        step={parameter.step ? 1 : (parameter.max - parameter.min) / 200}
      />
    </div>
  );
}

export default ParameterControl;
