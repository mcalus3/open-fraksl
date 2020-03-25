import * as React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { InputLabel, LinearProgress } from "@material-ui/core";
import NumberFormat from "react-number-format";

import { useFractalReducer } from "../StateManagement/FractalContextProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: theme.spacing(3)
    }
  })
);

function ElementsCounter() {
  const classes = useStyles();
  const { state } = useFractalReducer();

  return (
    <div className={classes.paper}>
      <InputLabel>Elements rendered</InputLabel>
      <NumberFormat
        value={state.currentElementsCount}
        displayType={"text"}
        thousandSeparator={true}
      />{" "}
      /{" "}
      <NumberFormat
        value={state.totalElementsCount}
        displayType={"text"}
        thousandSeparator={true}
      />{" "}
      (
      {state.totalElementsCount && state.totalElementsCount !== 0
        ? Math.min(
            Math.round(
              (state.currentElementsCount / state.totalElementsCount) * 100
            ),
            100
          )
        : null}
      %)
      <LinearProgress
        variant="determinate"
        value={(state.currentElementsCount / state.totalElementsCount) * 100}
      />
    </div>
  );
}

export default ElementsCounter;
