import * as React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { ParameterDefinition } from '../FractalModels';
import fractalSlice from '../fractalReducer';

const Slider: React.ComponentClass<any> = require('@material-ui/lab/Slider')
  .default;

type Props = {
  parameter: ParameterDefinition;
  value: number;
  changeParameter: (n: string, v: number) => any;
};

const ParameterControl = (props: Props) => {
  const cp = (e: React.FormEvent, v: number) =>
    props.changeParameter(props.parameter.name, v);

  return (
    <div>
      <Typography component="p" id="x">
        {props.parameter.name}
      </Typography>
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
};

const mapStateToProps = (
  state: any,
  ownProps: { param: ParameterDefinition; value: number }
) => ({
  parameter: ownProps.param,
  value: ownProps.value
});

const mapDispatchToProps = (dispatch: any) => ({
  changeParameter: (name: string, v: number) => {
    dispatch(fractalSlice.actions.setParameter({ name: name, value: v }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParameterControl);
