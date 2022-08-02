import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Divider } from '@mui/material';
import YearPicker from "../../../core/picker/YearPicker";
import { getDateYear, asShortStringDate } from "../../../../utils/DateUtil";
import { TextField, DatePicker } from '../../../../components'
import { Button } from '@mui/material';
import { numberFormatter } from '../../../../utils/NunberUtil';

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
        margin: theme.spacing(2),

    },
    inline: {
        display: 'inline',
        fontWeight: 400,
    },
    listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
}));


const PlantationDashboardFieldTable = ({ text, dashboard, onYearChange, dir, areaUnit, weightUnit, setSeasonDataParam, saveSeasonData,
    dashboard: { seasonData: { estimateProducePerAreaUnit, ripe, note }, }
}) => {
    const classes = useStyles();

    const [estimateProduceValue, setEstimateProduceValue] = useState(estimateProducePerAreaUnit ? estimateProducePerAreaUnit : '');
    const [ripeValue, setRipeValue] = useState(ripe);
    const [noteValue, setNoteValue] = useState(note ? note : '');

    useEffect(() => {
        setSeasonDataParam({ key: 'estimateProducePerAreaUnit', value: estimateProduceValue })
    }, [estimateProduceValue]);

    useEffect(() => {
        setSeasonDataParam({ key: 'ripe', value: ripeValue })
    }, [ripeValue]);

    useEffect(() => {
        setSeasonDataParam({ key: 'note', value: noteValue })
    }, [noteValue]);

    useEffect(() => {
        setRipeValue(ripe);
        setEstimateProduceValue(estimateProducePerAreaUnit ? estimateProducePerAreaUnit : '');
        setNoteValue(note ? note : '');
    }, [dashboard.year]);

    const domain = dashboard.domains && dashboard.domains.length > 0 ? dashboard.domains[0] : null;
    return (
        <div className={classes.root}>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>
                <YearPicker dir={dir} value={dashboard.year} onChange={onYearChange} />
            </div>

            {dashboard.field && <List component="nav">
                <ListItem>
                    <ListItemText

                        primary={
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <Typography component="span" style={{ flex: 1 }} variant="h6" >
                                    {`${dashboard.field.name} ${domain && domain.alias ? ' ,' + domain.alias : ''}`}
                                </Typography>
                                <Typography component="span" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }} className={classes.inline}
                                    variant="subtitle1" color='textSecondary'>
                                    {domain && <div>
                                        {domain.variety.category}
                                    </div>}
                                </Typography>
                            </div>
                        }
                    />
                </ListItem>

                <Divider />
                {dashboard.domains && dashboard.domains.map(d => {
                    return (
                        <React.Fragment key={d.id}>
                            <ListItem >
                                <ListItemText
                                    primary={
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <Typography component="span" style={{ flex: 1 }} variant="subtitle1" color="textPrimary">
                                                {getDateYear(d.plant)}

                                            </Typography>
                                            <Typography component="span" style={{ flex: 1 }} variant="subtitle2" color='textSecondary'>
                                                {`${d.plantArea} ${text[areaUnit]}`}
                                            </Typography>
                                            <Typography component="span" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }} variant="subtitle1" color="textSecondary">
                                                <div>
                                                    {d.variety.name}
                                                </div>
                                            </Typography>
                                        </div>
                                    }
                                />
                            </ListItem>
                            <Divider />
                            {d.harvestable &&
                                <React.Fragment>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <div className={classes.listItem}>
                                                    <Typography component="span" variant="subtitle1" color="textPrimary">
                                                        {text.harvestable}
                                                    </Typography>
                                                    <Typography component="span" className={classes.inline} variant="subtitle1" color='textSecondary' style={{ backgroundColor: domain.harvestColor, paddingLeft: 5, paddingRight: 5, borderRadius: 3 }}>
                                                        {asShortStringDate(d.harvestable)}
                                                    </Typography>
                                                </div>
                                            }
                                        />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>}
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <div className={classes.listItem}>
                                            <TextField
                                                onFocus={(e) => e.target.select()}
                                                type="number"
                                                width={160}
                                                value={estimateProduceValue}
                                                onChange={(e) => setEstimateProduceValue(e.target.value)}
                                                placeholder={`${text.expectedProduce}  ${text[weightUnit]}/${text[areaUnit]}`}
                                                label={`${text.expectedProduce}  ${text[weightUnit]}/${text[areaUnit]}`}
                                            />
                                            {estimateProduceValue &&
                                                <Typography component="span" className={classes.inline} variant="subtitle1" color='textSecondary'>
                                                    {`${numberFormatter(estimateProduceValue * domain.plantArea, 0)} ${text[weightUnit]}`}
                                                </Typography>

                                            }
                                        </div>
                                    }
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <DatePicker

                                            clearable={true} value={ripeValue} text={text} onChange={(e) => setRipeValue(e)} placeholder={text.ripeDate}
                                            label={text.ripeDate} />

                                    }
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <TextField
                                            onFocus={(e) => e.target.select()}
                                            // style={{ margin: 0, width: '100%' }}
                                            multiline
                                            rows="2"
                                            // width={300}
                                            value={noteValue}
                                            onChange={(e) => setNoteValue(e.target.value)}
                                            placeholder={text.note}
                                            label={text.note}
                                        />}
                                />
                            </ListItem>
                            <Divider />

                            <ListItem>
                                <ListItemText
                                    primary={
                                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>

                                            <Button variant="outlined" color='primary'
                                                onClick={() => saveSeasonData(domain.id, dashboard.year, dashboard.seasonData)}>
                                                {text.save}
                                            </Button>
                                        </div>}
                                />
                            </ListItem>
                        </React.Fragment>);
                })}


            </List>}

        </div>
    )
}
export default PlantationDashboardFieldTable;
