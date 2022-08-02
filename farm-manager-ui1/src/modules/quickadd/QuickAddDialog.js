import React, { useState, useEffect } from 'react';
import { DialogTitle, Dialog, DialogContent } from '@mui/material';
import { EXECUTOR_UNITS } from '../../utils';
import { GENERAL, HARVEST } from '../activity/types';
import { CUSTOMER, SUPPLIER } from '../../reducers/ResourceReducer';
import { TextField, } from '../../components'
import { saveActivityDef, saveResource } from '../../actions';
import { isEmpty } from '../../utils/StringUtil';
import { renderNameIdOptionsTranslate, renderPerUnitOptions } from '../../components/core';
import { loadDataByName, _activityDefTypes, _customers } from '../../utils/LoadUtil';
import { DialogActions } from '../../components/dialog';


const QuickAddDialog = (props) => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [unit, setUnit] = useState('');
    const [defTypeId, setDefTypeId] = useState('');

    const [validate, setValidate] = useState(false);

    const { type, onClose, text, activityDefTypes, areaUnit, getCustomersAndSuppliers, getActivityDefs } = props;

    useEffect(() => {
        loadDataByName(props, [_customers, _activityDefTypes]);
    }, []);

    const renderTypeDef = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField error={validate && isEmpty(name)}
                        value={name}
                        style={{ flex: 1 }}
                        onChange={(e) => setName(e.target.value)}
                        label={text.name}
                        placeholder={text.name}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <TextField placeholder={text.category}
                        value={defTypeId}
                        error={validate && isEmpty(defTypeId)}
                        label={text.category}
                        style={{ flex: 2 }}
                        onChange={(e) => setDefTypeId(e.target.value)}
                        select
                    >
                        {renderNameIdOptionsTranslate(activityDefTypes, text)}
                    </TextField>

                    <TextField placeholder={text.unit}
                        error={validate && isEmpty(unit)}
                        label={text.unit}
                        value={unit}

                        style={{ flex: 1 }}
                        onChange={(e) => setUnit(e.target.value)}
                        select
                    >
                        {renderPerUnitOptions(EXECUTOR_UNITS, text, areaUnit)}
                    </TextField>
                </div>
            </div>
        )
    }

    const renderCustomerSupplier = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField error={validate && isEmpty(name)}
                        onChange={(e) => setName(e.target.value)}
                        label={text.name}
                        placeholder={text.name}
                    />
                    <TextField placeholder={text.phone}
                        label={text.phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <TextField placeholder={text.email}
                        label={text.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField placeholder={text.businessIdentification} //                        
                        label={text.businessIdentification}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
        )
    }


    const close = (type, entity) => {
        setValidate(false);
        onClose(type, entity);
    }

    const saveResourceEntity = () => {
        const resource = {
            name: name,
            type: type,
            active: true,
            email: email,
            phone: phone,
        }

        setValidate(true);
        if (isEmpty(name)) {
            return;
        }
        saveResource(resource).then(response => {
            getCustomersAndSuppliers();
            close(type, response.data)
        }).catch((error) => {
            if (error) {
                console.log(error);
            }
        });
    }

    const saveTypeDefEntity = () => {
        const entity = {
            name: name,
            type: type,
            defTypeId: defTypeId,
            unit: unit,
            active: true,
        }

        setValidate(true);
        if (isEmpty(name) || isEmpty(unit) || isEmpty(defTypeId)) {
            return;
        }
        saveActivityDef(entity).then(response => {
            getActivityDefs();
            close(type, response.data)
        }).catch((error) => {
            if (error) {
                console.log(error);

            }
        });
    }
    const save = () => {

        if ([CUSTOMER, SUPPLIER].includes(type)) {
            saveResourceEntity();
        } else if ([GENERAL, HARVEST].includes(type)) {
            return saveTypeDefEntity();
        }

    }


    const renderForm = () => {
        if ([GENERAL, HARVEST].includes(type)) {
            return renderTypeDef();
        }
        if ([CUSTOMER, SUPPLIER].includes(type)) {
            return renderCustomerSupplier();
        }
    }


    function action(yes) {
        if (yes) {
            save();
        } else {
            close();
        }
    }

    return (
        <Dialog open={type !== null}
            maxWidth={'sm'}
            fullWidth={true}
            onClose={onClose}
        >
            <DialogTitle sx={{marginLeft: 1, marginRight: 1}} >{type && text[type.toLowerCase()]}</DialogTitle>
            <DialogContent>
                {renderForm()}
            </DialogContent>

            <DialogActions
                action={action}
                yesText={text.save}
                noText={text.close}
            />
        </Dialog>
    )
}
export default QuickAddDialog;



