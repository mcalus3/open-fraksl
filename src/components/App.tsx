import * as React from "react";
import "./App.css";
import NavBar from "./appComponents/NavBar";
import MenuDrawer from "./appComponents/MenuDrawer";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import withRoot from "./withRoot";
import Stage from "./fractalComponents/Stage";
import ControlDrawer from "./appComponents/ControlDrawer";

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
      <MenuDrawer />
      <NavBar />
      <Stage />
      <ControlDrawer />
    </div>
  );
}

export default withRoot(withStyles(styles)(App));
