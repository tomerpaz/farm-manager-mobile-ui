import React from 'react';
import { makeStyles } from '@mui/styles';
import { red } from '@mui/material/colors';
import { Table, } from '../../../../components';
import { height260 } from "../../../../utils/TabUtils";




const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.common.white,
        margin: theme.spacing(2),
        marginBottom: theme.spacing(1),
        display: 'flex',
        // borderTop: '1px solid ' + BORDER_COLOR,
    },


    notificationIcon: {
        color: red[500],
    }
}));


const CropRotation = ({  dashboard, text }) => {

    const classes = useStyles();

    /*
        Long id;
        Long plant;
        Float area;
        int season;
        String crop;
        String cropIcon;
        String compost;
        String disease;
        String notifications;
        String disinfectant;
        */

    return (


        <div className={classes.root} style={{ flex: 1 }}>

            {/*<div className={classes.table}>*/}
            <Table
                rows={dashboard.rotations}
                indexKey={true}
                columns={[
                    { name: 'season', title: text.season, },
                    {
                        name: 'crop',
                        title: text.crop,
                    },

                    {
                        name: 'disinfectant', title: text.disinfectant,
                    },
                    {
                        name: 'compost',
                        title: text.compost,
                    },
                    {
                        name: 'disease',
                        title: `${text.soilDisease}/${text.perennialPest}`,
                    },
                ]}
                height={height260}
            />
            {/*</div>*/}
        </div>

    )
}
export default CropRotation;
