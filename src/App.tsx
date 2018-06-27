import * as React from "react";
import "./App.css";
import NavBar from "./components/appComponents/NavBar";
import Drawer from "./components/appComponents/Drawer";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: "hidden" as "hidden",
    position: "relative" as "relative",
    display: "flex" as "flex"
  }
};

function App(props: any) {
  return (
    <div className={props.root}>
      <NavBar />
      <Drawer />
    </div>
  );
}

export default withStyles(styles)(App);
