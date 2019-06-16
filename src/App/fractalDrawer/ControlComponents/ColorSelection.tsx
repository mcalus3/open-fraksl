import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography, List } from '@material-ui/core';

import { colorPalettes } from '../ColorPalettes';
import ColorSelector from './ColorSelector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
  })
);

function ColorSelection() {
  const classes = useStyles();

  const colorSelectors = colorPalettes.map(f => (
    <ColorSelector name={f.name} key={f.name} />
  ));

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" component="h3">
        Color Selection
      </Typography>
      <List component="nav">{colorSelectors}</List>{' '}
    </Paper>
  );
}

export default ColorSelection;
