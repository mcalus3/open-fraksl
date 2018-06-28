import * as React from "react";
import "./App.css";
import NavBar from "./components/appComponents/NavBar";
import Drawer from "./components/appComponents/Drawer";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";

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
      <NavBar />
      <Drawer />
    </div>
  );
}

export default withStyles(styles)(App);
