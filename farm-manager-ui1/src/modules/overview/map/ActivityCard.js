import React from 'react';
import { makeStyles } from '@mui/styles';



import { asShortStringDate, asShortStringDateTime } from "../../../utils/DateUtil";


import { Card, CardActions, CardContent, Typography, Avatar, CardHeader, Divider, Button } from '@mui/material';

import { ACTIVITY_FROM, DOMAIN, DOMAIN_HISTORY, MAP } from "../../../components/frame/Routes";
import { isEmpty } from "../../../utils/StringUtil";

import { SECONDARY_MAIN, SECONDARY_LIGHT, SECOND_TOP_LINE } from '../../../App';
import { getActivityDisplayText } from '../../activity/ActivityUtil';
import { getTextAlight } from '../../../utils/StyleUtils';

const useStyles = makeStyles(theme => ({
    avatar: {
        backgroundColor: theme.palette.primary.main,
    },
    header: {
        backgroundColor: SECONDARY_LIGHT, 
        borderBottom: '1px solid '+theme.palette.primary.dark
    },
    content: {
        paddingBottom: 0,
       // paddingTop: 0,
    },
    button: {
        color: '#1976d2'
    },
}));

const ActivityCard = (props) => {


    const classes = useStyles();


    const { activity, waypoint, text, history, caller, user, dir } = props;
    const baseUri = caller === MAP ? 'm' : 'c';
    const date = Date.parse(waypoint.properties.date);
    const note = waypoint.properties.note
    const act = activity;
    const activityDisplayDescription = getActivityDisplayText(act, text);
    const docRef = act.docRef;
    const uuid = act.id;
    const activityUrl = `/${baseUri}${ACTIVITY_FROM}${uuid}`
    const type = text[act.type.toLowerCase()]

    return (
        <Card style={{direction: dir, textAlign: getTextAlight(dir), minWidth: 300}} className={classes.card}>
            <CardHeader className={classes.header}
                avatar={
                    <Avatar className={classes.avatar}>
                        {type.charAt(0)}
                    </Avatar>
                }
                action={
                    <Button onClick={() => history.push(activityUrl)} className={classes.button}>
                    {docRef}
                </Button>
                  }
                title={activityDisplayDescription}
                subheader={asShortStringDateTime(date)}
            />
            {!isEmpty(note) && <CardContent className={classes.content}
            >
                <Typography gutterBottom variant="subtitle1" color="textSecondary" component="p">
                    {`${user.firstName} ${user.lastName}:`}
                </Typography>
                <Typography gutterBottom variant="subtitle1"  component="p">
                    {`${note}`}
                </Typography>
            </CardContent>}
        </Card>
    );
}

export default ActivityCard;
