import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import green from '@mui/material/colors/green';

import { Typography } from '@mui/material';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    card: {
        maxWidth: 400,
        margin: theme.spacing(1),
    },
    title: {
        margin: theme.spacing(1),
    },
    avatar: {
        backgroundColor: green[500],
      },
  }));





function CropRistrictions(props) {
    const classes = useStyles();

    const { restrictions, text } = props;
    return (
        <div className={classes.root}>

            {restrictions && restrictions.length > 0 && <Typography className={classes.title} variant='subtitle1'>{text.prohibitedCrops}</Typography>}
            {restrictions &&
                restrictions.map((e, index, arr) =>

                    <Card key={index} className={classes.card}>
                        <CardHeader 
                            avatar={
                                <Avatar className={classes.avatar}>
                                    C
                                    </Avatar>
                            }
                            title={e.alias}
                        />
                    </Card>
                )}
        </div>
    );
}

export default CropRistrictions;