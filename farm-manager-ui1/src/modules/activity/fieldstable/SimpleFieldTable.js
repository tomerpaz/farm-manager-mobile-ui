import {Table,} from '../../../components';




const SimpleFieldTable = (props) => {

    const columns = [
        {name: 'name', title: props.text.field, getCellValue: row => (row.field.name),},
        {name: 'alias', title: props.text.alias},
        {name: 'crop', title: props.text.crop, getCellValue: row => (row.variety.category),},
        {name: 'variety', title: props.text.variety, getCellValue: row => (row.variety.name),},
        {name: 'plantArea', title: props.text.fieldSize,
            onChange: (value, rowData, rowIndex) => props.changeDomainTableColumn('plantArea', value, rowData, rowIndex)
        },
        {
            name: 'delete',
            title: ' ',
            iconButton: true,
            onClick: (value, rowIndex) => props.changeDomainTableColumn('delete', null, value, rowIndex),
        },
    ];
    const {activityDomains, expendFieldTable, text} = props;
    const rows = expendFieldTable ? activityDomains : activityDomains.slice(0, 4);
    return (
        <Table
            rows={rows}
            columns={columns}
            indexKey={true}
            disableSort={true}
        />
    );
}

export default SimpleFieldTable;
