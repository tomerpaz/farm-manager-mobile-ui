import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';

import { makeStyles } from '@mui/styles';
import { withRouter } from 'react-router-dom'
import DashboardFilter from '../dashboard/DashboardFilter';
import { getCurrentYear, } from '../../../utils';
import { loadDataByName } from '../../../utils/LoadUtil';
import FinancialDashboardCategory from '../dashboard/DashboardCategory';
import { Loading } from '../../../components/core';
import { masterDetails } from "../../../utils";
import { isEmpty } from '../../../utils/StringUtil';

const expensesColor = "#ed5565";
const incomeColor = "#1ab394";
const profitColor = "#45a15c";

const expensesOptions = ['category', 'crop', 'field', 'indices', 'resourceType']
const incomeOptions = ['crop', 'field', 'indices']
const allOptions = ['crop', 'indices']
const compareOptions = ['expenses', 'income', 'profit'];

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
    },
    loading: {
        flex: 1,
        display: 'flex',
        // backgroundColor: theme.palette.common.white,
        // margin: theme.spacing(1),
        minHeight: masterDetails,
        // borderTop: '2px solid ' + BORDER_COLOR,
    },
}));


function getExpenseDataByOption(financialDashboard, option) {
    if(!financialDashboard){
        return []
    }
    if (option === 'category') {
        return financialDashboard.activityGroupExpenses
    } else if (option === 'resourceType') {
        return financialDashboard.resourceTypeExpenses
    } else if (option === 'field') {
        return financialDashboard.fieldExpenses
    } else {
        return financialDashboard.cropExpenses;
    }
}

function getIncomeDataByOption(financialDashboard, option) {
    if(!financialDashboard){
        return []
    }
    if (option === 'field') {
        return financialDashboard.fieldIncome;
    } else {
        return financialDashboard.cropIncome;
    }
}

const FinancialDashboard = (props) => {
    const classes = useStyles();

    const { dir, text, fieldOptions, fieldCrops, plantations,cropType,setCropType,
        cropOptions, waterUnit, areaUnit, weightUnit, currency,
        financialDashboard, financialDashboard2, getFianancialDashboard, varietyOptions,
        fetchingFinancialDashboard, fetchingFinancialDashboard2 } = props;

    const dataUnit = currency;
    const [state, setState] = useState('');



    const [yearFilter, setYearFilter] = useState(getCurrentYear())
    const [yearFilter2, setYearFilter2] = useState(getCurrentYear() - 1)
    const [filter, setFilter] = useState([])

    const [filter2, setFilter2] = useState([])

    const [indices, setIndices] = useState(false)
    const [indices2, setIndices2] = useState(false)
    const [indices3, setIndices3] = useState(false)

    const [expenseOption, setExpenseOption] = useState('category')

    const [incomeOption, setIncomeOption] = useState('crop')
    const [profitOption, setProfitOption] = useState('crop')
    const [init, setInit] = useState(false)

    const isPlantations = cropType === 'plantations';

    const getFianancialDashboardDebounced = debounce((yearFilter, isPlantations, filter, secondary) => { getFianancialDashboard(yearFilter, isPlantations, filter, secondary) }, 20);


    useEffect(() => {
        if (!isEmpty(state) && financialDashboard2 === null) {//year, plantation, filter, secondary
            getFianancialDashboardDebounced(yearFilter2, isPlantations, filter2, true)
        }
    }, [state])

    useEffect(() => {
        if(init){
            getFianancialDashboardDebounced(yearFilter, isPlantations, filter);
        }


    }, [filter, yearFilter])

    useEffect(() => {
        if (!isEmpty(state)) {
            getFianancialDashboardDebounced(yearFilter2, isPlantations, filter2, true)
        }
    }, [filter2, yearFilter2])

    useEffect(() => {
        loadDataByName(props, ['crops', 'fields', 'sites', 'fields', 'parentFields', 'varieties']);
        setInit(true);
    }, [])

    useEffect(() => {
        setFilter([]);
        setFilter2([]);
    }, [cropType])

    const actualCropOptions = cropOptions.filter(e => e.element.plantation === isPlantations);
    const actualCropIds = actualCropOptions.map(e => e.id);
    const actualVarietyOptions = varietyOptions.filter(e => actualCropIds.includes(e.element.cropID));

    const showFinancialDashboard = financialDashboard && !fetchingFinancialDashboard;
    const showFinancialDashboard2 = financialDashboard2 && !fetchingFinancialDashboard2;

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
            {!showFinancialDashboard && <div className={classes.loading}><Loading noBackGroundColor={true} /></div>}
            {showFinancialDashboard && <div className={classes.data}>
                {state === '' &&
                    <React.Fragment >
                        <FinancialDashboardCategory dir={dir} indices={indices} setIndices={setIndices}
                            currency={currency} title={text.expenses} color={expensesColor} text={text}
                            waterUnit={waterUnit} areaUnit={areaUnit} weightUnit={weightUnit}
                            totalValue={financialDashboard.expenses}
                            data={getExpenseDataByOption(financialDashboard, expenseOption)}
                            hasNegative={false}
                            option={expenseOption}
                            options={expensesOptions}
                            onChangeOption={setExpenseOption}
                            dataUnit={dataUnit}
                            waterIndex={true} weighIndex={true} areaIndex={true}
                        />
                        <FinancialDashboardCategory dir={dir} indices={indices2} setIndices={setIndices2}
                            dataUnit={dataUnit} title={text.income} color={incomeColor} text={text}
                            waterUnit={waterUnit} areaUnit={areaUnit} weightUnit={weightUnit}
                            totalValue={financialDashboard.income}
                            data={getIncomeDataByOption(financialDashboard, incomeOption)}
                            hasNegative={false}
                            option={incomeOption}
                            options={incomeOptions}
                            onChangeOption={setIncomeOption}
                            waterIndex={true} weighIndex={true} areaIndex={true}

                        />
                        <FinancialDashboardCategory dir={dir} indices={indices3} setIndices={setIndices3}
                            dataUnit={dataUnit} title={text.profit} color={profitColor} text={text}
                            waterUnit={waterUnit} areaUnit={areaUnit} weightUnit={weightUnit}
                            totalValue={financialDashboard.profit}
                            data={financialDashboard.cropProfit}
                            hasNegative={true}
                            option={profitOption}
                            options={allOptions}
                            onChangeOption={setProfitOption}
                            waterIndex={true} weighIndex={true} areaIndex={true}
                        />
                    </React.Fragment>
                }

                {state === 'profit' &&
                    <React.Fragment>
                        <FinancialDashboardCategory dir={dir} indices={indices} setIndices={setIndices} dataUnit={dataUnit}
                            title={text.profit} color={profitColor} text={text} waterUnit={waterUnit}
                            areaUnit={areaUnit} weightUnit={weightUnit}
                            data={financialDashboard.cropProfit}
                            compared={showFinancialDashboard2 ? financialDashboard2.cropProfit : null}
                            totalValue={financialDashboard.profit}
                            hasNegative={true}
                            option={profitOption}
                            options={allOptions}
                            onChangeOption={setProfitOption}
                            waterIndex={true} weighIndex={true} areaIndex={true}
                        />
                        {!showFinancialDashboard2 && <div className={classes.loading}><Loading noBackGroundColor={true} /></div>}
                        {showFinancialDashboard2 && <FinancialDashboardCategory dir={dir} indices={indices} setIndices={setIndices} dataUnit={dataUnit}
                            title={text.profit} color={profitColor} text={text} waterUnit={waterUnit}
                            areaUnit={areaUnit} weightUnit={weightUnit}
                            data={financialDashboard2.cropProfit}
                            compared={financialDashboard.cropProfit}
                            totalValue={financialDashboard2.profit}
                            hasNegative={true}
                            option={profitOption}
                            options={allOptions}
                            onChangeOption={setProfitOption}
                            waterIndex={true} weighIndex={true} areaIndex={true}
                        />}
                    </React.Fragment>
                }
                {state === 'income' &&
                    <React.Fragment>
                        <FinancialDashboardCategory dir={dir} indices={indices} setIndices={setIndices} dataUnit={dataUnit}
                            title={text.income} color={incomeColor} text={text}
                            waterUnit={waterUnit} areaUnit={areaUnit} weightUnit={weightUnit}
                            data={getIncomeDataByOption(financialDashboard, incomeOption)}
                            compared={getIncomeDataByOption(financialDashboard2, incomeOption)}
                            totalValue={financialDashboard.income}
                            hasNegative={false}
                            option={incomeOption}
                            options={incomeOptions}
                            onChangeOption={setIncomeOption}
                            waterIndex={true} weighIndex={true} areaIndex={true}

                        />
                        {!showFinancialDashboard2 && <div className={classes.loading}><Loading noBackGroundColor={true} /></div>}
                        {showFinancialDashboard2 && <FinancialDashboardCategory dir={dir} indices={indices} setIndices={setIndices} dataUnit={dataUnit}
                            title={text.income} color={incomeColor} text={text} waterUnit={waterUnit}
                            areaUnit={areaUnit} weightUnit={weightUnit}
                            data={getIncomeDataByOption(financialDashboard2, incomeOption)}
                            compared={getIncomeDataByOption(financialDashboard, incomeOption)}
                            totalValue={financialDashboard2.income}
                            hasNegative={false}
                            option={incomeOption}
                            options={incomeOptions}
                            onChangeOption={setIncomeOption}
                            waterIndex={true} weighIndex={true} areaIndex={true}
                        />}
                    </React.Fragment>
                }

                {state === 'expenses' &&
                    <React.Fragment>
                        <FinancialDashboardCategory dir={dir} indices={indices} setIndices={setIndices} dataUnit={dataUnit}
                            title={text.expenses} color={expensesColor} text={text} waterUnit={waterUnit}
                            areaUnit={areaUnit} weightUnit={weightUnit}
                            data={getExpenseDataByOption(financialDashboard, expenseOption)}
                            compared={getExpenseDataByOption(financialDashboard2, expenseOption)}
                            totalValue={financialDashboard.expenses}
                            hasNegative={false}
                            option={expenseOption}
                            options={expensesOptions}
                            onChangeOption={setExpenseOption}
                            waterIndex={true} weighIndex={true} areaIndex={true}
                        />
                        {!showFinancialDashboard2 && <div className={classes.loading}><Loading noBackGroundColor={true} /></div>}
                        {showFinancialDashboard2 && <FinancialDashboardCategory dir={dir} indices={indices} setIndices={setIndices} dataUnit={dataUnit}
                            title={text.expenses} color={expensesColor} text={text} waterUnit={waterUnit}
                            areaUnit={areaUnit} weightUnit={weightUnit}
                            data={getExpenseDataByOption(financialDashboard2, expenseOption)}
                            compared={getExpenseDataByOption(financialDashboard, expenseOption)}
                            totalValue={financialDashboard2.expenses}
                            hasNegative={false}
                            option={expenseOption}
                            options={expensesOptions}
                            onChangeOption={setExpenseOption}
                            waterIndex={true} weighIndex={true} areaIndex={true}
                        />}
                    </React.Fragment>
                }
            </div>}
        </div >

    )
}

export default withRouter((FinancialDashboard));