import * as React from 'react';
import FractalStage from '../DomainComponents/DrawingComponents/FractalStage';
import ControlDrawer from '../DomainComponents/ControlComponents/ControlDrawer';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

const styles = () =>
  createStyles({
    container: {
      display: 'flex',
      flexGrow: 1,
      flexShrink: 1,
      minWidth: 0,
      minHeight: 0
    }
  });

type Props = {} & WithStyles<typeof styles>;

const ContentContainer = (props: Props) => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <FractalStage />
      <ControlDrawer />
    </div>
  );
};

export default withStyles(styles)(ContentContainer);
