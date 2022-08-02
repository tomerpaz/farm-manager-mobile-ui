import React from 'react';
import Irrigation from '@mui/icons-material/Opacity';
import Fertilizer from '@mui/icons-material/BlurLinear';
import { Map } from '@mui/icons-material';

import { ButtonBody } from "../../utils/StyleUtils";
import {
    WATERSYS_GALCON, WATERSYS_ICC, WATERSYS_ICCPRO,
    WATERSYS_TALGIL,
    FERTILIZEHUB,
    GIS_SETTINGS,
    DATA_EXCHANGE,
    WIALON
} from "../../components/frame/Routes";
import { ImportExport } from '@mui/icons-material';
import GpsTrack from '../../icons/GpsTrack';
import { isWialonAdmin } from '../wialon/WialonSettings';
import { Box } from '@mui/material';
import SelectorButton from '../../components/core/button/SelectorButton';
import { bodyHeight } from "../../utils/TabUtils";


const Interfaces = (props) => {

    const { history, text, user } = props;

    return (
        <Box display={'flex'} flex={1}>
            <Box margin={5} display={'flex'} flex={1} justifyContent={'space-around'}>
                <SelectorButton
                    onClick={() => history.push(WATERSYS_TALGIL)}>
                    <ButtonBody >
                        Tal-Gil
                        <Irrigation />
                    </ButtonBody>
                </SelectorButton>
                <SelectorButton
                    onClick={() => history.push(WATERSYS_ICCPRO)}>
                    <ButtonBody >
                        ICC PRO
                        <Irrigation />
                    </ButtonBody>
                </SelectorButton>
                {/* <Button
                    onClick={() => history.push(WATERSYS_GALCON)}>
                <ButtonBody >
                    Galcon
                    <Irrigation/>
                </div>
            </Button> */}
                <SelectorButton
                    onClick={() => history.push(FERTILIZEHUB)}>
                    <ButtonBody >
                        {text.fertilizerHubs}
                        <Fertilizer />
                    </ButtonBody>
                </SelectorButton>

                <SelectorButton
                    onClick={() => history.push(GIS_SETTINGS)}>
                    <ButtonBody >
                        {'GIS'}
                        <Map />
                    </ButtonBody>
                </SelectorButton>

                <SelectorButton
                    onClick={() => history.push(DATA_EXCHANGE)}>
                    <ButtonBody >
                        {text.importExport}
                        <ImportExport />
                    </ButtonBody>
                </SelectorButton>

                {isWialonAdmin(user) && <SelectorButton
                    onClick={() => history.push(WIALON)}>
                    <ButtonBody >
                        Wialon
                        <GpsTrack />
                    </ButtonBody>
                </SelectorButton>}
            </Box>
        </Box>
    )

}
export default Interfaces;
