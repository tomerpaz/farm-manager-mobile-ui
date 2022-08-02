import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Dialog, DialogContent, DialogTitle, Tab, Tabs, Typography, Box } from '@mui/material';
import { Autocomplete, TextField, AddButton } from '../../'
import { filterWithPesticideList, filterWithResources } from "../../filters/filterUtil";
import { Table } from '../..';
import {
    COMPOST,
    DISINFECTANT,
    EQUIPMENT,
    FERTILIZE_IRRIGATION,
    FERTILIZE_IRRIGATION_PLAN,
    GENERAL,
    GENERAL_PLAN,
    PROCUREMENT,
    VARIETY
} from '../../../modules/activity/types'
import { DialogActions } from '../../../components/dialog'
import { BACKGROUND, SECONDARY_LIGHT, } from "../../../App";
import { height375 } from "../../../utils/TabUtils";
import { loadDataByName } from "../../../utils/LoadUtil";
import NewResourcePanel from "./NewResourcePanel";
import { isEmpty } from "../../../utils/StringUtil";
import { getTableColumns, getResourceOptions, getResourceRows, buildResult } from './ResourceSelectionUtil';

function TabContainer(props) {
    return (
        <Typography component="div">
            {props.children}
        </Typography>
    );
}

export const WATERSOURCES = 'WATERSOURCES';
export const VARIETIES = 'VARIETIES';
export const EXECUTORS = 'EXECUTORS';
export const FERTILIZERS = 'FERTILIZERS';
export const ACCESSORIES = 'ACCESSORIES';
export const PESTICIDES = 'PESTICIDES';
export const ENERGIES = 'ENERGY';

const ADDABLE = [WATERSOURCES, EXECUTORS, ACCESSORIES, EQUIPMENT]

const singleTypes = [WATERSOURCES];

export const PESTICIDE_LIST_PESTICIDES = 'PESTICIDE_LIST_PESTICIDES';
const TAB_OPTIONS = {
    SPRAY: [PESTICIDE_LIST_PESTICIDES, FERTILIZERS, EXECUTORS, EQUIPMENT],
    SPRAY_PLAN: [PESTICIDE_LIST_PESTICIDES, FERTILIZERS, EXECUTORS, EQUIPMENT],
    PEST_MONITOR: [PESTICIDE_LIST_PESTICIDES],
    GENERAL: [EXECUTORS, EQUIPMENT, COMPOST, DISINFECTANT, PESTICIDES, FERTILIZERS, ACCESSORIES, VARIETIES, ENERGIES],
    GENERAL_PLAN: [EXECUTORS, EQUIPMENT, COMPOST, DISINFECTANT, PESTICIDES, FERTILIZERS, ACCESSORIES, VARIETIES],
    FERTILIZE_IRRIGATION: [WATERSOURCES, FERTILIZERS, PESTICIDES, EXECUTORS, ACCESSORIES],
    FERTILIZE_IRRIGATION_PLAN: [WATERSOURCES, FERTILIZERS, PESTICIDES, EXECUTORS, ACCESSORIES],
    PLANT: [VARIETY, EXECUTORS, EQUIPMENT],
    HARVEST: [EXECUTORS, EQUIPMENT, ACCESSORIES],
    PROCUREMENT: [COMPOST, DISINFECTANT, PESTICIDES, FERTILIZERS, VARIETIES, ACCESSORIES],
}

const ResourceSelectionTable = (props) => {

    const { activityType, open, handleClose, text, isAdmin, areaUnit, user } = props;
    const tabs = TAB_OPTIONS[activityType];

    const [resourceFilters, setResourceFilters] = useState(tabs.map(e => []));
    const [selectedResourceIDs, setSelectedResourceIDs] = useState(tabs.map(e => []));
    const [resourceFreeTextFilters, setResourceFreeTextFilters] = useState(tabs.map(e => []));
    const [selections, setSelections] = useState(tabs.map(e => []));

    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const [flip, setFlip] = useState(true);

    const [fetchDomains, setFetchDomains] = useState(false);
    const [newResource, setNewResource] = useState(false);
    const tabIndex = tabs.indexOf(selectedTab);




    useEffect(() => {

        if ([FERTILIZE_IRRIGATION_PLAN, FERTILIZE_IRRIGATION].includes(activityType)) {
            loadDataByName(props, ['equipment', 'pesticides', 'fertilizers', 'waterSources', 'accessories']);
        }
        else if ([GENERAL_PLAN, GENERAL].includes(activityType)) {
            loadDataByName(props, ['equipment', 'pesticides', 'fertilizers', 'composts', 'varieties', 'disinfectants', 'accessories', 'energies']);
        }
        else if (PROCUREMENT === activityType) {
            loadDataByName(props, ['pesticides', 'fertilizers', 'composts', 'varieties', 'disinfectants', 'accessories']);
        }
        else {
            loadDataByName(props, ['equipment', 'fertilizers', 'accessories']);
        }
    }, [])


    function action(yes) {
        let result = null;
        if (yes) {
            result = buildResult(props, selectedResourceIDs, tabs);
        }

        setSelectedResourceIDs(tabs.map(e => []));
        setSelections(tabs.map(e => []));
        setNewResource(false);
        setResourceFreeTextFilters(tabs.map(e => []))
        setResourceFilters(tabs.map(e => []))
        handleClose(result, fetchDomains);
    }

    function handleChange(event, value) {
        setSelectedTab(value);
        setFlip(!flip);
        setNewResource(false);
    };

    function setFieldFreeTextFilterFunc(value) {

        setSelections(selections.map((e, index, arr) => index === tabIndex ? [] : selections[index]));
        setResourceFreeTextFilters(resourceFreeTextFilters.map((e, index, arr) => index === tabIndex ? value : resourceFreeTextFilters[index]));

    }

    function setResourceFilterFunc(value) {
        setSelections(selections.map((e, index, arr) => index === tabIndex ? [] : selections[index]));
        setResourceFilters(resourceFilters.map((e, index, arr) => index === tabIndex ? value : resourceFilters[index]));
    }


    function changeSelection(value) {

        let ids = selectedResourceIDs[tabIndex];


        const single = activityType !== PROCUREMENT && singleTypes.includes(selectedTab);

        const resourceId = value.id;

        if (ids.includes(value.id)) {
            ids.splice(ids.indexOf(value.id), 1);
        } else {
            if (!single) {
                ids.push(resourceId)
            } else {
                ids = [resourceId];
            }
        }

        setSelectedResourceIDs(selectedResourceIDs.map((e, index, arr) => index === tabIndex ? ids : selectedResourceIDs[index]))
    };

    const columns = getTableColumns(text, areaUnit, selectedTab);
    const resourceFilter = resourceFilters[tabIndex];
    const resourceFreeTextFilter = resourceFreeTextFilters[tabIndex];

    const addable = isAdmin && ADDABLE.includes(selectedTab);

    let displayRows = null;

    if (selectedTab === PESTICIDE_LIST_PESTICIDES) {
        displayRows = filterWithPesticideList(getResourceRows(props, selectedTab), resourceFilter, resourceFreeTextFilter);
    }
    else {
        displayRows = filterWithResources(getResourceRows(props, selectedTab).filter(r => r.active === true), resourceFilter);
        if (!isEmpty(resourceFreeTextFilter)) {
            displayRows = displayRows.filter(e => e.name.includes(resourceFreeTextFilter));
        }
    }

    function selectAll(value) {
        const newValue = selectedResourceIDs[tabIndex].length !== 0 ? [] : displayRows.map(e => e.id);
        setSelectedResourceIDs(selectedResourceIDs.map((e, index, arr) =>
            index === tabIndex ? newValue : selectedResourceIDs[index]));
    };

    const single = activityType !== PROCUREMENT && singleTypes.includes(selectedTab);


    const showSelectAll = !single;//activityType === PROCUREMENT;
    const tableHeight = newResource ? height375 - 57 : height375
    return (
        <Dialog
            fullWidth={true}
            maxWidth={'lg'}
            open={open}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle sx={{ padding: 1, paddingLeft: 2, paddingRight: 2, backgroundColor: BACKGROUND }}
                id="form-dialog-title">{text.resources}</DialogTitle>
            <DialogContent sx={{ padding: 0, backgroundColor: SECONDARY_LIGHT }} >
                <Tabs 
                    style={{ backgroundColor: BACKGROUND }} value={selectedTab}
                    onChange={(event, value) => handleChange(event, value)} >
                    {tabs.map(tab => (
                        <Tab  key={tab}
                            value={tab} label={text[tab.toLowerCase()]} />
                    ))}
                </Tabs>
                <TabContainer>
                    <Box flex={1} display={'flex'} margin={1}>
                        <Autocomplete
                            style={{ flex: 1 }}
                            noMargin={true}
                            options={getResourceOptions(props, selectedTab)}
                            onChange={(value) => setResourceFilterFunc(value)}
                            value={resourceFilter}
                            placeholder={text.typeToSearch}
                        />
                        <TextField
                            style={{ flex: 1 }}
                            onChange={(e) => setFieldFreeTextFilterFunc(e.target.value)}
                            value={resourceFreeTextFilter}
                            onFocus={(e) => e.target.select()}
                            placeholder={text.freeText}
                        />

                        {addable &&
                            <AddButton size={'medium'} onClick={() => setNewResource(!newResource)}
                                label={text.add}
                            />
                        }
                    </Box>
                    {addable &&
                        <Box marginLeft={1}
                            marginRight={1}>
                            <NewResourcePanel resourceType={selectedTab}
                                newResource={newResource} {...props} />
                        </Box>
                    }

                    <Box marginLeft={2}
                        marginRight={2}>

                        {flip && <Table rows={displayRows} columns={columns}
                            selections={selectedResourceIDs[tabIndex]}
                            selectAll={(value) => selectAll(value)}
                            height={tableHeight}
                            useSelection={true}
                            showSelectAll={showSelectAll}
                            onRowClicked={value => changeSelection(value)}
                        />}
                        {!flip &&
                            <Table rows={displayRows} columns={columns} selections={selectedResourceIDs[tabIndex]}
                                selectAll={(value) => selectAll(value)}
                                height={tableHeight}
                                useSelection={true}
                                showSelectAll={showSelectAll}
                                onRowClicked={value => changeSelection(value)}
                            />}
                    </Box>
                </TabContainer>
            </DialogContent>

            <DialogActions
                backgroundColor={SECONDARY_LIGHT}
                action={(value) => action(value)}
                yesText={text.save}
                noText={text.cancel}
            />
        </Dialog>
    );
}
export default ResourceSelectionTable;
