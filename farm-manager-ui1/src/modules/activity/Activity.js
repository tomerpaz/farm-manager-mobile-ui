import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import NewActivityTypeSelector from './NewActivityTypeSelector';
import { withRouter } from 'react-router-dom'
import { Loading } from '../../components/core';
import { loadDataByName } from '../../utils/LoadUtil';
import ActivityForm from './ActivityForm_';
import { TopBackBar } from '../../components';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
}));

const ActivityBase = (props) => {
    const classes = useStyles();
    const {
        getActivity,  match: { params: { id, mode } },
        dir, text, history, activity
    } = props;

    
    useEffect(() => {

        loadDataByName(props, ['executors', 'warehouses', 'fields', 'activityDefs', 'customers', 'containers', 'products', 'crops', 'pests', 'energies' ]);
        if (!activity && id && id !== '0') {
            getActivity(id, mode);
        }

    }, [])

    return (
        <div className={classes.root}>
            <TopBackBar dir={dir} label={text.back} history={history} />
            {Number(id) === 0 && !activity && <NewActivityTypeSelector {...props} />}
            {Number(id) !== 0 && !activity && <Loading />}
            {activity && <ActivityForm initialValues={activity} {...props} />}
        </div>
    )
}
export default withRouter(ActivityBase);
