import * as React from "react";
import { Typography, Slider, Input } from "@material-ui/core";
import { ParameterDefinition } from "../FractalDefinitions";
import { useFractalReducer } from "../StateManagement/FractalContextProvider";
import { useState } from "react";

type Props = {
  parameter: ParameterDefinition;
  value: number;
  variableName: string;
  showNumeric: boolean;
};

function ParameterControl({
  parameter,
  value,
  variableName,
  showNumeric,
}: Props) {
  const { dispatch } = useFractalReducer();
  const [startTime, setStartTime] = useState(performance.now());

  const setValue = (value: number | number[]) => {
    dispatch({
      type: "SET_PARAMETER",
      payload: {
        name: variableName,
        value: Array.isArray(value) ? value[0] : value,
      },
    });
  };

  const cp: (event: React.ChangeEvent<{}>, value: number | number[]) => void = (
    event,
    value
  ) => {
    // throttle the state setting to 50 ms
    if (performance.now() - startTime > 50) {
      setStartTime(performance.now());
      setValue(Array.isArray(value) ? value[0] : value);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
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
      {showNumeric ? (
        <Input
          value={value}
          margin="dense"
          onChange={handleBlur}
          inputProps={{
            max: parameter.max,
            min: parameter.min,
            step: parameter.step ? 1 : (parameter.max - parameter.min) / 200,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      ) : null}
    </div>
  );
}

export default ParameterControl;
