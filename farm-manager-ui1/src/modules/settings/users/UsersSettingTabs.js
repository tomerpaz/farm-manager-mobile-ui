import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { Box } from '@mui/material';
import UserForm from '../../../components/forms/UserForm';
import UserAuthorizations from './UserAuthorizations';
import { height220 } from '../../../utils';
import { withRouter } from 'react-router-dom';
// import UserTags from './UserTags';


const UsersSettingTabs = (props) => {
    const { text, user, editUser, sites, authorizations, crops, toggleAuthorizations, history, cancelAction, match: { params: { module } },
        userTags, genericTags, tagsAuthorizations, setTagsAuthorizations, saveUserTags } = props;

    const value = module ? module : 'details';//history.location.pathname.indexOf('authorizations') > -1 ? 'authorizations' : 'details'


    return (
        <Box flex={1} backgroundColor={'white'}>
            <Tabs value={value}
                onChange={(event, value) => history.push(`/settings/users/${value}`)}>
                <Tab value='details' label={text.userDetails} />
                <Tab value='authorizations' label={text.authorizations} />
                {/* <Tab value='tags' label={text.tags} /> */}

            </Tabs>

            {user &&
                <div>
                    {value === 'details' && <UserForm business={editUser.business} {...props} height={height220} initialValues={editUser} text={text} cancelAction={cancelAction} />}
                    {value === 'authorizations' &&

                        <UserAuthorizations userTags={userTags}
                            saveUserTags={saveUserTags}
                            crops={crops} sites={sites} text={text}
                            authorizations={authorizations}
                            tagsAuthorizations={tagsAuthorizations} setTagsAuthorizations={setTagsAuthorizations}
                            toggleAuthorizations={toggleAuthorizations} user={editUser} genericTags={genericTags} />}

                </div>
            }
        </Box>
    );
}

//export default UsersSettingTabs;
export default withRouter(UsersSettingTabs);