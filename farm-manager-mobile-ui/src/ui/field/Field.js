import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

import { Box, IconButton, Paper, Typography } from '@mui/material';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { DashboardOutlined, HighlightOffRounded, InfoOutlined, SatelliteAltOutlined } from '@mui/icons-material';
import FieldInfo from './FieldInfo';
import FieldDashboard from './dash/FieldDashboard';
import FieldHistory from './FieldHistory';
import FieldImagery from './FieldImagery';
import { getFruitIcon } from '../../icons/FruitIconUtil';
import { useFieldsById } from '../../features/fields/fieldsApiSlice';
import {  selectCurrentYear, selectLang, setFieldDashboardYear } from '../../features/app/appSlice';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
import { displayFieldArea, displayFieldName, parseDate } from '../FarmUtil';
import { useEffect, useState } from 'react';

const height = (window.window.innerHeight - 120);

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


  console.log(field);

  const paths = [`/field/${src}/${fieldId}/info`,
  `/field/${src}/${fieldId}/dash`,
  `/field/${src}/${fieldId}/history/${page}`,
  `/field/${src}/${fieldId}/imagery`
  ];

  const getIndex = ((element) => element === pathname);





  const value = paths.findIndex(getIndex) > 0 ? paths.findIndex(getIndex) : 0;

  const isHistory = pathname.includes("/history") ? true : false;

  const sidePadding = isHistory ? 0 : 1;

  // const sx = isHistory ? { height: height } : { minHeight: height };
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
              <HighlightOffRounded sx={{ marginTop: 1, fontSize: 35 }} />
            </IconButton>
          }
          title={
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
              <Typography variant='h6'>
                {displayFieldName(field)}
              </Typography>
              <Typography variant='h6'>
                {displayFieldArea(field, user.areaUnit, text)}
              </Typography>
            </Box>
          }
          subheader={
            <Box component={"span"} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
              <Typography color='secondary' variant='subtitle1' component={"span"}>
                {`${field.cropName},${field.varietyName}`}
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


        <BottomNavigation sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} value={value}
          showLabels>
          <BottomNavigationAction
            label={text.details}
            to={`/field/${src}/${fieldId}/info`} component={Link}
            icon={<InfoOutlined />}
          />
          <BottomNavigationAction
            label={text.dashboard}
            to={`/field/${src}/${fieldId}/dash`} component={Link}
            icon={<DashboardOutlined />}
          />
          <BottomNavigationAction
            label={text.activities}
            to={`/field/${src}/${fieldId}/history/0`} component={Link}
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            disabled={field.imageryId === null}
            label={text.satellite}
            to={`/field/${src}/${fieldId}/imagery`} component={Link}
            icon={<SatelliteAltOutlined />}
          />
        </BottomNavigation>
    </Box >

  );
}

export default Field
