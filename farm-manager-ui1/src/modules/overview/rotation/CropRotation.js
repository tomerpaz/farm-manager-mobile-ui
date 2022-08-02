import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Drawer, Typography } from '@mui/material';
import { withRouter } from 'react-router-dom'
import CropRotationTable from './CropRotationTable';
import PesticideHistory from './PesticideHistory';
import CropRistrictions from './CropRistrictions';
import PestHistory from './PestHistory';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    
    drawerTitle: {
        margin: theme.spacing(1),
        width: 400,
    },

}));


const CropRotation = (props) => {

    const { getFieldCropRotations, text } = props;

    const [selected, setSelected] = useState(null)
    const classes = useStyles();

    useEffect(() => {
        getFieldCropRotations();
    }, [])
    return (
        <div className={classes.root} >
            <CropRotationTable  setSelected={(data)=> setSelected(data)} {...props} />
            <Drawer  anchor="left" open={selected !== null} onClose={() => setSelected(null)}>
                <Typography className={classes.drawerTitle} variant={'h6'}>{selected ? `${selected.year}, ${selected.row.field.name}` : ''}</Typography>
                {selected && <CropRistrictions text={text} restrictions={selected.row.restrictionYearCrops[selected.year]} />}
                {selected && <PestHistory text={text} pests={selected.row.fieldPests} />}
                {selected && <PesticideHistory text={text} pesticides={selected.row.fieldPesticides} />}            
            </Drawer>
        </div>
    )
}

export default withRouter(CropRotation);