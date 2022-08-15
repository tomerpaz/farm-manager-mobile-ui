import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainTabs from './tabs/MainTabs';
import { Box } from '@mui/material';
import { Routes, Route, Outlet, Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import Login from './features/auth/Login';
import ProtectedRoutes from './router/ProtectedRoutes';
import PublicRoutes from './router/PublicRoutes';
import he from "./lang/he.json";
import en from "./lang/en.json";
import Layout from './components/Layout';
import UserRoutes from './components/UserRoutes';



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
  const defaultRoute = "/map";
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" element={<UserRoutes />}>
              <Route index element={<Navigate to={defaultRoute} replace />} />
              <Route path='/map' element={<MainTabs />} />
              <Route path='/fields' element={<MainTabs />} />
              <Route path='/activities' element={<MainTabs />} />
            </Route>
          </Route>
          <Route path="/" element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={defaultRoute} replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
