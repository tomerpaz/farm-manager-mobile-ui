import React, { Fragment } from 'react'
import { Avatar, List, ListItem, ListItemText, ListItemAvatar, Box, Typography, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectActivityFreeTextFilter, selectActivityTypeFilter, selectEndDateFilter, selectLang, selectStartDateFilter } from '../../features/app/appSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetActivitiesFieldQuery } from '../../features/activities/activitiesApiSlice';
import Loading from '../../components/Loading';
import ListPager from '../../components/ui/ListPager';
import ActivityTypeIcon from '../../icons/ActivityTypeIcon';
import ActivitiesFilter from '../../components/filters/ActivitiesFilter';
import { activityDescription, buildActiviyFilter, parseDate } from '../FarmUtil';

const FieldHistory = () => {
  const { fieldId, page, src } = useParams()
  const navigate = useNavigate();

  const height = window.innerHeight - 275;

  const maxResult = 20;
  const isPlan = false;
  const orderBy = 'execution';
  const dir = 'desc';
  const text = useSelector(selectLang)

  const startDateFilter = useSelector(selectStartDateFilter);
  const endDateFilter = useSelector(selectEndDateFilter);
  const activityTypeFilter = useSelector(selectActivityTypeFilter);
  const activityFreeTextFilter = useSelector(selectActivityFreeTextFilter);
  const filter = buildActiviyFilter(startDateFilter, endDateFilter, activityTypeFilter, activityFreeTextFilter);

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetActivitiesFieldQuery({ fieldId, page, maxResult, isPlan, orderBy, dir, filter })


  if (!data || isLoading) {
    return <Loading />
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
                  {`${activityDescription(e, text)}`}
                </Typography>
                <Typography>
                  {`${e.reference}`}
                </Typography>
              </Box>
            } secondary={parseDate(e.execution)} />
          </ListItem>
          <Divider />
        </Fragment>
      )
    }
  }

  return (
    <Box>
      <List sx={{ height, overflow: 'auto', width: '100%', bgcolor: 'background.paper' }}>
        {renderRows()}
      </List>
      <ListPager bottom={70} page={Number(page)} totalPages={data.totalPages} setPage={(value) => navigate(`/field/${src}/${fieldId}/history/${value}`)} />
      <ActivitiesFilter />
    </Box>
  )
}

export default FieldHistory