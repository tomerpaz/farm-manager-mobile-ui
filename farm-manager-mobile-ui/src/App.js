import './App.css';
import AppFrame from './AppFrame';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export const PRIMARY_MAIN = '#49A05E';
export const PRIMARY_DARK = '#49A05E';
export const PRIMARY_LIGHT = '#D9EEDE';
export const SECONDARY_LIGHT = '#F2F5F4';
export const SECONDARY_MAIN = '#585C59';
export const BORDER_COLOR = '#e8e8e8';
export const BORDER_COLOR_DARK = '#bdbdbd';
export const BACKGROUND = '#E9EEEC';
export const SECOND_TOP_LINE = BACKGROUND;

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: PRIMARY_MAIN,
    },
    // secondary: {
    //   // This is green.A700 as hex.
    //   main: '#11cb5f',
    // },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>

        <AppFrame />

    </ThemeProvider>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
