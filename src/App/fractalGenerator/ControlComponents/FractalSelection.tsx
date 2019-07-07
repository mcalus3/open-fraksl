import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { useFractalReducer } from '../StateManagement/FractalContextProvider';
import { SetFractalAction, SetFractal } from '../StateManagement/fractalReducer';
import fractalModels from '../FractalDefinitions';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

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
    const action: SetFractalAction = {
      type: SetFractal,
      payload: { name: event.target.value as string }
    };
    dispatch(action);
  }

  const fractalSelectors = fractalModels.map(model => (
    <MenuItem value={model.name} key={model.name}>
      {model.name}
    </MenuItem>
  ));

  return (
    <div className={classes.paper}>
      <InputLabel htmlFor="choose-fractal">choose fractal</InputLabel>
      <Select
        value={state.name}
        onChange={handleChange}
        inputProps={{
          name: 'choose fractal',
          id: 'choose-fractal'
        }}
      >
        {fractalSelectors}{' '}
      </Select>
    </div>
  );
}

export default ColorSelection;
