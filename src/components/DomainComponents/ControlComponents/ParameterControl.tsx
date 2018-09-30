import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../stateManagement/StateModel';
import { Typography } from '@material-ui/core';
import { Actions } from '../../../stateManagement/FractalState/fractalActions';
import { Action } from '../../appComponents/StateProvider';
import { ParameterDefinition } from '../../../stateManagement/FractalModels';

const Slider: React.ComponentClass<any> = require('@material-ui/lab/Slider')
  .default;

type Props = {
  parameter: ParameterDefinition;
  value: number;
  changeParameter: (e: any, v: number) => Action;
};

const ParameterControl = (props: Props) => {
  const cp = (e: MouseEvent, v: number) =>
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
  state: State,
  ownProps: { param: ParameterDefinition; value: number }
) => ({
  parameter: ownProps.param,
  value: ownProps.value
});

const mapDispatchToProps = (dispatch: any) => ({
  changeParameter: (name: string, v: number) => {
    dispatch(Actions.setParameter(name, v));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParameterControl);
