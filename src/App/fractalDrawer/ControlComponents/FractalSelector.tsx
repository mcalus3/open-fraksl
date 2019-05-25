import * as React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';

import { SetFractal, SetFractalAction } from '../fractalReducer';
import { useFractalReducer } from '../FractalContext';

type Props = {
  name: string;
};

function FractalSelector(props: Props) {
  const { state, dispatch } = useFractalReducer();

  const cf = (e: React.FormEvent) => {
    const action: SetFractalAction = {
      type: SetFractal,
      payload: { name: props.name }
    };
    dispatch(action);
  };

  return (
    <ListItem button={true} onClick={cf} selected={state.name === props.name}>
      <ListItemText primary={props.name} />
    </ListItem>
  );
}

export default FractalSelector;
