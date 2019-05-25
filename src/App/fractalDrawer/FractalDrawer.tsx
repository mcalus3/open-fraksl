import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ControlDrawer from './ControlComponents/ControlDrawer';
import FractalStage from './DrawingComponents/FractalStage';
import FractalStateProvider from './FractalContext';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    minHeight: 0
  }
});

function FractalDrawer() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FractalStateProvider>
        <FractalStage />
        <ControlDrawer />
      </FractalStateProvider>
    </div>
  );
}

export default FractalDrawer;
