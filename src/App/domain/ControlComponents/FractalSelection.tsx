import * as React from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme
} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Paper, Typography, List } from '@material-ui/core';
import { fractalModels } from '../FractalModels';
import FractalSelector from './FractalSelector';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    }
  });

type Props = {
  currentFractal: string;
} & WithStyles<typeof styles>;

const FractalSelection = (props: Props) => {
  const { classes } = props;

  const fractalSelectors = fractalModels.map(f => (
    <FractalSelector name={f.name} key={f.name} />
  ));

  return (
    <Paper className={classes.paper}>
      <Typography variant="headline" component="h3">
        Fractal Selection
      </Typography>
      <List component="nav">{fractalSelectors}</List>{' '}
    </Paper>
  );
};

const mapStateToProps = (state: any) => ({
  currentFractal: state.fractalState.name
});

export default connect(mapStateToProps)(withStyles(styles)(FractalSelection));
