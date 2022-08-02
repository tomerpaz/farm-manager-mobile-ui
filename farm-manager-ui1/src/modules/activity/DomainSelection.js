import React, { useState, useEffect } from 'react';

import { makeStyles } from '@mui/styles';

import { Typography, Divider } from '@mui/material';

import { Field } from 'redux-form'

import { requiredFieldsArray } from "../../components/core/form/validation";
import { DomainSelectionTable, FieldSelectionTable, WaybillSelectionTable } from '../../components/tables/selection/'
import FieldTable from "./fieldstable/FieldTable";
import { HARVEST, MARKET, PERCENTAGE_ACTIVITIES } from "./types";
import { FormTitle } from '../../components/core'

import {  tableError } from "./activityStyle";
import { formRoot, formSection, formRow, formRowSpaceBetween, formTable } from '../../utils/FormStyle';
import { getTitleQty, DomainHedaerStart, DomainHeaderEnd } from './DomainSelectionHeader';
import { PRIMARY_DARK } from '../../App';

import DecoratedLabel from "../../components/DecoratedLabel";


const useStyles = makeStyles(theme => ({
    root: formRoot(theme),
    section: formSection(theme),
    formRowSpaceBetween: formRowSpaceBetween(theme),
    formRow: formRow(theme),
    table: formTable(theme),
    error: tableError(theme),
    spacer: {
        width: theme.spacing(1)
    },

    controls: {
        flex: 1, display: 'flex', flexDirection: 'row',  justifyContent: 'space-between'
    }

}));


const DomainSelection = (props) => {

    const {
        text, activityType,
        renderDomainSelections, handleClickCloseFields, expendFieldTable, openFields,
        cropID, changeFieldActualSize, removerActivityDomain, activityArea, baseFields,
        openWaybill, changeDomainTableColumn,
        

    } = props;
    const classes = useStyles();
    const [applyAll, setApplyAll] = useState(false);

    
    return (
        <div>
            <div className={classes.formRowSpaceBetween}>
                <FormTitle title={text.fields} />
                <DecoratedLabel text ={getTitleQty(props)} />
                    
            </div>
            <Divider />
            <div className={classes.controls}>
                <DomainHedaerStart {...props}/>
                <DomainHeaderEnd applyAll={applyAll} setApplyAll={(e) => setApplyAll(e)} {...props}/>            
            </div>

            {renderDomainSelections && !baseFields &&
                <DomainSelectionTable open={openFields} cropID={cropID} {...props}
                    handleClose={handleClickCloseFields} />}
            {renderDomainSelections && baseFields &&
                <FieldSelectionTable open={openFields} {...props}
                    handleClose={handleClickCloseFields} />}
            {MARKET === activityType &&
                <WaybillSelectionTable open={openWaybill} {...props}
                    handleClose={handleClickCloseFields} />
            }
            <div className={classes.table}>
                <Field
                    validate={requiredFieldsArray}
                    name="activityDomains"
                    component={({ meta: { touched, error, warning } }) =>
                        <div>
                            {touched && error &&
                                <Typography variant='caption' noWrap
                                    className={classes.error}>
                                    {error}
                                </Typography>}

                            <FieldTable
                                {...props}
                                applyAll={applyAll}
                                activityArea={activityArea}
                                expendFieldTable={expendFieldTable}
                                changeFieldActualSize={changeFieldActualSize}
                                removerActivityDomain={removerActivityDomain}
                                changeDomainTableColumn={changeDomainTableColumn}
                            />
                        </div>
                    }
                />
            </div>
        </div>
    )
}
export default DomainSelection;