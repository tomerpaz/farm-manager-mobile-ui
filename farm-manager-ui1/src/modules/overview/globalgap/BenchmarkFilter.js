import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { RenderDateSelection } from '../../analysis/DataFilterUtil';
import { TextField } from '../../../components';
import { Checkbox, FormControlLabel, MenuItem, IconButton } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.common.white,
    //margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    // backgroundColor: theme.palette.common.white,
    //margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row'
  },
  select: {
    backgroundColor: theme.palette.common.white,
    flex: 1,
    margin: theme.spacing(1),
  },
  checkBox: {
    //backgroundColor: theme.palette.common.white,
    margin: theme.spacing(1),
  }
}));

const BenchmarkFilter = ({ text, startDate, endDate, onEndChange, onStartChange, timeRange, handleChange,
  siteOptions, siteId, productCategories, productCategoryId, cropGenusId, cropGenuses, supraCategory,
  productCategoryComparison, productionTypeId, soilTypeId, limitType, radius, adm1, country, useAdm1, adm1Name,
  debug, setDebug,
}) => {


  const supraCategories = [... new Set(productCategories.map(e => e.supraCategory))];

  const classes = useStyles();

  const disabled = siteId === '';
  return (
    <div className={classes.root}>
      <div className={classes.row}>

        <RenderDateSelection

          start={startDate}
          end={endDate}
          onStartChange={onStartChange}
          onEndChange={onEndChange}
          text={text}
          timeRange={timeRange}
          handleChange={handleChange}
          season={''}
          isSeasons={false}
        />

        <TextField
          select
          className={classes.select}
          value={siteId}
          label={text.site}
          onChange={(e) => handleChange('siteId', e.target.value)}
        >
          <MenuItem value={''}><em>{text.site}</em></MenuItem>))
          {siteOptions.map(e => <MenuItem key={e.element.ggId} value={e.element.ggId}> {`${e.element.name} / ${e.element.ggId}`}</MenuItem>)}
        </TextField>

        <TextField
          select
          className={classes.select}
          value={cropGenusId}
          label={text.variety}
          onChange={(e) => handleChange('cropGenusId', e.target.value)}
        >
          <MenuItem value={''}><em>{text.variety}</em></MenuItem>))
          {cropGenuses.map(e => <MenuItem key={e.externalId} value={e.externalId}> {`${e.name} / ${e.externalId}`}</MenuItem>)}
        </TextField>

        <TextField
          select
          className={classes.select}
          value={productCategoryId}
          label={text.product}
          onChange={(e) => handleChange('productCategoryId', e.target.value)}
        >
          <MenuItem value={''}><em>{text.product}</em></MenuItem>))
          {productCategories.map(e => <MenuItem key={e.externalId} value={e.externalId}> {`${e.name} / ${e.externalId}`}</MenuItem>)}
        </TextField>


      </div>
      <div className={classes.row}>
        <TextField
          select
          className={classes.select}
          value={supraCategory}
          label={text.category}
          onChange={(e) => handleChange('supraCategory', e.target.value)}
        >
          <MenuItem value={''}><em>{text.category}</em></MenuItem>))
          {supraCategories.map(e => <MenuItem key={e} value={e}> {e}</MenuItem>)}
        </TextField>
        <TextField
          select
          className={classes.select}
          value={productionTypeId}
          label={''}
          onChange={(e) => handleChange('productionTypeId', e.target.value)}
        >
          <MenuItem value={2}>{text.openField}</MenuItem>
          <MenuItem value={1}>{text.covered}</MenuItem>
        </TextField>

        <TextField
          select
          className={classes.select}
          value={soilTypeId}
          label={''}
          onChange={(e) => handleChange('soilTypeId', e.target.value)}
        >
          <MenuItem value="1">{text.soil}</MenuItem>
          <MenuItem value="2">{text.soilless}</MenuItem>
        </TextField>
        <TextField
          select
          className={classes.select}
          value={limitType}
          label={''}
          disabled={disabled}
          onChange={(e) => handleChange('limitType', e.target.value)}
        >
          <MenuItem value="geo-administrative">{text.geoAdministrative}</MenuItem>
          <MenuItem value="radius">{text.radius}</MenuItem>
        </TextField>

        {limitType === "radius" && <TextField
          select
          className={classes.select}
          value={radius}
          label={''}
          disabled={disabled}
          onChange={(e) => handleChange('radius', e.target.value)}
        >
          <MenuItem value={100}>{100}</MenuItem>
          <MenuItem value={200}>{200}</MenuItem>
          <MenuItem value={300}>{300}</MenuItem>
          {/* <MenuItem value={400}>{400}</MenuItem>
          // <MenuItem value={500}>{500}</MenuItem> */}
          <MenuItem value={600}>{600}</MenuItem>
        </TextField>}

        {limitType === "geo-administrative" && <TextField
          select
          className={classes.select}
          value={useAdm1}
          disabled={disabled}
          label={''}
          onChange={(e) => handleChange('useAdm1', e.target.value)}
        >
          <MenuItem value={false}>{country}</MenuItem>
          <MenuItem value={true}>{`${country} / ${adm1Name}`}</MenuItem>
        </TextField>}


        <FormControlLabel className={classes.checkBox}
          control={
            <Checkbox
              checked={productCategoryComparison}
              onChange={(value) => handleChange('productCategoryComparison', !productCategoryComparison)}
              color="primary"
            />
          }
          label={text.productCategoryComparison}
        />
        <div style={{display: 'flex', alignItems:'center'}}>
          <IconButton onClick={(value) => setDebug(!debug)}>
            <InfoOutlined color={debug ? 'primary' : 'secondary'} />
          </IconButton>
        </div>
      </div>
    </div>




    //  //  Required if limit_type is radius: Using a predefined radius (i.e. 100, 200, 300, 600 km), a circular area will be defined using the producers' site coordinates as centre point. Data from producers whose sites fall within the defined circular area will be used to perform the benchmarking analysis.

  )
}
export default BenchmarkFilter;



