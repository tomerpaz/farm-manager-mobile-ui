import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ActivityForm from '../../activity/ActivityForm'
import FieldsMap from './map/FieldsMap';
import { Link, Route, Routes, useLocation, matchPath } from 'react-router-dom';
import FieldList from './fields/FieldList';

import { DEFAULT_ROUTE } from "../../App";
import { selectFields } from '../../features/fields/fieldSlice';
import ActivitiesList from './activities/ActivitiesList';

function TabPanel(props) {
    const { children, value, index, ...other } = props;


    // const [getFields] = useGetFieldsQuery;

    // console.log('getFields',getFields)




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


const fabStyle = {
    position: 'absolute',
    bottom: 80,
    right: 24,
};


function FloatingActionButtons() {
    return (
        <Fab color="primary" aria-label="add" sx={fabStyle}>
            <AddIcon />
        </Fab>
    );
}


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const MainTabs = () => {

    const { pathname } = useLocation();

    const paths = ['/tabs/map', '/tabs/fields', '/tabs/activities', 130, 44];

    const getIndex = ((element) => element === pathname);


    // const {
    //     data,
    //     isLoading,
    //     isSuccess,
    //     isError,
    //     error
    // } = useGetFieldsByYearQuery(user.year)


    // if(!data){
    //     return <div>Loding</div>
    // }

    // const fields = data.ids.map(id=>data.entities[id]);

    //   console.log('fields',fields)


    const value = paths.findIndex(getIndex) > 0 ? paths.findIndex(getIndex) : 0;


    //    console.log('value', value)



    return (
        <Box display={'flex'} flex={1} flexDirection={'column'}>


            <Box alignItems={'stretch'} display={'flex'} flex={1} flexDirection={'column'} sx={{ borderBottom: 1, borderColor: 'divider' }}>

                <Tabs value={value} aria-label="basic tabs example"
                    // indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                >
                    {/* <Tab label="Inbox" value="/inbox/:id" to="/inbox/1" component={Link} /> */}
                    <Tab label="MAP" to={DEFAULT_ROUTE} component={Link}   {...a11yProps(0)} />
                    <Tab label="Fields" to="/tabs/fields" component={Link} {...a11yProps(1)} />
                    <Tab label="activities" to="/tabs/activities" component={Link}  {...a11yProps(2)} />
                    {/* <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} /> */}
                </Tabs>
            </Box>
            <TabPanel component={'div'} value={value} index={0}>
                <FieldsMap />
                <FloatingActionButtons />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FieldList />
                <FloatingActionButtons />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ActivitiesList />
                <FloatingActionButtons />

            </TabPanel>
        </Box>
    );
}


export default MainTabs;