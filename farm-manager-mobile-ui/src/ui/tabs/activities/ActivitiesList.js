import React, { Fragment, useState } from 'react'
import { Avatar, List, ListItem, ListItemText, ListItemAvatar, Box, Button, Typography, Divider } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useSelector } from 'react-redux';
import { getActivitiesState, useGetActivitiesFlatQuery } from '../../../features/activities/activitiesApiSlice';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';
import { selectLang } from '../../../features/auth/authSlice';

const ActivitiesList = () => {


    const [page, setPage] = useState(0);

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
            const activities = data.ids.map(id => data.entities[id]);

            console.log('activities: ', activities)

            return activities.map(e =>

                <Fragment>
                    <ListItem key={e.uuid}>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
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
            <Box margin={1}
                display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'}
            >
                <Button disabled={page === 0} onClick={() => setPage(page - 1)} color='secondary' variant="outlined" disableElevation>
                    {dir === 'rtl' ? <ChevronRightOutlined /> : <ChevronLeftOutlined />}
                </Button>
                {/* <Typography>
                        {selectedDate}
                    </Typography>
                    <CloudOutlined />*/}
                <Typography>
                    {page + 1}
                </Typography>
                <Button onClick={() => setPage(page + 1)} color='secondary' variant="outlined" disableElevation>
                    {dir === 'rtl' ? <ChevronLeftOutlined /> : <ChevronRightOutlined />}
                </Button >
            </Box>
        </Box>
    )
}

export default ActivitiesList