import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import Business from '@mui/icons-material/Business';
import Users from '@mui/icons-material/People';
import Extension from '@mui/icons-material/Share';
import User from '@mui/icons-material/Person';
import { DataContainer, height140, } from "../../utils/TabUtils";
import OrganizationForm from "../forms/OrganizationForm";
import UserForm from "../forms/UserForm";

import UsersSettings from "../admin/UsersSettings";
import Interfaces from "../admin/Interfaces";
import { isBusinessAdminFunc } from "../../utils/SystemUtil";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 0,
        fontSize: 50,
        backgroundColor: theme.palette.background.paper,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    tab: {
        textTransform: 'none',
    },
}));



const BusinessSettingTab = (props) => {
    const classes = useStyles();

    const { text, getUsers, users, getAuthorizations, authorizations, crops, sites, toggleAuthorizations, history, user, editUser, selectUser } = props;

    const [value, setValue] = useState('user');


    useEffect(() => {
        history.push(`/settings/${value}`);
    }, [value]);




    if (!user) {
        return <div>Loading</div>
    }

    const isBusinessAdmin = isBusinessAdminFunc(user.role);
    const isAdmin = isBusinessAdmin || user.isAdmin;



    return (
        <div className={classes.root}>
            <Tabs style={{ backgroundColor: 'white', color: 'gray', fontSize: 30 }} value={value}
                onChange={(event, value) => setValue(value)}
                    /*indicatorColor='gray'*/>
                <Tab value='user' className={classes.tab} label={`${user.firstName} ${user.lastName}`} icon={<User />} />
                {isAdmin && <Tab value='organization' className={classes.tab} label={text.organization} icon={<Business />} />}
                {isBusinessAdmin && <Tab value='users' className={classes.tab} label={text.users} icon={<Users />} />}
                {isAdmin && <Tab value='interfaces' className={classes.tab} label={text.interfaces} icon={<Extension />} />}
            </Tabs>

            <DataContainer height={height140}>
                {value === 'user' && <UserForm initialValues={user} text={text} business={user.business} />}
                {value === 'organization' && isAdmin && <OrganizationForm text={text} initialValues={user.business} />}
                {value === 'users' && isBusinessAdmin && <UsersSettings text={text} getUsers={getUsers} users={users}
                    editUser={editUser} selectUser={selectUser}
                    getAuthorizations={getAuthorizations} authorizations={authorizations}
                    sites={sites} crops={crops} toggleAuthorizations={toggleAuthorizations}
                    history={history}
                />}
                {value === 'interfaces' && isAdmin && <Interfaces {...props} />}
            </DataContainer>
        </div>
    );
}

export default BusinessSettingTab;