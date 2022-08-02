import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { withRouter } from 'react-router-dom'

import { EXPORTER_REPORTS, } from "../../components/frame/Routes";
import { masterDetails } from "../../utils/TabUtils";
import { Table, TextField } from '../../components'
import { asShortStringDate } from "../../utils/DateUtil";
import { loadDataByName } from '../../utils/LoadUtil';
import { isEmpty } from '../../utils/StringUtil';



const useStyles = makeStyles(theme => ({
    root: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
}));




const GrowerTable = (props) => {
    const classes = useStyles();
    const { linkedGrowers,
        text, history,
    } = props;



    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDataByName(props, ['linkedGrowers']);
    }, []);


    function onRowClicked  (row) {
        history.push(`${EXPORTER_REPORTS}${row.username}`)
    }





    const columns = [
        { name: 'business', title: text.business, getCellValue: row => row.business.name },
        { name: 'firstName', title: text.firstName, },
        { name: 'lastName', title: text.lastName, },
        { name: 'email', title: text.email, },
        { name: 'fax', title: text.fax, getCellValue: row => row.business.fax },
        { name: 'lastLogin', title: text.lastLogin, getCellValue: row => asShortStringDate(row.lastLogin) },


    ];

    const displayRows = !isEmpty( filter) ? 
        linkedGrowers.filter(e => e.business.name.includes(filter) ||
                                  e.firstName.includes(filter) ||
                                  e.lastName.includes(filter) ||
                                  e.email.includes(filter)) :
         linkedGrowers;
    return (
        <div className={classes.root}>
            <TextField
                fullWidth={true}
                value={filter}
                onFocus={(e) => e.target.select()}
                placeholder={text.typeToSearch}
                onChange={(e) => setFilter(e.target.value)}
            />

            <Table
                rows={displayRows}
                columns={columns}
                height={masterDetails}
                getKey={(e) => e.username}
                onRowClicked={onRowClicked}
            />
        </div>
    )
}
export default withRouter(GrowerTable);