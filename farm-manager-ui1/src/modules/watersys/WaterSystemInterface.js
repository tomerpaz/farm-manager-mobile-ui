import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { withRouter } from 'react-router-dom'
import TopBackBar from "../../components/core/util/TopBackBar";
import Valves from "./Valves";
import WatersysSettings from "./WatersysSettings";
import { getDomainSuggestions } from "../../components/core/optionsUtil";
import { getCurrentYear } from '../../utils';
import { loadDataByName } from '../../utils/LoadUtil';

export const SETTING_WIDTH = 170;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.palette.secondary.light,
    },
    body: {
        display: 'flex',
        flex: 1,
        backgroundColor: theme.palette.secondary.light,
        justifyContent: 'space-around'
    },
}));

const WaterSystemInterface = (props) => {
    const classes = useStyles();

    const { getWaterSystem, match: { params: { system } }, domains, getDomainsByYear, waterSources,
        saveWaterSystemConfig, waterSystem,
        text, dir, history, 
        saveValve, deleteWaterSystemConfig,  syncWaterSystem, duplicateValve, deletedValve,
        pageSize, pageSizes, setTablePageSize,clearWaterSystem, lang,importAccumulations,selectedValve,
        setActiveValves, activeValves

    } = props;

    useEffect(() => {
        loadDataByName(props, ['waterSources']);
        getWaterSystem(system);
       // if (domains.length === 0) {
            getDomainsByYear(getCurrentYear());
       // }

        return () => {
            console.log('will unmount');
            clearWaterSystem();
          }
    }, []);


    const saveWaterSystemCfg = (system, type, value) =>{
        const settings = waterSystem ? waterSystem.config : [];
        const config = settings.find(e => e.type.indexOf(type) > 0);
        if (config) {
            config.value = value;
            saveWaterSystemConfig(config)
        }
        else {
            saveWaterSystemConfig({
                type: `${system}_${type}`,
                value: value
            })
        }
    }

    const newWaterSystemConfig = (system, type, value, auxiliary) => {
        saveWaterSystemConfig({
            type: `${system}_${type}`,
            value: value,
            auxiliary: auxiliary,
        })

    }

        const domainOptions = getDomainSuggestions(domains.filter(e => e.field.active), true);
        const valves = waterSystem ? waterSystem.valves : [];
        const settings = waterSystem ? waterSystem.config : [];
        return (
            <div className={classes.root}>
                <TopBackBar dir={dir} label={text.back} history={history} />

                <div className={classes.body}>

                    <WatersysSettings system={system} settings={settings} text={text}
                        saveWaterSystemConfig={saveWaterSystemCfg}
                        newWaterSystemConfig={newWaterSystemConfig}
                        deleteWaterSystemConfig={deleteWaterSystemConfig}
                        waterSources={waterSources ? waterSources : []}
                        syncWaterSystem={syncWaterSystem}
                        importAccumulations={importAccumulations}

                    />

                    <div style={{ flex: 5 }}>
                        <Valves valves={valves} system={system} domainOptions={domainOptions}
                            text={text}
                            accountTitle={text.source}
                            saveValve={saveValve}
                            duplicateValve={duplicateValve}
                            deletedValve={deletedValve}
                            pageSize={pageSize}
                            pageSizes={pageSizes}
                            setTablePageSize={setTablePageSize}
                            lang={lang}
                            selectedValve={selectedValve}
                            setActiveValves={setActiveValves}
                            activeValves={activeValves}
                        />
                    </div>
                </div>
            </div>
        )
    }




export default withRouter(WaterSystemInterface);

