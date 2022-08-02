
import { useForm, Controller, useFormState } from "react-hook-form";
import { MenuItem } from '@mui/material';
import { FormTitle } from "../../../components/core";
import { FormActions, TextField, Checkbox } from '../../../components'
import { FormRoot, FormRow } from '../../../utils/StyleUtils';
import { isEmpty } from '../../../utils/StringUtil';
import { GENETRIC_TAGS } from '../../../reducers/TagReducer';
import { deleteRef } from "../../../components/core/form/FormUtil";

const TagFormBase = (props) => {

    const { text, defaultValues: { deletable, id }, clearTag, deleteTag, user, defaultValues, saveTag } = props;
    const { control, handleSubmit, getValues, } = useForm({ defaultValues });
    const { errors, isDirty, isSubmitting } = useFormState({ control });
    const tagOptions = [];

    if (!isEmpty(user.business.tag1)) {
        tagOptions.push(<MenuItem key={1} value={1}>{user.business.tag1}</MenuItem>)
    }
    if (!isEmpty(user.business.tag2)) {
        tagOptions.push(<MenuItem key={2} value={2}>{user.business.tag2}</MenuItem>)
    }
    tagOptions.push(<MenuItem key={GENETRIC_TAGS} value={GENETRIC_TAGS}>{text.generic}</MenuItem>)

    return (
        <form onSubmit={handleSubmit(saveTag)}>
            <FormRoot>
                <FormTitle title={text.tag} />
                <FormRow>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <TextField label={text.name} error={!isEmpty(errors.name)} {...deleteRef(field)}/>}
                    />
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => <TextField select label={text.type} 
                            {...deleteRef(field)} >{tagOptions}</TextField>
                        }
                    />
                </FormRow>
                <FormRow>
                    <Controller
                        name="active"
                        control={control}
                        render={({ field }) => <Checkbox label={text.active} checked={getValues().active} {...deleteRef( field )} />

                        }
                    />
                </FormRow>
                <FormActions
                    text={text}
                    editable={true}
                    deletable={deletable}
                    cancelAction={clearTag}
                    deleteAction={() => deleteTag(id)}
                    pristine={!isDirty}
                    submitting={isSubmitting}
                />
            </FormRoot>
        </form >
    )
}
export default TagFormBase;

