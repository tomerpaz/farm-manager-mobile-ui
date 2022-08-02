import React, { useState, useEffect } from 'react';
import { masterDetails, } from "../../../utils/TabUtils";
import MasterDetailsTableTop from '../../../components/tables/top/MasterDetailsTableTop'
import { filterWithPrefix } from "../../../components/filters/filterUtil";
import { Table, } from '../../../components';
import { loadDataByName, _activityDefTypes } from '../../../utils/LoadUtil';
import { tableSuggestionsNameIdPrefix } from '../../../components/core';

function getNew() {
    return { active: true };
}
const ActivityDefTypeTable = (props) => {

    const { isAdmin, user, text, lang, getActivityDefType, getActivityDefTypes, createNewActivityDefType,
        activityDefTypes, selectActivityDefType,
    } = props;

    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDataByName(props, [_activityDefTypes]);
        if (isAdmin) {
            selectActivityDefType(getNew())
        }
        return () => {
            selectActivityDefType(null);
            getActivityDefTypes();
        }
    }, []);

    const onRowClicked = (row) => {
        selectActivityDefType(null);
        if (row) {
            getActivityDefType(row.id);
        }
    }

    useEffect(() => {
        if (isAdmin && createNewActivityDefType === true) {
            selectActivityDefType(getNew())
        }
    }, [createNewActivityDefType]);

    let columns = [
        { name: 'name', title: text.name },
        { name: 'code', title: text.code },
    ];

    const businessActivityTypeDefs = activityDefTypes.filter(e => e.businessId === user.business.id);

    const activityDefTypeOptions = tableSuggestionsNameIdPrefix(businessActivityTypeDefs, 'activityDefType')

    const displayRows = filterWithPrefix(businessActivityTypeDefs, filter, 'activityDefType');

    return (
        <div>
            <MasterDetailsTableTop options={activityDefTypeOptions}
                filter={filter}
                setFilter={setFilter}
                pdfReport={'activityDefTypes'}
                xlsReport={'activityDefTypes'}
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

export default ActivityDefTypeTable;