import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { AddButton } from '../../components';
import { formRow } from '../../utils/FormStyle';
import { Switch, IconButton, Tooltip, Badge, FormControlLabel, Checkbox } from '@mui/material';
import { DragHandle, FormatAlignJustify, LocalShipping, Delete } from '@mui/icons-material';
import { HARVEST, MARKET, PERCENTAGE_ACTIVITIES, DUPLICATE_FIELD_ACTIVTIES } from "./types";
import { Field } from 'redux-form'
import { TextField } from '../../components/core/form/wrapper';
import { renderTypeOptions } from "../../components/core/optionsUtil";
import { sumBy } from 'lodash';
import { TextField as MuiTextField } from '../../components'
import Percentage from '../../icons/Percentage';


const useStyles = makeStyles(theme => ({
    formRow: formRow(theme),
    spacer: {
        padding: theme.spacing(1)
    },
    spacer2: {
        padding: theme.spacing(4)
    },
    iconButton: {
        paddingTop: theme.spacing(1)
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
    }

}));

export function getTitleQty(props) {
    const { activityType, text, currency, areaUnit, activityDomains, activityArea } = props;
    const totalArea = activityArea ? activityArea.toFixed(2) : 0;

    if (activityType === HARVEST) {
        const netWeight = sumBy(activityDomains.filter(d => d.netWeight), 'netWeight');
        return `${text.total}: ${!netWeight || isNaN(netWeight) ? 0 : netWeight.toFixed(0)} ${text.kg}`
    } else if (activityType === MARKET) {
        const totalRedemption = Number(sumBy(activityDomains, 'totalRedemption'));
        return `${text.income}: ${isNaN(totalRedemption) ? 0 : totalRedemption.toFixed(0)} ${text[currency]}`
    }
    return `${text.total}: ${totalArea} ${text[areaUnit]}`
}


export const DomainHedaerStart = (props) => {

    const { handleClickOpenFields, text, activityDomains, expendFieldTable,
        handleExpendFieldTable, handleClickOpenWaybill, activityType, marketMethods, baseFields, setBaseFields } = props;
    const classes = useStyles();

    return (
        <div className={classes.formRow} >
            <AddButton onClick={handleClickOpenFields} label={text.fields} />
            <FormControlLabel
                control={<Checkbox checked={baseFields} onChange={()=>setBaseFields(!baseFields)} color='primary'/>}
                label={text.baseFields}
            />
            <div className={classes.iconButton}>
                <IconButton onClick={handleExpendFieldTable}>
                    <Badge badgeContent={activityDomains.length} color="primary">
                        {expendFieldTable ? <DragHandle /> : <FormatAlignJustify />}
                    </Badge>
                </IconButton>
            </div>
            {activityType === MARKET &&
                <Fragment>
                    <div className={classes.iconButton}>
                        <Tooltip title={text.waybill}>
                            <IconButton onClick={handleClickOpenWaybill} >
                                <LocalShipping />
                            </IconButton>
                        </Tooltip>
                    </div>

                    <Field name="marketMethod"
                        select
                        component={TextField}
                        width={130}
                        label={text.incomeCalculateMethod}>
                        {renderTypeOptions(marketMethods, text, true, 'None')}
                    </Field>
                    <div style={{ flex: 1 }}></div>

                </Fragment>
            }

        </div>
    )
}

export const DomainHeaderEnd = (props) => {
    const { text, activityType, setApplyAll, applyAll, change, activityDomains, setCalcActivityArea } = props;
    const classes = useStyles();
    const [percentage, setPercentage] = useState('');
    const [percentageDisabled, setPercentageDisabled] = useState(true);
    const [init, setInit] = useState(true);

    useEffect(() => {
        //        if (!init) {
        setPercentageDisabled(isNaN(percentage) || percentage < 0.1);
        // } else {
        //     setInit(false);
        // }
    }, [percentage])


    const savePercentage = () => {
        if (!isNaN(Number(percentage))) {
            activityDomains.forEach((e, index, arr) => {
                change(`activityDomains[${index}].activityArea`, Number(((e.plantArea * Number(percentage)) / 100).toFixed(2)));
            });
            setPercentage('');
            setCalcActivityArea(true);
        }
    }

    return (
        <div className={classes.formRow} >
            <div style={{ flex: 1 }}></div>
            {activityType === MARKET && <FormControlLabel style={{ padding: 0 }}
                control={
                    <Switch
                        checked={applyAll}
                        onChange={e => setApplyAll(e.target.checked)}
                        color="primary"
                    />
                }
                label={text.applyAll}
            />}

            {PERCENTAGE_ACTIVITIES.includes(activityType) &&
                <div className={classes.flexRow}>
                    <MuiTextField
                        width={60}
                        type="number"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                    />
                    <div className={classes.iconButton}>
                        <IconButton disabled={percentageDisabled} onClick={savePercentage}>
                            <Percentage />
                        </IconButton>
                    </div>
                </div>
            }
            <div className={classes.iconButton}>
                <IconButton onClick={e => change(`activityDomains`, [])}>
                    <Delete />
                </IconButton>
            </div>
            <div className={DUPLICATE_FIELD_ACTIVTIES.includes(activityType) ? classes.spacer2 : classes.spacer} />
        </div>
    )
}