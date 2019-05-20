import * as React from 'react';
import NavBar from './appNavigation/NavBar';
import withThemeProvider from './ThemeProvider';
import withStateProvider from './StateProvider';
import MenuDrawer from './appNavigation/MenuDrawer';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import ContentContainer from './domain/ContentContainer';

const styles = () =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'column',
      position: 'absolute',
      width: '100%',
      height: '100%'
    }
  });

type Props = {} & WithStyles<typeof styles>;

function App({ classes }: Props) {
  return (
    <div className={classes.root}>
      <NavBar />
      <MenuDrawer />
      <ContentContainer />
    </div>
  );
}

export default withStateProvider(withThemeProvider(withStyles(styles)(App)));
