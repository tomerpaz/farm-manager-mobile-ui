import {Table,} from '../../../components';


const PlantFieldTable = (props) => {

    const columns = [
        {name: 'name', title: props.text.field, getCellValue: row => (row.field.name),},
        {name: 'size', title: props.text.fieldSize, getCellValue: row => (row.field.size),},
        {name: 'activityArea', title: props.text[props.areaUnit]},
        {
            name: 'delete',
            title: ' ',
            iconButton: true,
            onClick: (value, rowIndex) => props.removerActivityDomain(rowIndex),
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
        // <Grid
        //     rows={rows}
        //     columns={columns}>
        //     <Table messages={{noData: text.noFieldSelected,}}
        //            cellComponent={(cellProps) => <Cell cellProps={cellProps} restProps={props}/>}/>
        //     <TableHeaderRow/>
        //
        //     {/*<TotalFooter totalCost={props.activityArea} label={props.text.total}/>*/}
        // </Grid>
    );
}

export default PlantFieldTable;
