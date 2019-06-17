import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';

import ParameterControl from './ParameterControl';
import { getFractalDefinition } from '../fractalReducer';
import { useFractalReducer } from '../FractalContext';

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
      return <ParameterControl parameter={def} key={def.name} value={val} />;
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
