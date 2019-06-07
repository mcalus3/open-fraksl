import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ControlPanel from './ControlPanel';
import FractalSelection from './FractalSelection';
import { Paper } from '@material-ui/core';
import TextureUploader from './TextureUploader';

const useStyles = makeStyles({
  paper: {
    anchor: 'right',
    float: 'right',
    maxWidth: '50%',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
});

function ControlDrawer() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <ControlPanel />
      <FractalSelection />
      <TextureUploader />
    </Paper>
  );
}

export default ControlDrawer;
