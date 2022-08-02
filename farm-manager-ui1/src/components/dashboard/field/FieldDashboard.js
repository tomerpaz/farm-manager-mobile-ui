import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { withRouter } from 'react-router-dom';
import FieldDashboardMaster from './FieldDashboardMaster';
import FieldDashboardDetails from './FieldDashboardDetails';
import { Loading } from "../../core";
import { height60 } from "../../../utils/TabUtils";

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        backgroundColor: theme.palette.secondary.light,
        display: 'flex',
        minHeight: height60,
    },
}));

const FieldDashboard = (props) => {
    const classes = useStyles();
    const { match: { params: { year, domainId } }, getPlantationDashboard, getDomainDashboard, setEstimateProduce, history,
        dashboard, domain, dir, exitRoute, currency, areaUnit, waterUnit, weightUnit, saveSeasonData, clearDashboard, text, setSeasonDataParam
    } = props;

    const [tab, setTab] = useState(0)


    useEffect(() => {
        if (year && domainId) {
            getPlantationDashboard(year, domainId);
        }
        else if (domainId) {
            getDomainDashboard(domainId);
        }
        return () => {
            clearDashboard();
        }
    }, []);

    useEffect(() => {
        if (year && domainId) {
            getPlantationDashboard(year, domainId);
        }
    }, [year]);


    const onYearChange = (year) => {
        const index = history.location.pathname.lastIndexOf('/') + 1;
        const path = history.location.pathname.slice(0, index) + year;
        history.push(path);
    };

    if (!dashboard) {
        return <Loading />
    }

    return (
        <div className={classes.root}>

            <div style={{ display: 'flex', flex: 1 }}>
                <FieldDashboardMaster dashboard={dashboard} domain={domain} year={year}
                    text={text} dir={dir}
                    onYearChange={onYearChange}
                    exitRoute={exitRoute}
                    handleTabChange={(event, value) => setTab(value)}
                    history={history}
                    areaUnit={areaUnit}
                    weightUnit={weightUnit}
                    tab={tab}
                    setEstimateProduce={setEstimateProduce}
                    setSeasonDataParam={setSeasonDataParam}
                    saveSeasonData={saveSeasonData}
                />
            </div>
            <div style={{ display: 'flex', flex: 7 }}>
                <FieldDashboardDetails dir={dir} currency={currency} dashboard={dashboard} areaUnit={areaUnit} text={text} value={tab}
                    waterUnit={waterUnit} weightUnit={weightUnit}
                   /* handleTabChange={handleTsetTababChange}*/ />
            </div>

        </div>
    );
}

export default withRouter(FieldDashboard);
