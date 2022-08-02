import React from 'react';
import { makeStyles } from '@mui/styles';
import TalgilSettings from './TalgilSettings';
import IccProSettings from './IccProSettings';
import EmailGenericSettings from './EmailGenericSettings';
import { ICCPRO, TALGIL } from '../../components/frame/Routes';
import { EMAIL_WATERSYS } from './WaterSysConsts';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
    },
}));

const WaterSystemSettings = (props) => {
    const classes = useStyles();
    
    const {system} = props;
    return (
        <div className={classes.root}>
            {system === TALGIL && <TalgilSettings {...props} />}
            {system === ICCPRO && <IccProSettings {...props} />}
            {/* {EMAIL_WATERSYS.includes(system) && <EmailGenericSettings {...props} />} */}
        </div>
    )
}

export default WaterSystemSettings;



