import React, { useState, useEffect } from 'react';
import { masterDetails, } from "../../../utils/TabUtils";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithPrefix } from "../../../components/filters/filterUtil";
import { Table, } from '../../../components';
import { loadDataByName, _activityDefTypes, _activityDefs } from '../../../utils/LoadUtil';
import { getUnitText } from '../../../utils';

function getNew() {
    return { active: true };
}

const ActivityDefTable = (props) => {

    const { isAdmin, text, lang, getActivityDef, getActivityDefs, createNewActivityDef,
        activityDefs, selectActivityDef, activityDefOptions, areaUnit, activityDefTypes, user,
    } = props;

    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDataByName(props, [_activityDefTypes, _activityDefs]);
        if (isAdmin) {
            selectActivityDef(getNew())
        }
        return () => {
            selectActivityDef(null);
            getActivityDefs();
        }
    }, []);

    const onRowClicked = (row) => {
        selectActivityDef(null);
        if (row) {
            getActivityDef(row.id);
        }
    }

    useEffect(() => {
        if (isAdmin && createNewActivityDef === true) {
            selectActivityDef(getNew())
        }
    }, [createNewActivityDef]);


    let columns = [
        { name: 'name', title: text.name },
        {
            name: 'type', title: text.category,
            getCellValue: row => (text[row.type.toLowerCase()])
        },
        {
            name: 'unit', title: text.unit,
            getCellValue: row => getUnitText(row.unit, text, areaUnit),
        },
        {
            name: 'defTypeId', title: text.activityGroup,
            getCellValue: row => {
                const activityDefType = activityDefTypes.find(e => e.id === row.defTypeId);
                if (activityDefType) {
                    const name = text[activityDefType.name];
                    if (name) {
                        return name;
                    } else {
                        return activityDefType.name;
                    }
                }
                else {
                    return '';
                }
            }
        },
        {
            name: 'active', title: text.active,
            getCellValue: row => (row.active ? text.yes : text.no)
        },
    ];
    // const displayRows = filterWithPrefix(activityDefs, filter, 'activityDef');
    const displayRows = filterWithPrefix(activityDefs.filter(e=>e.businessId === user.business.id ), filter, 'activityDef');

    return (
        <div>
            <MasterDetailsTableTop options={activityDefOptions.filter(e=>e.element.businessId === user.business.id )}
                filter={filter}
                setFilter={setFilter}
                pdfReport={'activities'}
                xlsReport={'activities'}
                label={text.typeToSearch}
                lang={lang} />
            <Table
                rows={displayRows}
                columns={columns}
                height={masterDetails}
                onRowClicked={onRowClicked}
            />
        </div>
    );
}

export default ActivityDefTable;