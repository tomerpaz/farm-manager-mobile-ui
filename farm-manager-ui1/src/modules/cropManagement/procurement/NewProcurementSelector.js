import React from 'react';
import Items from '@mui/icons-material/Apps';
import Generic from '@mui/icons-material/BorderAll';
import SupplierInvoice from '@mui/icons-material/Description';

import { getCurrentYear, newDate } from '../../../utils';
import SelectorButton from '../../../components/core/button/SelectorButton';
import { ButtonBody } from '../../../utils/StyleUtils';
import { Box } from '@mui/material';

const NewProcurementSelector = (props) => {
    const { text, setProcurement, setSupplierInvoice, user } = props;
    return (
        <Box display={'flex'} flex={1}>
            <Box margin={5} display={'flex'} flex={1} justifyContent={'space-around'}>
                <SelectorButton
                    onClick={() => setProcurement({
                        procurementDate: newDate(),
                        deletable: false,
                        items: [],
                    })}>
                    <ButtonBody >
                        {text.items}
                        <Items />
                    </ButtonBody>
                </SelectorButton>
                <SelectorButton
                    onClick={() => setProcurement({
                        procurementDate: newDate(),
                        deletable: false,
                        procurementFields: [],
                        totalCost: 0,
                        year: getCurrentYear(),
                        fieldRatioType: 'PER_AREA_UNIT'
                    })}>
                    <ButtonBody >
                        {text.genericProcurement}
                        <Generic />
                    </ButtonBody>
                </SelectorButton>
                <SelectorButton
                    onClick={() => setSupplierInvoice(true)}>
                    <ButtonBody >
                        {text.invoice}
                        <SupplierInvoice />
                    </ButtonBody>
                </SelectorButton>
            </Box>
        </Box>
    )
}
export default NewProcurementSelector;