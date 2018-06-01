import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Top from './page-component/Top';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#B9F6CA',
      main: '#20d9a8',
      dark: '#1B5E20',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FFFFFF',
      main: '#FFFFFF',
      dark: '#FFFFFF',
      contrastText: '#FFF',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Top />
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
