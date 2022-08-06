import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FmAppBar from '../appbar/FmAppBar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import ActivityForm from '../activity/ActivityForm'
import FieldsMap from '../maps/FieldsMap';
import { Link, Route, Routes, useLocation, matchPath } from 'react-router-dom';
import FieldList from './fields/FieldList';

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


const fabStyle = {
    position: 'absolute',
    bottom: 36,
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


    const {pathname} = useLocation();

    const paths = ['/map', '/fields', '/activities', 130, 44];

    const getIndex  = ((element) => element === pathname  ) ;




   const value =  paths.findIndex(getIndex) > 0 ? paths.findIndex(getIndex)  : 0 ;


     console.log('value',value)



    // const [value, setValue] = useState(0);

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };


    return (
        <Box >


            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                <Tabs value={value} aria-label="basic tabs example"
                    // indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                >
                    {/* <Tab label="Inbox" value="/inbox/:id" to="/inbox/1" component={Link} /> */}
                    <Tab label="MAP" to="/map" component={Link}   {...a11yProps(0)}/>
                    <Tab label="Fields" to="/fields" component={Link} {...a11yProps(1)} />
                    <Tab label="activities" to="/activities" component={Link}  {...a11yProps(2)}/>
                    {/* <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} /> */}
                </Tabs>
            </Box>
            <TabPanel component={'div'} value={value} index={0}>
                <FieldsMap />
                {/* <FloatingActionButtons /> */}

            </TabPanel>
            <TabPanel value={value} index={1}>
                <FieldList/>

            </TabPanel>
            <TabPanel value={value} index={2}>
                <ActivityForm />
                <FloatingActionButtons />

            </TabPanel>
        </Box>
    );
}


export default MainTabs;