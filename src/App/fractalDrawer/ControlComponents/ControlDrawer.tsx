import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import ParametersPanel from './ParametersPanel';
import FractalSelection from './FractalSelection';
import { Paper } from '@material-ui/core';
import TextureUploader from './TextureUploader';
import ColorSelection from './ColorSelection';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters(),
      anchor: 'right',
      float: 'right',
      maxWidth: '50%',
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
  })
);

function ControlDrawer() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <ParametersPanel />
      <FractalSelection />
      <ColorSelection />
      <TextureUploader />
    </Paper>
  );
}

export default ControlDrawer;
