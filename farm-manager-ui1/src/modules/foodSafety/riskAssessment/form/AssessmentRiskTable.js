import React from 'react';
import {Table,} from '../../../../components';
import {renderNamValueOptions} from "../../../../components/core/optionsUtil";


const AssessmentRiskTable = (props) => {

    const {risks, text, lang, changeRiskAssessmentItemColumn} = props;

    const rows = risks ? risks : [];
    const LEVELS = [{value: 'LOW', name: text['low']},
        {value: 'MEDIUM', name: text['medium']},
        {value: 'HIGH', name: text['high']},]


    const STATUS = [{value: 'DONE', name: text['done']},
        {value: 'IN_PROGRESS', name: text['inProgress']},
        {value: 'IRELEVANT', name: text['irrelevant']},
    ]

    const columns = [
        {name: 'category', style: {width: 100}, title: text.category, getCellValue: row => (row.risk['category'+lang]),},
        {name: 'description', style: {width: 130},
            title: text.description, getCellValue: row => (row.risk['description' +lang]),},
        {name: 'severity', title: text.severity,
            options: ()=> renderNamValueOptions(LEVELS),
            width: 100,
            style: { width: 120},
            onChange: (value, rowData, rowIndex) => changeRiskAssessmentItemColumn('severity',value, rowData, rowIndex),
            getCellValue: row => (row.severity ? row.severity : LEVELS[0].value)

        },
        {name: 'probability', title: text.probability,
            options: ()=> renderNamValueOptions(LEVELS),
            width: 100,
            style: { width: 120},
            onChange: (value, rowData, rowIndex) => changeRiskAssessmentItemColumn('probability',value, rowData, rowIndex),
            getCellValue: row => (row.probability ? row.probability : LEVELS[0].value)

        },
        {name: 'risk.type', 
        style: { width: 100},
        title: text.riskType, getCellValue: row => text[row.risk.type],},
        {name: 'prevention', style: {width: 350},
            title: text.prevention, getCellValue: row => (row.risk['prevention' +lang]),},
        {name: 'status',
            options: ()=> renderNamValueOptions(STATUS),
            title: text.status,
            width: 130,
            style: {padding: 10, width: 160},
            onChange: (value, rowData, rowIndex) => changeRiskAssessmentItemColumn('status',value, rowData, rowIndex),
            getCellValue: row => (row.status ? row.status : STATUS[0].value)
        },

        {name: 'note',style: {width: 250},
            title: text.actionTaken,  edit: true, multiline: true, rows: 4,
            onChange: (value, rowData, rowIndex) => changeRiskAssessmentItemColumn('note',value, rowData, rowIndex)
        },
    ]
    return (
        <Table
            rows={rows}
            columns={columns}
            indexKey={true}
        />
    );
}


export default AssessmentRiskTable;
