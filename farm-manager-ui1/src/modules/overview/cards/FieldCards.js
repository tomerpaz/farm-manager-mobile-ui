import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { sumBy } from 'lodash';

import FieldGrid from './VirtualizedFieldGrid';
import { filterDomains, filterDomainsFreeText, filterDomainsByStatus } from "../../../components/filters/filterUtil";

import { bodyHeight } from "../../../utils/TabUtils";
import DomainViewTop from '../DomainViewTop'
import { CARDS, DOMAIN, END } from "../../../components/frame/Routes";
import { BORDER_COLOR_DARK } from "../../../App";
import { isEmpty } from "../../../utils/StringUtil";
import InfoSnackBar from '../../../components/core/util/InfoSnackBar'
import { numberFormatter } from '../../../utils/NunberUtil';

const useStyles = makeStyles(theme => ({
    gridContainer: {
        width: '100%',
        height: bodyHeight,
        border: '1px solid ' + BORDER_COLOR_DARK,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'flex-start'
    },
}));

const FieldCards = (props) => {
    const classes = useStyles();
    const { domains, getDomainsByYear, yearFilter, reloadDomains, setYearFilter,
        text, fieldFilter, setFieldFilter, domainFilterOption,
        viewSize, viewSizeOptions, setDomainViewSize, areaUnit,
        setFieldFilterFreeText, fieldFreeText, dir, domainStatusFilter, setDomainStatusFilter, isInspector, growerOptions,
        user: { manageDomains },
    } = props;


    const [showTotalArea, setShowTotalArea] = useState(true);


    useEffect(() => {
        if (domains.length === 0 || reloadDomains) {
            getDomainsByYear(yearFilter);
        }
    }, [])

    function onYearFilterChange(year) {
        setYearFilter(year);
        getDomainsByYear(year);
    }

    let displayRows = filterDomainsByStatus(filterDomains(domains, fieldFilter), domainStatusFilter);


    if (!isEmpty(fieldFreeText)) {
        displayRows = filterDomainsFreeText(displayRows, fieldFreeText)
    }

    const totalArea = sumBy(displayRows, 'plantArea');


    const FORM_URL = manageDomains ? `${DOMAIN}${CARDS}/0` : null;
    const END_CROP_URL = manageDomains ? `${END}${CARDS}` : null;

    return (
        <div dir={dir} style={{ dir: dir }}>
            <DomainViewTop options={domainFilterOption} filter={fieldFilter} setFilter={setFieldFilter}
                label={text.typeToSearchField} actionUrl={FORM_URL} actionText={text.newField}
                dir={text.dir} yearFilter={yearFilter}
                setYearFilter={(year) => onYearFilterChange(year)}
                text={text}
                endCropUrl={END_CROP_URL}
                viewSize={viewSize}
                viewSizeOptions={viewSizeOptions}
                setDomainViewSize={setDomainViewSize}
                setFieldFilterFreeText={setFieldFilterFreeText}
                fieldFreeText={fieldFreeText}
                domainStatusFilter={domainStatusFilter}
                setDomainStatusFilter={setDomainStatusFilter}
                isInspector={isInspector}
                growerOptions={growerOptions}
            />

            <div dir={dir} className={classes.gridContainer} style={{ dir: dir }}>
                <FieldGrid displayRows={displayRows} style={{ dir: dir }} {...props} />

            </div>

            {showTotalArea &&
                <InfoSnackBar
                    onAction={e => setShowTotalArea(false)}
                    open={(totalArea && totalArea > 0) ? true : false}
                    dir={dir}
                    message={`${numberFormatter(totalArea, 2)} ${text[areaUnit]}`}
                />}
        </div>
    )
}

export default FieldCards;