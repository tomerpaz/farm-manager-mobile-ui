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
                    <Typography>{children}</Typography>
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
    bottom: 16,
    right: 16,
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
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <FmAppBar />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                    // indicatorColor="secondary"
                    textColor="inherit"
                    backgroundColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <FieldsMap />
                <FloatingActionButtons />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
                <FloatingActionButtons />

            </TabPanel>
            <TabPanel value={value} index={2}>
                <ActivityForm />
            </TabPanel>
        </Box>
    );
}


export default MainTabs;