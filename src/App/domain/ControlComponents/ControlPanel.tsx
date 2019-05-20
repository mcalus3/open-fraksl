import * as React from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme
} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';
import ParameterControl from './ParameterControl';
import { getFractalDefinition } from '../fractalReducer';
import { ParameterDefinition } from '../FractalModels';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    }
  });

type Props = {
  parameterDefinitions: { [key: string]: ParameterDefinition };
  parameterValues: { [key: string]: number };
} & WithStyles<typeof styles>;

const ControlPanel = (props: Props) => {
  const { classes } = props;

  const renderSliders = () => {
    const sliders = Object.keys(props.parameterDefinitions).map(key => {
      const def = props.parameterDefinitions[key];
      const val = props.parameterValues[key];
      return <ParameterControl param={def} key={def.name} value={val} />;
    });
    return sliders;
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="headline" component="h3">
        Control Panel
      </Typography>
      {renderSliders()}
    </Paper>
  );
};

const mapStateToProps = (state: any) => ({
  parameterDefinitions: getFractalDefinition(state.fractalState.name)
    .parameters,
  parameterValues: state.fractalState.parameters
});

export default connect(mapStateToProps)(withStyles(styles)(ControlPanel));
