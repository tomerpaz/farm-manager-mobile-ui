import React, { useState } from 'react';
import Typography from '@mui/material/Typography'
import MasterDetailsTableTop from "../../../components/tables/top/MasterDetailsTableTop";
import { Table, } from '../../../components';
import { height290 } from "../../../utils/TabUtils";

function getNew(selectedBusiness) {
    return { newUser: true, business: selectedBusiness, active: true };
}

const UserTable = (props) => {

    const { businessUsers, selectBusinessUser, selectedBusiness,
        text } = props;

    const [filter, setFilter] = useState('');


    const options = businessUsers.map(element => {
        const label = `${element.username} - ${element.firstName} ${element.lastName}`
        return (
            {
                key: element.username,
                value: element.username,
                label: label,
                name: label,
                element: element,
            }
        )
    });

    let columns = [
        { name: 'username', title: text.username, },
        { name: 'email', title: text.email, },
        {
            name: 'name', title: text.name,
            getCellValue: row => `${row.firstName} ${row.lastName}`
        },

    ];

    const displayRows = filter.length === 0 ? businessUsers : businessUsers.filter(u => filter.map(e => e.value).indexOf(u.username) > -1);

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                {selectedBusiness.name}
            </Typography>
            <MasterDetailsTableTop options={options} filter={filter} setFilter={setFilter}
                label={text.typeToSearch}
                onClick={() => selectBusinessUser(getNew(selectedBusiness))}
                actionText={text.add} />
            <Table
                rows={displayRows}
                columns={columns}
                height={height290}
                getKey={(row) => row.username}
                onRowClicked={(e) => selectBusinessUser(e)}
            />
        </div>
    );
}

export default UserTable;


