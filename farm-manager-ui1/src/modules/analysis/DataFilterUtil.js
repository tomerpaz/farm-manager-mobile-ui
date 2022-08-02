import React from 'react';
import { Button, MenuItem, Accordion, AccordionDetails, Box } from '@mui/material';
import { Autocomplete, DatePicker, TextField, DomainSelectionTable } from '../../components'
import { spacer } from "../../utils/StyleUtils";
import { buildNameCodeFilterOptions, getElementText } from "../../components/filters/filterUtil";
import { CONTRACTOR, WORKER, WORKER_GROUP } from "../../reducers/ResourceReducer";
import { getCurrentYear } from "../../utils/DateUtil";
import { MARKET } from "../utilities/containers/ContainerTable";
import { isEmpty } from '../../utils/StringUtil';
import { EQUIPMENT_TYPES } from '../resources/equipment/EquipmentForm';
import ReportAccordionSummary from './ReportAccordionSummary';
import { tableSuggestionsResourceNameTypeIdPrefix } from '../../components/core';
import CheckboxBase from '../../components/core/checkbox/CheckBox';

export function renderEquipmentSelection(props) {
    const {
        text, handlePanelChange, expanded,
        selectedEquipments, handleChange, selectedReport,
        selectedAccessories, equipmentOptions, accessoryOptions, selectedEquipmentCategories
    } = props;
    if (selectedReport && selectedReport.filters.includes('EQUIPMENT')) {
        return (
            <Accordion expanded={getExpended(expanded === 'equipmentAndAccessories')}
                onChange={handlePanelChange('equipmentAndAccessories')}>
                <ReportAccordionSummary title={text.equipmentAndAccessories} selections={selectedEquipments.concat(selectedAccessories).concat(selectedEquipmentCategories).map((e => e.label)).join(',')} />
                <AccordionDetails>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={equipmentOptions}
                                onChange={(e) => handleChange('selectedEquipments', e)}
                                closeMenuOnSelect={false}
                                value={selectedEquipments}
                                placeholder={text.equipment}
                            />
                        </div>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={getElementText(EQUIPMENT_TYPES, text, 'resourceCategory', true)}
                                onChange={(e) => handleChange('selectedEquipmentCategories', e)}
                                closeMenuOnSelect={false}
                                value={selectedEquipmentCategories}
                                placeholder={text.category}
                            />
                        </div>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={accessoryOptions}
                                onChange={(e) => handleChange('selectedAccessories', e)}
                                closeMenuOnSelect={false}
                                value={selectedAccessories}
                                placeholder={text.accessories}
                            />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        )
    }
}

export function renderWaterSelection(props) {
    const {
        text, handlePanelChange, expanded,
        selectedWaterSources, handleChange, selectedReport,
        selectedFertilizers, waterSourceOptions, fertilizerOptions
    } = props;
    if (selectedReport && selectedReport.filters.includes('WATER')) {
        return (
            <Accordion expanded={getExpended(expanded === 'waterAndFertilizers')}
                onChange={handlePanelChange('waterAndFertilizers')}>
                <ReportAccordionSummary title={text.waterAndFertilizers} selections={selectedWaterSources.concat(selectedFertilizers).map((e => e.label)).join(',')} />
                <AccordionDetails>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={waterSourceOptions}
                                onChange={(e) => handleChange('selectedWaterSources', e)}
                                value={selectedWaterSources}
                                closeMenuOnSelect={false}
                                placeholder={text.watersources}
                            />
                        </div>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={fertilizerOptions}
                                onChange={(e) => handleChange('selectedFertilizers', e)}
                                closeMenuOnSelect={false}
                                value={selectedFertilizers}
                                placeholder={text.fertilizers}
                            />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        )
    }
}


export function renderProcurementSelection(props) {
    const {
        text, handlePanelChange, expanded,
        selectedFertilizers, handleChange, selectedReport,
        selectedVarieties, selectedAccessories, fertilizerOptions, varietyOptions, accessoryOptions
    } = props;
    if (selectedReport && selectedReport.filters.includes('PROCUREMENT')) {
        return (
            <Accordion expanded={getExpended(expanded === 'fertilizersVarietiesAndAccessories')}
                onChange={handlePanelChange('fertilizersVarietiesAndAccessories')}>
                <ReportAccordionSummary title={`${text.fertilizers}, ${text.varieties}, ${text.accessories}`}
                    selections={selectedFertilizers.concat(selectedVarieties).concat(selectedAccessories).map((e => e.label)).join(',')}
                />
                <AccordionDetails>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={fertilizerOptions}
                                onChange={(e) => handleChange('selectedFertilizers', e)}
                                closeMenuOnSelect={false}
                                value={selectedFertilizers}
                                placeholder={text.fertilizers}
                            />
                        </div>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={varietyOptions}
                                onChange={(e) => handleChange('selectedVarieties', e)}
                                closeMenuOnSelect={false}
                                value={selectedVarieties}
                                placeholder={text.varieties}
                            />
                        </div>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={accessoryOptions}
                                onChange={(e) => handleChange('selectedAccessories', e)}
                                closeMenuOnSelect={false}
                                value={selectedAccessories}
                                placeholder={text.accessories}
                            />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        )
    }
}


export function renderSubstanceSelection(props) {
    const {
        text, handlePanelChange, expanded,
        selectedPesticides, handleChange, selectedReport,
        selectedComposts, selectedDisinfectants, pesticideOptions, compostOptions, disinfectantOptions
    } = props;
    if (selectedReport && selectedReport.filters.includes('SUBSTANCES')) {
        return (
            <Accordion expanded={getExpended(expanded === 'pesticidesCompostAndDisinfectant')}
                onChange={handlePanelChange('pesticidesCompostAndDisinfectant')}>
                <ReportAccordionSummary title={`${text.pesticides}, ${text.compost}, ${text.disinfectant}`} selections={selectedPesticides.concat(selectedComposts).concat(selectedDisinfectants).map((e => e.label)).join(',')} />
                <AccordionDetails>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={pesticideOptions}
                                onChange={(e) => handleChange('selectedPesticides', e)}
                                closeMenuOnSelect={false}
                                value={selectedPesticides}
                                placeholder={text.pesticides}
                            />
                        </div>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={compostOptions}
                                onChange={(e) => handleChange('selectedComposts', e)}
                                closeMenuOnSelect={false}
                                value={selectedComposts}
                                placeholder={text.compost}
                            />
                        </div>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={disinfectantOptions}
                                onChange={(e) => handleChange('selectedDisinfectants', e)}
                                closeMenuOnSelect={false}
                                value={selectedDisinfectants}
                                placeholder={text.disinfectant}
                            />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion >
        )
    }
}


export function renderPests(props) {
    const {
        text, handlePanelChange, expanded,
        handleChange, selectedReport,
        pestOptions,
        selectedPests
    } = props;
    if (selectedReport && selectedReport.filters.includes('PEST')) {
        return (
            <Accordion expanded={getExpended(expanded === 'pests')}
                onChange={handlePanelChange('pests')}>
                <ReportAccordionSummary title={text.pests} selections={selectedPests.map((e => e.label)).join(',')} />
                <AccordionDetails>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>

                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={pestOptions}
                                onChange={(e) => handleChange('selectedPests', e)}
                                closeMenuOnSelect={false}
                                value={selectedPests}
                                placeholder={text.pests}
                            />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion >
        )
    }
}

export function renderSpraySelection(props) {
    const {
        text, handlePanelChange, expanded,
        selectedPesticides, handleChange, selectedReport,
        selectedEquipments, pesticideOptions, pesticideCategories,
        selectedPesticideCategories,
    } = props;

    if (selectedReport && selectedReport.filters.includes('SPRAY')) {
        return (
            <Accordion expanded={getExpended(expanded === 'pesticides')}
                onChange={handlePanelChange('pesticides')}>
                <ReportAccordionSummary title={text.pesticides} selections={selectedPesticides.concat(selectedPesticideCategories).map((e => e.label)).join(',')} />
                <AccordionDetails>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={pesticideOptions}
                                onChange={(e) => handleChange('selectedPesticides', e)}
                                closeMenuOnSelect={false}
                                value={selectedPesticides}
                                placeholder={text.pesticides}
                            />
                        </div>

                        {selectedPesticideCategories && <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={getElementText(pesticideCategories, text, 'resourceCategory', false)}
                                onChange={(e) => handleChange('selectedPesticideCategories', e)}
                                closeMenuOnSelect={false}
                                value={selectedPesticideCategories}
                                placeholder={text.category}
                            />
                        </div>}
                    </div>
                </AccordionDetails>
            </Accordion >
        )
    }
}


export function renderExecutorsSelection(props) {
    const {
        text, handlePanelChange, expanded,
        selectedContractors, handleChange, selectedReport,
        selectedWorkers, selectedWorkerGroups,
         activeOnly, executors,
    } = props;

    const executorOptions = tableSuggestionsResourceNameTypeIdPrefix(executors.filter(e => e.active === activeOnly), 'resource', text)

    if (selectedReport && selectedReport.filters.includes('EXECUTORS')) {
        return (
            <Accordion expanded={getExpended(expanded === 'executors')} onChange={handlePanelChange('executors')}>
                <ReportAccordionSummary title={text.executors} selections={selectedContractors.concat(selectedWorkers).concat(selectedWorkerGroups).map((e => e.label)).join(',')} />
                <AccordionDetails>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={executorOptions.filter(e => e.element.type === CONTRACTOR)}
                                onChange={(e) => handleChange('selectedContractors', e)}
                                closeMenuOnSelect={false}
                                value={selectedContractors}
                                placeholder={text.contractors}
                            />
                        </div>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={executorOptions.filter(e => e.element.type === WORKER)}
                                onChange={(e) => handleChange('selectedWorkers', e)}
                                closeMenuOnSelect={false}
                                value={selectedWorkers}
                                placeholder={text.workers}
                            />
                        </div>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={executorOptions.filter(e => e.element.type === WORKER_GROUP)}
                                onChange={(e) => handleChange('selectedWorkerGroups', e)}
                                closeMenuOnSelect={false}
                                value={selectedWorkerGroups}
                                placeholder={text.workergroups}
                            />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion >
        )
    }
}

export function renderWorkerSelection(props) {
    const {
        text, handlePanelChange, expanded,
        handleChange, selectedReport,
        selectedWorkers, executors, activeOnly,
    } = props;
    if (selectedReport && selectedReport.filters.includes('WORKERS')) {

        const executorOptions = tableSuggestionsResourceNameTypeIdPrefix(executors.filter(e => e.active === activeOnly), 'resource', text)


        return (
            <Accordion expanded={getExpended(expanded === 'workers')} onChange={handlePanelChange('workers')}>
                <ReportAccordionSummary title={text.workers} selections={selectedWorkers.map((e => e.label)).join(',')} />
                <AccordionDetails>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Autocomplete
                            options={executorOptions.filter(e => e.element.type === WORKER)}
                            onChange={(e) => handleChange('selectedWorkers', e)}
                            closeMenuOnSelect={false}
                            value={selectedWorkers}
                            placeholder={text.workers}
                        />
                    </div>
                </AccordionDetails>
            </Accordion >
        )
    }
}

export function renderCustomerSupplierSelection(props) {
    const {
        text, handlePanelChange, expanded,
        selectedCustomers, handleChange, selectedReport, selectedSuppliers, suppliers,
        customers,
    } = props;
    if (selectedReport && selectedReport.filters.includes('CUSTOMERS_SUPPLIERS')) {
        return (
            <Accordion expanded={getExpended(expanded === 'customersSuupliers')} onChange={handlePanelChange('customersSuupliers')}>
                <ReportAccordionSummary title={`${text.customers}, ${text.suppliers}`} selections={selectedCustomers.concat(selectedSuppliers).map((e => e.label)).join(',')} />
                <AccordionDetails>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Autocomplete
                            options={buildNameCodeFilterOptions(customers.filter(e => e.active === true), 'customer')}
                            onChange={(e) => handleChange('selectedCustomers', e)}
                            closeMenuOnSelect={false}
                            value={selectedCustomers}
                            placeholder={text.customers}
                        />
                        <Autocomplete
                            options={buildNameCodeFilterOptions(suppliers.filter(e => e.active), 'supplier')}
                            onChange={(e) => handleChange('selectedSuppliers', e)}
                            closeMenuOnSelect={false}
                            value={selectedSuppliers}
                            placeholder={text.suppliers}
                        />
                    </div>
                </AccordionDetails>
            </Accordion >

        )
    }

}
export function renderCustomerSelection(props) {
    const {
        text, handlePanelChange, expanded,
        selectedCustomers, handleChange, selectedReport,
        customers,
    } = props;
    if (selectedReport && selectedReport.filters.includes('CUSTOMERS')) {
        return (
            <Accordion expanded={getExpended(expanded === 'customers')} onChange={handlePanelChange('customers')}>
                <ReportAccordionSummary title={text.customers} selections={selectedCustomers.map((e => e.label)).join(',')} />
                <AccordionDetails>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Autocomplete
                            options={buildNameCodeFilterOptions(customers.filter(e => e.active), 'customer')}
                            onChange={(e) => handleChange('selectedCustomers', e)}
                            closeMenuOnSelect={false}
                            value={selectedCustomers}
                            placeholder={text.customers}
                        />
                    </div>
                </AccordionDetails>
            </Accordion >
        )
    }
}

export function renderSuppliersSelection(props) {
    const {
        text, handlePanelChange, expanded,
        selectedSuppliers, handleChange, selectedReport,
        suppliers,
    } = props;
    if (selectedReport && selectedReport.filters.includes('SUPPLIERS')) {
        return (
            <Accordion expanded={getExpended(expanded === 'suppliers')} onChange={handlePanelChange('suppliers')}>
                <ReportAccordionSummary title={text.suppliers} selections={selectedSuppliers.map((e => e.label)).join(',')} />
                <AccordionDetails>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Autocomplete
                            options={buildNameCodeFilterOptions(suppliers.filter(e => e.active), 'supplier')}
                            onChange={(e) => handleChange('selectedSuppliers', e)}
                            closeMenuOnSelect={false}
                            value={selectedSuppliers}
                            placeholder={text.suppliers}
                        />
                    </div>
                </AccordionDetails>
            </Accordion >
        )
    }
}

export function renderDestinationSelection(props) {
    const {
        text, handlePanelChange, expanded,
        selectedDestinations, handleChange, selectedReport, marketDestinations, selectedMarketingContainers, selectedMarketingProducts,
        productOptions, containerOptions,
        /*
                                selectedMarketingContainers={selectedMarketingContainers}
                                selectedMarketingProducts={selectedMarketingProducts}
         */
    } = props;
    if (selectedReport && selectedReport.filters.includes('DESTINATIONS')) {
        return (
            <Accordion expanded={getExpended(expanded === 'destinations')} onChange={handlePanelChange('destinations')}>
                <ReportAccordionSummary title={`${text.destinations}, ${text.cropSize}, ${text.quality}`} selections={selectedDestinations.map((e => e.label)).join(',')} />
                <AccordionDetails>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Autocomplete
                            options={getElementText(marketDestinations, text, 'destination')}
                            onChange={(e) => handleChange('selectedDestinations', e)}
                            closeMenuOnSelect={false}
                            value={selectedDestinations}
                            placeholder={text.destinations}
                        />
                        <Autocomplete
                            options={productOptions}
                            onChange={(e) => handleChange('selectedMarketingProducts', e)}
                            closeMenuOnSelect={false}
                            value={selectedMarketingProducts}
                            placeholder={text.cropSize}
                        />
                        <Autocomplete
                            options={containerOptions.filter(e => e.element.containerType === MARKET)}
                            onChange={(e) => handleChange('selectedMarketingContainers', e)}
                            closeMenuOnSelect={false}
                            value={selectedMarketingContainers}
                            placeholder={text.quality}
                        />
                    </div>
                </AccordionDetails>

            </Accordion >
        )
    }
}


export function renderWorkerGroupsSelection(props) {
    const {
        text, handlePanelChange, expanded,
        handleChange, selectedReport,
        selectedWorkerGroups, executors, activeOnly
    } = props;
    if (selectedReport && selectedReport.filters.includes('WORKER_GROUPS')) {

        const executorOptions = tableSuggestionsResourceNameTypeIdPrefix(executors.filter(e => e.active === activeOnly), 'resource', text)

        return (
            <Accordion expanded={getExpended(expanded === 'workerGroups')} onChange={handlePanelChange('workerGroups')}>
                <ReportAccordionSummary title={text.worker_groups} selections={selectedWorkerGroups.map((e => e.label)).join(',')} />
                <AccordionDetails>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Autocomplete
                            options={executorOptions.filter(e => e.element.type === WORKER_GROUP)}
                            onChange={(e) => handleChange('selectedWorkerGroups', e)}
                            closeMenuOnSelect={false}
                            value={selectedWorkerGroups}
                            placeholder={text.workergroups}
                        />
                    </div>
                </AccordionDetails>
            </Accordion >
        )
    }
}


export function renderCropsSelection(props) {
    const {
        text, handlePanelChange, expanded,
        selectedCrops, handleChange, selectedReport,
        selectedVarieties, cropOptions, varietyOptions
    } = props;
    if (selectedReport && selectedReport.filters.includes('CROP')) {
        return (
            <Accordion expanded={getExpended(expanded === 'crops')} onChange={handlePanelChange('crops')}>
                <ReportAccordionSummary title={text.cropsAndVarieties} selections={selectedCrops.concat(selectedVarieties).map((e => e.label)).join(',')} />
                <AccordionDetails>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={cropOptions}
                                onChange={(e) => handleChange('selectedCrops', e)}
                                closeMenuOnSelect={false}
                                value={selectedCrops}
                                placeholder={text.crops}
                            />
                        </div>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={varietyOptions}
                                onChange={(e) => handleChange('selectedVarieties', e)}
                                closeMenuOnSelect={false}
                                value={selectedVarieties}
                                placeholder={text.varieties}
                            />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion >
        )
    }
}

export function renderActivityDefsSelection(props) {
    const {
        text, handlePanelChange, expanded,
        selectedActivityDefs, handleChange, selectedReport,
        selectedActivityDefTypes,
    } = props;
    if (selectedReport && selectedReport.filters.includes('ACTIVITY_DEF')) {
        return (
            <Accordion expanded={getExpended(expanded === 'activityDef')} onChange={handlePanelChange('activityDef')}>
                <ReportAccordionSummary title={text.activities} selections={selectedActivityDefs.concat(selectedActivityDefTypes).map((e => e.label)).join(',')} />
                <AccordionDetails>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={buildNameCodeFilterOptions(props.activityDefs.filter(e => e.active), 'activityDef')}
                                onChange={(e) => handleChange('selectedActivityDefs', e)}
                                closeMenuOnSelect={false}
                                value={selectedActivityDefs}
                                placeholder={text.activity}
                            />
                        </div>
                        <div style={{ flex: 1, zIndex: 2 }}>
                            <Autocomplete
                                options={buildNameCodeFilterOptions(props.activityDefTypes.filter(e => e.active), 'activityDefType', text)}
                                onChange={(e) => handleChange('selectedActivityDefTypes', e)}
                                closeMenuOnSelect={false}
                                value={selectedActivityDefTypes}
                                placeholder={text.activityGroup}
                            />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion >
        )
    }

}


export const RenderDateSelection = (props) => {

    const { start, end, text, onStartChange, onEndChange, season, timeRange, handleChange, isSeasons, isActualExecution,actualExecution } = props;
    const year = getCurrentYear();
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <DatePicker disabled={season !== ''} value={start} text={text} onChange={onStartChange} label={text.fromDate} clearable={false} />
            <DatePicker disabled={season !== ''} value={end} text={text} onChange={onEndChange} label={text.toDate} clearable={false} />
            <TextField
                select
                width={150}
                value={timeRange}
                label={text.timeRange}
                onChange={(e) => handleChange('timeRange', e.target.value)}
            >
                <MenuItem value={''}><em>{text.timeRange}</em></MenuItem>))
                <MenuItem value={'1m'}>{text.month}</MenuItem>))
                <MenuItem value={'3m'}>3 {text.months}</MenuItem>))
                <MenuItem value={'6m'}>6 {text.months}</MenuItem>))
                <MenuItem value={'12m'}>{text.year}</MenuItem>))
                <MenuItem value={'0y'}>{year}</MenuItem>))
                <MenuItem value={'1y'}>{year - 1}</MenuItem>))
            </TextField>
            {isActualExecution &&
                <Box display={'flex'} alignItems={'center'}>            
                <CheckboxBase
                    checked={actualExecution}
                    onChange={()=>handleChange('actualExecution')}
                    label={text.executed} />
                   </Box>
            }
            {isSeasons !== false && <TextField
                select
                width={120}
                value={season}
                label={text.season}
                onChange={(e) => handleChange('season', e.target.value)}
            >
                <MenuItem value={''}><em>{text.season}</em></MenuItem>))
                <MenuItem value={year + 2}>{year + 2}</MenuItem>))
                <MenuItem value={year + 1}>{year + 1}</MenuItem>))
                <MenuItem value={year}>{year}</MenuItem>))
                <MenuItem value={year - 1}>{year - 1}</MenuItem>))
                <MenuItem value={year - 2}>{year - 2}</MenuItem>))
                <MenuItem value={year - 3}>{year - 3}</MenuItem>))
                <MenuItem value={year - 4}>{year - 4}</MenuItem>))
                <MenuItem value={year - 5}>{year - 5}</MenuItem>))

            </TextField>
            }
        </div>
    )
}

export function getExpended(value) {
    return value;
}

export function renderFieldSelection(props) {
    const {
        text, handlePanelChange, expanded,
        sites, handleChange, selectedReport,
        selectedSites, selectedParentFields, parentFields,
        openFields, handleClickCloseFields, selectedFields, selectedDomains, fields, user, filterOption,
        selectedGrowers, growerOptions, tags, selectedTag1, selectedTag2,activeOnly,
    } = props;

    const tags1 = isEmpty(user.business.tag1) ? [] : tags.filter(e => e.type === 1);
    const tags2 = isEmpty(user.business.tag2) ? [] : tags.filter(e => e.type === 2);

    if (selectedReport && selectedReport.filters.includes('LAND')) {
        let selectedLand = selectedDomains.concat(selectedFields).concat(selectedSites).concat(selectedParentFields).concat(selectedTag1).concat(selectedTag2);
        if (selectedGrowers && selectedGrowers.length > 0) {
            selectedLand = selectedLand.concat(selectedGrowers);
        }
        if (selectedLand.length > 10) {
            selectedLand = selectedLand.slice(0, 10);
        }
        return (
            <Accordion expanded={getExpended(expanded === 'fields')} onChange={handlePanelChange('fields')}>
                <ReportAccordionSummary title={text.fieldsAndSites} selections={selectedLand.map((e => e.label)).join(',')} />
                <AccordionDetails>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <DomainSelectionTable open={openFields} showSelectAll={true} {...props}
                                handleClose={handleClickCloseFields} />
                            <Button  sx={{margin: 1}}  variant='contained' onClick={e => handleChange('openFields', true)}
                                color='primary'
                                size='large'
                                disabled={selectedSites.length !== 0 || selectedParentFields.length !== 0 || selectedFields.length !== 0}>
                                {text.fields}
                            </Button>
                            <Button sx={{margin: 1}} variant='outlined' onClick={e => handleChange('selectedDomains', [])}
                                color='primary'
                                size='large'
                                disabled={selectedSites.length !== 0 || selectedParentFields.length !== 0 || selectedFields.length !== 0}>
                                X
                            </Button>
                            <Autocomplete
                                options={buildNameCodeFilterOptions(fields.filter(e => e.active === activeOnly), 'field')}
                                onChange={(e) => handleChange('selectedFields', e)}
                                closeMenuOnSelect={false}
                                value={selectedFields}
                                placeholder={text.baseFields}
                            />
                            {growerOptions.length > 0 && <Autocomplete
                                options={growerOptions}
                                onChange={(e) => handleChange('selectedGrowers', e)}
                                closeMenuOnSelect={false}
                                value={selectedGrowers}
                                placeholder={text.growers}
                            />}

                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                            <div style={{ flex: 1, zIndex: 2 }}>
                                <Autocomplete
                                    options={buildNameCodeFilterOptions(sites.filter(e => e.active === true), 'site')}
                                    onChange={(e) => handleChange('selectedSites', e)}
                                    closeMenuOnSelect={false}
                                    value={selectedSites}
                                    placeholder={text.sites}
                                />
                            </div>
                            <div style={{ flex: 1, zIndex: 2 }}>
                                <Autocomplete
                                    options={buildNameCodeFilterOptions(parentFields, 'parentField')}
                                    onChange={(e) => handleChange('selectedParentFields', e)}
                                    closeMenuOnSelect={false}
                                    value={selectedParentFields}
                                    placeholder={text.parentFields}
                                />
                            </div>
                            {tags1.length > 0 && <div style={{ flex: 1 }}>
                                <Autocomplete
                                    options={buildNameCodeFilterOptions(tags1, 'tag1')}
                                    onChange={(e) => handleChange('selectedTag1', e)}
                                    closeMenuOnSelect={false}
                                    value={selectedTag1}
                                    placeholder={user.business.tag1}
                                />
                            </div>}
                            {tags2.length > 0 && <div style={{ flex: 1 }}>
                                <Autocomplete
                                    options={buildNameCodeFilterOptions(tags2, 'tag2')}
                                    onChange={(e) => handleChange('selectedTag2', e)}
                                    closeMenuOnSelect={false}
                                    value={selectedTag2}
                                    placeholder={user.business.tag2}
                                />
                            </div>}
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion >
        )
    }
}