import React, { Fragment } from 'react';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText'
import { Divider } from '@mui/material';
import Person from '@mui/icons-material/Person';
import { height140 } from "../../../utils/TabUtils";


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        minWidth: 250,
        maxHeight: height140,
        height: height140,
        overflow: 'auto',
    },
    selected: {
        backgroundColor: theme.palette.secondary.light,
    }
}));



function UsersList(props) {
    const classes = useStyles();
    const { text, users, username, onSelect } = props;
    return (
        <List className={classes.root} subheader={<li />}>
            <ListSubheader>{text.users}</ListSubheader>
            {
                users.map(user =>
                    <Fragment key={user.username} >
                        <ListItem className={username === user.username ? classes.selected : null} button onClick={() => onSelect(user)}>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                        </ListItem>
                        <Divider />
                    </Fragment>
                )
            }
        </List>
    );
}

export default UsersList;