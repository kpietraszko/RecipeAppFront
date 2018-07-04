import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './styles/App.css';
import ResponsiveDrawer from './components/responsiveDrawer';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Main from './components/main';
import myTheme from './myTheme';

const styles = () => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100vh'
  }
})
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={myTheme} >
        <CssBaseline />
        <div className={`App ${classes.root}`}>
          <ResponsiveDrawer />
          <Main />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
