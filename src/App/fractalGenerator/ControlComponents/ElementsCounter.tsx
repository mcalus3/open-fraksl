import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Typography, InputLabel, LinearProgress } from '@material-ui/core';

import { useFractalReducer } from '../StateManagement/FractalContextProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: theme.spacing(3)
    }
  })
);

function ElementsCounter() {
  const classes = useStyles();
  const { state } = useFractalReducer();

  return (
    <div className={classes.paper}>
      <InputLabel>Elements rendered</InputLabel>
      <Typography>
        {state.currentElementsCount} / {state.totalElementsCount}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={(state.currentElementsCount / state.totalElementsCount) * 100}
      />
    </div>
  );
}

export default ElementsCounter;
