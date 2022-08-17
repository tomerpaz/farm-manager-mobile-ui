import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, } from 'react-window';
import { Divider, ListItemAvatar, Avatar, BottomNavigation, BottomNavigationAction, IconButton, Typography } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import List from '@mui/icons-material/List';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';


function renderRow(props) {
    const { index, style, field } = props;
    const cropEngName = field.cropEngName
    return (
        <Box style={style}>

            <ListItem key={index} component="div" disablePadding
            // secondaryAction={
            //     <IconButton edge="end" aria-label="delete">
            //         <DeleteIcon />
            //     </IconButton>
            // }
            >
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <WorkIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                            <Typography>
                                {`${field.name}`}
                            </Typography>
                            <Typography>
                                {`${field.area}`}
                            </Typography>
                        </Box>
                    }
                        secondary={
                            <Box component={"span"} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                                <Typography component={"span"}>
                                    {`${field.cropName},${field.varietyName}`}
                                </Typography>
                                <Typography component={"span"}>
                                    {`${field.startDate}`}
                                </Typography>
                            </Box>
                        }
                    />
                </ListItemButton>
            </ListItem>
            <Divider />
        </Box>
    );
}


export default function FieldList(props) {
    const height = window.screen.height - 280;
    const [value, setValue] = React.useState(0);


    const { fields } = props;


    // const renderRow = (props) => {
    //     const { index, style } = props;
    //     return (
    //         <Box>
    //             <ListItem key={index} component="div" disablePadding

    //                 secondaryAction={
    //                     <IconButton edge="end" aria-label="delete">
    //                         <DeleteIcon />
    //                     </IconButton>
    //                 }
    //             >
    //                 <ListItemButton>
    //                     <ListItemAvatar>
    //                         <Avatar>
    //                             <WorkIcon />
    //                         </Avatar>
    //                     </ListItemAvatar>
    //                     <ListItemText primary={`${fields[index].name}, ${fields[index].cropName},${fields[index].varietyName}`} secondary={fields[index].startDate} />
    //                 </ListItemButton>
    //             </ListItem>
    //             <Divider />


    //         </Box>
    //     );
    // }

    return (
        <Box
            sx={{ width: '100%', height: height, bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                height={height}

                itemSize={70}
                itemCount={fields.length}
                overscanCount={5}
            >
                {(props) => renderRow({ ...props, field: fields[props.index] })}

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
