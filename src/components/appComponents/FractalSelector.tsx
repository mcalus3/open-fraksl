import * as React from "react";
import { connect } from "react-redux";
import { ListItem, ListItemText } from "@material-ui/core";
import { Actions } from "../../stateManagement/FractalState/fractalActions";
import { State } from "../../stateManagement/StateModel";
import { Action } from "../../stateManagement/ReduxRoot";

type Props = {
  name?: string;
  changeFractal?: (name: string) => Action;
};

const FractalSelector = (props: Props) => {
  const cf = (e: any) => {
    return props.changeFractal !== undefined && props.name !== undefined
      ? props.changeFractal(props.name)
      : undefined;
  };

  return (
    <ListItem button={true} onClick={cf}>
      <ListItemText primary={props.name} />
    </ListItem>
  );
};

const mapStateToProps = (state: State, ownProps: { name: string }) => ({
  name: ownProps.name
});

const mapDispatchToProps = (dispatch: any) => ({
  changeFractal: (fractalName: string) => {
    dispatch(Actions.ChangeFractal(fractalName));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FractalSelector);
