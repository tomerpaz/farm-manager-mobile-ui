import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import UserList from "./UserList";
import UsersSettingTabs from "./UsersSettingTabs";
import { height160 } from "../../../utils/TabUtils";
import { loadDataByName, _crops, _sites, _tags } from '../../../utils/LoadUtil';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    paper: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        borderRadius: 4,
        height: height160
    },
    spacer: {
        padding: theme.spacing(1),
    }
}));

const UsersSettings = (props) => {
    const classes = useStyles();
    const { getAuthorizations, selectUser, editUser, text, users, sites, crops, authorizations, toggleAuthorizations, history, userTags,
        getUserTags, genericTags, setTagsAuthorizations, tagsAuthorizations } = props;

    useEffect(() => {
        getAuthorizations();
        loadDataByName(props, [_sites, _crops, _tags]);

    }, [])

    const handleChangeUser = (user) => {
        selectUser(null);
        if (user) {
            setTimeout(() => {
                selectUser(user);
                getUserTags(user.username);
            }, 50);
        }
    };

    return (
        <div className={classes.container}>
            <UserList text={text} users={users} username={editUser ? editUser.username : null}
                onSelect={handleChangeUser} />
            <div className={classes.spacer}></div>
            {editUser &&
                <UsersSettingTabs text={text} user={editUser} sites={sites} crops={crops}
                    authorizations={authorizations} cancelAction={handleChangeUser}
                    toggleAuthorizations={toggleAuthorizations}
                    history={history} userTags={userTags}
                    genericTags={genericTags}
                    setTagsAuthorizations={setTagsAuthorizations} tagsAuthorizations={tagsAuthorizations}
                    {...props}
                />
            }
        </div>
    )
}

export default UsersSettings;


