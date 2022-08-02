import React, { useState, useEffect } from 'react';
import { CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup, MenuItem, Button } from '@mui/material';
import { downloadReport, getReportUrl } from "../../actions/ReportActions";
import PdfIcon from "../../icons/PdfIcon";
import ExcelIcon from "../../icons/ExcelIcon";
import { TextField } from '../../components';
import { isEmpty } from 'lodash';
import OutlinedButton from '../../components/core/button/OutlinedButton';

const Actions = ({ selectedReport, end, start, season, lang, text, reportChannel, fontSize, handleChange,
    emailReport, uncheckedColumns, selectedFields, selectedContractors, selectedWorkerGroups,
    selectedWorkers, selectedPesticides, selectedEquipments, selectedAccessories,
    selectedDisinfectants, selectedComposts, selectedFertilizers, selectedWaterSources,
    selectedCustomers, selectedVarieties, selectedCrops, selectedSites, selectedParentFields,
    selectedActivityDefs, selectedDestinations, selectedDomains, selectedActivityDefTypes,
    selectedSuppliers, activityType, resourceType, selectedMarketingContainers,
    selectedMarketingProducts, selectedHarvestContainers, selectedPests, selectedPesticideCategories, selectedGrowers, freeText,
    selectedTag1, selectedTag2, setViewUrl, selectedEquipmentCategories, isActualExecution, actualExecution
}) => {

    const [generate, setGenerate] = useState(null)


    const ucc = uncheckedColumns.length > 0 ? uncheckedColumns.join(',') : ''
    const activityTypes = activityType ? [{ value: 'activityType_' + activityType }] : [];
    const resourceTypes = resourceType ? [{ value: 'resourceType_' + resourceType }] : [];
    const freeTextFilter = selectedReport.freeText === true && !isEmpty(freeText) ? [{ value: 'freeText_' + freeText }] : [];
    const actualExecutionFilter = isActualExecution && isActualExecution === true 
        && actualExecution && actualExecution ===  true
     ? [{ value: 'actualExecution_' + actualExecution }] : [];

    useEffect(() => {
        if (generate) {
            if (reportChannel === 'emailReport') {
                emailReport(selectedReport.name, lang, generate, start, end, season, filter, ucc, fontSize);
                setGenerate(null);
            } else if (reportChannel === 'view' && generate === 'pdf') {
                const url = getReportUrl(selectedReport.name, lang, generate, start, end, season, filter, ucc, fontSize)
                setViewUrl(url);
            }
            else {
                downloadReport(selectedReport.name, lang, generate, start, end, season, filter, ucc, fontSize, () => setGenerate(null))
            }
        }
    }, [generate])

    const isLand = selectedReport.filters.includes('LAND');
    const isActivityDef = selectedReport.filters.includes('ACTIVITY_DEF');
    const isCrops = selectedReport.filters.includes('CROP');
    const isPesticide = selectedReport.filters.includes('SPRAY');
    const isPests = selectedReport.filters.includes('PEST');
    const isExecutors = selectedReport.filters.includes('EXECUTORS');
    const isSubstances = selectedReport.filters.includes('SUBSTANCES');
    const isWater = selectedReport.filters.includes('WATER');
    const isEquipment = selectedReport.filters.includes('EQUIPMENT');
    const isWorker = selectedReport.filters.includes('WORKERS');
    const isWorkerGroups = selectedReport.filters.includes('WORKER_GROUPS');
    const isActivityTypes = selectedReport.filters.includes('ACTIVITY_TYPE');
    const isResourceTypes = selectedReport.resourceTypes ? true : false;
    const isMarketingDestinations = selectedReport.filters.includes('DESTINATIONS');
    const isProcurement = selectedReport.filters.includes('PROCUREMENT');
    const isCustomers = selectedReport.filters.includes('CUSTOMERS') || selectedReport.filters.includes('CUSTOMERS_SUPPLIERS');
    const isSupplier = selectedReport.filters.includes('SUPPLIERS') || selectedReport.filters.includes('CUSTOMERS_SUPPLIERS');


    const filter = [].concat(isExecutors ? selectedContractors : [])
        .concat(isLand ? selectedFields : [])
        .concat(isLand ? selectedDomains : [])
        .concat((isExecutors || isWorkerGroups) ? selectedWorkerGroups : [])
        .concat((isExecutors || isWorker) ? selectedWorkers : [])
        .concat((isPesticide || isSubstances) ? selectedPesticides : [])
        .concat(isEquipment ? selectedEquipments : [])
        .concat(isEquipment && selectedEquipmentCategories ? selectedEquipmentCategories : [])
        .concat((isEquipment || isProcurement) ? selectedAccessories : [])
        .concat(isSubstances ? selectedDisinfectants : [])
        .concat(isSubstances ? selectedComposts : [])
        .concat((isWater || isProcurement) ? selectedFertilizers : [])
        .concat(isWater ? selectedWaterSources : [])
        .concat((isCrops || isProcurement) ? selectedVarieties : [])
        .concat(isCrops ? selectedCrops : [])
        .concat(isLand ? selectedSites : [])
        .concat(isLand ? selectedParentFields : [])
        .concat(isActivityDef ? selectedActivityDefs : [])
        .concat(isActivityDef ? selectedActivityDefTypes : [])
        .concat(isActivityTypes ? activityTypes : [])
        .concat(isResourceTypes ? resourceTypes : [])
        .concat(isCustomers ? selectedCustomers : [])
        .concat(isMarketingDestinations ? selectedDestinations : [])
        .concat(isSupplier ? selectedSuppliers : [])
        .concat(isMarketingDestinations ? selectedMarketingContainers : [])
        .concat(isMarketingDestinations ? selectedMarketingProducts : [])
        .concat(selectedHarvestContainers)
        .concat(isPests ? selectedPests : [])
        .concat(isPesticide ? selectedPesticideCategories : [])
        .concat(selectedGrowers ? selectedGrowers : [])
        .concat(freeTextFilter)
        .concat(actualExecutionFilter)
        .concat(isLand ? selectedTag1 : [])
        .concat(isLand ? selectedTag2 : [])
        .map((e => e.value)).join(',');

    if (generate) {
        return (
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                <CircularProgress
                    value={40}
                    size={50} />
            </div>
        )
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row', flex: 1, }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <TextField
                    select
                    label={text.fontSize}
                    width={180}
                    value={fontSize}
                    onChange={(e) => handleChange('fontSize', Number(e.target.value) ? Number(e.target.value) : fontSize)}

                >
                    <MenuItem key={''} value={''}>{text.fontSize}</MenuItem>))

                    {
                        [10, 11, 12, 13, 14, 16, 18].map(element => (
                            <MenuItem key={element} value={element}>{element}</MenuItem>))
                    }

                </TextField>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1" value={reportChannel} onChange={(e) => handleChange('reportChannel', e.target.value)}
                        row={true}
                    >
                        <FormControlLabel value="downloadReport" control={<Radio />} label={text.downloadReport} />
                        <FormControlLabel value="view" control={<Radio />} label={`${text.view} (PDF)`} />
                        <FormControlLabel value="emailReport" control={<Radio />} label={text.emailReport} />
                    </RadioGroup>
                </FormControl>
            </div>
            <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                <OutlinedButton onClick={() => setGenerate('pdf')}
                    variant="outlined"
                >
                    PDF
                    <PdfIcon sx={{  margin: 1 }} />
                </OutlinedButton>
                <OutlinedButton onClick={() => setGenerate('xls')}
                    variant="outlined"
                    disabled={reportChannel === 'view'}
                >
                    Excel
                    <ExcelIcon sx={{ margin: 1 }} />
                </OutlinedButton>
                {selectedReport.csv && <OutlinedButton onClick={() => setGenerate('csv')}
                    variant="outlined"
                >
                    CSV
                    <ExcelIcon sx={{  margin: 1 }} />
                </OutlinedButton>}
            </div>
        </div>
    )
}
export default Actions;



