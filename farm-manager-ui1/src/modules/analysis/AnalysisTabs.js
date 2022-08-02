import React, { useState, useEffect } from 'react';
import { uniqBy } from 'lodash';
import { Tab, Tabs } from '@mui/material';
import { DataContainer, TabsBox } from "../../utils";
import { withRouter } from 'react-router-dom'
import { ANALYSIS_TABS, FINANCIAL, FOOD_SAFETY, MANAGEMENT, CUSTOM, HARVEST, FERTILIZE_IRRIGATION, MARKET, PROCUREMENT, TRACKER } from "../../components/frame/Routes";
import Reports from "./Reports";
import { subtractMonths, newDate, getStart, getEnd } from "../../utils/DateUtil";
import { getUncheckedColumns } from "../../actions/ReportActions";
import { loadDataByName } from "../../utils/LoadUtil";
import { getDomainName } from '../../utils/FieldUtil';
import { PdfView } from './PdfVIew';
import { isBaseUser } from '../../utils/FarmUtil';
import { isTracker } from '../tracker/TrackerTabs';

const REPORTS = [FINANCIAL, FOOD_SAFETY, MANAGEMENT, CUSTOM, HARVEST, FERTILIZE_IRRIGATION, MARKET, PROCUREMENT, TRACKER]


const AnalysisTabs = (props) => {
    const { history, text, match: { params: { subTab } }, lang, reports, costing, user: { business }, user } = props;

    const [start, setStart] = useState(subtractMonths(newDate(), 1));
    const [end, setEnd] = useState(newDate());
    const [selectedReport, setSelectedReport] = useState(null);
    const [uncheckedColumns, setUncheckedColumns] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [openColumns, setOpenColumns] = useState(false);
    const [reportChannel, setReportChannel] = useState('downloadReport');
    const [activityType, setActivityType] = useState('');
    const [resourceType, setResourceType] = useState('');
    const [fontSize, setFontSize] = useState(12);
    const [timeRange, setTimeRange] = useState('');
    const [selectedCrops, setSelectedCrops] = useState([]);
    const [selectedVarieties, setSelectedVarieties] = useState([]);
    const [selectedWorkers, setSelectedWorkers] = useState([]);
    const [selectedWorkerGroups, setSelectedWorkerGroups] = useState([]);
    const [selectedContractors, setSelectedContractors] = useState([]);
    const [selectedWaterSources, setSelectedWaterSources] = useState([]);
    const [selectedFertilizers, setSelectedFertilizers] = useState([]);
    const [selectedPesticides, setSelectedPesticides] = useState([]);
    const [selectedComposts, setSelectedComposts] = useState([]);
    const [selectedDisinfectants, setSelectedDisinfectants] = useState([]);
    const [selectedSites, setSelectedSites] = useState([]);

    const [selectedParentFields, setSelectedParentFields] = useState([]);
    const [selectedDomains, setSelectedDomains] = useState([]);
    const [selectedFields, setSelectedFields] = useState([]);
    const [selectedActivityDefs, setSelectedActivityDefs] = useState([]);
    const [selectedActivityDefTypes, setSelectedActivityDefTypes] = useState([]);
    const [selectedAccessories, setSelectedAccessories] = useState([]);
    const [selectedEquipments, setSelectedEquipments] = useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [selectedDestinations, setSelectedDestinations] = useState([]);
    const [selectedSuppliers, setSelectedSuppliers] = useState([]);
    const [selectedMarketingContainers, setSelectedMarketingContainers] = useState([]);
    const [selectedMarketingProducts, setSelectedMarketingProducts] = useState([]);
    const [selectedHarvestContainers, setSelectedHarvestContainers] = useState([]);
    const [selectedPests, setSelectedPests] = useState([]);
    const [selectedPesticideCategories, setSelectedPesticideCategories] = useState([]);
    const [openFields, setOpenFields] = useState(false);
    const [season, setSeason] = useState('');
    const [selectedGrowers, setSelectedGrowers] = useState([]);
    const [freeText, setFreeText] = useState('');

    const [selectedTag2, setSelectedTag2] = useState([]);
    const [selectedTag1, setSelectedTag1] = useState([]);

    const [viewUrl, setViewUrl] = useState(null);

    const [selectedEquipmentCategories, setSelectedEquipmentCategories] = useState([]);

    const [currentReports, setCurrentReports] = useState(reports.filter(f => f.category.toLowerCase() === subTab));

    const [activeOnly, setActiveOnly] = useState(true);

    const [actualExecution, setActualExecution] = useState(false);

    useEffect(() => {
        loadDataByName(props, ['fields', 'executors', 'pesticides', 'fertilizers',
            'composts', 'waterSources', 'equipment', 'varieties', 'disinfectants',
            'accessories', 'crops', 'sites', 'parentFields', 'varieties', 'activityDefs', 'activityDefTypes',
            'customers', 'reports', 'products', 'containers', 'pests', 'tags']);

    }, []);


    useEffect(() => {
        if (selectedReport && selectedReport.name) {
            getUncheckedColumns(selectedReport.name).then(response => {
                const { data } = response;
                setUncheckedColumns(data)
            });
        }

    }, [selectedReport]);


    useEffect(() => {
        if (currentReports) {
            setSelectedReport(currentReports[0])
        }

    }, [currentReports]);

    useEffect(() => {
        setCurrentReports(reports.filter(f => f.category.toLowerCase() === subTab))
    }, [subTab, reports]);

    useEffect(() => {
        if (timeRange) {
            setStart(getStart(end, timeRange));
            setEnd(getEnd(end, timeRange))
        }
    }, [timeRange]);



    function toggleColumn(column) {
        if (uncheckedColumns.includes(column)) {
            setUncheckedColumns(uncheckedColumns.filter(e => e !== column));
        } else {
            setUncheckedColumns(uncheckedColumns.concat([column]));
        }
    }


    function handleChange(name, value) {

        if (name === 'season') {
            setTimeRange('');
            setActualExecution(false);
            setSeason(value);
        }
        else if (name === 'timeRange') {
            setTimeRange(value)
            setSeason('');
        }
        else if (name === 'freeText') {
            setFreeText(value);
        }

        if (name === 'openFields') {
            setOpenFields(true);
        }

        if (name === 'actualExecution') {
            setActualExecution(!actualExecution);
        }

        const arrayValue = value ? value : [];

        if (name === 'selectedSites') {
            setSelectedSites(arrayValue);
            setSelectedParentFields([]);
            setSelectedFields([]);
            setSelectedDomains([])
        }
        else if (name === 'selectedParentFields') {
            setSelectedSites([]);
            setSelectedParentFields(arrayValue);
            setSelectedFields([]);
            setSelectedDomains([])
        }
        else if (name === 'selectedFields') {
            setSelectedSites([]);
            setSelectedParentFields([]);
            setSelectedFields(arrayValue);
            setSelectedDomains([])
        } else if (name === 'selectedTag1') {
            setSelectedTag1(arrayValue);
        } else if (name === 'selectedTag2') {
            setSelectedTag2(arrayValue);
        } else if (name === 'selectedCrops') {
            setSelectedCrops(arrayValue);
        } else if (name === 'selectedEquipments') {
            setSelectedEquipments(arrayValue);
        } else if (name === 'selectedEquipmentCategories') {
            setSelectedEquipmentCategories(arrayValue);
        } else if (name === 'selectedPesticideCategories') {
            setSelectedPesticideCategories(arrayValue);
        } else if (name === 'selectedPests') {
            setSelectedPests(arrayValue);
        } else if (name === 'selectedVarieties') {
            setSelectedVarieties(arrayValue);
        } else if (name === 'selectedWorkers') {
            setSelectedWorkers(arrayValue);
        } else if (name === 'selectedWorkerGroups') {
            setSelectedWorkerGroups(arrayValue);
        } else if (name === 'selectedContractors') {
            setSelectedContractors(arrayValue);
        } else if (name === 'selectedWaterSources') {
            setSelectedWaterSources(arrayValue);
        } else if (name === 'selectedFertilizers') {
            setSelectedFertilizers(arrayValue);
        } else if (name === 'selectedPesticides') {
            setSelectedPesticides(arrayValue);
        } else if (name === 'selectedActivityDefs') {
            setSelectedActivityDefs(arrayValue);
        } else if (name === 'selectedActivityDefTypes') {
            setSelectedActivityDefTypes(arrayValue);
        } else if (name === 'selectedDomains') {
            setSelectedDomains([]);// must be empty
        } else if (name === 'selectedGrowers') {
            setSelectedGrowers(arrayValue);
        } else if (name === 'activityType') {
            setActivityType(value);
        } else if (name === 'resourceType') {
            setResourceType(value);
        } else if (name === 'reportChannel') {
            setReportChannel(value);
        } else if (name === 'fontSize') {
            setFontSize(value);
        } else if (name === 'selectedComposts') {
            setSelectedComposts(arrayValue);
        } else if (name === 'selectedDisinfectants') {
            setSelectedDisinfectants(arrayValue);
        } else if (name === 'selectedAccessories') {
            setSelectedAccessories(arrayValue);
        } else if (name === 'selectedCustomers') {
            setSelectedCustomers(arrayValue);
        } else if (name === 'selectedDestinations') {
            setSelectedDestinations(arrayValue);
        } else if (name === 'selectedSuppliers') {
            setSelectedSuppliers(arrayValue);
        } else if (name === 'selectedMarketingContainers') {
            setSelectedMarketingContainers(arrayValue);
        } else if (name === 'selectedMarketingProducts') {
            setSelectedMarketingProducts(arrayValue);
        } else if (name === 'selectedHarvestContainers') {
            setSelectedHarvestContainers(arrayValue);
        }
    };

    const handlePanelChange = panel => (event, expanded) => {
        setExpanded(expanded ? panel : false)
    };


    function handleClickCloseFields(fields) {



        const newSelectedFields = fields ? selectedDomains.concat(fields.map(e => ({
            value: 'domain_' + e.id,
            label: getDomainName(e, true)
        }))) : selectedDomains;


        setOpenFields(false);
        setSelectedDomains(uniqBy(newSelectedFields, 'value'));
    }




    const hasCustom = reports.filter(f => f.category.toLowerCase() === CUSTOM).length > 0;
    const isBasic = isBaseUser(user);

    if (viewUrl) {
        return (
            <PdfView url={viewUrl} setViewUrl={setViewUrl} />)

    }
    return (
        <TabsBox>
            <Tabs
                value={subTab}
                onChange={(event, value) => history.push(`${ANALYSIS_TABS}${value}`)}
                scrollButtons="auto">

                {!isBasic && <Tab value={MANAGEMENT}
                    label={text.management} />}
                {costing && <Tab value={FINANCIAL}
                    label={text.financial} />}
                <Tab value={FOOD_SAFETY}
                    label={text.standardReports} />
                {!isBasic && <Tab value={FERTILIZE_IRRIGATION}
                    label={text.fertilize_irrigation} />}
                {!isBasic && <Tab value={HARVEST}
                    label={text.harvest} />}
                {!isBasic && <Tab value={MARKET}
                    label={text.market} />}
                {costing && <Tab value={PROCUREMENT}
                    label={text.procurement} />}
                {isTracker(props.user) && <Tab value={TRACKER}
                    label={text.tracker} />}
                {hasCustom && <Tab value={CUSTOM}
                    label={business.name} />}

            </Tabs>
            <DataContainer>

                {REPORTS.indexOf(subTab) > -1 && selectedReport &&
                    <Reports
                        start={start}
                        setViewUrl={setViewUrl}
                        end={end}
                        onStartChange={(start) => setStart(start)}
                        onEndChange={(end) => setEnd(end)}
                        onSelect={(selectedReport) => setSelectedReport(selectedReport)}
                        text={text}
                        lang={lang}
                        selectedReport={selectedReport}
                        availableReports={currentReports}
                        toggleColumn={(e) => toggleColumn(e)}
                        uncheckedColumns={uncheckedColumns}
                        handlePanelChange={(event, expanded) =>
                            handlePanelChange(event, expanded)}
                        expanded={expanded}
                        toggleOpenColumns={(e) => setOpenColumns(!openColumns)}
                        openColumns={openColumns}
                        handleChange={(name, value) => handleChange(name, value)}
                        fontSize={fontSize}
                        reportChannel={reportChannel}
                        activityType={activityType}
                        timeRange={timeRange}
                        season={season}
                        resourceType={resourceType}
                        selectedCrops={selectedCrops}
                        selectedVarieties={selectedVarieties}
                        selectedWorkers={selectedWorkers}
                        selectedWorkerGroups={selectedWorkerGroups}
                        selectedContractors={selectedContractors}
                        selectedWaterSources={selectedWaterSources}
                        selectedFertilizers={selectedFertilizers}
                        selectedPesticides={selectedPesticides}
                        selectedComposts={selectedComposts}
                        selectedDisinfectants={selectedDisinfectants}
                        selectedSites={selectedSites}
                        selectedParentFields={selectedParentFields}
                        selectedEquipments={selectedEquipments}
                        selectedActivityDefs={selectedActivityDefs}
                        selectedActivityDefTypes={selectedActivityDefTypes}
                        selectedAccessories={selectedAccessories}
                        selectedDomains={selectedDomains}
                        selectedFields={selectedFields}
                        handleClickCloseFields={(e) => handleClickCloseFields(e)}
                        openFields={openFields}
                        selectedCustomers={selectedCustomers}
                        selectedDestinations={selectedDestinations}
                        selectedSuppliers={selectedSuppliers}
                        selectedMarketingContainers={selectedMarketingContainers}
                        selectedMarketingProducts={selectedMarketingProducts}
                        selectedHarvestContainers={selectedHarvestContainers}
                        selectedPests={selectedPests}
                        selectedPesticideCategories={selectedPesticideCategories}
                        categoty={subTab}
                        selectedGrowers={selectedGrowers}
                        freeText={freeText}
                        selectedTag1={selectedTag1}
                        selectedTag2={selectedTag2}
                        selectedEquipmentCategories={selectedEquipmentCategories}
                        activeOnly={activeOnly}
                        setActiveOnly={setActiveOnly}
                        actualExecution={actualExecution}
                        setActualExecution={setActualExecution}
                        {...(props)}
                    />}
            </DataContainer>
        </TabsBox>
    );


}

export default withRouter(AnalysisTabs);
