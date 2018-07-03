import * as React from "react";
import "./App.css";
import NavBar from "./appComponents/NavBar";
import Drawer from "./appComponents/Drawer";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import withRoot from "./withRoot";
import Stage from "./fractalComponents/Stage";

const styles = createStyles({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    display: "flex"
  }
});

type Props = {} & WithStyles<typeof styles>;

function App(props: Props) {
  return (
    <div className={props.classes.root}>
      <Drawer />
      <NavBar />
      <Stage />
    </div>
  );
}

export default withRoot(withStyles(styles)(App));
