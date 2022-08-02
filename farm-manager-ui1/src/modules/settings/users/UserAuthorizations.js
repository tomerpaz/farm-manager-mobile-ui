import { FormRoot, FormRow } from '../../../utils/StyleUtils';
import UserCropSiteAuthorizations from './UserCropSiteAuthorizations';
import UserTags from './UserTags';
import { Box } from '@mui/material';
import { isArrayEmpty } from '../../../components/filters/filterUtil';
import { Checkbox } from '../../../components';

const UserAuthorizations = (props) => {

    const { text, genericTags, setTagsAuthorizations, tagsAuthorizations, userTags } = props;
    const hasGenericTags = !isArrayEmpty(genericTags)
    const showTags = hasGenericTags && tagsAuthorizations;

    return (
        <FormRoot>
            {hasGenericTags &&
                <FormRow >
                    <Box flex={1} />
                    <Checkbox sideMargin={1} label={`${text.tags}`} checked={tagsAuthorizations} onChange={e => setTagsAuthorizations(!tagsAuthorizations)} />
                </FormRow>
            }
            {!showTags && <UserCropSiteAuthorizations {...props} />}
            {showTags && userTags && <UserTags tags={genericTags} userTags={userTags} {...props} />}

        </FormRoot>
    )
}
export default UserAuthorizations;