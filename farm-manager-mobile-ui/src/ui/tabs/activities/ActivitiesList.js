import React, { Fragment, useState } from 'react'
import { Avatar, List, ListItem, ListItemText, ListItemAvatar, Box, Button, Typography, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetActivitiesFlatQuery } from '../../../features/activities/activitiesApiSlice';
import { selectActivityTypeFilter, selectEndDateFilter, selectLang, selectStartDateFilter } from '../../../features/app/appSlice';
import ListPager from '../../../components/ui/ListPager';
import Loading from '../../../components/Loading';
import ActivityTypeIcon from '../../../icons/ActivityTypeIcon';
import { useNavigate, useParams } from 'react-router-dom';
import ActivitiesFilter from '../../../components/filters/ActivitiesFilter';
import { isStringEmpty, parseDate } from '../../FarmUtil';


const buildActiviyFilter = (start, end, activityType) => {
    const filter = [];
    if(!isStringEmpty(start)){
        filter.push(`start_${start.replaceAll('-','')}`)

    }
    if(!isStringEmpty(end)){
        filter.push(`end_${end.replaceAll('-','')}`)
    }
    if(!isStringEmpty(activityType)){
        filter.push(`activityType_${activityType}`)
    }
    return filter;
}



const ActivitiesList = () => {


    const { page } = useParams()
    const navigate = useNavigate();

    const height = window.window.innerHeight - 180;
    const maxResult = 20;
    const isPlan = false;
    const orderBy = 'execution';
    const dir = 'desc';


    const startDateFilter = useSelector(selectStartDateFilter);
    const endDateFilter = useSelector(selectEndDateFilter);
    const activityTypeFilter = useSelector(selectActivityTypeFilter);

    
    const filter = buildActiviyFilter(startDateFilter,endDateFilter, activityTypeFilter);
    console.log('filter pp',filter);

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetActivitiesFlatQuery({ page, maxResult, isPlan, orderBy, dir , filter})

    const text = useSelector(selectLang)


    if (!data || isLoading) {
        return <Loading />
    }

    const activityDescription = (e) => {
        return e.activityDef ? e.activityDef.name : text[e.type.toLowerCase()];
    }

    const renderRows = () => {
        if (isSuccess) {
            const activities = data.content;
            return activities.map(e =>
                <Fragment key={e.uuid}>
                    <ListItem onClick={() => navigate(`/activity/al/${e.uuid}`)}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'white' }}>
                                <ActivityTypeIcon type={e.type} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={
                            <Box display={'flex'} flexDirection={'row'} flex={1} justifyContent={'space-between'}>
                                <Typography >
                                    {`${activityDescription(e)} ${e.fieldDesc}`}
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
        <Box >
            <List sx={{ height, overflow: 'auto', width: '100%', bgcolor: 'background.paper' }}>
                {renderRows()}
            </List>
            <ListPager dir={dir} page={Number(page)} totalPages={data.totalPages} setPage={(value) => navigate(`/tabs/activities/${value}`)} />
            <ActivitiesFilter />
        </Box>
    )
}

export default ActivitiesList