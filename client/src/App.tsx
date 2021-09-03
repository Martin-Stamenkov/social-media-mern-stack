import { createTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core';
import React from 'react';
import { Router as Routes } from 'router/Router';
import { Layout } from './components';
import { Router } from "react-router";
import { createBrowserHistory } from "history";




const themeLight = createTheme({
  palette: {
    background: {
      default: "#f5f5f5"
    }
  }
});


function App() {

  const history = createBrowserHistory()
  return (
    <MuiThemeProvider theme={themeLight}>
      <CssBaseline />
      <Router history={history}>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
