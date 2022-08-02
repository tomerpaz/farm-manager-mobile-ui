import React, { useState, useEffect } from 'react';
import {uniqBy} from 'lodash';

import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import {
     tableSuggestionsNameIdPrefix
} from "../../../components/core/optionsUtil";

import {
    Table,
} from '../../../components';
import { loadDataByName, _alerts, _equipment, _executors } from "../../../utils/LoadUtil";
import { asShortStringDate, height200, newDate } from '../../../utils';
import { filterWithPrefix } from '../../../components/filters/filterUtil';

export const UI = 'UI'
const prefix = 'alert';

function getNew() {
    return { active: true, deletable: false, source: UI, time: newDate(), calender: false, repeatValue: 1, critical: false, type: 'generic' };
}

function addSelectionOfSameResorce(alerts, filter){
    const selectedResourcesId = filter.filter(e => e.element.resource).map( e=>e.element.resource.id);
    const additionalAlert = alerts.filter(e => e.resource && selectedResourcesId.includes(e.resource.id));
    const additionalAlertOptions = tableSuggestionsNameIdPrefix(additionalAlert, prefix);
    return filter.concat(additionalAlertOptions);
}

function alarrtOptions(alerts){
    const resourceAlerts = alerts.filter(e => e.resource);
    const genericAlerts = alerts.filter(e => !e.resource);    
    return tableSuggestionsNameIdPrefix(uniqBy(resourceAlerts, 'resource.id').concat(genericAlerts), prefix)
}

const TagTable = (props) => {

    const { text, alerts, lang, selectAlert, getAlert, getAlerts, createNewAlert, selectedAlert } = props;
    const [filter, setFilter] = useState([]);
    const [active, setActive] = useState(true);

    useEffect(() => {
        props.getAlerts(active);
        loadDataByName(props, [_executors, _equipment]);
        // if(!selectedAlert){
        selectAlert(getNew());
        // }
        return () => {
            selectAlert(null);
            getAlerts(true);
        }
    }, []);



    useEffect(() => {
        props.getAlerts(active);
    }, [active]);

    useEffect(() => {
        selectAlert(getNew());
    }, [createNewAlert]);


    const onRowClicked = (row) => {
        selectAlert(null);
        getAlert(row.id);

    }
    let columns = [
        { name: 'time', title: text.date, getCellValue: row => asShortStringDate(row.time) },

        { name: 'name', title: text.name },
        { name: 'note', title: text.note },



        // { name: 'position', title: text.location },
        // {
        //     name: 'active', title: text.active,
        //     getCellValue: row => (row.active ? text.yes : text.no)
        // },
    ];

    if (active === false) {
        columns.push({
            name: 'executed', title: text.executed, getCellValue: row => asShortStringDate(row.executed)
        })
    }
  

    const displayRows = filterWithPrefix(alerts, addSelectionOfSameResorce(alerts,filter), prefix);;
    return (
        <div>
            <MasterDetailsTableTop options={alarrtOptions(alerts)}
                filter={filter}
                setFilter={(filter) => setFilter(filter)}
                label={text.typeToSearch}
                active={active}
                onActiveChange={setActive}
                text={text}
                pdfReport={'notifications'}
                xlsReport={'notifications'}
                lang={lang} />
            <Table
                rows={displayRows}
                columns={columns}
                height={height200}
                onRowClicked={onRowClicked}
            />
        </div>
    );
}


export default TagTable;