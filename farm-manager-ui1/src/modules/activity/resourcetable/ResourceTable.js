import React from 'react'
import { Divider, Badge, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Field } from 'redux-form'
import { TextField } from '../../../components/core/form/wrapper';
import { AddButton } from '../../../components';

import { ResourceEditGroupAmountDialog, ResourceEditSecondaryGroupAmountDialog } from "../../../components/dialog";

import {
    FERTILIZE_IRRIGATION,
    FERTILIZE_IRRIGATION_PLAN,
    GENERAL,
    GENERAL_PLAN,
    HARVEST,
    PEST_MONITOR,
    SPRAY,
    SPRAY_PLAN
} from '../types'

import SprayResourceTable from './SprayResourceTable';
import IrrigationResourceTable from './IrrigationResourceTable';
import StandardResourceTable from './StandardResourceTable';
import PestMonitorResourceTable from './PestMonitorResourceTable';
import { FormTitle } from '../../../components/core'
import { ResourceSelectionTable } from '../../../components/tables/selection/'

import { tableError } from "../activityStyle";
import { renderNameIdOptions } from "../../../components/core/optionsUtil";

import { isIrrigation, isPesticides, isSprayer, isIvnevtoryCheck } from "../ActivityUtil";
import { requiredActivityResources } from "../../../components/core/form/validation";
import { formRowSpaceBetween, formRowSide, formRow, formTable } from '../../../utils/FormStyle';
import { getTotalContainers, getTotalWeight } from '../../../utils/FarmCalculator';
import { FormatAlignJustify } from '@mui/icons-material';
import DecoratedLabel from '../../../components/DecoratedLabel';

const STANDARD = [GENERAL, HARVEST, GENERAL_PLAN];
const INVOICE_ACTIVITIES = [SPRAY, FERTILIZE_IRRIGATION, GENERAL, HARVEST]
const NO_RESOURCE_HEADER = [PEST_MONITOR];

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex', flex: 1, flexDirection: 'column'
    },
    formRowSpaceBetween: formRowSpaceBetween(theme),
    formRow: formRow(theme),
    centerFlex: formRowSide(theme),
    tableError: tableError(theme),
    table: formTable(theme),
    itemCount: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    }


}));
const ActivityResourceTable = (props) => {


    const {
        renderResourceSelections, onOpen, text, listPesticides, openResources,
        handleClose, totalCost, currency, activityType, pesticideLists, warehouses,
        setResourceEditGroupAmount, resourceAmountEdit, activityArea,
        areaUnit, onChangePesticideList, costing, activityDomains, weightUnit, user, resources, selectedActivityDefOption
    } = props

    const inventoryCheck = isIvnevtoryCheck(user)

    const classes = useStyles();

    const costPeraAreaUnit = totalCost && activityArea > 0 ? totalCost / activityArea : 0;


    const totalWeight = HARVEST === activityType ? getTotalWeight(activityDomains) : null;
    const costPeraWeightUnit = totalWeight && totalWeight > 0 && totalCost > 0 ? totalCost / totalWeight : 0;
    const totalContainers = HARVEST === activityType ? getTotalContainers(resources, selectedActivityDefOption) : null;

    return (
        <div className={classes.root}>
            <div className={classes.formRowSpaceBetween}>
                <FormTitle title={text.resources} />
                {!NO_RESOURCE_HEADER.includes(activityType) && costing &&
                    <div className={classes.centerFlex}>
                        <DecoratedLabel text=
                            {`${text.total}: ${totalCost ? totalCost.toFixed(2) : 0} ${text[currency]}`}
                        />
                        <DecoratedLabel text=
                            {`${text['per' + areaUnit]}: ${costPeraAreaUnit.toFixed(2)} ${text[currency]}`}
                        />
                        {totalWeight &&
                            <DecoratedLabel text=
                                {`${text['per' + weightUnit]}: ${costPeraWeightUnit.toFixed(2)} ${text[currency]}`} />

                        }
                        {totalContainers &&

                            <DecoratedLabel text=
                                {`${text.containers}: ${totalContainers}`} />
                        }
                    </div>
                }
            </div>
            <Divider />

            <div className={classes.formRow}>
                <AddButton onClick={onOpen} label={text.resources} />
                <div className={classes.itemCount}>
                    <Badge color="primary" badgeContent={resources.length}>
                        <FormatAlignJustify />
                    </Badge>
                </div>
                {isPesticides(activityType) &&
                    <Field name="pesticideListId"
                        select
                        width={200}
                        component={TextField}
                        onChange={onChangePesticideList}
                        label={text.pesticideList}>
                        {renderNameIdOptions(pesticideLists.filter(e => e.active))}
                    </Field>
                }
                {
                    costing && INVOICE_ACTIVITIES.includes(activityType) &&
                    <Field name="resourcesInvoice"
                        width={200}
                        component={TextField}
                        label={text.invoice}>
                    </Field>
                }
            </div>
            {renderResourceSelections && < ResourceSelectionTable open={openResources}
                listPesticides={listPesticides} {...props}
                handleClose={handleClose} />
            }
            {props.resourceAmountEdit && !props.resourceAmountEdit.secondary && < ResourceEditGroupAmountDialog open={props.resourceAmountEdit !== null}
                text={text}
                activityArea={activityArea}
                areaUnit={areaUnit}
                ru={props.resourceAmountEdit.ru}
                secondary={props.resourceAmountEdit.secondary}
                rowIndex={props.resourceAmountEdit.rowIndex}
                setResourceEditGroupAmount={setResourceEditGroupAmount} {...props}
            />
            }

            {props.resourceAmountEdit && props.resourceAmountEdit.secondary && < ResourceEditSecondaryGroupAmountDialog open={props.resourceAmountEdit !== null}
                text={text}
                // activityArea={activityArea}
                // areaUnit={areaUnit}
                ru={props.resourceAmountEdit.ru}
                // secondary={props.resourceAmountEdit.secondary}
                rowIndex={props.resourceAmountEdit.rowIndex}
                setResourceEditGroupAmount={setResourceEditGroupAmount} {...props}
            />
            }

            <Field
                validate={requiredActivityResources}
                name="resources"
                component={({ meta: { touched, error, warning } }) =>
                    <div className={classes.table}>
                        {touched && error &&
                            <Typography variant='caption' noWrap
                                className={classes.tableError}>
                                {error}
                            </Typography>}

                        {isSprayer(activityType) && <SprayResourceTable {...props} inventoryCheck={inventoryCheck} />}
                        {activityType === PEST_MONITOR && <PestMonitorResourceTable {...props} />}

                        {isIrrigation(activityType) && <IrrigationResourceTable {...props} inventoryCheck={inventoryCheck} />}
                        {STANDARD.indexOf(props.activityType) > -1 &&
                            <StandardResourceTable {...props} inventoryCheck={inventoryCheck} />}
                    </div>
                }
            />
        </div>

    )

}
export default ActivityResourceTable;