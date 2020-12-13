import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import teal from '@material-ui/core/colors/teal';


const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: teal,
    background: {
      default: "#ffffff"
    },
  },
},
);


ReactDOM.render(
  <React.Fragment>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
