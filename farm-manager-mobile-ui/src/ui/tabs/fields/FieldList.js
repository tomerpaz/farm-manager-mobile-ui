import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, } from 'react-window';
import { Divider, ListItemAvatar, Avatar, BottomNavigation, BottomNavigationAction, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { getFruitIcon } from '../../../icons/FruitIconUtil';
import { useSelector } from 'react-redux';
import { selectCurrentYear, selectFieldFreeTextFilter, selectLang } from '../../../features/app/appSlice';
import { useFields } from '../../../features/fields/fieldsApiSlice';
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice';
import { displayFieldArea, displayFieldName, filterFields } from '../../FarmUtil';
import FieldsFilter from '../../../components/filters/FieldsFilter';


function renderRow(props) {
    const { index, style, field, areaUnit, text } = props;

    const cropEngName = field.cropEngName
    return (
        <Box style={style}>

            <ListItem key={index} component={"div"} disablePadding 
            // secondaryAction={
            //     <IconButton edge="end" aria-label="delete">
            //         <DeleteIcon />
            //     </IconButton>
            // }
            >
                <ListItemButton to={`/field/fields/${field.id}/info`} component={Link}>
                    <ListItemAvatar>
                        <Avatar sx={{backgroundColor:'white'}}>
                            {getFruitIcon(cropEngName)}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                            <Typography>
                                {displayFieldName(field)}
                            </Typography>
                            <Typography>
                                {displayFieldArea(field, areaUnit, text)}
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
    const height = window.window.innerHeight - 110;


    
    const { data: user } = useGetUserDataQuery()

    const year = useSelector(selectCurrentYear);

    const fields = useFields(year)

    const text =  useSelector(selectLang)

    const freeText = useSelector(selectFieldFreeTextFilter);

    const displayFields = filterFields(fields, freeText);

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
            direction={text.dir}
                height={height}

                itemSize={70}
                itemCount={displayFields.length}
                overscanCount={5}
            >
                {(props) => renderRow({ ...props, field: displayFields[props.index], areaUnit: user.areaUnit,  text: text })}

            </FixedSizeList>
            {fields && <FieldsFilter fields={fields} />}
        </Box>
    );
}
