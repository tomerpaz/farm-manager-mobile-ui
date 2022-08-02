import React from 'react';
import { makeStyles } from '@mui/styles';
import { BenchmarkCard } from './BenchmarkCard';
import { Typography } from '@mui/material';

import { amber, blue, green, deepOrange } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  title: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: green[800],
    fontWeight: 'bold'

  },
  column: {
    flex: 1,
    display: 'flex', 
    flexDirection: 'column',
  }

}));


//typeColors[type]

const BenchmarkData = ({data, text, areaUnit}) => {
  const classes = useStyles();

  function FormColumn({type, data}) {
    return (
        
      <div className={classes.column}> 
            {data && data.map((e, i, arr) => 
                <BenchmarkCard key={i} data={e} type={type} text={text} areaUnit={areaUnit}/>
            )}
      </div>
    );
  }

  return (
    <div className={classes.root}>
          <FormColumn type={'activeIngredients'} data={data.active_ingredient}/>
          <FormColumn type={'energy'} data={data.energy}/>
          <FormColumn type={'fertilizers'} data={data.fertilizer}/>
          <FormColumn type={'water'} data={data.water}/>
    </div>
  );
}

export default BenchmarkData;