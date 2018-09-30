import * as React from 'react';
import { connect } from 'react-redux';
import { Stage } from 'react-pixi-fiber';
import { State } from '../../../stateManagement/StateModel';
import Fractal from '../DrawingComponents/Fractal';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Actions } from '../../../stateManagement/appState/appActions';
import { Action } from '../../../stateManagement/StateProvider';
const sizeMe: any = require('react-sizeme');

const OPTIONS = {
  backgroundColor: 0x1099bb
};

const styles = () =>
  createStyles({
    stage: {
      flexGrow: 1,
      flexShrink: 1,
      minWidth: 0,
      minHeight: 0,
      borderStyle: 'dashed',
      borderWidth: 'medium'
    }
  });

type SizeMeProps = {
  size: {
    width: number;
    height: number;
  };
};

type Props = { resize: (w: number, h: number) => Action } & WithStyles<
  typeof styles
> &
  SizeMeProps;

const FractalStage = (props: Props) => {
  props.resize(props.size.width, props.size.height);
  const { classes } = props;

  return (
    <div className={classes.stage}>
      <Stage
        options={OPTIONS}
        width={props.size.width}
        height={props.size.height - 4}
      >
        <Fractal />
      </Stage>
    </div>
  );
};

const mapStateToProps = (
  state: State,
  ownProps: { size: { width: number; height: number } }
) => ({
  width: ownProps.size.width,
  height: ownProps.size.height
});

const mapDispatchToProps = (dispatch: any) => ({
  resize: (w: number, h: number) => {
    dispatch(Actions.Resize(w, h));
  }
});

export default sizeMe({ monitorHeight: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(FractalStage))
);
