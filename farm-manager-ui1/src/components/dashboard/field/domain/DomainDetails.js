import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Divider } from '@mui/material';
import { asShortStringDate, diffInDays, newDate } from "../../../../utils/DateUtil";
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

const DomainDetails = ({ text, areaUnit, dashboard, weightUnit, setSeasonDataParam, saveSeasonData,
    dashboard: { seasonData: { estimateProducePerAreaUnit, flash, note } }
}) => {
    const classes = useStyles();

    const domain = dashboard.domains && dashboard.domains.length === 1 ? dashboard.domains[0] : null;
    const [estimateProduceValue, setEstimateProduceValue] = useState(estimateProducePerAreaUnit ? estimateProducePerAreaUnit : '');
    const [flashValue, setFlashValue] = useState(flash);
    const [noteValue, setNoteValue] = useState(note ? note : '');


    useEffect(() => {
        setSeasonDataParam({ key: 'estimateProducePerAreaUnit', value: estimateProduceValue })
    }, [estimateProduceValue]);

    useEffect(() => {
        setSeasonDataParam({ key: 'flash', value: flashValue })
    }, [flashValue]);

    useEffect(() => {
        setSeasonDataParam({ key: 'note', value: noteValue })
    }, [noteValue]);

    return (
        <div className={classes.root}>
            <List component="nav">
                <ListItem>
                    <ListItemText
                        primary={
                            <div className={classes.listItem}>
                                <Typography component="span" variant="h6"   >
                                    {`${domain.field.name} ${domain.alias ? ' ,' + domain.alias : ''}`}
                                </Typography>
                                <Typography component="span" className={classes.inline} variant="subtitle1" color='textSecondary'>
                                    {`${domain.plantArea} ${text[areaUnit]}`}
                                </Typography>
                            </div>
                        }
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText

                        primary={
                            <div className={classes.listItem}>
                                <Typography component="span" variant="subtitle1" color="textPrimary">
                                    {domain.variety.category}
                                </Typography>
                                <Typography component="span" className={classes.inline} variant="subtitle1" color='textSecondary'>
                                    {domain.variety.name}
                                </Typography>
                            </div>
                        }
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText
                        primary={
                            <div className={classes.listItem}>
                                <Typography component="span" variant="subtitle1" color="textPrimary">
                                    {text.sowing}
                                </Typography>
                                <Typography component="span" className={classes.inline} variant="subtitle1" color='textSecondary'>
                                    {asShortStringDate(dashboard.sowing)}
                                </Typography>
                            </div>
                        }
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText
                        primary={
                            <div className={classes.listItem}>
                                <Typography component="span" variant="subtitle1" color="textPrimary">
                                    {text.daysFromSowing}
                                </Typography>
                                <Typography component="span" className={classes.inline} variant="subtitle1" color='textSecondary'>
                                    {dashboard.days}
                                </Typography>
                            </div>
                        }
                    />
                </ListItem>
                <Divider />
                {domain.harvestable &&
                    <React.Fragment>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <div className={classes.listItem}>
                                        <Typography component="span" variant="subtitle1" color="textPrimary">
                                            {text.harvestable}
                                        </Typography>
                                        <Typography component="span" className={classes.inline} variant="subtitle1" color='textSecondary' style={{ backgroundColor: domain.harvestColor, paddingLeft: 5, paddingRight: 5, borderRadius: 3 }}>
                                            {asShortStringDate(domain.harvestable)}
                                        </Typography>
                                    </div>
                                }
                            />
                        </ListItem>
                        <Divider />
                    </React.Fragment>}
                {domain.root && <ListItem>
                    <ListItemText
                        primary={
                            <div className={classes.listItem}>
                                <Typography component="span" variant="subtitle1" color="textPrimary">
                                    {text.endCrop}
                                </Typography>
                                <Typography component="span" className={classes.inline} variant="subtitle1" color='textSecondary'>
                                    {asShortStringDate(domain.root)}
                                </Typography>
                            </div>
                        }
                    />
                </ListItem>}
                <ListItem>
                    <ListItemText
                        primary={
                            <div className={classes.listItem}>
                                <TextField
                                    width={160}
                                    onFocus={(e) => e.target.select()}
                                    type="number"
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
                            <div className={classes.listItem}>
                                <DatePicker
                                    clearable={true} value={flashValue} text={text} onChange={(e) => setFlashValue(e)} placeholder={text.flashDate}
                                    label={text.flashDate} />
                                {flashValue &&
                                    <Typography component="span" className={classes.inline} variant="subtitle1" color='textSecondary'>
                                        {`${diffInDays(flashValue, newDate())} ${text.days}`}
                                    </Typography>

                                }                            </div>

                        }
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText
                        primary={
                            <TextField
                                onFocus={(e) => e.target.select()}
                                multiline
                                rows="2"
                                value={noteValue}
                                onChange={(e) => setNoteValue(e.target.value)}
                                placeholder={text.note}
                                label={text.note}
                            />}
                    />
                </ListItem>
                <Divider />
                {domain.year && <ListItem>
                    <ListItemText
                        primary={
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Button variant="outlined" color='primary'
                                    onClick={() => saveSeasonData(domain.id, domain.year, dashboard.seasonData)}>
                                    {text.save}
                                </Button>
                            </div>}
                    />
                </ListItem>}
            </List>

        </div>
    )
}
export default DomainDetails;