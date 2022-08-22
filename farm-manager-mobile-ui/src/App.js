import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route, Outlet, Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import Login from './features/auth/Login';
import ProtectedRoutes from './router/ProtectedRoutes';
import PublicRoutes from './router/PublicRoutes';

import Layout from './components/Layout';
import UserRoutes from './components/UserRoutes';
import MainTabs from './ui/tabs/MainTabs';
import Field from './ui/field/Field';
import DataRoutes from './components/routes/DataRoutes';
import TokenRoutes from './components/routes/TokenRoutes';
import Activity from './ui/activity/Activity';



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
    secondary: {
      // This is green.A700 as hex.
      main: SECONDARY_MAIN,
    },
  },
});

export const DEFAULT_ROUTE = "/tabs/map";


function App() {
  const dir = 'ltr'//;'rtl'
  document.body.dir = dir;
  theme.direction = dir ;
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<ProtectedRoutes />}>
            {/* <Route path="/" element={<TokenRoutes />}> */}
            <Route path="/" element={<UserRoutes />}>
              <Route path="/" element={<DataRoutes />}>
                <Route index element={<Navigate to={DEFAULT_ROUTE} replace />} />
                <Route path='/tabs/*' element={<MainTabs />} />
                <Route path='/field/:src/:fieldId/*' element={<Field />} />
                <Route path='/activity/:src/:activityId' element={<Activity />} />

              </Route>
            </Route>
            {/* </Route> */}
          </Route>
          <Route path="/" element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={DEFAULT_ROUTE} replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
