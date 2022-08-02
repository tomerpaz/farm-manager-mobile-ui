import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import GlobalGapSvg from '../../../icons/GlobalGapSvg';
import { loadDataByName } from '../../../utils/LoadUtil';
import { getEnd, getStart, newDate, subtractMonths, asLocalDate } from '../../../utils';
import BenchmarkFilter from './BenchmarkFilter';
import BenchmarkData from './BenchmarkData';

import { isEmpty } from '../../../utils/StringUtil';
import { httpGet } from '../../../actions/util/RestUtil';
import { Typography } from '@mui/material';

import { benchmark_test_data } from './testdata';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.common.white,
    // margin: theme.spacing(1),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  body: {
    // backgroundColor: theme.palette.common.white,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'

    // margin: theme.spacing(1),
  },
  noData: {
    // backgroundColor: theme.palette.common.white,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'

    // margin: theme.spacing(1),
  },
  error: {
    padding: theme.spacing(2),
    //  cursor: 'grab',
  },
  empty: {
    padding: theme.spacing(2),
  },
}));

const Benchmark = (props) => {

  const { cropGenuses, productCategories, text, siteOptions, user: { business: { ggBearer, ggn, name } },
    global: { globalgapUrl }, areaUnit } = props;

  const demo = { id: 0, element: { ggId: 0, name: text.demo } }
  const benchMarkSites = siteOptions.filter(e => e.element.ggId).concat(demo);


  const [timeRange, setTimeRange] = useState('');

  //start_date
  const [startDate, setStartDate] = useState(subtractMonths(newDate(), 1));
  //end_date
  const [endDate, setEndDate] = useState(newDate())
  //site_id
  const [siteId, setSiteId] = useState('')

  //crop_genus_id
  const [cropGenusId, setCropGenusId] = useState('')

  //  product_category_id
  // Product category, not used if crop_genus_id exist. To receive a benchmarking report against producers who produce for the same product category.

  const [productCategoryId, setProductCategoryId] = useState('')

  //  supra_category
  //Supra category, not used if crop_genus_id or product_category_id is used. To receive a benchmarking report against all flower and ornamental growers
  const [supraCategory, setSupraCategory] = useState('')


  //  product_category_comparison
  //To compare a product category to all flower and ornamentals. Optional parameter. In order to get the correct comparison, a product_category_id needs to be set.
  const [productCategoryComparison, setProductCategoryComparison] = useState(false)
  //  production_type_id
  //  Production type
  // "id": 1,"name": "Covered","description": "Covered crops"
  // "id": 2, "name": "Open field","description": "Open field"
  const [productionTypeId, setProductionTypeId] = useState(2)

  // <MenuItem value="1">{text.soil}</MenuItem>
  // <MenuItem value="2">{text.soilless}</MenuItem>
  const [soilTypeId, setSoilTypeId] = useState(1)

  // //   The "limit_type" field will be used to limit the number of producers to be included in the benchmarking analysis. This number limitation may be imposed either through a radius (by which a geo-referenced circular area will be defined), or though geo-administrative boundaries. Values: radius, geo-administrative. Ex.: "A given producer will only be compared to those producers whose site is located within a 100 km range from its site coordinates"; "A given producer will only be compared to those producers whose site is located within the state of California
  //options: radius, geo-administrative
  //requierd
  const geoAdministrative = 'geo-administrative';
  const [limitType, setLimitType] = useState(geoAdministrative)

  //  //  Required if limit_type is radius: Using a predefined radius (i.e. 100, 200, 300, 600 km), a circular area will be defined using the producers' site coordinates as centre point. Data from producers whose sites fall within the defined circular area will be used to perform the benchmarking analysis.
  const [radius, setRadius] = useState(100)

  const [country, setCountry] = useState('')

  const [adm1, setAdm1] = useState('')

  const [useAdm1, setUseAdm1] = useState(false)

  const [adm1Name, setAdm1Name] = useState('')

  const [error, setError] = useState(null)

  const [benchmark, setBenchmark] = useState(null)

  const [lastUrl, setLastUrl] = useState(null)

  const [debug, setDebug] = useState(false)

  useEffect(() => {
    if (!isEmpty(timeRange)) {
      setStartDate(getStart(endDate, timeRange));
      setEndDate(getEnd(endDate, timeRange))
    }
  }, [timeRange]);


  useEffect(() => {
    loadDataByName(props, ['varieties', 'fields', 'productCategories', 'crops', 'cropGenuses', 'sites']);
  }, [])

  useEffect(() => {
    setError(null);
    getBenchmark();
  }, [
    startDate, endDate, siteId, cropGenusId, productCategoryId, supraCategory, productCategoryComparison,
    productionTypeId, soilTypeId, limitType, radius, useAdm1,
  ])

  var config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + ggBearer
    }
  };


  const getFilterData = () => {
    if (cropGenusId) {
      return `crop_genus_id=${cropGenusId}`
    } else if (productCategoryId) {
      return `product_category_id=${productCategoryId}`
    } else if (supraCategory) {
      return `supra_category=${supraCategory}`
    }
  }

  const getBenchmark = () => {

    setBenchmark(null);
    setLastUrl(null);
    const filterData = getFilterData();
    if (siteId === 0) {
      setBenchmark(benchmark_test_data);
    } else {
      const ok = siteId !== '' && filterData;
      if (ok) {
        const adm1Value = geoAdministrative && useAdm1 ? `&adm1=${adm1Name}` : '';
        const limitTypeValue = limitType === geoAdministrative ? `country=${country}${adm1Value}` : `radius=${radius}`;
        const productCategoryComparisonValue = productCategoryComparison ? '&product_category_comparison' : '';
        const params = `?start_date=${asLocalDate(startDate, true)}&end_date=${asLocalDate(endDate, true)}&site_id=${siteId}&production_type_id=${productionTypeId}&soil_type_id=${soilTypeId}&limit_type=${limitType}&${limitTypeValue}&${filterData}${productCategoryComparisonValue}`

        const url = `${globalgapUrl}benchmark${params}`;
        setLastUrl(url);
        httpGet(url, config)
          .then(response => {
            setBenchmark(response.data);

          })
          .catch(error => {
            if (error.response && error.response.data) {
              setError(error.response.data.error);
            }
          })
      }
    }

  }


  const handleChange = (type, value) => {
    if (type === 'timeRange') {
      setTimeRange(value);
    } else if (type === 'siteId') {
      setSiteId(value);
      const site = benchMarkSites.find(e => e.element.ggId == value);
      if (site) {
        setCountry(site.element.ggGeoCountry);
        setAdm1(site.element.ggGeoAdmin1);
        setAdm1Name(site.element.ggGeoName);
      } else {
        setCountry('');
        setAdm1('');
        setAdm1Name('');
        setUseAdm1(false);
      }

    } else if (type === 'cropGenusId') {
      setCropGenusId(value);
      setProductCategoryId('');
      setSupraCategory('');
    } else if (type === 'productCategoryId') {
      setProductCategoryId(value);
      setCropGenusId('');
      setSupraCategory('');
    } else if (type === 'supraCategory') {
      setSupraCategory(value);
      setProductCategoryId('');
      setCropGenusId('');
    } else if (type === 'productCategoryComparison') {
      setProductCategoryComparison(value);
    } else if (type === 'productionTypeId') {
      setProductionTypeId(value);
    } else if (type === 'soilTypeId') {
      setSoilTypeId(value);
    } else if (type === 'limitType') {
      setLimitType(value);
    } else if (type === 'radius') {
      setRadius(value);
    } else if (type === 'useAdm1') {
      setUseAdm1(value);
    }
  }
  const classes = useStyles();

  return (

    <div className={classes.root}>
      <BenchmarkFilter
        startDate={startDate}
        endDate={endDate}
        onStartChange={(start) => setStartDate(start)}
        onEndChange={(end) => setEndDate(end)}
        text={text}
        timeRange={timeRange}
        handleChange={(type, value) => handleChange(type, value)}
        siteOptions={benchMarkSites}
        siteId={siteId}
        productCategories={productCategories}
        productCategoryId={productCategoryId}
        cropGenusId={cropGenusId}
        cropGenuses={cropGenuses}
        supraCategory={supraCategory}
        productCategoryComparison={productCategoryComparison}
        productionTypeId={productionTypeId}
        soilTypeId={soilTypeId}
        limitType={limitType}
        radius={radius}
        adm1={adm1}
        country={country}
        useAdm1={useAdm1}
        adm1Name={adm1Name}
        debug={debug}
        setDebug={() => setDebug(!debug)}
      />

      <div className={classes.body}>
        {(error || !benchmark) &&
          <div className={classes.noData}>
            {error && <Typography className={classes.error} variant='h5' color='error' >{error}</Typography>}
            {!error && <Typography className={classes.empty} variant='h5'  >-</Typography>}
            {!benchmark && <GlobalGapSvg height={400} width={400} />}
          </div>}
        {benchmark && <BenchmarkData text={text} data={benchmark} areaUnit={areaUnit}/>}
        {debug && <Typography className={classes.empty} color='secondary' >{`GGN: ${ggn}`}</Typography>}
        {debug && <Typography className={classes.empty} color='secondary' >{lastUrl}</Typography>}
      </div>
    </div>
  )
}
export default Benchmark;



