import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { colorPalettes } from '../FractalDefinitions/common/ColorPalettes';
import { useFractalReducer } from '../StateManagement/FractalContextProvider';
import { SetFractalColorAction, SetFractalColor } from '../StateManagement/fractalReducer';

type MyChangeEvent = React.ChangeEvent<{
  name?: string;
  value: unknown;
}>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: theme.spacing(3)
    }
  })
);

function ColorSelection() {
  const classes = useStyles();
  const { state, dispatch } = useFractalReducer();

  function handleChange(event: MyChangeEvent) {
    const action: SetFractalColorAction = {
      type: SetFractalColor,
      payload: { name: event.target.value as string }
    };
    dispatch(action);
  }

  const colorSelectors = colorPalettes.map(palette => (
    <MenuItem value={palette.name} key={palette.name}>
      <div
        onMouseOver={e => {
          handleChange({ target: { value: palette.name } } as MyChangeEvent);
        }}
      >
        {palette.name}
      </div>
    </MenuItem>
  ));

  return (
    <div className={classes.paper}>
      <InputLabel htmlFor="color-palette">choose palette</InputLabel>
      <Select
        value={state.color.name}
        onChange={handleChange}
        inputProps={{
          name: 'color palette',
          id: 'color-palette'
        }}
      >
        {colorSelectors}
      </Select>
    </div>
  );
}

export default ColorSelection;
