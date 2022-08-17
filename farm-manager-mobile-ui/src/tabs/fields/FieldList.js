import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, } from 'react-window';
import { Divider, ListItemAvatar, Avatar, BottomNavigation, BottomNavigationAction, IconButton } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import List from '@mui/icons-material/List';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';




export default function FieldList(props) {
    const height = window.screen.height - 280;
    const [value, setValue] = React.useState(0);


    const { fields } = props;


    const renderRow = (props) => {
        const { index, style } = props;
    console.log(fields[index]);
        return (
            <Box>
                <ListItem key={index} component="div" disablePadding
    
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar>
                                <WorkIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`${fields[index].name}, ${fields[index].cropName},${fields[index].varietyName}`} secondary={fields[index].startDate} />
                    </ListItemButton>
                </ListItem>
                <Divider />
    
    
            </Box>
        );
    }

    return (
        <Box
            sx={{ width: '100%', height: height, bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                height={height}

                itemSize={46}
                itemCount={fields.length}
                overscanCount={5}
            >
                {renderRow}
            </FixedSizeList>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="List" icon={<List />} />
                <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Archive" icon={<LocationOnIcon />} />
            </BottomNavigation>
        </Box>
    );
}
