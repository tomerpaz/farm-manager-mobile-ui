import React from 'react';
import { Typography, Drawer, List, ListItem, ListItemText, Checkbox, ListSubheader, Avatar, Divider } from '@mui/material';
import {
    Settings, Close, AttachMoney as Money, AssignmentTurnedIn as FoodSafety, Work, NaturePeople as Harvest, Opacity as Irrigation,
    AttachMoney as Market, Apps as Procurement
} from '@mui/icons-material';

import { PRIMARY_DARK } from "../../App";
import DataFilter from "./DataFilter";
import { standAloneForm } from "../../utils/TabUtils";
import { FINANCIAL, FOOD_SAFETY, MANAGEMENT, CUSTOM, HARVEST, PROCUREMENT, MARKET, FERTILIZE_IRRIGATION, TRACKER } from "../../components/frame/Routes";
import { isEmpty } from '../../utils/StringUtil';
import { SettingsFab } from '../../components';
import GpsTrack from '../../icons/GpsTrack';
import { OutlinedButton } from '../../components/core';






function setVariableColumns(business, columns) {
    if (business.maturity === true) {
        return columns;
    }

    return columns.filter(e => e !== 'youngMature');

}

function getTerm(term, text, areaUnit, business) {

    if (term === 'tag1' && !isEmpty(business.tag1)) {
        return business.tag1;
    }
    if (term === 'tag2' && !isEmpty(business.tag2)) {
        return business.tag2;
    }

    return text[term.replace('AreaUnit', areaUnit)]
}

const Reports = (props) => {
    const {
        availableReports, selectedReport, onSelect, text, uncheckedColumns, toggleColumn, categoty,
        toggleOpenColumns, openColumns, areaUnit, user: { business }
    } = props;

    const columns = selectedReport ? setVariableColumns(business, selectedReport.columns) : [];
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <SettingsFab mini="true"
                onClick={toggleOpenColumns}
            >
                <Settings />
            </SettingsFab>
            <Drawer anchor="right" open={openColumns}>

                <List sx={{ minWidth: 250, margin: 1, }}
                    component="nav"
                    subheader={<ListSubheader component="div">
                        <div style={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Typography sx={{margin: 1}} variant='h6'>
                                {text.columns}
                            </Typography>
                            <OutlinedButton  size='small'
                                onClick={toggleOpenColumns}>
                                <Close />
                            </OutlinedButton>
                        </div>
                    </ListSubheader>}
                >
                    <Divider/>
                    {columns.map(c => {
                        const label = getTerm(c, text, areaUnit, business);
                        return (
                            <ListItem button key={c}
                                role={undefined}
                                onClick={() => toggleColumn(c)}
                            >
                                <Checkbox
                                    checked={uncheckedColumns.indexOf(c) === -1}
                                    tabIndex={-1}
                                    disableRipple
                                    color="primary"
                                />
                                <ListItemText primary={label ? label : c} />
                            </ListItem>)
                    }
                    )}
                </List>
            </Drawer>
            <div>
                <List sx={{

                    minWidth: 350,
                    backgroundColor: 'white',
                    height: standAloneForm,
                    // position: 'relative',
                    // overflow: 'auto',
                }}                >
                    {availableReports.map(f =>
                        <ListItem button key={f.name}
                            selected={selectedReport && f.name === selectedReport.name}
                            onClick={() => onSelect(f)}
                        >
                            <Avatar sx={{ backgroundColor: 'inherit', color: PRIMARY_DARK }}>
                                {categoty === FINANCIAL && <Money />}
                                {categoty === FOOD_SAFETY && <FoodSafety />}
                                {categoty === MANAGEMENT && <Work />}
                                {categoty === HARVEST && <Harvest />}
                                {categoty === CUSTOM && <Work />}
                                {categoty === PROCUREMENT && <Procurement />}
                                {categoty === MARKET && <Market />}
                                {categoty === FERTILIZE_IRRIGATION && <Irrigation />}
                                {categoty === TRACKER && <GpsTrack />}


                            </Avatar>

                            <ListItemText primary={f.customName ? f.customName : text[f.name]} />
                        </ListItem>
                    )}
                </List>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 8}}>
                {selectedReport && <DataFilter
                    {...props}
                />}
            </div>
        </div >
    )
}

export default Reports;


