import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FieldsMap from './map/FieldsMap';
import { Link, useLocation, useParams } from 'react-router-dom';
import FieldList from './fields/FieldList';
import { DEFAULT_ROUTE } from "../../App";
import ActivitiesList from './activities/ActivitiesList';
import { selectLang } from '../../features/app/appSlice';
import { useSelector } from 'react-redux';
import ActionFab from '../../components/ui/ActionFab';
import { useGetUserDataQuery } from '../../features/auth/authApiSlice';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box >
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MainTabs = () => {

    const { pathname } = useLocation();
    const { page } = useParams()
    const text = useSelector(selectLang)
    const paths = ['/tabs/map', '/tabs/fields', `/tabs/activities/${page}`, `/tabs/plans/${page}`];
    const getIndex = ((element) => element === pathname);
    const value = paths.findIndex(getIndex) > 0 ? paths.findIndex(getIndex) : 0;
    const { data: user } = useGetUserDataQuery()

    return (
        <Box display={'flex'} flex={1} flexDirection={'column'}>
            <Box alignItems={'stretch'} display={'flex'} flex={1} flexDirection={'column'} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} aria-label="basic tabs example"
                    // indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                >
                    <Tab label={text.map} to={DEFAULT_ROUTE} component={Link}   {...a11yProps(0)} />
                    <Tab label={text.fields} to="/tabs/fields" component={Link} {...a11yProps(1)} />
                    <Tab label={text.activities} to="/tabs/activities/0" component={Link}  {...a11yProps(2)} />
                    {/* {user.usePlans && <Tab label={text.plans} to="/tabs/plans/0" component={Link}  {...a11yProps(2)} />} */}
                </Tabs>
            </Box>
            <TabPanel component={'div'} value={value} index={0}>
                <FieldsMap />
                <ActionFab map={true} plan={false} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FieldList />
                <ActionFab plan={false} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ActivitiesList plans={false}/>
                <ActionFab bottom={80} plan={false} />
            </TabPanel>
            {/* {user.usePlans &&   <TabPanel value={value} index={3}>
                <ActivitiesList plans={true}/>
                <ActionFab bottom={80} plan={true} />
            </TabPanel>} */}
        </Box>
    );
}


export default MainTabs;