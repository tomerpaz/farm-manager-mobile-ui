import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Alert, AlertTitle } from '@mui/material';
import { Button, Typography } from '@mui/material';
import { TopBackBar, YesNoDialog } from '../../components';
import { backRoot } from '../../utils/StyleUtils';
import { asShortStringDate } from '../../utils';
import { EXECUTOR_TYPES, EQUIPMENT } from '../../reducers/ResourceReducer';
import { ACTIVITY_FROM, ALERTS, FERTILIZEHUB, PLAN_FROM, RESOURCES_TABS_EQUIPMENT, RESOURCES_TABS_EXECUTORS, UTILITIES_TABS, WATERSYS_ICCPRO, WATERSYS_TALGIL } from '../../components/frame/Routes';
import { ICCPRO_ACCOUNT, TALGIL_ACCOUNT } from '../watersys/WaterSysConsts';
import { isEmpty } from '../../utils/StringUtil';
import { UI } from '../utilities/alerts/AlertTable';
import { formRowSpaceBetween } from '../../utils/FormStyle';

const useStyles = makeStyles((theme) => ({
    root: backRoot(theme),
    items: {
        margin: theme.spacing(2),
        // padding: theme.spacing(2),

        // width: '100%',
        // '& > * + *': {
        //     marginTop: theme.spacing(2),
        // },
        // backgroundColor: 'white'
    },
    spacer: {
        margin: theme.spacing(1),

    },
    buttons: {
        display: 'flex',
        flexDirection: 'row'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,

    },
    title: {
        display: 'flex',
        marginTop: theme.spacing(1),
        justifyContent: 'center',
        alignItems: 'center'

    }
}));

function renderNotificationText(e, text) {
    if (e.valve) {
        return `${text.cropEndedOn}: ${asShortStringDate(e.valve.domain.root)}`;
    } else if (e.resource) {
        return `${e.msg}: ${asShortStringDate(e.date)}`;
    } else if (e.fertilizerHub) {
        return `${text.validThrough}: ${asShortStringDate(e.date)}`;
    } else if (e.activity) {
        return `${text.planOverdue}: ${asShortStringDate(e.date)}`;
    } else if (e.inactiveValveCount) {
        return `${text.inactive}: ${e.inactiveValveCount} ${e.irrigationSystem} `
    } else if (e.alert) {
        if (isEmpty(e.alert.note)) {
            return `${text.date}: ${asShortStringDate(e.date)}`;
        } else {
            return `${e.alert.note}: ${asShortStringDate(e.date)}`;
        }
    } else if (e.msg) {
        return `${e.msg}: ${asShortStringDate(e.date)}`;
    }
}

function renderNotificationTitle(e, text) {
    if (e.valve) {
        return `${text.valve}: ${e.valve.name}, ${text.field}: ${e.valve.domain.field.name}`
    } else if (e.resource) {
        return e.resource.name;
    } else if (e.fertilizerHub) {
        return `${text.fertilizerHub}: ${e.fertilizerHub.name}`
    } else if (e.activity) {
        return `${e.activity.description}`
    } else if (e.inactiveValveCount) {
        return `${text.valves}`
    } else if (e.alert) {
        return `${e.alert.name}`
    } else if (e.title) {
        return `${e.title}`
    }
}


const Notifications = (props) => {

    const classes = useStyles();
    const { notifications, dir, history, text, selectExecutor, selectEquipment, selectValve, selectFertilizerHub, setWarnMessage, setActiveValves, selectAlert, deleteAlert, setExecutedAlert, setNevigateOnCritical } = props;

    const [actionFlag, setActionFlag] = useState(null)
    const [actionFlagParam, setActionFlagParam] = useState(null)
    const [actionTitle, setActionTitle] = useState(null)
    const [actionBody, setActionBody] = useState(null)
    const [actionYes, setActionYes] = useState(null)

    const doActionFlag = (e) => {
        // console.log(e);
        if (e === true) {
            if ("setExecutedAlert" === actionFlag) {
                setExecutedAlert(actionFlagParam.alert.id)
            } else if ("deleteAlert" === actionFlag) {
                deleteAlert(actionFlagParam.alert.id);
            }
        }
        setActionFlag(null);
        setActionFlagParam(null);
    }
    const doAction = (e, execute) => {

        if (e.resource) {
            if (EXECUTOR_TYPES.includes(e.resource.type)) {
                selectExecutor(e.resource)
                history.push(RESOURCES_TABS_EXECUTORS)
            } else if (EQUIPMENT === e.resource.type) {
                selectEquipment(e.resource)
                history.push(RESOURCES_TABS_EQUIPMENT)
            }
        } else if (e.valve) {
            selectValve(e.valve)
            if (e.valve.account.type === TALGIL_ACCOUNT) {
                history.push(WATERSYS_TALGIL)
            }
            if (e.valve.account.type === ICCPRO_ACCOUNT) {
                history.push(WATERSYS_ICCPRO)
            }
        } else if (e.fertilizerHub) {
            selectFertilizerHub(e.fertilizerHub)
            history.push(FERTILIZEHUB)
        } else if (e.activity) {
            if (execute) {
                setWarnMessage(text.executePlan);
                history.push(`/e${ACTIVITY_FROM}${e.activity.id}`)
            } else {
                history.push(`/t${PLAN_FROM}${e.activity.id}`)
            }
        } else if (e.inactiveValveCount) {
            setActiveValves('inactive')
            if (TALGIL_ACCOUNT.includes(e.irrigationSystem)) {
                history.push(WATERSYS_TALGIL)
            }
            if (ICCPRO_ACCOUNT.includes(e.irrigationSystem)) {
                history.push(WATERSYS_ICCPRO)
            }
        } else if (e.alert) {
            if (e.alert.source === UI) {
                if (execute) {
                    setActionTitle(e.alert.name);
                    setActionYes(text.executed);
                    setActionBody(e.alert.note);
                    setActionFlag("setExecutedAlert");
                    setActionFlagParam(e)
                } else {
                    e.alert.deletable = true;
                    selectAlert(e.alert)
                    history.push(`${UTILITIES_TABS}${ALERTS}`);
                }
            } else if ('delete' === e.action) {
                setActionTitle(text.deleteFormTitle);
                setActionYes(text.delete);
                setActionBody(text.deleteFormBody);
                setActionFlag('deleteAlert')
                setActionFlagParam(e)
            }
        } else if (e.uri) {
            history.push(e.uri);

        }

    }

    const Actions = (e) => {
        if (e.activity || (e.alert && e.alert.source === UI)) {
            const label = e.activity ? text.executePlan : text.executed;
            return (
                <div className={classes.buttons}>
                    <Button variant='outlined' color="inherit" onClick={() => doAction(e, true)} >
                        {label}
                    </Button>
                    <div className={classes.spacer}></div>

                    <Button variant='outlined' color="inherit" onClick={() => doAction(e)} >
                        {text.update}
                    </Button>
                </div >
            )
        } else {
            return (
                <Button variant='outlined' color="inherit" onClick={() => doAction(e)} >
                    {!isEmpty(text[e.action]) ? text[e.action] : text.update}
                </Button>
            )
        }
    }

    useEffect(() => {
        setNevigateOnCritical(false);
    }, []);

    const syetemNotifications = notifications && notifications.notifications ? notifications.notifications.system : null;
    const activityNotifications = notifications && notifications.notifications ? notifications.notifications.activities : null;
    const alertNotifications = notifications && notifications.notifications ? notifications.notifications.alerts : null;

    return (
        <div className={classes.root}>
            <TopBackBar dir={dir} label={text.back} history={history} />
            <div className={classes.row} >
                {syetemNotifications &&
                    <div className={classes.column} >
                        <div className={classes.title}>
                            <Typography variant="h6" >{text.system}</Typography>
                        </div>
                        {syetemNotifications.map((e, index) =>
                            <Alert key={index} severity={e.severity} variant='filled' className={classes.items}
                                action={Actions(e)}>
                                <AlertTitle> {renderNotificationTitle(e, text)}</AlertTitle>
                                {renderNotificationText(e, text)}
                            </Alert>
                        )
                        }
                    </div>
                }
                {activityNotifications &&
                    <div className={classes.column} >
                        <div className={classes.title}>
                            <Typography variant="h6" >{text.activities}</Typography>
                        </div>
                        {
                            activityNotifications.map((e, index) =>
                                <Alert key={index} severity={e.severity} variant='filled' className={classes.items}
                                    action={Actions(e)}>
                                    <AlertTitle> {renderNotificationTitle(e, text)}</AlertTitle>
                                    {renderNotificationText(e, text)}
                                </Alert>
                            )
                        }
                    </div>
                }
                {alertNotifications &&
                    <div className={classes.column} >
                        <div className={classes.title}>
                            <Typography variant="h6" >{text.notifications}</Typography>
                        </div>
                        {
                            alertNotifications.map((e, index) =>
                                <Alert key={index} severity={e.severity} variant='filled' className={classes.items}
                                    action={Actions(e)}>
                                    <AlertTitle> {renderNotificationTitle(e, text)}</AlertTitle>
                                    {renderNotificationText(e, text)}
                                </Alert>
                            )
                        }
                    </div>
                }
                {actionFlagParam && <YesNoDialog open={actionFlagParam != null}
                    action={(e) => doActionFlag(e)}
                    title={actionTitle}
                    body={actionBody}
                    yesText={actionYes}
                    noText={text.cancel} />}
            </div>
        </div>
    );
}

export default Notifications;