import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography, List } from '@material-ui/core';

import { fractalModels } from '../FractalModels';
import FractalSelector from './FractalSelector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
  })
);

function FractalSelection() {
  const classes = useStyles();

  const fractalSelectors = fractalModels.map(f => (
    <FractalSelector name={f.name} key={f.name} />
  ));

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" component="h3">
        Fractal Selection
      </Typography>
      <List component="nav">{fractalSelectors}</List>{' '}
    </Paper>
  );
}

export default FractalSelection;
