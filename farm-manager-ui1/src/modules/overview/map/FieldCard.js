import React from 'react';
import { Avatar, Tooltip, IconButton, Card, CardActions, CardContent, Typography, Box } from '@mui/material';

import { NetworkCheck as Dashboard, History, Adjust as Action } from '@mui/icons-material';


import { getFruitIcon } from "../../../icons/FruitIconUtil";
import { asShortStringDate } from "../../../utils/DateUtil";
import Satellite from '../../../icons/Satellite';
import Thermometer from '../../../icons/Thermometer'

import { getDashboardUrl } from "../../../utils/FieldUtil";
import { ACTIVITY_FROM, DOMAIN, DOMAIN_HISTORY, MAP } from "../../../components/frame/Routes";
import { isEmpty } from "../../../utils/StringUtil";
import { getTextAlight } from '../../../utils/StyleUtils';



const GRID_COLUMN_COUNT = 4;
function getTagText(domain, user) {

    const hasTags = !isEmpty(user.business.tag1) || !isEmpty(user.business.tag2);
    if (hasTags) {
        if (domain.tag1 && domain.tag2) {
            return `${domain.tag1.name}, ${domain.tag2.name}`;
        } else if (domain.tag1) {
            return domain.tag1.name
        } else if (domain.tag2) {
            return domain.tag2.name
        }
    }
    return null;
}

const iconSx = { color: 'rgba(255, 255, 255, 0.54)' };
const cardSx = {
    maxWidth: (window.screen.width * .9) / GRID_COLUMN_COUNT,
    minWidth: 300,
    flex: 1,
    dir: 'rtl'
}

const actionsSx = {
    display: 'flex',
    justifyContent: 'space-around',
    background: 'rgba(0, 0, 0, 0.5)'
}

const FieldCard = (props) => {



    const { domain, text, history, caller, yearFilter, areaUnit, user, documentor, dir } = props;

    const baseUri = caller === MAP ? 'm' : 'c';

    const tagText = getTagText(domain, user)

    const serviceKey = !isEmpty(user.business.openweathermapApiKey);

    const style = caller === MAP ? { marginTop: 8, marginBottom: 8 } : null;

    return (
        <Box flex= '1'>
            <Card style={{
                backgroundColor: domain.harvestColor,
                direction: dir, textAlign: getTextAlight(dir),
                maxWidth: (window.screen.width * .9) / GRID_COLUMN_COUNT,
                minWidth: 300,
                // dir: 'rtl'

            }} >
                <CardContent style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                    <Avatar style={{ padding: 0, margin: 0 }} sx={{ backgroundColor: 'transparent' }}>
                        {getFruitIcon(domain.variety.attribute1, domain.variety.unit)}
                    </Avatar>
                    <div >

                        <Typography style={{ cursor: 'pointer' }} onClick={() => history.push(`${DOMAIN}${caller}/${domain.id}`)} variant={'h6'} color="textSecondary">
                            {`${domain.field.name} ${domain.alias ? " (" + domain.alias + ")" : ""}`}
                        </Typography>
                        <Typography variant={'subtitle1'}>
                            {domain.variety.category}, {domain.variety.name}
                        </Typography>
                        {tagText && <Typography variant={'subtitle1'}>
                            {tagText}
                        </Typography>}
                        <Typography style={style} color="textSecondary">
                            {`${domain.plantArea} ${text[areaUnit]}, ${asShortStringDate(domain.plant)} ${domain.year ? '- ' + domain.year : ''}`}
                        </Typography>
                    </div>
                </CardContent>
                <CardActions sx={actionsSx} >
                    {documentor && <Tooltip title={text.logActivity}>
                        <IconButton sx={iconSx}
                            onClick={() => history.push(`/${baseUri}${ACTIVITY_FROM}0?d=${domain.id}`)}>
                            <Action />
                        </IconButton>
                    </Tooltip>}

                    <Tooltip title={text.domainHistory}>
                        <IconButton sx={iconSx}
                            onClick={() => history.push(`/${baseUri}${DOMAIN_HISTORY}${domain.id}`)}>
                            <History />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={text.dashboard}>
                        <IconButton sx={iconSx}
                            onClick={() => history.push(`/${caller}${getDashboardUrl(domain, yearFilter)}`)}>
                            <Dashboard />
                        </IconButton>
                    </Tooltip>
                    {serviceKey && domain.field.imageryId &&
                        <React.Fragment >
                            <Tooltip title={text.sensing}>
                                <IconButton sx={iconSx}
                                    onClick={() => history.push(`/${caller}/sensing/${domain.id}/${domain.field.imageryId}`)}>
                                    <Thermometer />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title={text.satellite}>
                                <IconButton sx={iconSx}
                                    onClick={() => history.push(`/${caller}/satellite/${domain.id}/${domain.field.imageryId}`)}>
                                    <Satellite />
                                </IconButton>
                            </Tooltip>
                        </React.Fragment>
                    }
                </CardActions>
            </Card>
        </Box>
    );
}

export default FieldCard;
