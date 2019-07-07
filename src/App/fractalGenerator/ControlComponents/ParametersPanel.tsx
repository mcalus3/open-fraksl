import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';

import ParameterControl from './ParameterSlider';
import { getFractalDefinition } from '../StateManagement/fractalReducer';
import { useFractalReducer } from '../StateManagement/FractalContextProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: theme.spacing(3)
    }
  })
);

function ParametersPanel() {
  const classes = useStyles();
  const { state } = useFractalReducer();
  const parameterDefinitions = getFractalDefinition(state.name).parameters;
  const parameterValues = state.parameters;

  const renderSliders = () => {
    const sliders = Object.keys(parameterDefinitions).map(key => {
      const def = parameterDefinitions[key];
      const val = parameterValues[key];
      return (
        <ParameterControl
          parameter={def}
          key={def.name}
          value={val}
          variableName={key}
        />
      );
    });
    return sliders;
  };

  return (
    <div className={classes.paper}>
      <InputLabel> Transformation parameters</InputLabel>
      {renderSliders()}
    </div>
  );
}

export default ParametersPanel;
