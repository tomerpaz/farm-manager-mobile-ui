import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

import { Box, IconButton, Paper, Typography } from '@mui/material';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { CloseOutlined, DashboardOutlined, InfoOutlined, SatelliteAltOutlined } from '@mui/icons-material';
import FieldInfo from './FieldInfo';
import FieldDashboard from './FieldDashboard';
import FieldHistory from './FieldHistory';
import FieldImagery from './FieldImagery';
import { getFruitIcon } from '../../icons/FruitIconUtil';
import { useFieldsById } from '../../features/fields/fieldsApiSlice';
import { selectLang } from '../../features/auth/authSlice';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';

const Field = () => {
  const { pathname } = useLocation();
  const { fieldId, src } = useParams()

  const text =  useSelector(selectLang)
  const { data: user } = useGetUserDataQuery()
  const field = useFieldsById(user.year, Number(fieldId))

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



  return (
    <Box >
      <Card sx={{ height: height }}>
        <CardHeader sx={{  padding: 1 }}
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
          title={<Typography variant='h6'>{field.name}</Typography> }
          subheader={<Typography color='secondary' variant='subtitle1'>{field.startDate}</Typography>}
        />
        <CardContent sx={{  paddingTop: 0 }}>


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
          icon={<SatelliteAltOutlined />}
        />
      </BottomNavigation>
    </Box >

  );
}

export default Field
