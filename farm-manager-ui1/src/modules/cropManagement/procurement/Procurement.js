import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import NewProcurementSelector from './NewProcurementSelector';
import { withRouter } from 'react-router-dom'
import { Loading } from '../../../components/core';
import { loadDataByName } from '../../../utils/LoadUtil';
import ProcurementForm from './ProcurementForm';
import SupplierInvoiceForm from './SupplierInvoiceForm';
import { TopBackBar } from '../../../components';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
}));

const ProcurementBase = (props) => {
    const classes = useStyles();
    const {
        setProcurement, getProcurement, setSupplierInvoice, match: { params: { id, mode } },
        procurement, dir, text, history, supplierInvoice,
    } = props;

    
    useEffect(() => {
        if (Number(id) > 0) {
            getProcurement(id, mode);
        }
        loadDataByName(props, ['suppliers', 'composts', 'pesticides', 'fertilizers', 'disinfectants', 
        'varieties', 'warehouses', 'activityDefs']);

        return () => {
            console.log('unmount...')
            setProcurement(null);
            setSupplierInvoice(null);
        }
    }, []);

    return (
        <div className={classes.root}>
            <TopBackBar dir={dir} label={text.back} history={history} />

            {Number(id) === 0 && !procurement && !supplierInvoice && <NewProcurementSelector {...props} />}
            {Number(id) !== 0 && !procurement && <Loading />}
            {supplierInvoice && <SupplierInvoiceForm  {...props}/>}
            {procurement && <ProcurementForm initialValues={procurement} {...props} />}
        </div>
    )
}
export default withRouter(ProcurementBase);



