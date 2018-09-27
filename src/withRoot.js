import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import cyan from '@material-ui/core/colors/cyan';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

function getTheme(theme) {
  return createMuiTheme({
    palette: {
      type: theme.paletteType,
      background: {
        default: theme.paletteType === 'light' ? '#FFFFFF' : '#303030',
      },
    },
  });
}

const darkTheme = getTheme({
  paletteType: 'dark',
});
const lightTheme = getTheme({
  paletteType: 'light',
});


function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={lightTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
