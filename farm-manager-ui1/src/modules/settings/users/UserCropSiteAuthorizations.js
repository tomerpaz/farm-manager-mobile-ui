import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Box, Checkbox } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader'
import { height290 } from "../../../utils/TabUtils";


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        // justifyContent: 'space-between'
    },
    list: {
        backgroundColor: theme.palette.background.paper,
        maxHeight: height290,
        overflow: 'auto',
        paddingRight: 20
    },
}));


const options = [
    { type: 'ENFORCE_AUTHORIZATION', text: 'enableUserAuthorizations' },
    { type: 'WORKER_TARIFF', text: 'visibleWorkerTariff' },
    { type: 'CONTRACTOR_TARIFF', text: 'visibleContractorTariff' },

]


const UserAuthorizations = (props) => {
    const classes = useStyles();


    const { crops, sites, text, authorizations, toggleAuthorizations, user } = props;
    const color = Boolean(authorizations.find(a => user.username === a.user && 'ENFORCE_AUTHORIZATION' === a.type)) ? 'primary' : 'secondary';

    return (
        <div className={classes.container}>

            <List className={classes.list}>
                <ListSubheader>{text.options}</ListSubheader>
                {options.map(e => (
                    <Fragment key={e.type}>
                        <ListItem button onClick={() => toggleAuthorizations({ type: e.type, user: user.username })}
                            key={e.type}
                            role={undefined}
                            dense

                        >
                            <Checkbox
                                checked={Boolean(authorizations.find(a => user.username === a.user && e.type === a.type))}
                                disableRipple
                                color={color}
                            />
                            <ListItemText primary={text[e.text]} />
                        </ListItem>
                    </Fragment>

                ))}
            </List>
            <Box flex={1} />
            <List className={classes.list}>
                <ListSubheader>{text.crops}</ListSubheader>
                {crops.map(crop => (
                    <Fragment key={crop.id}>
                        <ListItem
                            key={crop.id}
                            role={undefined}
                            dense
                            button
                            onClick={() => toggleAuthorizations({ type: 'CROP', user: user.username, value: crop.id })}
                        >
                            <Checkbox
                                checked={Boolean(authorizations.find(a => user.username === a.user && 'CROP' === a.type && a.value === crop.id))}
                                disableRipple
                                color={color}
                            />
                            <ListItemText primary={crop.alias} />
                        </ListItem>
                    </Fragment>

                ))}
            </List>
            <Box flex={1} />

            <List className={classes.list}>
                <ListSubheader>{text.sites}</ListSubheader>
                {sites.map(site => (
                    <ListItem
                        key={site.id}
                        role={undefined}
                        dense
                        button
                        onClick={() => toggleAuthorizations({ type: 'SITE', user: user.username, value: site.id })}
                    >
                        <Checkbox checked={Boolean(authorizations.find(a => user.username === a.user && 'SITE' === a.type && a.value === site.id))}
                            disableRipple
                            color={color}
                        />
                        <ListItemText primary={site.name} />
                    </ListItem>
                ))}
            </List>
            <Box flex={1} />

        </div>
    )
}

export default UserAuthorizations;


