import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFormState } from "react-hook-form";
import { getSuggestionsNameId } from '../../../components/core';
import { FormRow } from '../../../utils/StyleUtils';
import { Autocomplete, FormActions } from '../../../components';

const UserTags = (props) => {
    const { text, tags, user, saveUserTags, userTags, onSubmitSuccess } = props;

    const { register, control, handleSubmit, reset, getValues,

        // formState: { errors, isDirty, isSubmitting, touchedFields, submitCount, isSubmitSuccessful } 
    } = useForm({
        defaultValues: {
            usertags: tags.filter(e => userTags.includes(e.id)),
        }
    });

    const { dirtyFields, isSubmitSuccessful, isDirty, isSubmitting } = useFormState({
        control
    });
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(getValues());
        }

    }, [isSubmitSuccessful]);

    
    const onSubmit = data => {
        saveUserTags(user.username, data.usertags.map(e => e.id));
    }

    const cancelAction = () => {
        if(isDirty){
            reset();
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
                <Controller
                    name="usertags"
                    control={control}
                    render={({ field }) => {
                        delete field.ref
                        return <Autocomplete name="userags" options={getSuggestionsNameId(tags)} isMulti={true} placeholder={text.tags} {...field} />
                    }}
                />
            </FormRow>
            {/* {dirtyFields.usertags && <p>Field is dirty.</p>} */}

            {/* <ContainedButton disabled={!isDirty} type="submit" >{text.save}</ContainedButton> */}


            <FormActions
                text={text}
                editable={true}
                deletable={false}
                cancelAction={cancelAction}
                deleteAction={null}
                pristine={!isDirty}
                submitting={isSubmitting}
            />
        </form >

    );
};


export default UserTags;




