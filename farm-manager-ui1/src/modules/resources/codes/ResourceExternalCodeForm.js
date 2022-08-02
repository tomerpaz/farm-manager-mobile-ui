
import { useForm, Controller, useFormState } from "react-hook-form";
import { FormTitle } from "../../../components/core";
import { FormActions, TextField, Autocomplete } from '../../../components'
import { FormRoot, FormRow } from '../../../utils/StyleUtils';
import { deleteRef } from "../../../components/core/form/FormUtil";
import { hasError } from "../../../components/forms/ValidationUtil";

const ResourceExternalCodeForm = (props) => {

    const { text, defaultValues: { deletable, id }, clearResourceExternalCode, deleteResourceExternalCode, user, defaultValues, saveResourceExternalCode, pesticideOptions } = props;
    const { control, handleSubmit, getValues, } = useForm({ defaultValues });
    const { errors, isDirty, isSubmitting } = useFormState({ control });

    return (
        <form onSubmit={handleSubmit(saveResourceExternalCode)}>
            <FormRoot>
                <FormTitle title={text.code} />
                <FormRow>
                    <Controller
                        name="resource"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) =>
                            <Autocomplete
                                error={hasError(errors.resource)}
                                options={pesticideOptions.filter(e => e.element.active)}
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
                    deletable={true}
                    cancelAction={clearResourceExternalCode}
                    deleteAction={() => deleteResourceExternalCode(id)}
                    pristine={!isDirty}
                    submitting={isSubmitting}
                />
            </FormRoot>
        </form >
    )
}
export default ResourceExternalCodeForm;

