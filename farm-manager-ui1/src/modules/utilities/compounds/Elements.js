import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { AddButton } from '../../../components';
import { Delete } from '@mui/icons-material';
import { formStyle } from '../../../utils/FormStyle';
import { Field, } from 'redux-form'
import { TextField } from '../../../components/core/form/wrapper';
import { IconButton, Typography } from '@mui/material';
import { required } from '../../../components/forms/ValidationUtil';
import { renderNameIdOptions } from '../../../components/core';

const useStyles = makeStyles(theme => formStyle(theme));


const Elements = ({ text, ingredients, fields, meta: { error, submitFailed } }) => {
    const classes = useStyles();

    return (


        <div>
            <AddButton onClick={() => fields.unshift("elements", { ratio: 1 })} label={text.ingredient} />
            {submitFailed && error && <Typography display='inline' color={'error'}>{text.required}</Typography>}
            {fields.map((e, index) => (
                <div key={index}> 
                    <Field name={`${e}.resource.id`}
                        width={200}
                        select
                        component={TextField}
                        placeholder={text.ingredient}
                        validate={required}
                    >
                        {renderNameIdOptions(ingredients, true)}
                    </Field>

                    <Field
                        width={200}
                        name={`${e}.ratio`}
                        type="number"
                        component={TextField}
                        label={text.percent}
                        validate={required}
                        placeholder={text.percent}
                    />
                    <IconButton onClick={() => fields.remove(index)}>
                        <Delete />
                    </IconButton>

                </div>
            ))}
        </div>
    )
}
export default Elements;



