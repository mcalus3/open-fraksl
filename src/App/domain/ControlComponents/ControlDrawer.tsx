import * as React from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme
} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ControlPanel from './ControlPanel';
import FractalSelection from './FractalSelection';
import { Paper } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      anchor: 'right',
      float: 'right',
      maxWidth: '50%',
      overflowY: 'auto'
    }
  });

type Props = {
  openControlDrawer: boolean;
} & WithStyles<typeof styles>;

const ControlDrawer = (props: Props) => {
  const { classes } = props;

  return (
    <Paper
      classes={{
        root: classes.paper
      }}
    >
      <ControlPanel />
      <FractalSelection />
    </Paper>
  );
};

const mapStateToProps = (state: any) => ({
  openControlDrawer: state.navigationState.controlPanelVisible
});

export default connect(mapStateToProps)(withStyles(styles)(ControlDrawer));
