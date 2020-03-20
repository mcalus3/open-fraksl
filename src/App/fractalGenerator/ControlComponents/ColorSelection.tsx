import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { colorPalettes } from "../FractalDefinitions/common/ColorPalettes";
import { useFractalReducer } from "../StateManagement/FractalContextProvider";

type MyChangeEvent = React.ChangeEvent<{
  name?: string;
  value: unknown;
}>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: theme.spacing(3)
    },
    input: { width: "100px" },
    selector: { width: "100%", height: "100%" }
  })
);

function ColorSelection() {
  const classes = useStyles();
  const { state, dispatch } = useFractalReducer();
  const [selectedPaletteName, setSelectedPaletteName] = useState(
    state.color.name
  );

  useEffect(() => {
    setSelectedPaletteName(state.color.name);
  }, [state.color.name]);

  function handleChange(event: MyChangeEvent) {
    const palette =
      colorPalettes.find(palette => palette.name === event.target.value) ||
      colorPalettes[0];
    dispatch({
      type: "SET_FRACTAL_COLOR",
      payload: { palette }
    });
  }

  const colorSelectors = colorPalettes.map(palette => (
    <MenuItem value={palette.name} key={palette.name}>
      <div
        className={classes.selector}
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
        value={selectedPaletteName}
        onChange={e => {
          setSelectedPaletteName(e.target.value as string);
          handleChange(e);
        }}
        onClose={() =>
          handleChange({
            target: {
              value: selectedPaletteName
            }
          } as MyChangeEvent)
        }
        inputProps={{
          name: "color palette",
          id: "color-palette"
        }}
      >
        {colorSelectors}
      </Select>
    </div>
  );
}

export default ColorSelection;
