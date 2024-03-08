import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { Box, IconButton, Typography } from '@mui/material';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { Cancel, DashboardOutlined, HighlightOffRounded, InfoOutlined, PestControl, SatelliteAltOutlined } from '@mui/icons-material';
import FieldInfo from './FieldInfo';
import FieldDashboard from './dash/FieldDashboard';
import FieldHistory from './FieldHistory';
import FieldImagery from './FieldImagery';
import { getFruitIcon } from '../../icons/FruitIconUtil';
import { useFieldsById } from '../../features/fields/fieldsApiSlice';
import { selectCurrentYear, selectLang, setFieldDashboardYear } from '../../features/app/appSlice';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { displayFieldArea, displayFieldName, getBottomNavigationSx, maxLenghtStr, parseDate } from '../FarmUtil';
import { useEffect } from 'react';

const height = (window.innerHeight - 100);

const Field = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation();
  const { fieldId, page, src } = useParams()
  const text = useSelector(selectLang)
  const { data: user } = useGetUserDataQuery()
  const year = useSelector(selectCurrentYear)
  const field = useFieldsById(year, Number(fieldId))
  const navigate = useNavigate()


  useEffect(() => {
    return () => dispatch(setFieldDashboardYear(year));
  }, [])

  if (!field) {
    return <Loading />
  }

  const paths = [`/field/${src}/${fieldId}/info`,
  `/field/${src}/${fieldId}/dash`,
  `/field/${src}/${fieldId}/history/${page}`,
  `/field/${src}/${fieldId}/imagery`
  ];

  const getIndex = ((element) => element === pathname);


  const value = paths.findIndex(getIndex) > 0 ? paths.findIndex(getIndex) : 0;
  const isHistory = pathname.includes("/history") ? true : false;
  const sidePadding = isHistory ? 0 : 1;

  return (
    <Box >
      <Card sx={{ minHeight: height }}>
        <CardHeader sx={{ padding: 1 }}
          avatar={
            <Avatar sx={{ backgroundColor: 'white' }}>
              {getFruitIcon(field.cropEngName)}
            </Avatar>
          }
          action={
            <IconButton color='secondary' aria-label="settings" onClick={() => navigate(`/tabs/${src}`)}>
             {/* <HighlightOffRounded sx={{ marginTop: 1, fontSize: 35 }}*/ }
             <Cancel sx={{ margin: 1}} fontSize='large' />
            </IconButton>
          }
          title={
            <Box sx={{backgroundColor: field.statusColor, borderRadius: 1, paddingLeft: 1,paddingRight: 1}} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
              <Typography noWrap variant='h6'>
                {maxLenghtStr(displayFieldName(field), 20)}
              </Typography>
              <Typography noWrap variant='h6'>
                {displayFieldArea(field, user.areaUnit, text)}
              </Typography>
            </Box>
          }
          subheader={
            <Box component={"span"} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
              <Typography noWrap color='secondary' variant='subtitle1' component={"span"}>
                {maxLenghtStr(`${field.cropName},${field.varietyName}`, 22)}
              </Typography>
              <Typography color='secondary' variant='subtitle1' component={"span"}>
                {`${parseDate(field.startDate)}`}
              </Typography>
            </Box>
          }
        />
        <CardContent sx={{ paddingTop: 0, paddingLeft: sidePadding, paddingRight: sidePadding }}>
          {pathname.includes("/info") && <FieldInfo field={field} />}
          {pathname.includes("/dash") && <FieldDashboard />}
          {pathname.includes("/history") && <FieldHistory />}
          {pathname.includes("/imagery") && <FieldImagery field={field} />}
        </CardContent>
      </Card>
      <BottomNavigation sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, paddingTop: 2, paddingBottom: 2, borderTop: 1, borderTopColor: 'lightGray', backgroundColor: 'white', zIndex: 1000 }} value={-1}
        // <BottomNavigation sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} value={value}
        showLabels>
        <BottomNavigationAction
          label={<Typography >{text.details}</Typography>}
          to={`/field/${src}/${fieldId}/info`} component={Link}
          icon={<InfoOutlined fontSize='large' />}
        />
        <BottomNavigationAction
          label={<Typography >{text.dashboard}</Typography>}
          to={`/field/${src}/${fieldId}/dash`} component={Link}
          icon={<DashboardOutlined fontSize='large' />}
        />
        <BottomNavigationAction
          label={<Typography >{text.activities}</Typography>}
          to={`/field/${src}/${fieldId}/history/0`} component={Link}
          icon={<RestoreIcon fontSize='large' />}
        />
      {field.imageryId !== null &&  <BottomNavigationAction
          sx={getBottomNavigationSx(field.imageryId === null)}
          disabled={field.imageryId === null}
          label={<Typography >{text.satellite}</Typography>}
          to={`/field/${src}/${fieldId}/imagery`} component={Link}
          icon={<SatelliteAltOutlined fontSize='large' />}
        />}
        <BottomNavigationAction
         // disabled={field.imageryId === null}
          label={<Typography >{text.scouting}</Typography>}
        //  to={`/field/${src}/${fieldId}/imagery`} component={Link}
          icon={<PestControl fontSize='large' />}
        />
      </BottomNavigation>
    </Box >

  );
}

export default Field
