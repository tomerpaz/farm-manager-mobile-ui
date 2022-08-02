import React from 'react';
import { TextField } from '../../components';
import { Accordion, AccordionSummary, AccordionDetails, MenuItem, Box } from '@mui/material';
import Actions from './Actions'
import { REPORT_ACTIVITY_TYPES } from "../activity/types";
import {
    renderActivityDefsSelection,
    renderCropsSelection,
    renderCustomerSelection,
    RenderDateSelection,
    renderDestinationSelection,
    renderEquipmentSelection,
    renderExecutorsSelection,
    renderFieldSelection,
    renderProcurementSelection,
    renderSpraySelection,
    renderSubstanceSelection,
    renderSuppliersSelection,
    renderWaterSelection,
    renderWorkerGroupsSelection,
    renderWorkerSelection,
    renderPests,
    renderCustomerSupplierSelection
} from "./DataFilterUtil";
import CheckboxBase from '../../components/core/checkbox/CheckBox';


export function isFilter(selectedReport, value) {
    return selectedReport && selectedReport.filters.includes(value)
}

const ReportFilter = (props) => {

    const {
        text, handleChange, activityType, resourceType, selectedReport, freeText, activeOnly, setActiveOnly
    } = props

    const isActualExecution=isFilter(selectedReport, 'ACTUAL_EXECUTION');

    return (
        <Box flex={1}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {isFilter(selectedReport, 'DATES') && <RenderDateSelection isActualExecution={isActualExecution} {...props} />}
                {selectedReport.resourceTypes &&
                    <TextField
                        select
                        width={120}
                        value={resourceType}
                        label={text.resourceType}
                        onChange={(e) => handleChange('resourceType', e.target.value)}
                    >
                        <MenuItem value={''}><em>{text.resourceType}</em></MenuItem>))
                        {selectedReport.resourceTypes.map(e =>
                            <MenuItem key={e} value={e}>{text[e.toLowerCase()]}</MenuItem>
                        )}
                    </TextField>}
                {selectedReport.filters.includes('ACTIVITY_TYPE') &&
                    <TextField
                        select
                        width={120}
                        value={activityType}
                        label={text.activityType}
                        onChange={(e) => handleChange('activityType', e.target.value)}
                    >
                        <MenuItem value={''}><em>{text.activityType}</em></MenuItem>))
                        {REPORT_ACTIVITY_TYPES.map(e =>
                            <MenuItem key={e} value={e}>{text[e.toLowerCase()]}</MenuItem>
                        )}
                    </TextField>}
                {selectedReport.freeText && <TextField
                    width={120}
                    value={freeText}
                    label={text.freeText}
                    onChange={(e) => handleChange('freeText', e.target.value)}
                />
                }
                <CheckboxBase

                    checked={activeOnly}
                    onChange={()=>setActiveOnly(!activeOnly)}
                    label={text.active} />
                

            </div>
            {renderFieldSelection(props)}
            {renderActivityDefsSelection(props)}
            {renderCropsSelection(props)}
            {renderSpraySelection(props)}
            {renderPests(props)}
            {renderExecutorsSelection(props)}
            {renderWorkerSelection(props)}
            {renderCustomerSupplierSelection(props)}
            {renderCustomerSelection(props)}
            {renderSuppliersSelection(props)}
            {renderWorkerGroupsSelection(props)}
            {renderSubstanceSelection(props)}
            {renderWaterSelection(props)}
            {renderEquipmentSelection(props)}
            {renderDestinationSelection(props)}
            {renderProcurementSelection(props)}
            <Accordion expanded={true}>
                <AccordionSummary ></AccordionSummary>
                <AccordionDetails>
                    <Actions isActualExecution={isActualExecution} {...props} />
                </AccordionDetails>
            </Accordion>
        </Box>
    )

}
export default ReportFilter;





