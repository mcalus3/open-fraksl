import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../stateManagement/StateModel';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Actions } from '../../../stateManagement/FractalState/fractalActions';
import { Action } from '../../appComponents/StateProvider';
import FractalLoader from './FractalLoader';
import * as PIXI from 'pixi.js';
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
      minHeight: 0
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

class FractalStage extends React.Component<Props> {
  private canvasRef = React.createRef<HTMLDivElement>();
  private pixiApp: PIXI.Application;

  public componentDidMount() {
    this.pixiApp = new PIXI.Application(
      this.props.size.width,
      this.props.size.height,
      { backgroundColor: OPTIONS.backgroundColor }
    );
    if (this.canvasRef.current) {
      this.canvasRef.current.appendChild(this.pixiApp.view);
    }
  }

  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.stage} ref={this.canvasRef}>
        <FractalLoader pixiApp={this.pixiApp} />
      </div>
    );
  }

  public componentDidUpdate() {
    this.pixiApp.renderer.resize(
      this.props.size.width,
      this.props.size.height - 4
    );
    this.props.resize(this.props.size.width, this.props.size.height - 4);
  }
}

const mapStateToProps = (state: State, ownProps: SizeMeProps) => ({});

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
