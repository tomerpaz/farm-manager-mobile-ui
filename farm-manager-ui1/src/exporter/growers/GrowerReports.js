import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { withRouter } from 'react-router-dom'
import { TopBackBar } from '../../components';
import { uniqBy } from 'lodash';
import { loadDataByName } from '../../utils/LoadUtil';
import { subtractMonths, newDate, getStart, getEnd } from '../../utils';
import { FOOD_SAFETY } from '../../components/frame/Routes';
import Reports from '../../modules/analysis/Reports';
import { getDomainName } from '../../utils/FieldUtil';
import { PdfView } from '../../modules/analysis/PdfVIew';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
        //   backgroundColor: theme.palette.common.white,

        //   margin: theme.spacing(1),
    },
}));

const GrowerReports = (props) => {
    const classes = useStyles();

    const selectedUser = props.match.params.user;
    sessionStorage.setItem('x-acting', selectedUser);

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

    const [selectedEquipmentCategories, setSelectedEquipmentCategories] = useState([]);


    const [openFields, setOpenFields] = useState(false);
    const [season, setSeason] = useState('');

    const { fields, text, lang, reports } = props;

    const currentReports = reports.filter(f => f.category.toLowerCase() === FOOD_SAFETY);

    const [viewUrl, setViewUrl] = useState(null);
    const [activeOnly, setActiveOnly] = useState(true);


    useEffect(() => {
        loadDataByName(props, ['fields', 'executors', 'pesticides', 'fertilizers',
            'composts', 'waterSources', 'equipment', 'varieties', 'disinfectants',
            'accessories', 'crops', 'sites', 'parentFields', 'varieties', 'activityDefs', 'activityDefTypes',
            'customers', 'reports', 'products', 'containers', 'pests'], true);

        return () => {
            sessionStorage.removeItem('x-acting');
        }

    }, []);



    function toggleColumn(column) {
        if (uncheckedColumns.includes(column)) {
            setUncheckedColumns(uncheckedColumns.filter(e => e !== column));
        } else {
            setUncheckedColumns(uncheckedColumns.concat([column]));
        }
    }

    useEffect(() => {
        if (timeRange) {
            setStart(getStart(end, timeRange));
            setEnd(getEnd(end, timeRange))
        }
    }, [timeRange]);

    function handleChange(name, value) {
        if (name === 'season') {
            setTimeRange('')
            setSeason(value);
        }
        else if (name === 'timeRange') {
            setTimeRange(value)
            setSeason('');
        }

        if (name === 'openFields') {
            setOpenFields(true);
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
        }

        else if (name === 'selectedCrops') {
            setSelectedCrops(arrayValue);
        }


        else if (name === 'selectedEquipments') {
            setSelectedEquipments(arrayValue);
        }

        else if (name === 'selectedEquipmentCategories') {
            setSelectedEquipmentCategories(arrayValue);
        }

        else if (name === 'selectedPesticideCategories') {
            setSelectedPesticideCategories(arrayValue);
        }


        else if (name === 'selectedPests') {
            setSelectedPests(arrayValue);
        }

        else if (name === 'selectedVarieties') {
            setSelectedVarieties(arrayValue);
        }

        else if (name === 'selectedWorkers') {
            setSelectedWorkers(arrayValue);
        }


        else if (name === 'selectedWorkerGroups') {
            setSelectedWorkerGroups(arrayValue);
        }

        else if (name === 'selectedContractors') {
            setSelectedContractors(arrayValue);
        }

        else if (name === 'selectedWaterSources') {
            setSelectedWaterSources(arrayValue);
        }

        else if (name === 'selectedFertilizers') {
            setSelectedFertilizers(arrayValue);
        } else if (name === 'activityType') {
            setActivityType(value);
        } else if (name === 'resourceType') {
            setResourceType(value);
        } else if (name === 'reportChannel') {
            setReportChannel(value);
        } else if (name === 'fontSize') {
            setFontSize(value);
        }
        else if (name === 'selectedPesticides') {
            setSelectedPesticides(arrayValue);
        } else if ('selectedDomains') {
            setSelectedDomains([]);// must be empty
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

    if(viewUrl){
        return (
            <PdfView url={viewUrl} setViewUrl={setViewUrl}/>)
    
    }


    return (
        <div className={classes.root} >
            <TopBackBar label={props.text.back} {...props} />
            <Reports
                setViewUrl={setViewUrl}
                start={start}
                end={end}
                onStartChange={(start) => setStart(start)}
                onEndChange={(end) => setEnd(end)}
                onSelect={(selectedReport) => setSelectedReport(selectedReport)}
                text={text}
                lang={lang}
                selectedReport={selectedReport && selectedReport.category === currentReports[0].category ? selectedReport : currentReports[0]}
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
                categoty={FOOD_SAFETY}
                selectedGrowers={[]}
                selectedTag1={[]}
                selectedTag2={[]}
                selectedEquipmentCategories={selectedEquipmentCategories}
                activeOnly={activeOnly}
                setActiveOnly={setActiveOnly}
                {...props}
            />
        </div>
    )
}
export default withRouter(GrowerReports);



