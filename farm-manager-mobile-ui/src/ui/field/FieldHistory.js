import React, { Fragment, useState } from 'react'
import { Avatar, List, ListItem, ListItemText, ListItemAvatar, Box, Button, Typography, Divider } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useSelector } from 'react-redux';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';
import { selectLang } from '../../features/app/appSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetActivitiesFieldQuery, useGetActivitiesFlatQuery } from '../../features/activities/activitiesApiSlice';
import Loading from '../../components/Loading';
import ListPager from '../../components/ui/ListPager';
import ActivityTypeIcon from '../../icons/ActivityTypeIcon';
import ActivitiesFilter from '../../components/filters/ActivitiesFilter';

const FieldHistory = () => {
  const { fieldId, page, src } = useParams()
  const navigate = useNavigate();

  const height = window.window.innerHeight - 270;

  const maxResult = 20;
  const isPlan = false;
  const orderBy = 'execution';
  const dir = 'desc';
  const text = useSelector(selectLang)

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetActivitiesFieldQuery({ fieldId, page, maxResult, isPlan, orderBy, dir })


  if (!data || isLoading) {
    return <Loading />
  }


  const activityDescription = (e) => {
    return e.activityDef ? e.activityDef.name : text[e.type.toLowerCase()];
  }

  const renderRows = () => {
    if (isSuccess && data) {
      const activities = data.content;

      return activities.map(e =>

        <Fragment key={e.id}>
          <ListItem onClick={() => navigate(`/activity/fh/${e.uuid}`)}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'white' }}>
                <ActivityTypeIcon type={e.type} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={
              < Box display={'flex'} flexDirection={'row'} flex={1} justifyContent={'space-between'}>
                <Typography >
                  {`${activityDescription(e)}`}
                </Typography>
                <Typography>
                  {`${e.reference}`}
                </Typography>
              </Box>
            } secondary={e.execution} />
          </ListItem>
          <Divider />
        </Fragment>
      )
    }
  }

  return (
    <Box >

      <List sx={{ height, overflow: 'auto', width: '100%', bgcolor: 'background.paper' }}>
        {renderRows()}

      </List>
      <ListPager dir={dir} page={Number(page)} totalPages={data.totalPages} setPage={(value) => navigate(`/field/${src}/${fieldId}/history/${value}`)} />
      <ActivitiesFilter />
    </Box>
  )
}

export default FieldHistory