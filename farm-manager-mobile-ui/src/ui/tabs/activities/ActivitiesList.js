import React, { Fragment, useEffect } from 'react'
import { Avatar, List, ListItem, ListItemText, ListItemAvatar, Box, Button, Typography, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetActivitiesFlatQuery } from '../../../features/activities/activitiesApiSlice';
import { selectActivityFreeTextFilter, selectActivityPlanStatusFilter, selectActivityPlanTypeFilter, selectActivityStatusFilter, selectActivityTypeFilter, selectEndDateFilter, selectLang, selectStartDateFilter } from '../../../features/app/appSlice';
import ListPager from '../../../components/ui/ListPager';
import Loading from '../../../components/Loading';
import ActivityTypeIcon from '../../../icons/ActivityTypeIcon';
import { useNavigate, useParams } from 'react-router-dom';
import ActivitiesFilter from '../../../components/filters/ActivitiesFilter';
import { EXECUTED, PLAN, activityDescription, buildActiviyFilter, parseDate } from '../../FarmUtil';
import { EXECUTE_STATUS_COLOR, PLAN_STATUS_COLOR } from '../../activity/form/header/ActivityHeaderView';

const getColor = (s) => {
    if (PLAN === s) {
        return PLAN_STATUS_COLOR
    } else if (EXECUTED === s) {
        return EXECUTE_STATUS_COLOR;
    }
    return null;

}

const gerStatus = (s, text) => {
    if (s) {
        return `(${text[s.toLowerCase()]})`;
    }
    return null
}

const ActivitiesList = ({ plans }) => {
    const { page } = useParams()
    const navigate = useNavigate();

    const height = window.innerHeight - 180;
    const maxResult = 20;
    const isPlan = plans;
    const orderBy = 'execution';
    const dir = 'desc';


    const startDateFilter = useSelector(selectStartDateFilter);
    const endDateFilter = useSelector(selectEndDateFilter);

    const typeFilter = useSelector(isPlan ? selectActivityPlanTypeFilter : selectActivityTypeFilter);

    const status = useSelector(isPlan ? selectActivityPlanStatusFilter : selectActivityStatusFilter);

    const activityFreeTextFilter = useSelector(selectActivityFreeTextFilter);
    const filter = buildActiviyFilter(startDateFilter, endDateFilter, typeFilter, activityFreeTextFilter, status);

    // useEffect(() => {
    //     if (page !== 0) {
    //         navigate(`/tabs/activities/0`)
    //     }
    // }, [activityFreeTextFilter]);

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetActivitiesFlatQuery({ page, maxResult, isPlan, orderBy, dir, filter })

    const text = useSelector(selectLang)


    if (!data || isLoading) {
        return <Loading />
    }



    const renderRows = () => {
        if (isSuccess) {
            const activities = data.content;
            return activities.map(e =>
                <Fragment key={e.uuid}>
                    <ListItem onClick={() => navigate(`/activity/al/${e.uuid}`)}

                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'white' }}>
                                <ActivityTypeIcon type={e.type} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={
                            <Box display={'flex'} flexDirection={'row'} flex={1} justifyContent={'space-between'}>
                                <Typography >
                                    {`${activityDescription(e, text)} ${e.fieldDesc}`}
                                </Typography>
                                <Typography whiteSpace={'nowrap'}  >
                                    {`${e.reference}`}
                                    {e.status && <Box component={'span'} padding={0.5}></Box>}
                                    {e.status && <Box borderRadius={1} backgroundColor={getColor(e.status)} component={'span'}>{gerStatus(e.status, text)}</Box>}
                                </Typography>
                            </Box>

                        } secondary={parseDate(e.execution)}




                        />
                    </ListItem>
                    <Divider />
                </Fragment>
            )
        }
    }

    return (
        <Box display={'flex'} flex={1}>
            <List sx={{ height, overflow: 'auto', width: '100%', bgcolor: 'background.paper' }}>
                {renderRows()}
            </List>
            <ListPager bottom={0} dir={dir} page={Number(page)} totalPages={data.totalPages} setPage={(value) => navigate(`/tabs/${isPlan ? 'plans' : 'activities'}/${value}`)} />
            <ActivitiesFilter />
        </Box>
    )
}

export default ActivitiesList