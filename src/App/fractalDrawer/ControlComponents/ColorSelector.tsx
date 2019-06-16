import * as React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';

import { SetFractalColor, SetFractalColorAction } from '../fractalReducer';
import { useFractalReducer } from '../FractalContext';

type Props = {
  name: string;
};

function ColorSelector(props: Props) {
  const { state, dispatch } = useFractalReducer();

  const cf = (e: React.FormEvent) => {
    const action: SetFractalColorAction = {
      type: SetFractalColor,
      payload: { name: props.name }
    };
    dispatch(action);
  };

  return (
    <ListItem
      button={true}
      onClick={cf}
      selected={state.color.name === props.name}
    >
      <ListItemText primary={props.name} />
    </ListItem>
  );
}

export default ColorSelector;
