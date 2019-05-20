import * as React from 'react';
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme
} from '@material-ui/core/styles';
import ControlDrawer from './ControlComponents/ControlDrawer';
import FractalStage from './DrawingComponents/FractalStage';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexGrow: 1,
      flexShrink: 1,
      minWidth: 0,
      minHeight: 0
    },
    paper: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

type Props = {} & WithStyles<typeof styles>;

const ContentContainer = ({ classes }: Props) => {
  return (
    <div className={classes.container}>
      <FractalStage />
      <ControlDrawer />
    </div>
  );
};

export default withStyles(styles)(ContentContainer);
