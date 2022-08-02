import React, { useEffect } from 'react';
import { Tab, Tabs } from '@mui/material';
import { withRouter } from 'react-router-dom'
import { Link, Business, People as Users, Share as Extension, Person as User, VpnKey as Password } from '@mui/icons-material';
import { DataContainer, height140, height160, TabsBox } from "../../utils/TabUtils";
import OrganizationForm from "../../components/forms/OrganizationForm";
import { UserForm } from "../../components/forms";
import PasswordForm from '../../components/forms/PasswordForm';
import UsersSettings from "./users/UsersSettings";
import Interfaces from "./Interfaces";
import LinkMasterDetails from "./links/LinkMasterDetails";
import { isBusinessAdminFunc } from "../../utils/SystemUtil";
import { INTERFACES, ORGANIZATION, SETTINGS_TABS, USER, USERS, PASSWORD, URLS } from "../../components/frame/Routes";
import { isArrayEmpty } from '../../components/filters/filterUtil';


const BusinessSettingTab = (props) => {
    const {
        text, getUsers, users, getAuthorizations,
        authorizations, crops, sites, toggleAuthorizations, history, user,
        getCrops, getSites,
        editUser, selectUser, match: { params: { subTab } }, isInspector,
    } = props;


    useEffect(() => {
        getUsers();
    }, [])

    if (!user) {
        return <div>Loading</div>
    }

    const isBusinessAdmin = isBusinessAdminFunc(user.role);
    const isAdmin = (isBusinessAdmin || user.isAdmin) && !isInspector;
    const isLinks = !isInspector;

    return (
        <TabsBox>
            <Tabs
                value={subTab}
                onChange={(event, value) => history.push(`${SETTINGS_TABS}${value}`)}
                scrollButtons="auto">
                <Tab value={USER}
                    label={`${user.firstName} ${user.lastName}`} icon={<User />} />
                <Tab value={PASSWORD}
                    label={text.password} icon={<Password />} />
                {isLinks && <Tab value={URLS}
                    label={text.links} icon={<Link />} />}
                {isAdmin && <Tab value={ORGANIZATION}
                    label={text.organization} icon={<Business />} />}
                {isBusinessAdmin && !isArrayEmpty(users) && <Tab value={`${USERS}`}
                    label={text.users} icon={<Users />} />}
                {isAdmin && <Tab value={INTERFACES}
                    label={text.interfaces} icon={<Extension />} />}
            </Tabs>

            <DataContainer height={height140}>
                {subTab === USER &&
                    <UserForm initialValues={user} text={text} business={user.business} {...props} />
                }

                {subTab === PASSWORD &&
                    <PasswordForm text={text} {...props} />
                }
                {subTab === ORGANIZATION && isAdmin && <OrganizationForm text={text} initialValues={user.business} />}
                {subTab === USERS && isBusinessAdmin && <UsersSettings text={text} users={users}
                    editUser={editUser} selectUser={selectUser}
                    getAuthorizations={getAuthorizations}
                    authorizations={authorizations}
                    sites={sites} crops={crops}
                    getSites={getSites} getCrops={getCrops}
                    toggleAuthorizations={toggleAuthorizations}
                    history={history}
                    {...props}

                />}
                {subTab === INTERFACES && isAdmin && <Interfaces {...props} />}
                {subTab === URLS && isLinks && <LinkMasterDetails {...props} />}

            </DataContainer>
        </TabsBox>
    );

}

export default withRouter(BusinessSettingTab);