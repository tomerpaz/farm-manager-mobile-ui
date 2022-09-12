import Box from '@mui/material/Box';
import { useLocation, useParams } from 'react-router-dom';
import { selectCurrentToken } from '../features/app/appSlice';
import { useSelector } from 'react-redux';
import PublicBar from './content/PublicBar';
import MapBar from './content/MapBar';
import FieldsBar from './content/FieldsBar';
import ActivitiesListBar from './content/ActivitiesListBar';
import ActivityViewBar from './content/ActivityViewBar';
import FieldViewBar from './content/FieldViewBar';

const AppBar = () => {

  const { pathname } = useLocation();
  const { fieldId, src } = useParams()
  const token = useSelector(selectCurrentToken);

  if (!token) {
    return <Box sx={{ flexGrow: 1 }}>
      <PublicBar />
    </Box>
  }

  const RenderBar = () => {
    return (
      <>
        {pathname.includes('/tabs/map') && <MapBar />}
        {pathname.includes('/tabs/fields') && <FieldsBar />}
        {pathname.includes('/tabs/activities/') && <ActivitiesListBar plans={false} />}
        {pathname.includes('/tabs/plans/') && <ActivitiesListBar plans={false} />}
        {pathname.includes('/activity/') && <ActivityViewBar />}
        {pathname.includes(`/field/${src}/${fieldId}/dash`) && <FieldViewBar share={false} years={true}/>}
        {pathname.includes(`/field/${src}/${fieldId}/info`) && <FieldViewBar share={true} layers={true} />}
        {pathname.includes(`/field/${src}/${fieldId}/imagery`) && <FieldViewBar share={true}  ayers={true} />}
        {pathname.includes(`/field/${src}/${fieldId}/history`) && <ActivitiesListBar plans={false} />}
      </>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <RenderBar />
    </Box>
  )
}

export default AppBar;
