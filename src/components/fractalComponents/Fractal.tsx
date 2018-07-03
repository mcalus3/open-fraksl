import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

import {
  withStyles,
  createStyles,
  Theme,
  WithStyles
} from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  Actions,
  AppActionTypes
} from "../../stateManagement/appState/appActions";
import { State } from "../../stateManagement/model";
import { IAction } from "../../stateManagement/utils";

const styles = (theme: Theme) =>
  createStyles({
    flex: {
      flex: 1
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    },
    AppBar: {
      flexGrow: 1,
      zIndex: theme.zIndex.drawer + 101
    }
  });
type Props = { onToggleDrawer: () => IAction<AppActionTypes> } & WithStyles<
  typeof styles
>;

const NavBar = (props: Props) => {
  const { classes } = props;
  return (
    <AppBar position="absolute" className={classes.AppBar}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={props.onToggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
          open-fraksl
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  onToggleDrawer: () => dispatch(Actions.ToggleDrawer())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NavBar));
