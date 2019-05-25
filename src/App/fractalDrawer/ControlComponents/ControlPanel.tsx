import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

import ParameterControl from './ParameterControl';
import { getFractalDefinition } from '../fractalReducer';
import { useFractalReducer } from '../FractalContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
  })
);

function ControlPanel() {
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
    <Paper className={classes.paper}>
      <Typography variant="h5" component="h3">
        Control Panel
      </Typography>
      {renderSliders()}
    </Paper>
  );
}

export default ControlPanel;
