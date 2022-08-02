import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField } from '../../components'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Delete from '@mui/icons-material/Delete';
import Sync from '@mui/icons-material/Sync';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { Typography } from '@mui/material';
import { renderOptions, renderPerUnitOptions } from "../../components/core/optionsUtil";
import { BORDER_COLOR_DARK } from "../../App";
import { REST_TIMING, ACCOUNT, FREQUENCY, USERNAME, PASSWORD, FERTILIZER_UNIT, WATER_UNIT } from './WaterSysConsts';
import { FERTILIZER_UNITS, WATER_UNITS } from '../../utils';
import { MenuItem } from '@mui/material';
import { SETTING_WIDTH } from './WaterSystemInterface';



const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: theme.spacing(2),
        // minWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },

    textField: {
        width: SETTING_WIDTH
    },

    addAccount: {
        width: SETTING_WIDTH
    },
    button: {
        borderColor: BORDER_COLOR_DARK,
        color: theme.palette.secondary.dark,
        backgroundColor: theme.palette.common.white,
        fontWeight: 700,
        textTransform: 'none',
        margin: theme.spacing(2),
    },
    title: {
        color: theme.palette.common.black,
        fontWeight: 700
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
}));




const IccProSettings = (props) => {
    const classes = useStyles();


    const { system, newWaterSystemConfig,
        settings, text, saveWaterSystemConfig, deleteWaterSystemConfig, waterSources,
        syncWaterSystem, importAccumulations,
    } = props;

    const [newAccount, setNewAccount] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [months, setMonths] = useState(1);
    const [requestSent, setRequestSent] = useState(false);
    const [unlock, setUnlock] = useState('');

    const saveNewAccount = () => {
        newWaterSystemConfig(system, ACCOUNT, newAccount, `${USERNAME}:${newUserName}/${PASSWORD}:${newPassword}`)
        setNewAccount('');
        setNewUserName('');
        setNewPassword('');
    }

    const importWater = (system, months) => {
        importAccumulations(system, months);
        setRequestSent(true);
    }

    const accounts = settings.filter(e => e.type.indexOf(ACCOUNT) > 0)

    const frequency = settings.find(e => e.type.indexOf(FREQUENCY) > 0)
    const waterUnit = settings.find(e => e.type.indexOf(WATER_UNIT) > 0)
    const fertilizerUnit = settings.find(e => e.type.indexOf(FERTILIZER_UNIT) > 0)

    const newAcountDisabled = newAccount.length === 0 || newUserName.length === 0 || newPassword.length === 0;
    const title = system.charAt(0).toUpperCase() + system.slice(1)
    const disabled = unlock !== 'water';
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
                <TextField
                    label={''}
                    className={classes.addAccount}
                    value={unlock}
                    onChange={e => setUnlock(e.target.value)}
                />
                {accounts.map(e => (
                    <ListItem key={e.value} dense  >
                        <ListItemText primary={e.value} />
                        {e.deletable && <ListItemSecondaryAction>
                            <IconButton onClick={() => deleteWaterSystemConfig(e.id)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>}
                    </ListItem>
                ))}
            </List>

            {accounts.length === 0 &&
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        label={'http(s)://ip:port'}
                        className={classes.addAccount}
                        value={newAccount}
                        onChange={e => setNewAccount(e.target.value)
                        }
                    />
                    <TextField
                        label={text.username}
                        className={classes.addAccount}
                        value={newUserName}
                        onChange={e => setNewUserName(e.target.value)
                        }
                    />
                    <TextField
                        label={text.password}
                        className={classes.addAccount}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)
                        }
                    />
                    <div>
                        <Button disabled={newAcountDisabled} variant="outlined" className={classes.button}
                            onClick={saveNewAccount}>
                            {text.add}
                        </Button>
                    </div>
                </div>


            }

            <div>
                <TextField
                    disabled={disabled}
                    select
                    label={text.timing}
                    className={classes.textField}
                    value={frequency ? frequency.value : ''}
                    onChange={(e) => saveWaterSystemConfig(system, FREQUENCY, e.target.value)}
                >
                    {renderOptions(REST_TIMING, text)}
                </TextField>
            </div>

            <div>
                <TextField
                    disabled={disabled}
                    select
                    label={text.water}
                    className={classes.textField}
                    value={waterUnit ? waterUnit.value : ''}
                    onChange={(e) => saveWaterSystemConfig(system, WATER_UNIT, e.target.value)}
                >
                    {renderPerUnitOptions(WATER_UNITS, text)}
                </TextField>
            </div>

            <div>
                <TextField
                    disabled={disabled}
                    select
                    label={text.fertilizer}
                    className={classes.textField}
                    value={fertilizerUnit ? fertilizerUnit.value : ''}
                    onChange={(e) => saveWaterSystemConfig(system, FERTILIZER_UNIT, e.target.value)}
                >
                    {renderPerUnitOptions(FERTILIZER_UNITS, text)}
                </TextField>
            </div>

            {accounts.length > 0 && <div className={classes.row}>

                <TextField
                    disabled={disabled}
                    className={classes.textField}
                    select
                    label={`${text.months}`}
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                >
                    <MenuItem value={0}>{text.currentMonth}</MenuItem>
                    <MenuItem value={1}>{`1 ${text.month}`}</MenuItem>
                    <MenuItem value={2}>{`2 ${text.months}`}</MenuItem>
                    <MenuItem value={3}>{`3 ${text.months}`}</MenuItem>
                    <MenuItem value={4}>{`4 ${text.months}`}</MenuItem>
                    <MenuItem value={5}>{`5 ${text.months}`}</MenuItem>
                    <MenuItem value={6}>{`6 ${text.months}`}</MenuItem>
                </TextField>
                <div>
                    <Button disabled={requestSent || disabled} variant="outlined" className={classes.button}
                        onClick={() => importWater(system, months)}>
                        {text.runNow}
                    </Button>
                </div>
            </div>}
        </div>
    )
}

export default IccProSettings;



