import * as React from "react";
import "./App.css";
import NavBar from "./appComponents/NavBar";
import withRoot from "./withRoot";
import Stage from "./fractalComponents/Stage";
import MenuDrawer from "./appComponents/MenuDrawer";
import ControlDrawer from "./appComponents/ControlDrawer";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Action } from "../stateManagement/ReduxRoot";

const styles = () =>
  createStyles({
    root: {
      display: "flex",
      flexFlow: "column",
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%"
    },
    content: {
      display: "flex",
      flexGrow: 1
    }
  });

type Props = { resize: (w: number, h: number) => Action } & WithStyles<
  typeof styles
>;

function App(props: Props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <NavBar />
      <MenuDrawer />
      <div className={classes.content}>
        <div />
        <Stage />
        <ControlDrawer />
      </div>
    </div>
  );
}

export default withRoot(withStyles(styles)(App));
