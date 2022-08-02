import React from 'react';
import {
    EXPORTER_TABS, EXPORTER_GROWERS
} from "../Routes";
import { AppBarBox } from './AppBarUtil';
import AppBarButton from './components/AppBarButton';



const ExporterBar = (props) => {

    return (

        <AppBarBox>
            <AppBarButton path={EXPORTER_TABS} history={props.history} onClick={() => props.history.push(EXPORTER_GROWERS)} label={props.text.exporter} />
        </AppBarBox>
    )
}

export default ExporterBar;