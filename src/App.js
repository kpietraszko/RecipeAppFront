import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './styles/App.css';
import Drawer from './components/responsiveDrawer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Main from './components/main';

const styles = () => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  }
})
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider>
        <CssBaseline />
        <div className={`App ${classes.root}`}>
          <Drawer />
          <Main />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
