import React, { Fragment, useState } from 'react'
import { Avatar, List, ListItem, ListItemText, ListItemAvatar, Box, Button, Typography, Divider } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useSelector } from 'react-redux';
import { getActivitiesState, useGetActivitiesFlatQuery } from '../../../features/activities/activitiesApiSlice';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';
import { selectLang } from '../../../features/auth/authSlice';
import ListPager from '../../../components/ui/ListPager';
import Loading from '../../../components/Loading';
import ActivityTypeIcon from '../../../icons/ActivityTypeIcon';
import { PRIMARY_MAIN } from '../../../App';
import { useNavigate } from 'react-router-dom';

const ActivitiesList = () => {


    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    const height = window.window.innerHeight - 180;

    const maxResult = 20;
    const isPlan = false;
    const orderBy = 'execution';
    const dir = 'desc';

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetActivitiesFlatQuery({ page, maxResult, isPlan, orderBy, dir })

    const text = useSelector(selectLang)


    if (!data || isLoading) {
        return <Loading />
    }
    // useEffect(() => {
    //     if (isSuccess) {
    //         
    //         dispatch(setFields(fieldsData));
    //     }

    // }, [data, isLoading, isSuccess, isError])

    const activityDescription = (e) => {
        // if(!text[e.type]){
        //     console.log(e.type)
        // }
        return e.activityDef ? e.activityDef.name : text[e.type.toLowerCase()];
    }

    const renderRows = () => {
        if (isSuccess) {
            const activities = data.content;

            //   console.log('activities: ', activities)

            return activities.map(e =>

                <Fragment key={e.uuid}>
                    <ListItem onClick={()=>navigate(`/activity/al/${e.uuid}`)}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'white' }}>
                                <ActivityTypeIcon type={e.type}/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={activityDescription(e) + ' ' + e.fieldDesc} secondary={e.execution} />
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

export default ActivitiesList