import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Field, formValueSelector, getFormSyncErrors, reduxForm, SubmissionError } from 'redux-form'
import { Divider } from '@mui/material';
import { FormTitle, Loading, getSuggestionsNameElement } from '../../components/core'

import ActivityHeader from "./fieldsheader/ActivityHeader";
import ResourceTable from "./resourcetable/ResourceTable";
import ResourcesHeader from './resourceheader/ResourcesHeader';
import { getCropPesticideLists, getResourceTariff } from "../../actions";
import { filter as filterLodash, isEmpty as isJsonEmpty, sumBy } from 'lodash';
import { QuickAdd, QuickAddDialog } from '../';


import { isIvnevtoryCheck } from './ActivityUtil';

import { TextField } from '../../components/core/form/wrapper';
import {
    HARVEST,
    MARKET,
    PEST_MONITOR,
    PESTICIDE,
    SPRAYER_ACTIVITIES,
    VARIETY,
    VARIETY_ACTIVITES,
    WATERSOURCE_ACTIVITES,
    GENERAL
} from './types'
import {
    calacTotalPesticideVolume,
    calcSprayerCount,
    calcTotalFertilizerQty,
    calcTotalWaterQtyUtilFunc,
    adjustUsageAmountForTariff
} from "../../utils/FarmCalculator";
import { diffInDays, getYearOptions } from "../../utils/DateUtil";
import FormActions from '../../components/forms/FormActions'
import { allowDuplicateDomains, fieldLocations, isPesticides, isSprayer, getDocumentRefText } from "./ActivityUtil";
import { deleteActivity, saveActivity } from "../../actions/ActivityActions";
import { ACTIVITY_CREATED, ACTIVITY_UPDATED, CREATED, SET_MESSAGE, DELETE_ACTIVITY, MARK_DELETE_ACTIVITY } from "../../actions/types";

import DomainSelection from './DomainSelection';

import {
    CONTRACTOR,
    CUSTOMER,
    DISABLED_BY_PRIME_CONTRACTOR,
    FERTILIZER,
    WATER,
    WORKER_GROUP
} from "../../reducers/ResourceReducer";
import DecoratedLabel from "../../components/DecoratedLabel";
import { isEmpty } from "../../utils/StringUtil";
import { getUnit, PER_AREA_UNIT, PER_HOUR, PER_DAY } from "../../utils/Units";
import { calcSingleRowIncome, MARKET_METHOD_WEIGHT, CALC_BY_ITEM_COUNT, MARKET_METHOD_AREA } from "./fieldstable/MarketFieldTable";
import { getPesticidesByList } from "../../actions/PesticideListActions";
import { scrollToFirstErrorLocation } from "../../components/core/form/FormUtil";
import { CALCULATOR_TYPES } from './resourcetable/IrrigationResourceTable';
import { formStyle } from '../../utils/FormStyle';
import { INVENTORY_TYPES } from '../../reducers/InventoryReducer';


const useStyles = makeStyles(theme => formStyle(theme));

function getResourceAmount(resourceUsage, activityType, calculator) {
    let result = 0;
    if (calculator && WATERSOURCE_ACTIVITES.includes(activityType) &&
        (resourceUsage.resourceType === WATER || resourceUsage.resourceType === FERTILIZER)) {
        result = resourceUsage.total;
    }
    else {
        result = resourceUsage.groupAmount
    }
    if (!result) {
        result = 0;
    }

    return result;
}

const domainNumericColumns = ['itemCount', 'netWeight', 'totalRedemption'];


const ActivityFormBase = (props) => {
    const classes = useStyles();

    const { location, activity, clearResource, selectActivityDef, match: { params },
        location: { search }, change, activityType, resources, autoHour,
        cropID, irrigationDays, execution, end, init, array,
        crops, executingPlan, touch, user, getInventory, /*warehouseID,*/ uuid,
        history, sprayerID, selectedActivityDefOption,
        activityDomains, autoArea, setActivity, defaultProduct, defaultMarketContainer, defaultMarketDestination,
        defaultHarvestContainer, dispatch, text, sprayVolumePerArea, activityArea, marketMethod, containers, selectionDomains,

        handleSubmit, pristine,
        submitting,
        diffDays, deletable, dir,
        currency, warehouseOptions, editable,
        submitErrors,
        documentRef,
        externalId,
        irrigationMethod,
        irrigationFrequency, sprayerCapacity,
        fertilizeMethod, calcTotalWaterQty, domains, cropOptions
    } = props

    const [openFields, setOpenFields] = useState(false);
    const [openWaybill, setOpenWaybill] = useState(false);
    const [openResources, setOpenResources] = useState(false);
    const [resourceAmountEdit, setResourceAmountEdit] = useState(null);
    const [loadTariff, setLoadTariff] = useState(false);
    const [pesticides, setPesticides] = useState([]);
    const [pesticideLists, setPesticideLists] = useState([]);
    const [pesticideListId, setPesticideListId] = useState(null);
    const [loadPesticideLists, setLoadPesticideLists] = useState(true);
    const [renderDomainSelections, setRenderDomainSelections] = useState(true);

    const [expendFieldTable, setExpendFieldTable] = useState(false);
    const [calcWeight, setCalcWeight] = useState(false);
    const [initialDomainId, setInitialDomainId] = useState(search && search.length > 2 ? Number(search.substr(search.indexOf('=') + 1)) : null);
    const [calculator, setCalculator] = useState(false);
    const [phenologicalStages, setPhenologicalStages] = useState([]);
    const [syncPrimeContractor, setSyncPrimeContractor] = useState(false);
    const [quickAdd, setQuickAdd] = useState(null);
    const [fetchInventory, setFetchInventory] = useState(!activity && params.id && params.id !== '0' ? true : false);

    const [calcAutoArea, setCalcAutoArea] = useState(false);
    const [baseFields, setBaseFields] = useState(user.business.selectBaseFields);

    useEffect(() => {
        clearResource(true);
        selectActivityDef(null);
        return () => {
            console.log('unmount...')
            if (!quickAdd) {
                console.log('unmount...', quickAdd)

                setActivity(null);
            }
        }
    }, [])


    const setResourceEditGroupAmount = (row, groupAmount, perAmount, rowIndex, secondary) => {
        console.log('setResourceEditGroupAmount', perAmount)

        setResourceAmountEdit(null)

        if (row) {
            if (secondary) {
                console.log('secondary groupAmount', groupAmount)
                change(`resources[${rowIndex}].secondaryGroupAmount`, groupAmount);
            }
            else if (row.resourceType === WORKER_GROUP && row.workerCount) {
                change(`resources[${rowIndex}].workerCount`, perAmount);
                changeResourceTableColumn('groupAmount', groupAmount, row, rowIndex);
            } else {
                change(`resources[${rowIndex}].resourcePerDomainUnit`, perAmount);
                changeResourceTableColumn('groupAmount', groupAmount, row, rowIndex);
            }
        }
    }

    // useEffect(() => {
    //     if (quickAdd) {
    //         history.push(quickAdd);
    //     }
    // }, [quickAdd])

    useEffect(() => {
        if (resources && calculator && WATERSOURCE_ACTIVITES.includes(activityType)) {
            calcTotalWaterQtyFunc();
        }
    }, [resources, fertilizeMethod, irrigationMethod, irrigationDays, execution, end])

    useEffect(() => {
        if (executingPlan === true) {
            console.log('executingPlan...')
            change("executingPlan", null);
            touch("execution");
        }
    }, [executingPlan])


    useEffect(() => {
        if (loadTariff) {
            loadResourceTariff();
        }
    }, [loadTariff])


    useEffect(() => {
        if (syncPrimeContractor) {
            setSyncPrimeContractor(false);
            syncPrimeContractorFunc();
        }
    }, [syncPrimeContractor])


    useEffect(() => {
        if (!renderDomainSelections) {
            setRenderDomainSelections(true);
        }
    }, [renderDomainSelections])

    useEffect(() => {
        if (activityDomains) {
            calcActivityAreaFunc(calcAutoArea);
            setCalcAutoArea(true);
        }
    }, [activityDomains])

    useEffect(() => {
        if (isPesticides(activityType)) {
            const sprayerCountTemp = calcSprayerCount(activityArea, sprayerCapacity, sprayVolumePerArea);
            change("sprayerCount", sprayerCountTemp);
            // const totalSprayVolumeTemp = Number(sprayVolumePerArea * activityArea).toFixed(2);
            // change("totalSprayVolume", totalSprayVolumeTemp);
        }
    }, [activityArea, sprayerCapacity, sprayVolumePerArea])

    useEffect(() => {
        if (isPesticides(activityType)) {
            const totalSprayVolumeTemp = Number(sprayVolumePerArea * activityArea).toFixed(2);
            change("totalSprayVolume", totalSprayVolumeTemp);
        }
    }, [activityArea])




    useEffect(() => {
        if (WATERSOURCE_ACTIVITES.includes(activityType)) {
            change('diffDays', diffInDays(execution, end));
            if (calculator) {
                calcIrrigationDaysFunc();
            }
        }
    }, [execution, end, irrigationFrequency])



    useEffect(() => {
        if (calcWeight) {
            calcWeightFunc();
            setCalcWeight(false);
        }
    }, [calcWeight])


    useEffect(() => {
        if (isPesticides(activityType) && loadPesticideLists && cropID) {
            setLoadPesticideLists(false);
            setPesticides([]);
            setOpenResources(false);
            setPesticideListId(null);
            setPesticideLists([]);

            getCropPesticideLists(cropID).then(function (response) {
                const pesticideListsTemp = response.data.lists;
                pesticideListsTemp.forEach((list) => list.name = list.name + ' (' + list.businessName + ')')
                const pesticideListIdTemp = pesticideListsTemp.length > 0 ? pesticideListsTemp[0].id : null;
                change('pesticideListId', pesticideListIdTemp);
                setPesticideListId(pesticideListIdTemp)
                setPesticides(response.data.pesticides);
                setPesticideLists(pesticideListsTemp)

            });
        }
    }, [loadPesticideLists, cropID])

    useEffect(() => {
        if (activityType === PEST_MONITOR) {

            if (crops.length > 0 && cropID !== null && phenologicalStages.length === 0) {
                const crop = crops.find(e => e.id === cropID);
                if (crop && !isEmpty(crop.substance.note)) {
                    setPhenologicalStages(crop.substance.note.split(","))
                }
            }
        }
        if (WATERSOURCE_ACTIVITES.includes(activityType)) {
            if (init === -1) {
                change('init', 1);
                change('diffDays', diffInDays(execution, end))
                setCalculator(!isEmpty(irrigationMethod));
                calcIrrigationDaysFunc();
            }


        }
        if (initialDomainId && activityType) {
            const foundDomain = domains.find(d => d.id === initialDomainId);

            if (foundDomain) {
                array.unshift("activityDomains", foundDomain);
                change('activityArea', foundDomain.plantArea);

                setInitialDomainId(null);
                if (isPesticides(activityType)) {
                    const selectedCropOption = cropOptions.find(e => e.id == foundDomain.variety.cropID);
                    change('selectedCropOption', selectedCropOption);
                    change('cropID', selectedCropOption.id);
                    setLoadPesticideLists(true);
                    setRenderDomainSelections(false);
                }
            }

        }
    }, [activityType, initialDomainId])


    useEffect(() => {
        if (sprayVolumePerArea) {
            calcPesticideGroupAmountFunc(activityArea);
        }
    }, [sprayVolumePerArea])

    useEffect(() => {
        if (execution) {
            setFetchInventory(true);
        }
        // console.log('warehouseID', warehouseID)
        // change('warehouseID', warehouseID)
    }, [execution])

    useEffect(() => {
        if (fetchInventory) {
            if (isIvnevtoryCheck(user)) {
                const hasRelevantResources = resources ? resources.filter(e => INVENTORY_TYPES.includes(e.resource.type) && e.warehouseId != null) : [];
                if (hasRelevantResources.length > 0) {
                    const filter = [];
                    hasRelevantResources.forEach(e => {
                        filter.push({ value: 'resource_' + e.resource.id })
                        filter.push({ value: 'warehouse_' + e.warehouseId })
                    })
                    if (!isEmpty(uuid)) {
                        filter.push({ value: 'uuid_' + uuid });
                    }
                    filter.push({ value: 'convert_false' })
                    getInventory(execution, filter);
                }
            }

            setFetchInventory(false);

        }

    }, [fetchInventory])

    const syncPrimeContractorFunc = () => {
        const primeContractorID = resources.find(r => r.resource.type === CONTRACTOR && r.resource.prime === true)
        resources.forEach((e, index, arr) => {
            if (DISABLED_BY_PRIME_CONTRACTOR.includes(e.resource.type)) {
                change(`resources[${index}].useInCostReport`, primeContractorID ? false : true);
            }
        })

    }

    const handleClickOpenFields = () => {

        const okOpen = !(isPesticides(activityType) && cropID === null);
        setOpenFields(okOpen);
    };

    const handleClickOpenWaybill = () => {
        setOpenWaybill(true);
    };

    const handleExpendFieldTable = () => {
        setExpendFieldTable(!expendFieldTable)
    };


    const handleClickCloseFields = (selectedDomains) => {
        setOpenFields(false);
        setOpenWaybill(false);

        console.log('selectedDomains', selectedDomains)

        touch("activityDomains");



        if (selectedDomains) {

            if (baseFields) {
                const baseFieldIds = selectedDomains.map(e => e.id)
                selectedDomains = selectionDomains.filter(e => baseFieldIds.includes(e.field.id));
                if (cropID) {
                    selectedDomains = selectedDomains.filter(e => e.variety.cropID === cropID);
                }
            }


            let alreadySelected = activityDomains.map(d => d.id);
            const allowDuplicate = allowDuplicateDomains(activityType);

            if (!allowDuplicate) {
                selectedDomains = selectedDomains.filter(domain => alreadySelected.indexOf(domain.id) < 0);
            }
            selectedDomains.forEach(function (domain, index, arr) {
                domain.activityArea = domain.plantArea;

                if (activityType === MARKET) {
                    if (!domain.itemCount) {
                        domain.itemCount = 0;
                    }
                    if (!domain.netWeight) {
                        domain.netWeight = 0;
                    }
                    domain.totalRedemption = 0;
                    domain.product = null;
                    domain.container = null;
                    domain.destination = '';
                }
                if (activityType === HARVEST) {
                    domain.itemCount = 0;
                    domain.netWeight = 0;
                    domain.container = null;
                }
                array.unshift("activityDomains", domain);
            });
        }
    };


    const handleClickOpenResources = () => {
        setOpenResources(true);
    };

    const handleClickCloseResources = (selectedResources, fetchDomains) => {
        setOpenResources(false);
        let calcSprayerTemp = false;

        change('fetchDomains', fetchDomains);
        if (selectedResources) {

            let alreadySelected = resources.map(r => r.resourceId);
            let newResources = selectedResources.filter(resource => !alreadySelected.includes(resource.resourceId));

            let tempResources = [...resources];
            // if (VARIETY_ACTIVITES.indexOf(activityType) > -1) {
            //     let newVariety = newResources.filter(r => r.resourceType === VARIETY);
            //     if (newVariety.length > 0) {
            //         tempResources = resources.filter(r => r.resourceType !== VARIETY);
            //     }
            // }
            if (WATERSOURCE_ACTIVITES.includes(activityType)) {
                let newWater = newResources.filter(r => r.resourceType === WATER);
                if (newWater.length > 0) {
                    tempResources = resources.filter(r => r.resourceType !== WATER);
                }
            }
            if (SPRAYER_ACTIVITIES.indexOf(activityType) > -1) {
                let newSprayers = filterLodash(newResources, (resource) => {
                    return resource.resourceCategory === 'SPRAYER'
                });

                if (newSprayers.length > 0) {
                    tempResources = filterLodash(resources, (resource) => {
                        return resource.resourceCategory !== 'SPRAYER'
                    });
                    const sprayer = newSprayers[0];
                    if (sprayer.unit === PER_AREA_UNIT) {
                        sprayer.groupAmount = activityArea.toFixed(2);
                    }
                    tempResources.push(sprayer)
                    change('sprayerID', sprayer.resourceId);
                    change('sprayerCapacity', sprayer.resource.capacity);
                    calcSprayerTemp = true;
                    newResources = filterLodash(newResources, (resource) => {
                        return resource.resourceCategory !== 'SPRAYER'
                    });
                }
                newResources.forEach(function (resource, index, arr) {
                    if (resource.resourceType === 'PESTICIDE') { //unit, pesticideDosage, sprayVolume, area
                        const pesticideAmount = calacTotalPesticideVolume(resource.pesticide.unit, resource.dosage, sprayVolumePerArea, activityArea);
                        resource.groupAmount = pesticideAmount.toFixed(2);
                    }
                });
            }

            newResources.forEach(function (resource, index, arr) {
                if (autoArea) {
                    const unit = getUnit(resource.resource, selectedActivityDefOption ? selectedActivityDefOption.element : null);
                    if (unit === PER_AREA_UNIT) {
                        resource.groupAmount = activityArea.toFixed(2);
                    }
                }
                tempResources.push(resource);
            });
            change('resources', tempResources);
            setLoadTariff(true);
            setSyncPrimeContractor(true);
            setFetchInventory(true)

            //  this.setState({ loadTariff: true, calcSprayer, varietyChange, syncPrimeContractor: true, fetchInventory: true });
        }
    };

    const cancelAction = () => {
        // const { history, exitRoute, setActivity } = this.props;
        setActivity(null);
        history.goBack();
    }

    const deleteAction = () => {
        // const { uuid, dispatch, text } = this.props;
        cancelAction();
        dispatch({
            type: MARK_DELETE_ACTIVITY,
            payload: uuid,
        });
        deleteActivity(uuid).then(response => {
            const { data: { status, count, resultMessage } } = response;
            let message = resultMessage;
            if (status === 'OK') {
                if (count === 1) {
                    message = text.recordDeleted;
                } else if (count > 1) {
                    message = `${count} ${text.recordsDeleted}`;
                }
            }
            dispatch({
                type: SET_MESSAGE,
                payload: message
            });
            dispatch({
                type: DELETE_ACTIVITY,
            });
        })
    }


    const handleFormSubmit = (data) => {
        //    console.log('handleFormSubmit', data)
        if (data.selectedActivityDefOption) {
            data.activityDef = data.selectedActivityDefOption.element;
        }

        if (data.selectedActivityDefOption) {
            data.activityDef = data.selectedActivityDefOption.element;
        }

        if (data.selectedCustomerOption) {
            data.customer = data.selectedCustomerOption.element;
        }
        return saveActivity(data).catch((error) => {
            if (error) {
                console.log(error);
                throw new SubmissionError(error)
            }
        });
    }

    const changeFieldActualSize = (value, rowData, rowIndex) => {
        value = Number(value);
        change(`activityDomains[${rowIndex}].activityArea`, value);
    }

    const calcActivityAreaFunc = (isCalcAutoArea) => {
        let total = 0;
        activityDomains.forEach(function (domain, index, arr) {

            total += domain.activityArea;
        });
        change('activityArea', total);
        console.log('isCalcAutoArea', isCalcAutoArea);
        if (isCalcAutoArea && autoArea) {
            resources.forEach((ru, index, arr) => {
                const unit = getUnit(ru.resource, selectedActivityDefOption ? selectedActivityDefOption.element : null);
                if (unit === PER_AREA_UNIT) {
                    change(`resources[${index}].groupAmount`, total.toFixed(2));
                    if (ru.tariff && total) {
                        const totalCost = ru.tariff * total;
                        change(`resources[${index}].totalCost`, totalCost);

                    }

                }
            });
        }
        if (SPRAYER_ACTIVITIES.includes(activityType)) {
            calcPesticideGroupAmountFunc(total);
        }
    }


    const loadResourceTariff = () => {

        setLoadTariff(false);
        const activityDefID = selectedActivityDefOption ? selectedActivityDefOption.id : null;
        const referenceId = isSprayer(activityType) ? sprayerID : activityDefID;
        const resourceIds = resources.filter(ru => ru.manualTariff === false).map(ru => ru.resourceId)
        const isDate = execution instanceof Date;

        const time = isDate ? execution.getTime() : Date.parse(execution);
        if (resourceIds.length > 0) {
            getResourceTariff(activityType, time, resourceIds, referenceId).then(function (response) {
                const tariffs = response.data;
                tariffs.forEach(t => {
                    const index = resources.findIndex(r => r.resourceId === t.tariffResource.id);
                    change(`resources[${index}].tariff`, t.price);
                    const amount = getResourceAmount(resources[index], activityType, calculator);
                    change(`resources[${index}].totalCost`, (adjustUsageAmountForTariff(amount, resources[index]) * t.price));
                })
            })
        }
    }


    const calcPesticideGroupAmountFunc = (activityAreaValue) => {
        resources.forEach((ru, index, arr) => {
            if (ru.resourceType === PESTICIDE) {
                if (!ru.manualGroupAmount) {
                    const pesticide = ru.pesticide
                    const pesticideAmount = calacTotalPesticideVolume(pesticide.unit, ru.dosage, sprayVolumePerArea, activityAreaValue);
                    const groupAmount = pesticideAmount.toFixed(3);
                    change(`resources[${index}].groupAmount`, groupAmount);
                    change(`resources[${index}].totalCost`, groupAmount * ru.tariff);

                }
            }
        })
    }

    const onCropChange = (option) => {
        //const { change, activityType } = this.props;
        change('activityDomains', []);
        change('resources', resources.filter(e => e.resourceType !== PESTICIDE));

        if (option && option.element) {
            const cropIDTemp = option.element.id;
            change('cropID', cropIDTemp);
            let phenologicalStagesTemp = [];
            if (activityType === PEST_MONITOR) {
                const crop = option.element;
                if (crop && !isEmpty(crop.substance.note)) {
                    phenologicalStagesTemp = crop.substance.note.split(",");
                }

            }
            setLoadPesticideLists(true);
            setRenderDomainSelections(false);
            setPhenologicalStages(phenologicalStagesTemp)
            // this.setState({ loadPesticideLists: true, renderDomainSelections: false, phenologicalStages })
        } else {
            change('cropID', null);
        }
    }

    const onDateChange = (preventDefault, newDate, preDate, elementName) => {
        // if (WATERSOURCE_ACTIVITES.includes(activityType)) {
        //     setCalcDaysDiff(true);
        // }
    }


    const changeDomainTableColumn = (column, value, row, rowIndex, applyAll) => {

        //  const { array, activityDomains, activityArea, marketMethod } = this.props;
        if (domainNumericColumns.indexOf(column) > -1) {
            value = Number(value);
            value = value ? value : 0;
        }

        if (column === 'itemCount') {
            const containerCapacity = row.container ? row.container.capacity : null;
            if (value && containerCapacity) {
                change(`activityDomains[${rowIndex}].netWeight`, value * containerCapacity);
                setCalcWeight(true);
            }

        }

        if (column === 'actualExecution') {
            console.log('actualExecution', value)
            change(`activityDomains[${rowIndex}].manualTrack`, true);
        }

        if (column === 'duplicate') {
            console.log(row)
            const duplicate = row; //cloneDeep(row);
            array.insert(`activityDomains`, rowIndex + 1, duplicate);
            return;
        }
        if (column === 'delete') {
            array.remove(`activityDomains`, rowIndex);
            return;
        }

        if (column === 'unitCost') {
            const netWeight = activityDomains[rowIndex].netWeight;
            const itemCount = activityDomains[rowIndex].itemCount;
            const plantArea = activityDomains[rowIndex].plantArea;

            if (marketMethod === MARKET_METHOD_WEIGHT && netWeight && netWeight !== 0) {
                change(`activityDomains[${rowIndex}].totalRedemption`, Number((netWeight * value).toFixed(2)));
            } else if (CALC_BY_ITEM_COUNT.includes(marketMethod) && itemCount && itemCount !== 0) {
                change(`activityDomains[${rowIndex}].totalRedemption`, Number((itemCount * value).toFixed(2)));
            } else if (marketMethod === MARKET_METHOD_AREA) {
                change(`activityDomains[${rowIndex}].totalRedemption`, Number((plantArea * value).toFixed(2)));
            }
        }

        if (row === 'summary' && activityArea > 0) {
            onSummaryChange(column, value)
        }
        else {
            if (applyAll === true) {
                activityDomains.forEach((e, index, arr) => {
                    change(`activityDomains[${index}].${column}`, value);
                });
            } else {
                change(`activityDomains[${rowIndex}].${column}`, value);
            }
        }

        if (column === 'container' && value) {
            if (applyAll === true) {
                activityDomains.forEach((e, index, arr) => {
                    change(`activityDomains[${index}].container`, value);
                    // if(value.capacity && e.itemCount){
                    //     change(`activityDomains[${index}].netWeight`, value.capacity * e.itemCount);
                    // }
                });
            } else {
                change(`activityDomains[${rowIndex}].container`, value);
                if (activityType === HARVEST && value.capacity && row.itemCount) {
                    change(`activityDomains[${rowIndex}].netWeight`, value.capacity * row.itemCount);
                }
            }
            setCalcWeight(true);
        }
        if (column === 'product') {
            if (applyAll === true) {
                activityDomains.forEach((e, index, arr) => {
                    change(`activityDomains[${index}].product`, value);
                });
            } else {
                change(`activityDomains[${rowIndex}].product`, value);
            }
        }

    }

    const calcWeightFunc = (total) => {
        console.log('calcWeightFunc');
        activityDomains.forEach((ru, index, arr) => {
            const container = containers.find(e => e.id === ru.containerId);
            const itemCount = ru.itemCount;
            if (itemCount && container && container.capacity) {
                const capacity = container.capacity;
                const netWeight = itemCount * capacity;
                change(`activityDomains[${index}].netWeight`, netWeight);
            }
        });
    }

    const changeResourceTableColumn = (column, value, row, rowIndex) => {

        console.log('rowIndex', rowIndex);
        change(`resources[${rowIndex}].${column}`, value);
        if (column === 'groupAmount') {
            if (calculator && WATERSOURCE_ACTIVITES.includes(activityType) && row.resourceType === 'WATER') {
            }
            else if (calculator && WATERSOURCE_ACTIVITES.includes(activityType) && row.resourceType === 'FERTILIZER') {
            }
            else if (value && row.tariff) {
                change(`resources[${rowIndex}].totalCost`, adjustUsageAmountForTariff(value, row) * row.tariff);
            }

            if (SPRAYER_ACTIVITIES.includes(activityType) && row.resourceType === PESTICIDE) {
                change(`resources[${rowIndex}].manualGroupAmount`, true);
            }
            if (autoHour && row.resource.usageUnit === PER_HOUR) {
                resources.forEach((element, index, arr) => {
                    if (index > rowIndex && element.resource.usageUnit === PER_HOUR) {
                        change(`resources[${index}].groupAmount`, value);
                        if (value && element.tariff) {
                            change(`resources[${index}].totalCost`, (adjustUsageAmountForTariff(value, element) * element.tariff));
                        }
                    }
                });
            }
            if (row.resource.type === WORKER_GROUP && row.resource.usageUnit === PER_DAY) {
                const enteredValue = Number(value);
                change(`resources[${rowIndex}].workerCount`, enteredValue ? enteredValue.toFixed(0) : 0);
            }

        }
        else if (column === 'tariff') {
            const amount = getResourceAmount(row, activityType);
            change(`resources[${rowIndex}].totalCost`, (adjustUsageAmountForTariff(amount, row) * value));
            change(`resources[${rowIndex}].manualTariff`, true);
            change(`resources[${rowIndex}].useInCostReport`, true);
        }
        else if (column === 'unit') {
            change(`resources[${rowIndex}].manualTariff`, true);
            change(`resources[${rowIndex}].useInCostReport`, true);
        }

        else if (column === 'dosage') {
            console.log(value);
            const pesticide = row.pesticide
            if (pesticides) {
                const pesticideAmount = calacTotalPesticideVolume(pesticide.unit, value, sprayVolumePerArea, activityArea);
                const groupAmount = pesticideAmount.toFixed(3);
                change(`resources[${rowIndex}].groupAmount`, groupAmount);
                change(`resources[${rowIndex}].totalCost`, groupAmount * row.tariff);
            }
        }

        else if (column === 'warehouseId') {
            setFetchInventory(true);
        }
    }

    const removerActivityDomain = (tableRow) => {
        array.remove(`activityDomains`, tableRow.rowId);
    }

    const removerActivityResource = (resource, index) => {
        if (isSprayer(activityType) && resource.resourceCategory === 'SPRAYER') {
            change('sprayerID', null);
        }
        array.remove('resources', index);
        setSyncPrimeContractor(true);
        setFetchInventory(true);

    }

    const onChangePesticideList = (event, pesticideListIdValue, oldValue, name) => {
        setPesticides([]);
        setPesticideListId(pesticideListIdValue);
        getPesticidesByList(pesticideListIdValue).then(function (response) {
            const pesticidesTemp = response.data;
            change('pesticideListId', pesticideListIdValue);
            setPesticideListId(pesticideListIdValue);
            setPesticides(pesticidesTemp);
        });
    }

    const onResourceHeaderChange = (func, value, t, fieldName) => {

        if (fieldName === 'pest') {
            const pestId = value && value.value ? value.value : null;
            change('pestId', pestId);
        }

        if (fieldName === 'calculator') {
            setCalculator(!calculator)

            change('irrigationMethod', null);
            change('irrigationFrequency', null);
            change('fertilizeMethod', null);

            resources.forEach((element, index, arr) => {
                if (CALCULATOR_TYPES.includes(element.resourceType)) {
                    change(`resources[${index}].groupAmount`, 0);
                    change(`resources[${index}].usageAmount`, 0);
                    change(`resources[${index}].total`, 0);
                    change(`resources[${index}].totalCost`, 0);
                }
            });
        }

        else if (fieldName === 'totalSprayVolume') {

            value = Number(value);

            if (value && activityArea && activityArea > 0) {
                change('sprayVolumePerArea', (value / Number(activityArea)).toFixed(4))
            }
        }
        else if (fieldName === 'sprayVolumePerArea') {
            value = Number(value);
            if (value && activityArea && activityArea > 0) {
                change('totalSprayVolume', (value * Number(activityArea)).toFixed(0))
            }
        }
    }

    const calcTotalWaterQtyFunc = () => {
        console.log('calcTotalWaterQtyFunc');
        if (calculator) {
            const daysInPeriod = diffInDays(execution, end);
            resources.forEach((element, index, arr) => {
                if (element.resourceType === WATER) {
                    const waterQty = element.groupAmount ? element.groupAmount : 0;
                    const calcWaterQty = calcTotalWaterQtyUtilFunc(irrigationMethod, waterQty, activityArea, daysInPeriod, irrigationDays, activityDomains.length)
                    change(`resources[${index}].usageAmount`, calcWaterQty);
                    change(`resources[${index}].total`, calcWaterQty);
                    if (calcWaterQty && element.tariff) {
                        change(`resources[${index}].totalCost`, (calcWaterQty * element.tariff));
                    }
                    change('calcTotalWaterQty', calcWaterQty);
                    calcFertilizerQuantitiesFunc(calcWaterQty)
                }
            });
        }
    }

    const calcIrrigationDaysFunc = () => {
        console.log('calcIrrigationDaysFunc')
        const diffDaysTemp = diffInDays(execution, end);
        const irrigationDaysTemp = diffDaysTemp && irrigationFrequency && irrigationFrequency > 0 && diffDaysTemp > 0 ? (diffDaysTemp / irrigationFrequency) : 0;
        change('irrigationDays', irrigationDaysTemp.toFixed(0));
    }

    const calcFertilizerQuantitiesFunc = (newCalcTotalWaterQty) => {
        const daysInPeriod = diffInDays(execution, end);

        console.log('calcFertilizerQuantitiesFunc');
        resources.forEach((resource, index, arr) => {

            if (resource.resourceType === FERTILIZER) {
                const fertilizerQty = resource.groupAmount;
                const totalFerQty =
                    calculator ? calcTotalFertilizerQty(fertilizeMethod, fertilizerQty, newCalcTotalWaterQty ? newCalcTotalWaterQty : calcTotalWaterQty, activityArea, daysInPeriod, irrigationDays, activityDomains.length)
                        : fertilizerQty;

                console.log('totalFerQty', totalFerQty);


                const totalFerPerArea = totalFerQty / activityArea;

                change(`resources[${index}].usageAmount`, totalFerQty);
                change(`resources[${index}].total`, totalFerQty);
                change(`resources[${index}].resourcePerDomainUnit`, totalFerPerArea);

                if (resource.tariff) {
                    change(`resources[${index}].totalCost`, (adjustUsageAmountForTariff(totalFerQty, resource) * resource.tariff));
                }
            }
        })
    }

    // ------------------------- START - HARVEST MARKET -------------------------

    const onSummaryChange = (column, value) => {
        if (column === 'itemCount') {
            onTotalItemChange(value);
        } else if (column === 'netWeight') {
            onTotalWeightChange(value);
        } else if (column === 'totalRedemption') {
            onMarketingTotalIncomeChange(value);
        }
    }

    const onTotalItemChange = (totalItemCount) => {
        if (!totalItemCount) {
            totalItemCount = sumBy(activityDomains, 'itemCount');
        }

        activityDomains.forEach((d, index, arr) => {
            const itemCount = Number(((totalItemCount / activityArea) * d.plantArea).toFixed(2));
            change(`activityDomains[${index}].itemCount`, itemCount)
        });
    }

    const onTotalWeightChange = (totalWeight) => {
        if (!totalWeight) {
            totalWeight = sumBy(activityDomains, 'netWeight');
        }

        const itemCount = sumBy(activityDomains, 'itemCount');

        if (/*activityType === HARVEST &&*/ itemCount > 0) {
            activityDomains.forEach((d, index, arr) => {
                const value = d.itemCount && d.itemCount > 0 ? d.itemCount : 0
                const weight = Number(((totalWeight / itemCount) * value).toFixed(2));
                change(`activityDomains[${index}].netWeight`, weight)
            });
        }
        else {
            activityDomains.forEach((d, index, arr) => {
                const weight = Number(((totalWeight / activityArea) * d.plantArea).toFixed(2));
                change(`activityDomains[${index}].netWeight`, weight)
            });
        }
    }

    const onMarketingTotalIncomeChange = (totalIncome) => {
        console.log('nMarketingTotalIncomeChange')

        if (activityType === MARKET) {
            if (!totalIncome) {
                totalIncome = sumBy(activityDomains.filter(e => !isNaN(e.totalRedemption)), 'totalRedemption');
            }
            activityDomains.forEach((d, index, arr) => {
                const singleRowIncome = calcSingleRowIncome(marketMethod, activityDomains, d, totalIncome, activityArea);
                change(`activityDomains[${index}].totalRedemption`, singleRowIncome);
            });
        }
    }

    const onQuickAddClose = (type, data) => {
        setQuickAdd(null);
        if (data) {
            if ([CUSTOMER].includes(type)) {
                change('selectedCustomerOption', getSuggestionsNameElement(data, 'resource'))
            } else if ([GENERAL, HARVEST].includes(type)) {
                change('selectedActivityDefOption', getSuggestionsNameElement(data, 'activityDef'))
            }
        }
    }

    // ------------------------- END - HARVEST MARKET -------------------------


    const renderResourceSelections = (isPesticides(activityType) && pesticideListId === null) ? false : true;

    const hasResources = activityType !== MARKET;
    const documentRefText = getDocumentRefText(activityType, documentRef, externalId);

    const headerDecoratedText = diffDays ? diffDays + ' ' + text.days : null;
    if (!activityType) {
        return <div></div>
    }
    return (
        <div className={classes.root}>
            <form className={classes.root} onSubmit={handleSubmit(handleFormSubmit)}>
                <div className={classes.section}>
                    <div className={classes.formRowSpaceBetween}>
                        <FormTitle title={text[activityType.toLowerCase()]} variant={'d' === params.mode ? 'warning' : null} />
                        <FormTitle title={documentRefText} />
                        <QuickAdd type={activityType}
                            onClick={(e) => setQuickAdd(e)}
                            {...props}
                        />
                            {headerDecoratedText && <DecoratedLabel text={headerDecoratedText} />}
                    </div>
                    <Divider />
                    <div name="ActivityHeader">
                        <ActivityHeader
                            // yearOptions={getYearOptions(5)}
                            phenologicalStages={phenologicalStages}
                            onDateChange={onDateChange}
                            onCropChange={onCropChange}
                            diffDays={diffDays}
                            onActivityDefChange={() => setLoadTariff(true)}
                            {...props} />
                    </div>
                </div>
                <div name="DomainSelection" className={classes.section}>
                    <DomainSelection
                        baseFields={baseFields}
                        setBaseFields={setBaseFields}
                        userYear={true}
                        handleClickOpenFields={handleClickOpenFields}
                        handleExpendFieldTable={handleExpendFieldTable}
                        changeDomainTableColumn={changeDomainTableColumn}
                        text={text}
                        renderDomainSelections={renderDomainSelections}
                        handleClickCloseFields={handleClickCloseFields}
                        activityDomains={activityDomains} expendFieldTable={expendFieldTable}
                        openFields={openFields}
                        cropID={cropID}
                        changeFieldActualSize={changeFieldActualSize}
                        removerActivityDomain={removerActivityDomain}
                        activityArea={activityArea}
                        openWaybill={openWaybill}
                        handleClickOpenWaybill={handleClickOpenWaybill}
                        setCalcActivityArea={(value) => console.log(value)}
                        {...props}
                    />
                </div>
                {hasResources && activityType !== HARVEST &&
                    <div name="ResourcesHeader" className={classes.section}>
                        <ResourcesHeader {...props}
                            irrigationDays={irrigationDays}
                            calculator={calculator}
                            onChange={(func, value, t, fieldName) => onResourceHeaderChange(func, value, t, fieldName)}
                        />

                    </div>}
                {hasResources &&
                    <div>
                        <div name="ResourceTable" className={classes.section}>
                            <ResourceTable {...props}
                                onOpen={handleClickOpenResources}
                                resourceAmountEdit={resourceAmountEdit}
                                setResourceAmountEdit={(e) => setResourceAmountEdit(e)}
                                setResourceEditGroupAmount={setResourceEditGroupAmount}
                                renderResourceSelections={renderResourceSelections}
                                resources={resources}
                                changeResourceTableColumn={changeResourceTableColumn}
                                removerActivityResource={removerActivityResource}
                                totalCost={sumBy(resources.filter(e => e.useInCostReport === true), 'totalCost')}
                                listPesticides={pesticides.filter(e => e.active === true)}
                                openResources={openResources}
                                handleClose={handleClickCloseResources}
                                text={text}
                                currency={currency}
                                activityType={activityType}
                                pesticideLists={pesticideLists}
                                warehouses={warehouseOptions}
                                calculator={calculator}
                                onChangePesticideList={onChangePesticideList}

                            />
                        </div>
                    </div>}
                <div className={classes.section}>
                    <div className={classes.formRow}>
                        <FormTitle title={text.notes} />
                    </div>
                    <Divider />
                    <div className={classes.formRow}>
                        <Field name="note"
                            fullWidth={true}
                            component={TextField}
                            multiline
                            rows="3"
                        />
                    </div>

                </div>
                <FormActions
                    text={text}
                    deletable={deletable}
                    editable={editable}
                    cancelAction={cancelAction}
                    deleteAction={deleteAction}
                    hasErrors={!isJsonEmpty(submitErrors)}
                    // pristine={false}
                    submitting={submitting}
                    pristine={user.business.saveUntouched ? false : pristine}
                />
            </form>
            {quickAdd != null && <QuickAddDialog type={quickAdd} onClose={onQuickAddClose} {...props} />}

        </div>
    );
}

const selector = formValueSelector('ActivityForm');

let ActivityForm = reduxForm({
    form: 'ActivityForm',
    onSubmitSuccess: (response, dispatch, props) => {

        if (props.fetchDomains === true) {
            props.getDomainsByYear(props.yearFilter);
        }
        if (response.data.status === 'OK') {
            if (props.exitRoute) {
                props.history.push(props.exitRoute);
            } else {
                props.history.goBack();
            }
            return dispatch({
                type: CREATED === response.status ? ACTIVITY_CREATED : ACTIVITY_UPDATED,
                payload: response.data
            });
        }
    },

    onSubmitFail: (errors, dispatch, props) => {
        if (errors && errors.response && errors.response.data) {
            console.log('onSubmitFail', errors.response.data);
        } else {
            console.log('onSubmitFail', props, errors);
        }
        scrollToFirstErrorLocation(errors, fieldLocations);
    }
})(ActivityFormBase)

ActivityForm = connect(
    state => ({
        submitErrors: getFormSyncErrors('ActivityForm')(state),
        initialValues: state.activity.activity,
        activityType: selector(state, 'activityType'),
        uuid: selector(state, 'uuid'),
        execution: selector(state, 'execution'),
        end: selector(state, 'end'),
        activityDomains: selector(state, 'activityDomains'),
        resources: selector(state, 'resources'),
        cropID: selector(state, 'cropID'),
        activityArea: selector(state, 'activityArea'),
        sprayerID: selector(state, 'sprayerID'),
        selectedActivityDefOption: selector(state, 'selectedActivityDefOption'),
        // warehouseID: selector(state, 'warehouseID'),
        irrigationMethod: selector(state, 'irrigationMethod'),
        fertilizeMethod: selector(state, 'fertilizeMethod'),
        calcTotalWaterQty: selector(state, 'calcTotalWaterQty'),
        irrigationFrequency: selector(state, 'irrigationFrequency'),
        waterQty: selector(state, 'waterQty'),
        irrigationDays: selector(state, 'irrigationDays'),
        init: selector(state, 'init'),
        diffDays: selector(state, 'diffDays'),
        sprayerCapacity: selector(state, 'sprayerCapacity'),
        sprayVolumePerArea: selector(state, 'sprayVolumePerArea'),
        sprayerCount: selector(state, 'sprayerCount'),
        deletable: selector(state, 'deletable'),
        editable: selector(state, 'editable'),
        executingPlan: selector(state, 'executingPlan'),
        fetchDomains: selector(state, 'fetchDomains'),
        marketMethod: selector(state, 'marketMethod'),
        documentRef: selector(state, 'documentRef'),
        externalId: selector(state, 'externalId'),
        pestMonitors: selector(state, 'pestMonitors'),
        selectedCustomerOption: selector(state, 'selectedCustomerOption'),

    })
    ,
    {})(ActivityForm);
export default ActivityForm;