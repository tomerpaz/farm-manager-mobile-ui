import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { Typography } from '@mui/material';
import BusinessForm from "./BusinessForm";
import UserTable from "./UserTable";
import { iconButton } from "../../../utils/StyleUtils";
import { resetImagery } from '../../../actions';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
        color: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconButton: iconButton(theme),
    title: {
        margin: theme.spacing(2),
        color: theme.palette.common.black,
        fontWeight: 700
    },
}));


const BusinessView = (props) => {
    const classes = useStyles();

    const { text, lang, view, flipButtonText, onViewChange, selectedBusiness, businessUsers, } = props;
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography className={classes.title} variant="h6" gutterBottom>
                    {text.business}
                </Typography>
                {selectedBusiness.id &&
                    <Button onClick={onViewChange} variant="outlined" className={classes.button}>
                        {text[flipButtonText]}
                    </Button>}
                {selectedBusiness.id &&
                    <Button onClick={() => resetImagery(selectedBusiness.id)} variant="outlined"
                        className={classes.button}>
                        {'NDVI'}
                    </Button>}
            </div>
            <Divider />
            {view === 'settings' && <BusinessForm {...props} />}
            {view === 'users' && selectedBusiness.id && businessUsers && <UserTable {...props} />}
        </div>

    )
}

export default BusinessView;

