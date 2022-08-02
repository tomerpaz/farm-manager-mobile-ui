import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField } from '../../components'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem'
import Delete from '@mui/icons-material/Delete';
import Sync from '@mui/icons-material/Sync';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import { Typography } from '@mui/material';
import { renderNameIdOptions, renderOptions } from "../../components/core/optionsUtil";
import { BORDER_COLOR_DARK } from "../../App";

const ACCOUNT = 'ACCOUNT';
const FREQUENCY = 'FREQUENCY';
const WATER_COL = 'WATER_COL';
const VALVE_COL = 'VALVE_COL';
const HEADER_COUNT = 'HEADER_COUNT';
const FOOTER_COUNT = 'FOOTER_COUNT';
const DEFAULT_WATER_SOURCE = 'DEFAULT_WATER_SOURCE';

const TALGIL = 'talgil';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: theme.spacing(2),
        minWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },

    textField: {
        width: 200
    },

    addAccount: {
        width: 200
    },
    button: {
        borderColor: BORDER_COLOR_DARK,
        color: theme.palette.secondary.dark,
        backgroundColor: theme.palette.common.white,
        fontWeight: 700,
        textTransform: 'none',
    },
    title: {
        color: theme.palette.common.black,
        fontWeight: 700
    },
}));

const REST_TIMING = ['monthly', 'daily', 'inactive']
const EMAIL_TIMING = ['monthly', 'onEmailReception', 'inactive']
const COLUMN_POSITION = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
const HEADER_FOOTER_COUNT = ['0', '1', '2', '3', '4', '5']

const EmailGenericSettings = (props) => {
    const classes = useStyles();


    const { system, newWaterSystemConfig,
        settings, text, saveWaterSystemConfig, deleteWaterSystemConfig, waterSources,
        syncWaterSystem,
    } = props;

    const [newAccount, setNewAccount] = useState('');

    const saveNewAccount = () => {
        newWaterSystemConfig(system, ACCOUNT, newAccount)
        setNewAccount('');
    }


    const accounts = settings.filter(e => e.type.indexOf(ACCOUNT) > 0)

    const frequency = settings.find(e => e.type.indexOf(FREQUENCY) > 0)
    const waterSource = settings.find(e => e.type.indexOf(DEFAULT_WATER_SOURCE) > 0)

    const waterCol = settings.find(e => e.type.indexOf(WATER_COL) > 0)
    const valveCol = settings.find(e => e.type.indexOf(VALVE_COL) > 0)
    const headerCount = settings.find(e => e.type.indexOf(HEADER_COUNT) > 0)
    const footerCount = settings.find(e => e.type.indexOf(FOOTER_COUNT) > 0)

    const timingOptions = system === TALGIL ? REST_TIMING : EMAIL_TIMING;
    const title = system.charAt(0).toUpperCase() + system.slice(1)
    return (
        <div className={classes.root}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography className={classes.title} variant="h6" gutterBottom>
                    {title}
                </Typography>

                <IconButton onClick={() => syncWaterSystem(system)}>
                    <Sync />
                </IconButton>

            </div>
            <List >
                {accounts.map(e => (
                    <ListItem key={e.value} dense  >
                        <ListItemText primary={e.value} />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => deleteWaterSystemConfig(e.id)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <div style={{ display: 'flex',alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField
                    label={system === TALGIL ? text.addController : text.addEmail}
                    className={classes.addAccount}
                    value={newAccount}
                    onChange={e => setNewAccount(e.target.value)
                    }
                />

                <div>
                    <Button disabled={newAccount.length === 0} variant="outlined" className={classes.button}
                        onClick={saveNewAccount}>
                        {text.add}
                    </Button>
                </div>
            </div>
            <div>
                <TextField
                    select
                    label={text.defaultWaterSource}
                    className={classes.textField}
                    value={waterSource ? Number(waterSource.value) : ''}
                    onChange={(e) => saveWaterSystemConfig(system, DEFAULT_WATER_SOURCE, e.target.value)}
                >
                    {renderNameIdOptions(waterSources)}
                </TextField>
            </div>

            <div>
                <TextField
                    select
                    label={text.timing}
                    className={classes.textField}
                    value={frequency ? frequency.value : ''}
                    onChange={(e) => saveWaterSystemConfig(system, FREQUENCY, e.target.value)}
                >
                    {renderOptions(timingOptions, text)}
                </TextField>
            </div>
            {system !== TALGIL &&
                <div>
                    <TextField
                        select
                        label={text.waterColumn}
                        className={classes.textField}
                        value={waterCol ? waterCol.value : ''}
                        onChange={(e) => saveWaterSystemConfig(system, WATER_COL, e.target.value)}

                    >
                        <MenuItem value="">
                            <em>{text.waterColumn}</em>
                        </MenuItem>
                        {
                            COLUMN_POSITION.map(element => (
                                <MenuItem key={element} value={element}>{element}</MenuItem>))
                        }

                    </TextField>
                    <TextField
                        select
                        label={text.valveColumn}
                        className={classes.textField}
                        onChange={(e) => saveWaterSystemConfig(system, VALVE_COL, e.target.value)}
                        value={valveCol ? valveCol.value : ''}
                    >
                        <MenuItem value="">
                            <em>{text.valveColumn}</em>
                        </MenuItem>
                        {
                            COLUMN_POSITION.map(element => (
                                <MenuItem key={element} value={element}>{element}</MenuItem>))
                        }
                    </TextField>

                    <TextField
                        select
                        label={text.headerRows}
                        className={classes.textField}
                        onChange={(e) => saveWaterSystemConfig(system, HEADER_COUNT, e.target.value)}
                        value={headerCount ? headerCount.value : ''}
                    >
                        <MenuItem value="">
                            <em>{text.headerRows}</em>
                        </MenuItem>
                        {
                            HEADER_FOOTER_COUNT.map(element => (
                                <MenuItem key={element} value={element}>{element}</MenuItem>))
                        }
                    </TextField>

                    <TextField
                        select
                        label={text.footerRows}
                        className={classes.textField}
                        onChange={(e) => saveWaterSystemConfig(system, FOOTER_COUNT, e.target.value)}
                        value={footerCount ? footerCount.value : ''}
                    >
                        <MenuItem value="">
                            <em>{text.footerRows}</em>
                        </MenuItem>
                        {
                            HEADER_FOOTER_COUNT.map(element => (
                                <MenuItem key={element} value={element}>{element}</MenuItem>))
                        }
                    </TextField>
                </div>
            }


        </div>
    )
}

export default EmailGenericSettings;



