
import { useEffect } from "react";

import { useForm, Controller, useFormState } from "react-hook-form";
import { FormTitle, renderTypeOptions } from "../../../components/core";
import { FormActions, TextField, Autocomplete } from '../../../components'
import { FormRoot, FormRow } from '../../../utils/StyleUtils';
import { deleteRef } from "../../../components/core/form/FormUtil";
import { hasError } from "../../../components/forms/ValidationUtil";
import { INVENTORY_TYPES } from "../../../reducers/InventoryReducer";
import { ACCESSORY, FERTILIZER, PESTICIDE, VARIETY } from "../../activity/types";



const ResourceExternalCodeForm = (props) => {

    const { text, defaultValues: { deletable, id }, clearInventoryUpdate,
        deleteInventoryUpdate, user, defaultValues, saveResourceExternalCode, pesticideOptions, fertilizerOptions, varietyResourceOptions, accessoryOptions } = props;
    const { control, handleSubmit, getValues, watch, useWatch, setValue } = useForm({ defaultValues });
    const { errors, isDirty, isSubmitting } = useFormState({ control });


    const getOptions = (resourceType) => {

        if (resourceType) {
            if (resourceType === PESTICIDE) {
                return pesticideOptions;
            } else if (resourceType === FERTILIZER) {
                return fertilizerOptions;
            } else if (resourceType === VARIETY) {
                return varietyResourceOptions;
            } else if (resourceType === ACCESSORY) {
                return accessoryOptions;
            }
        }
        return [];
    }



    const resourceType = watch("resourceType"); // you can supply default value as second argument
    const resource = watch("resource");
    // useEffect(() => {
    //     console.log('resourceType',resourceType)
    //     setValue('resource','')
    //   }, [resourceType]);


    useEffect(() => {
        const subscription = watch((value, { name, type }) => console.log(value, name, type));
        return () => subscription.unsubscribe();
    }, [watch]);


    const handleChange = () => {
        const values = getValues();
        console.log('handleChange')

        // Do something with values, in my case I have used the 'setActiveFilter' function above.
    };


    // useEffect(() => {
    //     // const subscription = watch(() => handleSubmit(onSubmit)());
    //     // return () => subscription.unsubscribe();
    //     console.log('watch')
    // }, [watch]);

    const onResourceTypeChange = () => {
        // const subscription = watch(() => handleSubmit(onSubmit)());
        // return () => subscription.unsubscribe();
        //    console.log('resourceType',resourceType)
        console.log('resource', resource)
        // if (resource && resource.element.type !== resourceType) {
        //     setValue("resource", '');
        // }
        setValue("resource", '');
    };

    return (
        <form onSubmit={handleSubmit(saveResourceExternalCode)}>
            <FormRoot>
                <FormTitle title={text.inventoryUpdate} />
                <FormRow>
                    <Controller
                        name="resourceType"
                        // onChange={(value) => console.log(1, value)}
                        // onChange={onResourceTypeChange}

                        control={control}
                        render={({ field }) => <TextField select label={text.type}
                            {...deleteRef(field)} >{renderTypeOptions(INVENTORY_TYPES, text, true)}</TextField>
                        }
                    />
                    <Controller
                        name="resource"
                        control={control}
                        rules={{ required: true }}

                        render={({ field }) =>
                            <Autocomplete

                                error={hasError(errors.resource)}
                                options={getOptions(resourceType).filter(e => e.element.active)}
                                isMulti={false}
                                placeholder={text.resource}
                                label={text.resource} {...deleteRef(field)} />
                        }
                    />
                    <Controller
                        name="code"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <TextField error={hasError(errors.code)} label={text.code} {...deleteRef(field)} />}
                    />
                </FormRow>
                <FormActions
                    text={text}
                    editable={true}
                    deletable={deletable}
                    cancelAction={clearInventoryUpdate}
                    deleteAction={() => deleteInventoryUpdate(id)}
                    pristine={!isDirty}
                    submitting={isSubmitting}
                />
            </FormRoot>
        </form >
    )
}
export default ResourceExternalCodeForm;

