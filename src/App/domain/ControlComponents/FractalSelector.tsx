import * as React from 'react';
import { connect } from 'react-redux';
import { ListItem, ListItemText } from '@material-ui/core';
import fractalSlice from '../fractalReducer';

type Props = {
  name?: string;
  changeFractal?: (name: string) => any;
};

const FractalSelector = (props: Props) => {
  const cf = (e: React.FormEvent) => {
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

const mapStateToProps = (state: any, ownProps: { name: string }) => ({
  name: ownProps.name
});

const mapDispatchToProps = (dispatch: any) => ({
  changeFractal: (fractalName: string) => {
    dispatch(fractalSlice.actions.setFractal({ name: fractalName }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FractalSelector);
