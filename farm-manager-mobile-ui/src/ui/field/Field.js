import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { Routes, useParams, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFieldById } from '../../features/fields/fieldSlice';
import Loading from '../../components/Loading';
import { MapContainer, Polygon, TileLayer } from 'react-leaflet';
import { CloseOutlined, DashboardOutlined, ExitToAppOutlined, Info, InfoOutlined, SatelliteAltOutlined } from '@mui/icons-material';
import FieldInfo from './FieldInfo';
import FieldDashboard from './FieldDashboard';
import FieldHistory from './FieldHistory';
import FieldImagery from './FieldImagery';
import { getFruitIcon } from '../../icons/FruitIconUtil';

const Field = () => {
  const { pathname } = useLocation();
  const { fieldId, src } = useParams()


  const field = useSelector((state) => selectFieldById(state, Number(fieldId)));
  const navigate = useNavigate()


  if (!field) {
    return <Loading />
  }

  const paths = [`/field/${src}/${fieldId}/info`,
  `/field/${src}/${fieldId}/dash`,
  `/field/${src}/${fieldId}/history`,
  `/field/${src}/${fieldId}/imagery`

  ];

  const getIndex = ((element) => element === pathname);


  const height = (window.window.innerHeight - 120);


  const value = paths.findIndex(getIndex) > 0 ? paths.findIndex(getIndex) : 0;

  console.log(field)


  return (
    <Box >
      <Card sx={{ height: height }}>
        <CardHeader
          avatar={
            <Avatar sx={{ backgroundColor: 'white' }}>
              {getFruitIcon(field.cropEngName)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={() => navigate(`/tabs/${src}`)}>
              <CloseOutlined />
            </IconButton>
          }
          title={field.name}
          subheader={field.startDate}
        />
        <CardContent >


          {pathname.includes("/info") && <FieldInfo />}
          {pathname.includes("/dash") && <FieldDashboard />}
          {pathname.includes("/history") && <FieldHistory />}
          {pathname.includes("/imagery") && <FieldImagery />}

        </CardContent>
      </Card>

      <BottomNavigation value={value}
        showLabels>
        <BottomNavigationAction
          label="Info"
          to={`/field/${src}/${fieldId}/info`} component={Link}
          icon={<InfoOutlined />}
        />
        <BottomNavigationAction
          label="Dashboard"
          to={`/field/${src}/${fieldId}/dash`} component={Link}
          icon={<DashboardOutlined />}
        />
        <BottomNavigationAction
          label="Recents"
          to={`/field/${src}/${fieldId}/history`} component={Link}
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          disabled={field.imageryId === null}
          label="Imagery"
          to={`/field/${src}/${fieldId}/imagery`} component={Link}
          icon={<SatelliteAltOutlined/>}
        />
      </BottomNavigation>
    </Box >

  );
}

export default Field
