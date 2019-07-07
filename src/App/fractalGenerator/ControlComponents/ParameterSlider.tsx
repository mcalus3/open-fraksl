import * as React from 'react';
import { Typography } from '@material-ui/core';
import { ParameterDefinition } from '../FractalDefinitions';
import { SetParameter, SetParameterAction } from '../StateManagement/fractalReducer';
import { useFractalReducer } from '../StateManagement/FractalContextProvider';

const Slider: React.ComponentClass<any> = require('@material-ui/lab/Slider')
  .default;

type Props = {
  parameter: ParameterDefinition;
  value: number;
  variableName: string;
};

function ParameterControl({ parameter, value, variableName }: Props) {
  const { dispatch } = useFractalReducer();

  const cp = (e: React.FormEvent, v: number) => {
    const action: SetParameterAction = {
      type: SetParameter,
      payload: { name: variableName, value: v }
    };
    dispatch(action);
  };

  return (
    <div>
      <Typography component="p">{parameter.name}</Typography>
      <Slider
        placeholder={parameter.name}
        value={value}
        aria-labelledby={parameter.name}
        onChange={cp}
        max={parameter.max}
        min={parameter.min}
      />
    </div>
  );
}

export default ParameterControl;
