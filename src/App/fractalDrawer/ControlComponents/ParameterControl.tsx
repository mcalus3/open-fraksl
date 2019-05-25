import * as React from 'react';
import { Typography } from '@material-ui/core';
import { ParameterDefinition } from '../FractalModels';
import { SetParameter, SetParameterAction } from '../fractalReducer';
import { useFractalReducer } from '../FractalContext';

const Slider: React.ComponentClass<any> = require('@material-ui/lab/Slider')
  .default;

type Props = {
  parameter: ParameterDefinition;
  value: number;
};

function ParameterControl(props: Props) {
  const { dispatch } = useFractalReducer();

  const cp = (e: React.FormEvent, v: number) => {
    const action: SetParameterAction = {
      type: SetParameter,
      payload: { name: props.parameter.name, value: v }
    };
    dispatch(action);
  };

  return (
    <div>
      <Typography component="p">{props.parameter.name}</Typography>
      <Slider
        placeholder={props.parameter.name}
        value={props.value}
        aria-labelledby={props.parameter.name}
        onChange={cp}
        max={props.parameter.max}
        min={props.parameter.min}
      />
    </div>
  );
}

export default ParameterControl;
