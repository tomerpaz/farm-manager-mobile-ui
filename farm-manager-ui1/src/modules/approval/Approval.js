import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { withRouter } from 'react-router-dom'
import { Loading } from '../../components/core';


import { TopBackBar } from '../../components';
import ApprovalForm from './ApprovalForm';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
}));

const Approval = (props) => {
    const classes = useStyles();
    const {
        clearApproval, getApproval, match: { params: { id } },
         dir, text, history, approval
    } = props;

    
    useEffect(() => {

        getApproval(id);

        return () => {
            console.log('unmount...')
            clearApproval();

        }
    }, []);

    return (
        <div className={classes.root}>
            <TopBackBar dir={dir} label={text.back} history={history} />
            {!approval && <Loading/>}

            {approval && <ApprovalForm initialValues={approval} {...props} />}
        </div>
    )
}
export default withRouter(Approval);



