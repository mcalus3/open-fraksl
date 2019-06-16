import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { colorPalettes } from '../ColorPalettes';
import { useFractalReducer } from '../FractalContext';
import { SetFractalColorAction, SetFractalColor } from '../fractalReducer';

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

  function handleChange(
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    const action: SetFractalColorAction = {
      type: SetFractalColor,
      payload: { name: event.target.value as string }
    };
    dispatch(action);
  }

  const colorSelectors = colorPalettes.map(palette => (
    <MenuItem value={palette.name}>{palette.name}</MenuItem>
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
        {colorSelectors}{' '}
      </Select>
    </div>
  );
}

export default ColorSelection;

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//   }),
// );
