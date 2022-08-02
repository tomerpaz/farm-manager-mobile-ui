import React from 'react';
import { makeStyles } from '@mui/styles';
import { asShortStringDateTime } from "../../../utils/DateUtil";
import { Card, CardContent, CardHeader, Button, Avatar } from '@mui/material';
import { isEmpty } from "../../../utils/StringUtil";
import { ACTIVITY_FROM, MAP } from "../../../components/frame/Routes";
import { Table } from '../../../components';
import { getTextAlight } from '../../../utils/StyleUtils';

const useStyles = makeStyles(theme => ({
    card: {
        flex: 1,
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-around',
        background: 'rgba(0, 0, 0, 0.5)'
    },
    avatar: {
        backgroundColor: theme.palette.primary.dark,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)'
    },
    button: {
        color: '#1976d2'
    },
}));


export const infectionLevels = [{ level: 'High', color: '#f44336', dark: '#b71c1c' },
{ level: 'Medium', color: '#ff8f00', dark: '#e65100' },
{ level: 'Low', color: '#ffeb3b', dark: '#f57f17' },
{ level: 'None', color: '#7cb342', dark: '#1b5e20' }]


export function getInfectionLevelColor(infectionLevel, dark) {
    const level = infectionLevels.find(level => infectionLevel === level.level);
    if (level) {
        return dark ? level.dark : level.color;
    }
}
export function getPestMonitorInfectionLevelColor(pestMonitors, dark) {
    let color = null;
    infectionLevels.forEach(level => {
        let val = pestMonitors.find(pm => pm.infectionLevel === level.level);
        if (!color && val) {
            color = dark ? level.dark : level.color;
        }
    })
    return color;
}

export function isMatchInfectionLevel(levelFilter, mapPests, pestMonitors) {
    let result = false;
    const levels = infectionLevels.map(e => e.level);
    const refIndex = levels.indexOf(levelFilter);
    let filtered = pestMonitors.filter(e =>
        refIndex >= levels.indexOf(e.infectionLevel));

    if (filtered && filtered.length > 0 && mapPests.length > 0) {
        result = false;
        const pestIds = mapPests.map(e => e.id);
        filtered = filtered.filter(e => pestIds.includes(e.pest.id));

    }

    if (filtered && filtered.length > 0) {
        result = true;
    }

    return result;
}

const PestMonitorCard = (props) => {

    const classes = useStyles();

    const { pestMonitor, text, history, caller,waypoint , dir} = props;

    const baseUri = caller === MAP ? 'm' : 'c';
    console.log('pestMonitor',pestMonitor)


    const date = Date.parse(waypoint.properties.date);
    const note = waypoint.properties.note

    const act = pestMonitor;
    const docRef = act.docRef;
    const uuid = act.id;

    const activityUrl = `/${baseUri}${ACTIVITY_FROM}${uuid}`

    let columns = [
        {
            name: 'pest', title: text.pest,
            getCellValue: row => row.pest.name,
        },
        {
            name: 'value', title: text.qty,
        },
        {
            name: 'infectionLevel', title: text.infectionLevel,
            getStyle: row => {
                const style = {
                    borderRadius: 3,
                    textAlign: 'center',
                    backgroundColor: getInfectionLevelColor(row.infectionLevel)
                }
                return style;
            },
            getCellValue: row => text[row.infectionLevel]
        },
        {
            name: 'location', title: text.location,
            getCellValue: row => text[row.location]
        },
    ];


    const color = getPestMonitorInfectionLevelColor(pestMonitor.pestMonitors)
    const rows = pestMonitor.pestMonitors;
    return (
        <Card style={{direction: dir, textAlign: getTextAlight(dir), minWidth: 450}} className={classes.card}>
            <CardHeader style={{ backgroundColor: color }}
                avatar={
                    <Avatar className={classes.avatar}>
                        {text.pestMonitorShort}
                    </Avatar>
                }
                action={
                    <Button onClick={() => history.push(activityUrl)} className={classes.button}>
                        {docRef}
                    </Button>
                }
                title={!isEmpty(note) ? note : text.pestMonitor}
                subheader={asShortStringDateTime(date)}
            />
            <CardContent style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0 }}>
                <Table
                    rows={rows}
                    columns={columns}
                    indexKey={true}
                    disableSort={true}
                />
            </CardContent>

        </Card>
    );
}

export default PestMonitorCard;
