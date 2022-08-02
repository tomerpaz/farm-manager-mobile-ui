import { useForm, Controller, useFormState } from "react-hook-form";
import { MenuItem } from '@mui/material';
import { FormActions, TextField, Checkbox, FormTitle, Autocomplete } from '../../../components'
import { FormRoot, FormRow } from '../../../utils/StyleUtils';
import { saveResource } from "../../../actions/ResourceActions";
import { renderPerUnitOptions, renderTypeOptions } from '../../../components/core';

import { deleteRef, typeDisabled } from "../../../components/core/form/FormUtil";
import { EQUIPMENT_UNITS } from "../../../utils/Units";
import { isArrayEmpty } from '../../../components/filters/filterUtil';
import { WIALON_TITLE } from '../../wialon/WialonSettings';
import { isEmpty } from '../../../utils/StringUtil';
import { CONTRACTOR } from "../../activity/types";


export const EQUIPMENT_TYPES = ['TRACTOR', 'SPRAYER', 'VEHICLE', 'AGRO_MACHINE', 'OTHER'];

function prepareData(initialValues) {
    if (!initialValues.wialonId) {
        initialValues.wialonId = '';
    }
    if (!initialValues.note) {
        initialValues.note = '';
    }
    if (!initialValues.code) {
        initialValues.code = '';
    }
    return initialValues;
}

const EquipmentFormBase = (props) => {

    const { clearResource, deleteEquipment, initialValues: { deletable, id }, text, isAdmin, areaUnit, wialonUnits, initialValues, executorOptions } = props


    const { control, handleSubmit, getValues, } = useForm({ defaultValues: prepareData(initialValues) });
    const { errors, isDirty, isSubmitting } = useFormState({ control });

    const disabled = typeDisabled(id, deletable);


    return (


        <form onSubmit={handleSubmit(saveResource)}>
            <FormRoot>
                <FormTitle title={text.equipment} />
                <FormRow>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <TextField label={text.name} error={!isEmpty(errors.name)} {...deleteRef(field)} />}
                    />
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => <TextField disabled={disabled} select label={text.type}
                            {...deleteRef(field)} >
                            {renderTypeOptions(EQUIPMENT_TYPES, text)}

                        </TextField>
                        }
                    />
                </FormRow>
                <FormRow>
                    <Controller
                        name="engName"
                        control={control}
                        render={({ field }) => <TextField label={text.engName} {...deleteRef(field)} />}
                    />
                    <Controller
                        name="code"
                        control={control}

                        render={({ field }) => <TextField label={text.code} {...deleteRef(field)} />}
                    />
                </FormRow>
                {'SPRAYER' === getValues().category &&
                    <Controller
                        name="capacity"
                        rules={{ required: true }}
                        control={control}
                        render={({ field }) =>
                            <TextField
                                type="number"
                                error={!isEmpty(errors.capacity)}
                                label={text.capacity} {...deleteRef(field)} />}
                    />

                }

                <FormRow alignItems='top'>
                    <Controller
                        name="usageUnit"
                        control={control}
                        render={({ field }) => <TextField select label={text.unit}
                            {...deleteRef(field)} >
                            {renderPerUnitOptions(EQUIPMENT_UNITS, text, areaUnit)}

                        </TextField>
                        }
                    />
                    <Controller
                        name="note"
                        control={control}
                        render={({ field }) => <TextField label={text.note}
                            multiline
                            rows="2"
                            {...deleteRef(field)} />}
                    />
                </FormRow>
                {/* {!isArrayEmpty(wialonUnits) &&
                    <FormRow>
                        <Controller
                            name="wialonId"
                            control={control}
                            render={({ field }) => <TextField select label={WIALON_TITLE}
                                {...deleteRef(field)} >
                                <MenuItem style={{ minHeight: 30 }} key='' value={''}>
                                    <em>
                                    </em>
                                </MenuItem>
                                {wialonUnits.map(e =>
                                    <MenuItem key={e.id} value={e.id}>{e.nm}</MenuItem>
                                )}
                            </TextField>
                            }
                        />
                    </FormRow>
                } */}
                <FormRow>
                    <Controller
                        name="active"
                        control={control}
                        render={({ field }) => <Checkbox label={text.active} checked={getValues().active} {...deleteRef(field)} />}
                    />
                </FormRow>
                <FormActions
                    text={text}
                    editable={isAdmin}
                    deletable={deletable && isAdmin}
                    cancelAction={() => clearResource(true)}
                    deleteAction={() => deleteEquipment(id)}
                    pristine={!isDirty}
                    submitting={isSubmitting}
                />
            </FormRoot>
        </form >
    )
}

export default EquipmentFormBase;

