import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { withRouter } from 'react-router-dom'
import DashboardFilter from '../dashboard/DashboardFilter';
import { getCurrentYear, } from '../../../utils';
import { loadDataByName } from '../../../utils/LoadUtil';
import FinancialDashboardCategory from '../dashboard/DashboardCategory';
import { Loading } from '../../../components/core';
import { masterDetails } from "../../../utils";
import { waterColor, weightColor, cropColor } from '../../../components/dashboard/field/plantation/ColorUtil';
import { isEmpty } from '../../../utils/StringUtil';

const expensesColor = cropColor;
const waterColorValue = waterColor;
const weightColorValue = weightColor;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    filter: {
        display: 'flex', flex: 1,
    },
    data: {
        display: 'flex', flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    loading: {
        flex: 1,
        display: 'flex',
        //    backgroundColor: theme.palette.common.white,
        //  margin: theme.spacing(1),
        minHeight: masterDetails,
        //  borderTop: '2px solid ' + BORDER_COLOR,
    },
}));


const cropCategoryOptions = ['crop', 'variety', 'fields']
const waterOptions = ['crop', 'field', 'variety', 'indices']
const weightOptions = ['crop', 'field', 'variety', 'indices']
const compareOptions = ['crops', 'water', 'yield'];

function getCropDataByOption(data, option) {
    if (!data) {
        return []
    }
    if (option === 'crop') {
        return data.crops;
    } else if (option === 'variety') {
        return data.varieties;
    } else if (option === 'fields') {
        return data.fields;
    }
}
function getWaterDataByOption(data, option) {
    if (!data) {
        return []
    }
    // if(data){
    if (option === 'crop') {
        return data.waterByCrop;
    } else if (option === 'field') {
        return data.waterByField;
    } else if (option === 'variety') {
        return data.waterByVariety;
    }
    return data.waterByCrop;
    // }
}

function getWeightDataByOption(data, option) {
    if(!data){
        return []
    }
    if (option === 'crop') {
        return data.weightByCrop;
    } else if (option === 'field') {
        return data.weightByField;
    } else if (option === 'variety') {
        return data.weightByVariety;
    }
    return data.weightByCrop;
}

const FinancialDashboard = (props) => {
    const classes = useStyles();

    const { dir, text, fieldOptions, fieldCrops, plantations, cropType,setCropType,
        cropOptions, siteOptions, parentFieldOptions, waterUnit, areaUnit, weightUnit, currency,
        quantitativeDashboard, quantitativeDashboard2, getQuantitativeDashboard, clearDashboard,
        varietyOptions, fetchingQuantitativeDashboard, fetchingQuantitativeDashboard2 } = props;
    const [state, setState] = useState('');

    const [yearFilter, setYearFilter] = useState(getCurrentYear())
    const [yearFilter2, setYearFilter2] = useState(getCurrentYear() - 1)
    const [filter, setFilter] = useState([])

    const [filter2, setFilter2] = useState([])

    const [indices, setIndices] = useState(false)
    const [indices2, setIndices2] = useState(false)
    const [indices3, setIndices3] = useState(false)

    const [cropOption, setCropOption] = useState('crop')

    const [waterOption, setWaterOption] = useState('crop')
    const [weightOption, setWeightOption] = useState('crop')
    const [init, setInit] = useState(false)

    const isPlantations = cropType === 'plantations';


    useEffect(() => {

        if (!isEmpty(state) && quantitativeDashboard2 === null) {//year, plantation, filter, secondary
            getQuantitativeDashboard(yearFilter2, isPlantations, filter2, true)
        }
    }, [state])

    useEffect(() => {
        setFilter([]);
        setFilter2([]);
    }, [cropType])

    useEffect(() => {
        if (init) {
            getQuantitativeDashboard(yearFilter, isPlantations, filter);
        }
    }, [yearFilter, filter])

    useEffect(() => {
        if (!isEmpty(state)) {
            getQuantitativeDashboard(yearFilter2, isPlantations, filter2, true)
        }
    }, [yearFilter2, filter2])

    useEffect(() => {
        loadDataByName(props, ['crops', 'fields', 'sites', 'fields', 'parentFields', 'varieties']);
        setInit(true);
    }, [])



    const actualCropOptions = cropOptions.filter(e => e.element.plantation === isPlantations);
    const actualCropIds = actualCropOptions.map(e => e.id);
    const actualVarietyOptions = varietyOptions.filter(e => actualCropIds.includes(e.element.cropID));


    const showQuantitativeDashboard = quantitativeDashboard && !fetchingQuantitativeDashboard;
    const showQuantitativeDashboard2 = quantitativeDashboard2 && !fetchingQuantitativeDashboard2;

    const options = actualCropOptions
        .concat(actualVarietyOptions)
        .concat(fieldOptions);
    return (
        <div className={classes.root}>

            <div className={classes.filter}>
                <DashboardFilter dir={dir}
                    state={state} setState={setState}
                    yearFilter={yearFilter}
                    setYearFilter={setYearFilter}
                    yearFilter2={yearFilter2}
                    setYearFilter2={setYearFilter2}
                    dual={state !== ''}
                    options={options}
                    filter={filter}
                    setFilter={(value) => setFilter(value)}
                    filter2={filter2}
                    setFilter2={(value) => setFilter2(value)}
                    text={text}
                    fieldCrops={fieldCrops}
                    plantations={plantations}
                    cropType={cropType}
                    setCropType={setCropType}
                    compareOptions={compareOptions}
                />
            </div>
            {!showQuantitativeDashboard && <div className={classes.loading}><Loading noBackGroundColor={true} /></div>}
            {showQuantitativeDashboard && <div className={classes.data}>
                {state === '' &&
                    <React.Fragment >
                        <FinancialDashboardCategory dir={dir} indices={indices} setIndices={setIndices}
                            title={text.crops} color={expensesColor} text={text}
                            waterUnit={waterUnit} areaUnit={areaUnit} weightUnit={weightUnit}
                            totalValue={quantitativeDashboard.totalArea}
                            data={getCropDataByOption(quantitativeDashboard, cropOption)}
                            hasNegative={false}
                            option={cropOption}
                            options={cropCategoryOptions}
                            onChangeOption={setCropOption}

                            dataUnit={areaUnit}
                        />
                        <FinancialDashboardCategory dir={dir} indices={indices2} setIndices={setIndices2}
                            dataUnit={waterUnit} title={text.water} color={waterColorValue} text={text}
                            waterUnit={waterUnit} areaUnit={areaUnit} weightUnit={weightUnit}
                            totalValue={quantitativeDashboard.totalWater}
                            data={getWaterDataByOption(quantitativeDashboard, waterOption)}
                            hasNegative={false}
                            option={waterOption}
                            options={waterOptions}
                            onChangeOption={setWaterOption}

                            weighIndex={true} areaIndex={true}
                        />
                        <FinancialDashboardCategory dir={dir} indices={indices3} setIndices={setIndices3}
                            dataUnit={weightUnit} title={text.yield} color={weightColorValue} text={text}
                            waterUnit={waterUnit} areaUnit={areaUnit} weightUnit={weightUnit}
                            totalValue={quantitativeDashboard.totalWeight}
                            data={getWeightDataByOption(quantitativeDashboard, weightOption)}
                            option={weightOption}
                            options={weightOptions}
                            onChangeOption={setWeightOption}

                            waterIndex={true} areaIndex={true}
                        />
                    </React.Fragment>
                }

                {state === 'crops' &&
                    <React.Fragment>
                        <FinancialDashboardCategory dir={dir}
                            indices={indices} setIndices={setIndices}
                            title={text.crops} color={expensesColor} text={text}
                            waterUnit={waterUnit} areaUnit={areaUnit} weightUnit={weightUnit}
                            totalValue={quantitativeDashboard.totalArea}
                            data={getCropDataByOption(quantitativeDashboard, cropOption)}
                            //compared={getCropDataByOption(quantitativeDashboard2, cropOption)}
                            hasNegative={false}
                            option={cropOption}
                            options={cropCategoryOptions}
                            onChangeOption={setCropOption}

                            dataUnit={areaUnit}
                        />
                        {!showQuantitativeDashboard2 && <div className={classes.loading}><Loading noBackGroundColor={true} /></div>}
                        {showQuantitativeDashboard2 && <FinancialDashboardCategory dir={dir}
                            indices={indices} setIndices={setIndices}
                            currency={currency} title={text.crops} color={expensesColor} text={text}
                            waterUnit={waterUnit} areaUnit={areaUnit} weightUnit={weightUnit}
                            totalValue={quantitativeDashboard2.totalArea}
                            data={getCropDataByOption(quantitativeDashboard2, cropOption)}
                            //compared={getCropDataByOption(quantitativeDashboard, cropOption)}
                            hasNegative={false}
                            option={cropOption}
                            options={cropCategoryOptions}
                            onChangeOption={setCropOption}
                            dataUnit={areaUnit}
                        />}
                    </React.Fragment>
                }
                {state === 'water' &&
                    <React.Fragment>
                        <FinancialDashboardCategory dir={dir}
                            indices={indices} setIndices={setIndices}
                            dataUnit={waterUnit} title={text.water} color={waterColorValue} text={text}
                            waterUnit={waterUnit} areaUnit={areaUnit} weightUnit={weightUnit}
                            totalValue={quantitativeDashboard.totalWater}
                            data={getWaterDataByOption(quantitativeDashboard, waterOption)}
                            compared={getWaterDataByOption(quantitativeDashboard2, waterOption)}
                            hasNegative={false}
                            option={waterOption}
                            options={waterOptions}
                            onChangeOption={setWaterOption}

                            weighIndex={true} areaIndex={true}
                        />
                        {!showQuantitativeDashboard2 && <div className={classes.loading}><Loading noBackGroundColor={true} /></div>}
                        {showQuantitativeDashboard2 &&
                            <FinancialDashboardCategory dir={dir}
                                indices={indices} setIndices={setIndices}
                                dataUnit={waterUnit} title={text.water} color={waterColorValue} text={text}
                                waterUnit={waterUnit} areaUnit={areaUnit} weightUnit={weightUnit}
                                totalValue={quantitativeDashboard2.totalWater}
                                data={getWaterDataByOption(quantitativeDashboard2, waterOption)}
                                compared={getWaterDataByOption(quantitativeDashboard, waterOption)}
                                hasNegative={false}
                                option={waterOption}
                                options={waterOptions}
                                onChangeOption={setWaterOption}

                                weighIndex={true} areaIndex={true}
                            />}
                    </React.Fragment>
                }

                {state === 'yield' &&
                    <React.Fragment>
                        <FinancialDashboardCategory dir={dir} indices={indices} setIndices={setIndices}
                            dataUnit={weightUnit} title={text.yield} color={weightColorValue} text={text}
                            waterUnit={waterUnit} areaUnit={areaUnit} weightUnit={weightUnit}
                            totalValue={quantitativeDashboard.totalWeight}
                            data={getWeightDataByOption(quantitativeDashboard, weightOption)}
                            compared={getWeightDataByOption(quantitativeDashboard2, weightOption)}
                            option={weightOption}
                            options={weightOptions}
                            onChangeOption={setWeightOption}

                            waterIndex={true} areaIndex={true}
                        />
                        {!showQuantitativeDashboard2 && <div className={classes.loading}><Loading noBackGroundColor={true} /></div>}
                        {showQuantitativeDashboard2 &&
                            <FinancialDashboardCategory dir={dir} indices={indices} setIndices={setIndices}
                                dataUnit={weightUnit} title={text.yield} color={weightColorValue} text={text}
                                waterUnit={waterUnit} areaUnit={areaUnit} weightUnit={weightUnit}
                                totalValue={quantitativeDashboard2.totalWeight}
                                data={getWeightDataByOption(quantitativeDashboard2, weightOption)}
                                compared={getWeightDataByOption(quantitativeDashboard, weightOption)}
                                option={weightOption}
                                options={weightOptions}
                                onChangeOption={setWeightOption}

                                waterIndex={true} areaIndex={true}
                            />
                        }
                    </React.Fragment>
                }
            </div>}
        </div >

    )
}

export default withRouter(FinancialDashboard);