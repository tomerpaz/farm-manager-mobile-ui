import React from 'react';
import { makeStyles } from '@mui/styles';
import { Divider } from '@mui/material';
import { Typography } from '@mui/material';

import {Field} from 'redux-form'
import {TextField,} from '../../../components/core/form/wrapper';
import {required} from "../../../components/core/form/validation";
import {FormTitle} from '../../../components/core';
import { formRowSpaceBetween } from '../../../utils/FormStyle';
import DecoratedLabel from '../../../components/DecoratedLabel';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex', flex: 1, flexDirection: 'column',
    },
    formRowSpaceBetween: formRowSpaceBetween(theme),
  }));

const SprayFieldsHeader = (props) => {
    const {text, onChange, sprayerCount, areaUnit} = props;

    const displaySprayerCount = !sprayerCount || sprayerCount === 0 ? '0' : sprayerCount.toFixed(1);
    const classes = useStyles();

    return (
        <div>
            <div className={classes.formRowSpaceBetween}>
                    <FormTitle title={text.details}/>
                    <DecoratedLabel text ={`${text.sprayers} ${displaySprayerCount}`} />
            </div>

            <Divider/>
            <div className={classes.formRowSpaceBetween}>
                <Field
                    style={{flex: 1}}
                    name="sprayVolumePerArea"
                    type="number"
                    label={text['sprayVolume'+areaUnit]}
                    component={TextField}
                    validate={required}
                    onChange={onChange}
                />
                <Field
                    style={{flex: 1}}
                    name="totalSprayVolume"
                    type="number"
                    label={text.totalSprayVolume}
                    component={TextField}
                    validate={required}
                    onBlur={onChange} // very important to use onBlur
                />
                <Field
                    style={{flex: 1}}
                    name="sprayerCapacity"
                    type="number"
                    label={text.sprayerCapacity}
                    component={TextField}
                />
                <Field
                    style={{flex: 1}}
                    name="speed"
                    type="number"
                    label={text.speed}
                    component={TextField}
                />
                <Field
                    style={{flex: 1}}
                    name="pto"
                    type="number"
                    label={"PTO"}
                    component={TextField}
                />
                <Field
                    style={{flex: 1}}
                    name="psi"
                    type="number"
                    label={"PSI"}
                    component={TextField}
                />
            </div>
        </div>
    )
}
export default SprayFieldsHeader;
