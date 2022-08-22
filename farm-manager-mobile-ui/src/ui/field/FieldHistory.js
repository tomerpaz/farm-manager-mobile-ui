import React, { Fragment, useState } from 'react'
import { Avatar, List, ListItem, ListItemText, ListItemAvatar, Box, Button, Typography, Divider } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useSelector } from 'react-redux';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';
import { selectLang } from '../../features/auth/authSlice';
import { useParams } from 'react-router-dom';
import { useGetActivitiesFieldQuery, useGetActivitiesFlatQuery } from '../../features/activities/activitiesApiSlice';
import Loading from '../../components/Loading';
import ListPager from '../../components/ui/ListPager';
import ActivityTypeIcon from '../../icons/ActivityTypeIcon';

const FieldHistory = () => {
  const [page, setPage] = useState(0);
  const { fieldId } = useParams()

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
    // if(!text[e.type]){
    //     console.log(e.type)
    // }

    return e.activityDef ? e.activityDef.name : text[e.type.toLowerCase()];
  }

  //console.log('FieldHistory',data)



  const renderRows = () => {
    if (isSuccess && data) {
      const activities = data.content;

      return activities.map(e =>

        <Fragment key={e.id}>
          <ListItem >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'white' }}>
                <ActivityTypeIcon type={e.type} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={activityDescription(e)} secondary={e.execution} />
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
      <ListPager dir={dir} page={page} totalPages={data.totalPages} setPage={setPage} />
    </Box>
  )
}

export default FieldHistory