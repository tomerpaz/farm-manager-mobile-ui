import React, { useState, useEffect } from 'react';

import { makeStyles } from '@mui/styles';
import { getMasterDetailsStyle } from "../../utils/StyleUtils";
import { TopBackBar, TextField } from '../../components';
import ImportExportList from './ImportExportList';
import ImportExport from './ImportExport';
import { loadDataByName } from '../../utils/LoadUtil';


const useStyles = makeStyles(
    theme => getMasterDetailsStyle(theme, 1, 3));


const ImportExportManager = (props) => {
    const classes = useStyles();
    const { text, dir, history, dataModules,


    } = props;

    const [module, setModule] = useState(null);

    const [filter, setFilter] = useState('');


    useEffect(() => {
        loadDataByName(props, ['dataModules']);
    }, []);

    return (
        <div className={classes.backRoot}>
            <TopBackBar dir={dir} label={text.back} history={history} />
            <div className={classes.root}>
                {/* <div className={classes.master}> */}
                    <ImportExportList history={history} text={text} dataModules={dataModules}
                        module={module}
                        selectMoldule={setModule}


                    />
                {/* </div> */}
                <div className={classes.details}>
                    <ImportExport module={module} {...props} />


                </div>

            </div>
        </div>
    )

}
export default ImportExportManager;
